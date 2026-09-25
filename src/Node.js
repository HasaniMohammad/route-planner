export class Node {
  #id

  constructor(id) {
    if (typeof id !== 'string') {
      throw new TypeError('The Node id should be a string');
    }

    if (id.trim() === '') {
      throw new TypeError('The node id can not be empty')
    }
    this.#id = id
  }

  get getId() {
    return this.#id
  }
}

