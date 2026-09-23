
let arr = ["b-e", "b-c", "c-d", "a-b", "e-f"];

function farthestNode(arr) {

    let graph = {};
    // Step 1: Build connections

    for (let items of arr) {
        let [a, b] = items.split("-");

        if (!graph[a]) {
            graph[a] = [];
        }
        if (!graph[b]) {
            graph[b] = [];
        }

        graph[a].push(b);
        graph[b].push(a);
    }

    console.log(graph);

    // Step 2: Find longest path
    let max = 0;
    function dfs(node, previous, count) {
        max = Math.max(max, count);

        for (let next of graph[node]) {
            console.log("next: " + next)
            if(next != previous){
                dfs(next,node,count+1);
            }
        }
    }

    // Step 3: Start from every node
    for (let node in graph) {
        dfs(node, null, 0);
    }

    return max;
}


console.log(farthestNode(arr));
