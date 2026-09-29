import test from 'node:test'
import assert from 'node:assert/strict'

import {
  Node,
  Connection,
  Network,
  Route,
  Router
} from '../src/index.js'

test('exports the public classes of the module', () => {
  assert.equal(typeof Node, 'function')
  assert.equal(typeof Connection, 'function')
  assert.equal(typeof Network, 'function')
  assert.equal(typeof Route, 'function')
  assert.equal(typeof Router, 'function')
})