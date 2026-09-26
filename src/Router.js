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

      visited.add(currentNode)

      if (currentNode === endNode) {
        return true
      }

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
}

