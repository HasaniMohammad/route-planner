import { Node } from "./Node.js"
export class Route {
  // An array of nodes
  #nodes
  #cost

  constructor(nodes, cost) {
    if (!Array.isArray(nodes)) {
      throw new TypeError('The nodes must be an array')
    }

    if (nodes.length === 0) {
      throw new Error('The nodes array cannot be empty.')
    }

    for (const node of nodes) {
      if (!(node instanceof Node)) {
        throw new TypeError('All nodes must be instance of Node')
      }
    }

    if (typeof cost !== 'number' || Number.isNaN(cost)) {
      throw new TypeError('The cost must be a valid number.')
    }

    if (cost < 0) {
      throw new Error('The cost cannot be negative.')
    }

    this.#nodes = nodes
    this.#cost = cost
  }

  get nodes() {
    return this.#nodes
  }

  get cost() {
    return this.#cost
  }

  get numberOfStops() {
    return this.#nodes.length
  }

  contains(node) {
    if (!(node instanceof Node)) {
      throw new TypeError('The node must be instance of Node.')
    }

    return this.#nodes.includes(node)
  }
}
