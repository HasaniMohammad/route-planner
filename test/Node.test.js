import test from 'node:test'
import assert from 'node:assert/strict'

import { Node } from "../src/Node.js"

test('creates a node with a valid id', () => {
  const node = new Node('A')

  assert.equal(node.id, 'A')
})

test('throws TypeError when id is not a string', () => {
  assert.throws(
    () => new Node(123),
    TypeError
  )
})

test('throws Error when id is empty', () => {
  assert.throws(
    () => new Node(''),
    Error
  )
})

test('throws Error when id contains only whitespace', () => {
  assert.throws(
    () => new Node('   '),
    Error
  )
})