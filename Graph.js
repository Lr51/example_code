/*
* Алгоритм Дейкстры.
* Набросал по-быстрому для примера кода.
* */

var Graph = function(vertices, edges, weight){

    this.vertices = vertices;
    this.edges = edges;
    this.weight = weight;

    this.viewed = [];
    this.dist = {0:0};

    this.init = function(start, target)
    {
        this.dijkstra(start, target);
    };

    this.dijkstra = function(start, target)
    {
        var i = 0;
        while(this.vertices.length != this.viewed.length)   //пока только для связанного графа
        {
            //while()
            var edges = this.getEdge(i);
            console.log(edges, i);
            if (edges === false)
            {
                this.viewed.push(i);
                i = this.viewed[this.viewed.length - 2];
                edges = this.getEdge(i);
            }


            while(edges.length > 0)
            {
                var edge = edges.shift();
                if(!(this.dist[edge[1]] in  this.dist))
                {
                    this.dist[edge[1]] = this.weight[edge[0]][edge[1]] + this.dist[i];
                }
                else if((this.dist[edge[1]] > this.weight[edge[0]][edge[1]] + this.dist[i]))
                {
                    this.dist[edge[1]] = this.weight[edge[0]][edge[1]] + this.dist[i];
                }
                console.log(edge, "edge");
            }
            this.viewed.push(i);
            console.log(this.viewed);
            var vertex = this.findNearVertex(i);
            if(vertex === false)
                break;
            i = vertex;
            console.log(vertex, "vertex next");
}
    };

    this.getEdge = function(vertex)
    {
        var edges = [];
        for(edge in this.edges)
        {
            if((this.edges[edge][0] == vertex) && (this.viewed.indexOf(this.edges[edge][1]) < 0))
            {
                edges.push(this.edges[edge]);
            }
        }
        if(edges.length > 0)
            return edges;
        else
            return false;
    };

    this.findNearVertex = function(vertex)
    {
        var edges = this.getEdge(vertex);
        if(edges === false)
            return false;
        var minVertexWeight = edges[0];
        for(edge in edges)
        {
            if(this.weight[edges[edge][0]][edges[edge][1]] < this.weight[minVertexWeight[0]][minVertexWeight[1]])
            {
                minVertexWeight = edges[edge];
            }
        }
        console.log(minVertexWeight);
        return minVertexWeight[1];
    };

};
