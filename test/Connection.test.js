import test from 'node:test'
import assert from 'node:assert/strict'

import { Node } from '../src/Node.js'
import { Connection } from '../src/Connection.js'

test('creates a connection between two nodes with a valid cost', () => {
  const nodeA = new Node('A')
  const nodeB = new Node('B')

  const connection = new Connection(nodeA, nodeB, 10)

  assert.equal(connection.startNode, nodeA)
  assert.equal(connection.endNode, nodeB)
  assert.equal(connection.cost, 10)
})


test('throws TypeError when start node is not a Node', () => {
  const nodeB = new Node('B')

  assert.throws(
    () => new Connection('A', nodeB, 10),
    TypeError
  )
})

test('throws TypeError when end node is not a Node', () => {
  const nodeA = new Node('A')

  assert.throws(
    () => new Connection(nodeA, 'B', 10),
    TypeError
  )
})

test('throws Error when connecting a node to itself', () => {
  const nodeA = new Node('A')

  assert.throws(
    () => new Connection(nodeA, nodeA, 10),
    Error
  )
})

test('throws TypeError when cost is not a number', () => {
  const nodeA = new Node('A')
  const nodeB = new Node('B')

  assert.throws(
    () => new Connection(nodeA, nodeB, '10'),
    TypeError
  )
})

test('throws TypeError when cost is NaN', () => {
  const nodeA = new Node('A')
  const nodeB = new Node('B')

  assert.throws(
    () => new Connection(nodeA, nodeB, NaN),
    TypeError
  )
})

test('throws Error when cost is negative', () => {
  const nodeA = new Node('A')
  const nodeB = new Node('B')

  assert.throws(
    () => new Connection(nodeA, nodeB, -5),
    Error
  )
})