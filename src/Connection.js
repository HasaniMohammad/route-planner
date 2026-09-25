import { Node } from "./Node.js"

export class Connection {
  #startNode
  #endNode
  #cost

  constructor(startNode, endNode, cost) {

    if (!(startNode instanceof Node) || !(endNode instanceof Node)) {
      throw new TypeError('Start and end nodes must be a Node.')
    }

    if (startNode === endNode) {
      throw new Error('A node connot be connected to itself.')
    }

    if (cost < 0) {
      throw new Error('Cost must be a valid number.')
    }

    this.#startNode = startNode
    this.#endNode = endNode
    this.#cost = cost
  }

  get startNode() {
    return this.#startNode
  }

  get endNode() {
    return this.#endNode
  }

  get cost() {
    return this.#cost
  }
}


