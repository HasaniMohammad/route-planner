import test from 'node:test'
import assert from 'node:assert/strict'

import { Node } from '../src/Node.js'
import { Network } from '../src/Network.js'

test('adds a Node to the network', () => {
  const network = new Network()
  const nodeA = new Node('A')

  network.addNode(nodeA)

  assert.equal(network.hasNode('A'), true)
})


test('rejects adding something that is not a Node', () => {
  const network = new Network()

  assert.throws(
    () => network.addNode('A'),
    TypeError
  )
})


test('rejects a duplicate Node id', () => {
  const network = new Network()

  network.addNode(new Node('A'))

  assert.throws(
    () => network.addNode(new Node('A')),
    Error
  )
})


test('gets an existing Node by id', () => {
  const network = new Network()
  const nodeA = new Node('A')

  network.addNode(nodeA)

  assert.equal(network.getNode('A'), nodeA)
})


test('throws when getting a Node that does not exist', () => {
  const network = new Network()

  assert.throws(
    () => network.getNode('A'),
    Error
  )
})

test('connects two existing Nodes', () => {
  const network = new Network()

  network.addNode(new Node('A'))
  network.addNode(new Node('B'))

  network.connect('A', 'B', 10)

  const connections = network.getConnections('A')

  assert.equal(connections.length, 1)
  assert.equal(connections[0].cost, 10)
})

test('connection is accessible from both Nodes', () => {
  const network = new Network()

  network.addNode(new Node('A'))
  network.addNode(new Node('B'))

  network.connect('A', 'B', 10)

  assert.equal(network.getConnections('A').length, 1)
  assert.equal(network.getConnections('B').length, 1)
})

test('rejects a duplicate connection', () => {
  const network = new Network()

  network.addNode(new Node('A'))
  network.addNode(new Node('B'))

  network.connect('A', 'B', 10)

  assert.throws(
    () => network.connect('A', 'B', 10),
    Error
  )
})

test('rejects a reversed duplicate connection', () => {
  const network = new Network()

  network.addNode(new Node('A'))
  network.addNode(new Node('B'))

  network.connect('A', 'B', 10)

  assert.throws(
    () => network.connect('B', 'A', 10),
    Error
  )
})

test('returns all connections for a Node', () => {
  const network = new Network()

  network.addNode(new Node('A'))
  network.addNode(new Node('B'))
  network.addNode(new Node('C'))

  network.connect('A', 'B', 10)
  network.connect('A', 'C', 5)

  const connections = network.getConnections('A')

  assert.equal(connections.length, 2)
})