# Route Planner

Route Planner is a JavaScript module for creating weighted networks and finding
routes between connected nodes.

The module can be used for different types of networks, such as delivery routes,
transport networks, or game maps. Connections have a cost that can represent,
for example, distance, time, or another numeric value.

## USP

Route Planner provides a lightweight way to create and search weighted,
undirected networks without external dependencies.

It supports both finding a valid route between two nodes and finding the route
with the lowest total cost.

## What the module does

The module can:

- Create nodes in a network.
- Connect nodes with weighted connections.
- Check whether a route exists between two nodes.
- Find a valid route between two nodes.
- Calculate the cost of a found route.
- Find the route with the lowest total cost.
- Represent found routes with their nodes and total cost.

## What the module does not do

The module does not:

- Provide a graphical user interface.
- Use maps or geographical coordinates.
- Communicate with external routing or map services.
- Store networks in a database.
- Calculate real-world travel distances automatically.
- Support directed connections. Connections are currently undirected.

## Installation

The module requires Node.js and uses ES modules.

Install the package with npm:

```bash
npm install network-route-planner
```

## Usage

Import the classes needed from the module:

```js
import { Node, Network, Router } from 'network-route-planner'
```

Create a network and add nodes:

```js
const network = new Network()

network.addNode(new Node('A'))
network.addNode(new Node('B'))
network.addNode(new Node('C'))
network.addNode(new Node('D'))
```

Connect the nodes and assign a cost to each connection:

```js
network.connect('A', 'B', 5)
network.connect('A', 'C', 4)
network.connect('B', 'D', 7)
network.connect('C', 'D', 3)
```

Create a router for the network:

```js
const router = new Router(network)
```

### Check if a route exists

Use `hasRoute()` to check whether two nodes are connected:

```js
const exists = router.hasRoute('A', 'D')

console.log(exists)
// true
```

### Find a route

Use `findRoute()` to find a valid route between two nodes:

```js
const route = router.findRoute('A', 'D')

console.log(route.nodes.map(node => node.id))
// ['A', 'B', 'D']

console.log(route.cost)
// 12
```

`findRoute()` finds a valid route, but it does not guarantee that the
returned route has the lowest total cost.

If no route exists, the method returns `null`.

### Find the route with the lowest cost

Use `findShortestRoute()` to find the route with the lowest total
connection cost:

```js
const shortestRoute = router.findShortestRoute('A', 'D')

console.log(shortestRoute.nodes.map(node => node.id))
// ['A', 'C', 'D']

console.log(shortestRoute.cost)
// 7
```

In this example there are two possible routes from A to D:

- A → B → D has a total cost of `12`.
- A → C → D has a total cost of `7`.

Therefore, `findShortestRoute()` returns A → C → D.

If no route exists, the method returns `null`.

### Get the cost of a route

Use `routeCost()` to get the total cost of a route:

```js
const cost = router.routeCost('A', 'D')

console.log(cost)
// 12
```

## API Overview

### Node

Represents a node in the network.

```js
const node = new Node('A')
```

Each node must have a non-empty string ID.

### Connection

Represents a weighted connection between two nodes.

Connections are created through the `Network.connect()` method. Connections
are undirected, meaning that a connection from A to B can also be used to
travel from B to A.

### Network

Stores and manages the nodes and connections.

Main methods:

- `addNode(node)` - Adds a node to the network.
- `hasNode(id)` - Checks whether a node exists.
- `getNode(id)` - Returns a node by its ID.
- `connect(startId, endId, cost)` - Creates a weighted connection between two nodes.
- `getConnections(id)` - Returns the connections associated with a node.

### Router

Searches for routes in a `Network`.

Main methods:

- `hasRoute(startId, endId)` - Checks whether a route exists.
- `findRoute(startId, endId)` - Finds a valid route.
- `findShortestRoute(startId, endId)` - Finds the route with the lowest total cost.
- `routeCost(startId, endId)` - Returns the cost of a found route.

### Route

Represents a route returned by the router.

A route provides:

- `nodes` - The nodes included in the route.
- `cost` - The total cost of the route.
- `numberOfStops` - The number of nodes in the route.
- `contains(node)` - Checks whether a specific node is part of the route.

## Testing

The module uses Node.js's built-in test runner and `node:assert/strict`.

Run the automated tests with:

```bash
npm test
```

The tests cover the module's main classes and routing functionality, including
input validation, disconnected nodes, route finding, and lowest-cost route
selection.

A summary of the performed tests and their results is available in
[`TEST_REPORT.md`](TEST_REPORT.md).

## Dependencies

Route Planner has no external runtime dependencies.

## License

This project is licensed under the MIT License. See the
[`LICENSE`](LICENSE) file for details.