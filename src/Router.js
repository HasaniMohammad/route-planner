import { Connection } from "./Connection.js"
import { Network } from "./Network.js"
import { Node } from "./Node.js"
import { Route } from "./Route.js"

export class Router {
  #network

  constructor(network) {
    if (!(network instanceof Network)) {
      throw new TypeError('The network should be a Network instance')
    }

    this.#network = network
  }

  hasRoute(startId, endId) {
    const startNode = this.#network.getNode(startId)
    const endNode = this.#network.getNode(endId)

    const visited = new Set()
    const queue = [startNode]

    while (queue.length > 0) {
      const currentNode = queue.shift()

      if (currentNode === endNode) {
        return true
      }

      visited.add(currentNode)

      const connections = this.#network.getConnections(currentNode.id)

      for (const connection of connections) {
        let neighbor

        if (connection.startNode === currentNode) {
          neighbor = connection.endNode
        } else {
          neighbor = connection.startNode
        }

        if (!visited.has(neighbor)) {
          queue.push(neighbor)
        }
      }
    }

    return false
  }

  findRoute(startId, endId) {
    const startNode = this.#network.getNode(startId)
    const endNode = this.#network.getNode(endId)

    const queue = [startNode]
    const visited = new Set([startNode])
    const previous = new Map()
    const costs = new Map()
    let totalCosts = 0

    let found = false

    while (queue.length > 0) {

      const currentNode = queue.shift()

      if (currentNode === endNode) {
        found = true
        break
      }

      const connections = this.#network.getConnections(currentNode.id)

      for (const connection of connections) {
        let neighbor

        if (currentNode === connection.startNode) {
          neighbor = connection.endNode
        } else {
          neighbor = connection.startNode
        }

        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
          previous.set(neighbor, currentNode)
          costs.set(neighbor, connection.cost)
        }
      }
    }

    const routeNodes = []

    if (found) {
      let currentNode = endNode

      while (currentNode) {
        routeNodes.push(currentNode)

        if (currentNode === startNode) {
          break
        }

        totalCosts += costs.get(currentNode)

        currentNode = previous.get(currentNode)
      }

      return new Route(routeNodes.reverse(), totalCosts)

    }

    return null
  }

  routeCost(startId, endId) {
    const route = this.findRoute(startId, endId)

    if (route === null) {
      return null
    }

    return route.cost
  }

  findShortestRoute(startId, endId) {
    const startNode = this.#network.getNode(startId)
    const endNode = this.#network.getNode(endId)

    const distance = new Map()
    const previous = new Map()
    const visited = new Set()
    const candidates = new Set()
    const routeNodes = []

    distance.set(startNode, 0)
    candidates.add(startNode)

    while (candidates.size > 0) {
      let currentNode = null
      let smallestDistance = Infinity

      for (const node of candidates) {
        if (distance.get(node) < smallestDistance) {
          currentNode = node
          smallestDistance = distance.get(node)
        }
      }

      candidates.delete(currentNode)

      if (currentNode === endNode) {
        break
      }

      visited.add(currentNode)

      const connections = this.#network.getConnections(currentNode.id)

      //find node on other side of connection
      for (const connection of connections) {
        let neighbor

        if (connection.startNode === currentNode) {
          neighbor = connection.endNode
        } else {
          neighbor = connection.startNode
        }

        if (visited.has(neighbor)) {
          continue
        }

        //Calculate total cost from start to this neibhor
        const newDistance = distance.get(currentNode) + connection.cost

        //Set the undiscovered neibhors distance as infinity
        const knownDistance = distance.get(neighbor) ?? Infinity

        //Did we find a cheaper way to reach this neibhor?
        if (newDistance < knownDistance) {
          distance.set(neighbor, newDistance)
          previous.set(neighbor, currentNode)
          candidates.add(neighbor)
        }
      }
    }

    if (!distance.has(endNode)) {
      return null
    }

    let currentNode = endNode

    while (currentNode) {
      routeNodes.push(currentNode)

      if (currentNode === startNode) {
        break
      }

      currentNode = previous.get(currentNode)
    }

    const totalCost = distance.get(endNode)

    return new Route(routeNodes.reverse(), totalCost)

  }

}
