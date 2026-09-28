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
|                   |                    |         |
|                   |                    |         |
|                   |                    |         |
|                   |                    |         |
