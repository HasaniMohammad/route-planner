import test from 'node:test'
import assert from 'node:assert/strict'

import { Node } from '../src/Node.js'
import { Route } from '../src/Route.js'

test('creates a Route with valid nodes and cost', () => {
  const nodeA = new Node('A')
  const nodeB = new Node('B')
  const nodeC = new Node('C')

  const route = new Route([nodeA, nodeB, nodeC], 15)

  assert.deepEqual(route.nodes, [nodeA, nodeB, nodeC])
  assert.equal(route.cost, 15)
})

test('rejects nodes that are not provided as an array', () => {
  assert.throws(
    () => new Route('A', 10),
    TypeError
  )
})

test('rejects an empty nodes array', () => {
  assert.throws(
    () => new Route([], 10),
    Error
  )
})

test('rejects an array containing something other than Node instances', () => {
  const nodeA = new Node('A')

  assert.throws(
    () => new Route([nodeA, 'B'], 10),
    TypeError
  )
})

test('rejects a cost that is not a number', () => {
  const nodeA = new Node('A')

  assert.throws(
    () => new Route([nodeA], '10'),
    TypeError
  )
})

test('rejects NaN as a cost', () => {
  const nodeA = new Node('A')

  assert.throws(
    () => new Route([nodeA], NaN),
    TypeError
  )
})

test('rejects a negative cost', () => {
  const nodeA = new Node('A')

  assert.throws(
    () => new Route([nodeA], -5),
    Error
  )
})

test('allows zero as a cost', () => {
  const nodeA = new Node('A')

  const route = new Route([nodeA], 0)

  assert.equal(route.cost, 0)
})

test('returns the number of nodes in the Route', () => {
  const nodeA = new Node('A')
  const nodeB = new Node('B')
  const nodeC = new Node('C')

  const route = new Route([nodeA, nodeB, nodeC], 15)

  assert.equal(route.numberOfStops, 3)
})

test('returns true when Route contains the Node', () => {
  const nodeA = new Node('A')
  const nodeB = new Node('B')

  const route = new Route([nodeA, nodeB], 10)

  assert.equal(route.contains(nodeB), true)
})

test('returns false when Route does not contain the Node', () => {
  const nodeA = new Node('A')
  const nodeB = new Node('B')
  const nodeC = new Node('C')

  const route = new Route([nodeA, nodeB], 10)

  assert.equal(route.contains(nodeC), false)
})

test('contains rejects something that is not a Node', () => {
  const nodeA = new Node('A')
  const route = new Route([nodeA], 0)

  assert.throws(
    () => route.contains('A'),
    TypeError
  )
})