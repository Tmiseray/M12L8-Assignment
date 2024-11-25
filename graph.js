import FastPriorityQueue from "fastpriorityqueue";

class Graph {
    constructor() {
        this.vertices = {};
    }

    addVertex(vertex) {
        if (!(vertex in this.vertices)) {
            this.vertices[vertex] = {};
        }
    }

    addEdge(source, destination, weight) {
        if (!(source in this.vertices)) this.addVertex(source);
        if (!(destination in this.vertices)) this.addVertex(destination);

        this.vertices[source][destination] = weight;
        this.vertices[destination][source] = weight;
    }

    getNeighbors(vertex) {
        if (vertex in this.vertices) {
            return this.vertices[vertex];
        } else {
            return {};
        }
    }

    getShortestDistance(start) {
        const distances = {};
        for (let vertex in this.vertices) {
            distances[vertex] = Infinity;
        }
        distances[start] = 0;

        const pq = new FastPriorityQueue((a, b) => a[0] < b[0]);
        pq.add([0, start]);

        while (pq.size > 0) {
            const [currentDistance, currentVertex] = pq.poll();
            if (currentDistance > distances[currentVertex]) {
                continue;
            }
            for (let neighbor in this.vertices[currentVertex]) {
                const weight = this.vertices[currentVertex][neighbor];
                const distance = currentDistance + weight;

                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    pq.add([distance, neighbor]);
                }
            }
        }
        return distances;
    }
}


const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');

graph.addEdge('A', 'B', 5);
graph.addEdge('B', 'C', 3);
graph.addEdge('A', 'C', 10);

console.log(graph.vertices);

const distances = graph.getShortestDistance('A');
console.log('Distances from "A":', distances);


/*

Time Complexity:
    O((V + E) log V)
    Where:
        - V is the number of vertices (nodes)
        - E is the number of edges (connections between nodes)

Space Complexity:
    O(V + E)
    Where:
        - V is the number of vertices (nodes)
        - E is the number of edges (connections between nodes)

Special Considerations:
    Dense Graph: O(E)
    Sparse Graph: O(V log V)

*/