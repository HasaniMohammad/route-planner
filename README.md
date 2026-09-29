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