# Test Report

<!--
    Commit this file to the root of your GitHub repository, alongside your module's code.
    It is required regardless of how you tested your module — even if your tests live in a
    test application or use a testing framework, summarize them here.
-->

## Summary
I tested the module using automated tests with Node.js's built-in `node:test`
test runner and `node:assert/strict` for assertions. The tests can be run with
`npm test`. I chose automated testing because it makes it easy to repeat the
same tests after making changes to the module and check that existing
functionality still works.

The module's classes are tested with both valid and invalid inputs. More complex
routing functionality is tested using networks with different connections and
costs.

The hardest part to test was the routing functionality because there can be
multiple valid routes between the same nodes. In particular,
`findShortestRoute()` needed a network where the first route found was not the
cheapest route. I tested this by creating two possible routes from A to D:
A-B-D with a total cost of 12 and A-C-D with a total cost of 7. The test checks
that the shortest-route algorithm returns A-C-D.


## Test Results

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------- |
|`Node` can be created with a valid string ID. | Automated unit test: created `new Node('A')` and checked that `node.id` equals `'A'`. | ✅ Passed.|
| `Node` rejects a non-string ID. | Automated unit test: attempted to create `new Node(123)` and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Node` rejects an empty string ID. | Automated unit test: attempted to create `new Node('')` and checked that an error was thrown. | ✅ Passed. |
| `Node` rejects an ID containing only whitespace. | Automated unit test: attempted to create a Node with a whitespace-only ID and checked that an error was thrown. | ✅ Passed. |
| `Connection` can be created with two valid `Node` instances and a valid cost. | Automated unit test: created two nodes and a connection with cost `10`, then checked its `startNode`, `endNode`, and `cost`. | ✅ Passed. |
| `Connection` rejects a start node that is not a `Node` instance. | Automated unit test: passed a string as the start node and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Connection` rejects an end node that is not a `Node` instance. | Automated unit test: passed a string as the end node and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Connection` rejects a connection from a node to itself. | Automated unit test: passed the same `Node` instance as both the start and end node and checked that an error was thrown. | ✅ Passed. |
| `Connection` rejects a cost that is not a number. | Automated unit test: passed the string `'10'` as the cost and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Connection` rejects `NaN` as a cost. | Automated unit test: passed `NaN` as the cost and checked that a `TypeError` was thrown. | ❌ The original validation only checked whether the cost was negative, so `NaN` was accepted. Added `Number.isNaN(cost)` to the validation. The test now passes. |
| `Connection` rejects a negative cost. | Automated unit test: passed `-5` as the cost and checked that an error was thrown. | ✅ Passed. |
| `Connection` accepts zero as a valid cost. | Automated unit test: created a connection with cost `0` and checked that its cost was stored correctly. | ✅ Passed. |
| `Network` can add a valid `Node`. | Automated unit test: added a `Node` with ID `'A'` and checked with `hasNode('A')` that it exists in the network. | ✅ Passed. |
| `Network` rejects adding something that is not a `Node`. | Automated unit test: attempted to add a string instead of a `Node` instance and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Network` rejects duplicate node IDs. | Automated unit test: added two different `Node` instances with the same ID and checked that an error was thrown. | ✅ Passed. |
| `Network.getNode()` returns an existing node. | Automated unit test: added a node and checked that `getNode('A')` returned the same `Node` instance. | ✅ Passed. |
| `Network.getNode()` rejects an ID that does not exist. | Automated unit test: requested a node that had not been added and checked that an error was thrown. | ✅ Passed. |
| `Network` connects two existing nodes. | Automated unit test: connected nodes A and B with cost `10`, then checked that the connection existed and had the expected cost. | ✅ Passed. |
| Connections are accessible from both connected nodes. | Automated unit test: connected A and B and checked that `getConnections()` returned the connection for both A and B. | ✅ Passed. |
| `Network` rejects a duplicate connection. | Automated unit test: connected A to B and then attempted to create the same connection again, checking that an error was thrown. | ✅ Passed. |
| `Network` rejects a reversed duplicate connection. | Automated unit test: connected A to B and then attempted to connect B to A, checking that an error was thrown because connections are undirected. | ✅ Passed. |
| `Network.getConnections()` returns all connections for a node. | Automated unit test: connected A to both B and C and checked that `getConnections('A')` returned two connections. | ✅ Passed. |
| `Route` can be created with valid `Node` instances and a valid cost. | Automated unit test: created a route containing three nodes with cost `15` and checked that the nodes and cost were stored correctly. | ✅ Passed. |
| `Route` rejects nodes that are not provided as an array. | Automated unit test: passed a string instead of an array of nodes and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Route` rejects an empty nodes array. | Automated unit test: attempted to create a route with an empty array and checked that an error was thrown. | ✅ Passed. |
| `Route` rejects an array containing values that are not `Node` instances. | Automated unit test: passed an array containing a valid `Node` and a string and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Route` rejects a cost that is not a number. | Automated unit test: passed the string `'10'` as the route cost and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Route` rejects `NaN` as a cost. | Automated unit test: passed `NaN` as the route cost and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Route` rejects a negative cost. | Automated unit test: passed `-5` as the route cost and checked that an error was thrown. | ✅ Passed. |
| `Route` accepts zero as a valid cost. | Automated unit test: created a route containing one node with cost `0` and checked that the cost was stored correctly. | ✅ Passed. |
| `Route.numberOfStops` returns the number of nodes in the route. | Automated unit test: created a route containing three nodes and checked that `numberOfStops` returned `3`. | ✅ Passed. |
| `Route.contains()` returns `true` for a node included in the route. | Automated unit test: created a route containing nodes A and B and checked that `contains(nodeB)` returned `true`. | ✅ Passed. |
| `Route.contains()` returns `false` for a node not included in the route. | Automated unit test: created a route containing A and B and checked that `contains(nodeC)` returned `false`. | ✅ Passed. |
| `Route.contains()` rejects a value that is not a `Node` instance. | Automated unit test: passed a string to `contains()` and checked that a `TypeError` was thrown. | ✅ Passed. |
| `Router.hasRoute()` returns `true` when a route exists. | Automated test: searched for a route from A to D in a connected network and checked that `true` was returned. | ✅ Passed. |
| `Router.hasRoute()` returns `true` when start and end are the same node. | Automated test: searched from A to A and checked that `true` was returned. | ✅ Passed. |
| `Router.hasRoute()` returns `false` when no route exists. | Automated test: searched from A to disconnected node E and checked that `false` was returned. | ✅ Passed. |
| `Router.hasRoute()` works in the reverse direction. | Automated test: searched from D to A in the undirected network and checked that a route was found. | ✅ Passed. |
| `Router.findRoute()` returns a valid route and its cost. | Automated test: searched from A to D and checked that the returned route was A-B-D with total cost `12`. | ✅ Passed. |
| `Router.findRoute()` works in the reverse direction. | Automated test: searched from D to A and checked that the returned route was D-B-A with total cost `12`. | ✅ Passed. |
| `Router.findRoute()` handles identical start and end nodes. | Automated test: searched from A to A and checked that the route contained only A with cost `0`. | ✅ Passed. |
| `Router.findRoute()` returns `null` when no route exists. | Automated test: searched from A to disconnected node E and checked that `null` was returned. | ✅ Passed. |
| `Router.routeCost()` returns the cost of a found route. | Automated test: calculated the route cost from A to D and checked that `12` was returned. | ✅ Passed. |
| `Router.routeCost()` returns `null` when no route exists. | Automated test: calculated the route cost from A to disconnected node E and checked that `null` was returned. | ✅ Passed. |
| `Router.routeCost()` returns zero when start and end are the same node. | Automated test: calculated the route cost from A to A and checked that `0` was returned. | ✅ Passed. |
| `Router.findShortestRoute()` chooses the route with the lowest total cost. | Automated test: compared the available routes from A to D and checked that A-C-D with total cost `7` was selected instead of A-B-D with cost `12`. | ✅ Passed. |
| `Router.findShortestRoute()` works in the reverse direction. | Automated test: searched from D to A and checked that D-C-A with total cost `7` was returned. | ✅ Passed. |
| `Router.findShortestRoute()` compares alternative weighted routes correctly. | Automated test: searched from C to B and checked that C-A-B with cost `9` was selected instead of C-D-B with cost `10`. | ✅ Passed. |
| `Router.findShortestRoute()` handles identical start and end nodes. | Automated test: searched from A to A and checked that a one-node route with cost `0` was returned. | ✅ Passed. |
| `Router.findShortestRoute()` returns `null` when no route exists. | Automated test: searched from A to disconnected node E and checked that `null` was returned. | ✅ Passed. |
| `Router` rejects a start node ID that does not exist. | Automated test: attempted to find the shortest route starting from nonexistent node X and checked that an error was thrown. | ✅ Passed. |
| `Router` rejects an end node ID that does not exist. | Automated test: attempted to find the shortest route to nonexistent node X and checked that an error was thrown. | ✅ Passed. |
|                   |                    |         |

