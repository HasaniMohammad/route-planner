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

}





const network = new Network()

network.addNode(new Node('A'))
network.addNode(new Node('B'))
network.addNode(new Node('C'))
network.addNode(new Node('D'))
network.addNode(new Node('E'))

network.connect('A', 'B', 10)
network.connect('B', 'C', 5)
network.connect('B', 'D', 8)

const router = new Router(network)

// TEST 1: A → C
let route = router.findRoute('A', 'C')

console.log(route.nodes.map(node => node.id))
// Expected: [ 'A', 'B', 'C' ]

console.log(route.cost)
// Expected: 15


// TEST 2: Reverse direction C → A
route = router.findRoute('C', 'A')

console.log(route.nodes.map(node => node.id))
// Expected: [ 'C', 'B', 'A' ]

console.log(route.cost)
// Expected: 15


// TEST 3: A → D
route = router.findRoute('A', 'D')

console.log(route.nodes.map(node => node.id))
// Expected: [ 'A', 'B', 'D' ]

console.log(route.cost)
// Expected: 18


// TEST 4: D → C
route = router.findRoute('D', 'C')

console.log(route.nodes.map(node => node.id))
// Expected: [ 'D', 'B', 'C' ]

console.log(route.cost)
// Expected: 13


// TEST 5: Same start and end
route = router.findRoute('A', 'A')

console.log(route.nodes.map(node => node.id))
// Expected: [ 'A' ]

console.log(route.cost)
// Expected: 0


// TEST 6: No route
route = router.findRoute('A', 'E')

console.log(route)
// Expected: null


// TEST 7: hasRoute
console.log(router.hasRoute('A', 'C'))
// Expected: true

console.log(router.hasRoute('A', 'E'))
// Expected: false


// TEST 8: routeCost
console.log(router.routeCost('A', 'C'))
// Expected: 15

console.log(router.routeCost('C', 'A'))
// Expected: 15

console.log(router.routeCost('A', 'D'))
// Expected: 18

console.log(router.routeCost('A', 'A'))
// Expected: 0

console.log(router.routeCost('A', 'E'))
// Expected: null