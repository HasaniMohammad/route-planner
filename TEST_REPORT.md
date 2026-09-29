# Test Report

<!--
    Commit this file to the root of your GitHub repository, alongside your module's code.
    It is required regardless of how you tested your module — even if your tests live in a
    test application or use a testing framework, summarize them here.
-->

## Summary

*Briefly describe how you tested your module, and why you chose that approach — clearly enough
that someone else could carry out the same tests. What was hardest to test, and why?*

*If you used a testing framework, you may link to its generated report or include screenshots of
the test run here.*

Answer:
 I tested the module using automated tests with Node.js's built-in `node:test`
test runner and `node:assert/strict` for assertions. The tests can be run with
`npm test`. I chose automated testing because it makes it easy to repeat the
same tests after making changes to the module and check that existing
functionality still works.

The module's classes are tested with both valid and invalid inputs. More complex
routing functionality is tested using networks with different connections and
costs.


## Test Results

**Example** (shows what a filled-in row can look like — remove this example table before
submitting):

| What was tested                                                        | How it was tested                                                                                                       | Result                                                                       |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `Jpeg.load(path)` returns a `Picture` instance for a valid image file. | Automated unit test (Vitest): loaded `test-image.jpg` and checked that the return value had `getHeight()`/`getWidth()` methods. | ✅ Passed.                                                                    |
| `Picture.getPixelAt(x, y)` with coordinates outside the image.         | Manual test via the Test-App's interface: entered a coordinate pair larger than the image's width/height and observed the output. | ❌ Didn't throw an error initially — fixed, now throws a clear exception. |

**Your test results:**

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
|                   |                    |         |

