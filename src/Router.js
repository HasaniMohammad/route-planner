import { Connection } from "./Connection.js"
import { Network } from "./Network.js"
import { Node } from "./Node.js"

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
    const visited = new Set()
    const previous = new Map()

    let found = false

    while (queue.length > 0) {

      const currentNode = queue.shift()

      visited.add(currentNode)

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
          queue.push(neighbor)
          previous.set(neighbor, currentNode)
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

        currentNode = previous.get(currentNode)
      }

      return routeNodes.reverse()

    }

    return null
  }

  routeCost(startId, endId) {
    let totalCost = 0

    const routeNodes = this.findRoute(startId, endId)

    if (routeNodes === null) {
      return null
    }

    for (let i = 0; i < routeNodes.length - 1; i++) {
      const connections = this.#network.getConnections(routeNodes[i].id)

      for (const connection of connections) {
        if (
          (connection.startNode === routeNodes[i] &&
          connection.endNode === routeNodes[i + 1]) ||

          (connection.endNode === routeNodes[i] &&
            connection.startNode === routeNodes[i + 1])
          )
        {
          totalCost += connection.cost
        }

      }
    }

    return totalCost
  }

}

