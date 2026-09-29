import test from 'node:test'
import assert from 'node:assert/strict'

import { Node } from '../src/Node.js'
import { Network } from '../src/Network.js'
import { Router } from '../src/Router.js'


function createNetwork() {
  const network = new Network()

  network.addNode(new Node('A'))
  network.addNode(new Node('B'))
  network.addNode(new Node('C'))
  network.addNode(new Node('D'))
  network.addNode(new Node('E'))

  network.connect('A', 'B', 5)
  network.connect('A', 'C', 4)
  network.connect('B', 'D', 7)
  network.connect('C', 'D', 3)

  return network
}

test('hasRoute returns true when a route exists', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.hasRoute('A', 'D'), true)
})

test('hasRoute returns true for the same start and end node', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.hasRoute('A', 'A'), true)
})

test('hasRoute returns false when no route exists', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.hasRoute('A', 'E'), false)
})

test('hasRoute finds a route in the reverse direction', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.hasRoute('D', 'A'), true)
})

test('findRoute returns a Route when a route exists', () => {
  const network = createNetwork()
  const router = new Router(network)

  const route = router.findRoute('A', 'D')

  assert.deepEqual(
    route.nodes.map(node => node.id),
    ['A', 'B', 'D']
  )

  assert.equal(route.cost, 12)
})

test('findRoute works in the reverse direction', () => {
  const network = createNetwork()
  const router = new Router(network)

  const route = router.findRoute('D', 'A')

  assert.deepEqual(
    route.nodes.map(node => node.id),
    ['D', 'B', 'A']
  )

  assert.equal(route.cost, 12)
})

test('findRoute returns a zero-cost Route when start and end are the same', () => {
  const network = createNetwork()
  const router = new Router(network)

  const route = router.findRoute('A', 'A')

  assert.deepEqual(
    route.nodes.map(node => node.id),
    ['A']
  )

  assert.equal(route.cost, 0)
})

test('findRoute returns null when no route exists', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.findRoute('A', 'E'), null)
})

test('routeCost returns the cost of a found route', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.routeCost('A', 'D'), 12)
})

test('routeCost returns null when no route exists', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.routeCost('A', 'E'), null)
})

test('routeCost returns zero when start and end are the same', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.routeCost('A', 'A'), 0)
})

test('findShortestRoute returns the route with the lowest total cost', () => {
  const network = createNetwork()
  const router = new Router(network)

  const route = router.findShortestRoute('A', 'D')

  assert.deepEqual(
    route.nodes.map(node => node.id),
    ['A', 'C', 'D']
  )

  assert.equal(route.cost, 7)
})

test('findShortestRoute works in the reverse direction', () => {
  const network = createNetwork()
  const router = new Router(network)

  const route = router.findShortestRoute('D', 'A')

  assert.deepEqual(
    route.nodes.map(node => node.id),
    ['D', 'C', 'A']
  )

  assert.equal(route.cost, 7)
})

test('findShortestRoute compares alternative weighted routes', () => {
  const network = createNetwork()
  const router = new Router(network)

  const route = router.findShortestRoute('C', 'B')

  assert.deepEqual(
    route.nodes.map(node => node.id),
    ['C', 'A', 'B']
  )

  assert.equal(route.cost, 9)
})

test('findShortestRoute returns a zero-cost Route for the same node', () => {
  const network = createNetwork()
  const router = new Router(network)

  const route = router.findShortestRoute('A', 'A')

  assert.deepEqual(
    route.nodes.map(node => node.id),
    ['A']
  )

  assert.equal(route.cost, 0)
})

test('findShortestRoute returns null when no route exists', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.equal(router.findShortestRoute('A', 'E'), null)
})

test('throws when the start node does not exist', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.throws(
    () => router.findShortestRoute('X', 'A'),
    Error
  )
})

test('throws when the end node does not exist', () => {
  const network = createNetwork()
  const router = new Router(network)

  assert.throws(
    () => router.findShortestRoute('A', 'X'),
    Error
  )
})