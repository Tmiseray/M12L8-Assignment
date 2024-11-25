import heapq

class Graph:
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex):
        if vertex not in self.vertices:
            self.vertices[vertex] = {}

    def add_edge(self, source, destination, weight):
        if source in self.vertices and destination in self.vertices:
            self.vertices[source][destination] = weight
            self.vertices[destination][source] = weight  # For undirected graph

    def get_neighbors(self, vertex):
        if vertex in self.vertices:
            return self.vertices[vertex]
        else:
            return {}

    def get_shortest_path(self, start):
        distances = {vertex: float('inf') for vertex in self.vertices}
        distances[start] = 0
        pq = [(0, start)]

        while pq:
            current_distance, current_vertex = heapq.heappop(pq)
            if current_distance > distances[current_vertex]:
                continue
            for neighbor, weight in self.vertices[current_vertex].items():
                distance = current_distance + weight
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    heapq.heappush(pq, (distance, neighbor))

        return distances


graph = Graph()

graph.add_vertex('A')
graph.add_vertex('B')
graph.add_vertex('C')

graph.add_edge('A', 'B', 5)
graph.add_edge('B', 'C', 3)
graph.add_edge('A', 'C', 10)

print(graph.vertices)

distances = graph.get_shortest_path('A')
print('Shortest distances from "A":', distances)


"""

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

"""