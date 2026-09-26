import { Node } from "./Node.js"
import { Connection } from "./Connection.js"

export class Network {
  #nodes
  #connections

  constructor() {
    this.#nodes = new Map()
    this.#connections = []
  }

  addNode(node) {
    if (!(node instanceof Node)) {
      throw new TypeError('the node must be a Node')
    }

    if (this.#nodes.has(node.id)) {
      throw new Error('The node already exists.')
    }

    this.#nodes.set(node.id, node)
  }

  hasNode(id) {
    return this.#nodes.has(id)
  }

  getNode(id) {
    if (!this.#nodes.has(id)) {
      throw new Error('The node doesnot exist.')
    }
    return this.#nodes.get(id)
  }

  connect(startId, endId, cost) {
    const startNode = this.getNode(startId)
    const endNode = this.getNode(endId)

    const connection = new Connection(
      startNode,
      endNode,
      cost
    )

    for (const connection of this.#connections) {
      if (
        (connection.startNode === startNode &&
          connection.endNode === endNode) ||
        (connection.startNode === endNode &&
          connection.endNode === startNode)
      ) {
        throw new Error('The connection already exists.')
      }
    }

    this.#connections.push(connection)
  }

  getConnections(id) {
    const connections = []
    const node = this.getNode(id)

    for (const connection of this.#connections) {
      if ((connection.startNode === node) || (connection.endNode === node)) {
        connections.push(connection)
      }
    }

    return connections
  }
}