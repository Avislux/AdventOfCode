const fs = require('node:fs');

function canBeMadeFromSubstrings(string, substrings) {
    const substrSet = new Set(substrings);
    const n = string.length;

    //  Build a graph
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < n; i++) {
        for (let sub of substrSet) {
            if (string.startsWith(sub, i)) {
                const end = i + sub.length;
                if (end <= n) {
                    graph[i].push(end); 
                }
            }
        }
    }

    // Traverse the graph (DFS)
    const visited = Array(n + 1).fill(false);

    function dfs(node) {
        if (node === n) {
            return true; // Reached the end of the string
        }
        if (visited[node]) {
            return false; // Already visited this node
        }

        visited[node] = true;

        for (const neighbor of graph[node]) {
            if (dfs(neighbor)) {
                return true; // Found a path to the end
            }
        }

        return false;
    }

    return dfs(0); // Start DFS from node 0
}
function countWaysToFormString(string, substrings) {
    const substrSet = new Set(substrings);
    const n = string.length;

    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < n; i++) {
        for (let sub of substrSet) {
            if (string.startsWith(sub, i)) {
                const end = i + sub.length;
                if (end <= n) {
                    graph[i].push(end);
                }
            }
        }
    }

    // Traverse the graph (DFS) to count paths
    const memo = Array(n + 1).fill(-1); // Memoization to avoid redundant calculations

    function dfs(node) {
        if (node === n) {
            return 1; // Reached the end of the string, count as 1 way
        }
        if (memo[node] !== -1) {
            return memo[node]; // Return previously computed result
        }

        let ways = 0;
        for (const neighbor of graph[node]) {
            ways += dfs(neighbor); // Add all ways from this neighbor
        }

        memo[node] = ways; // Store result in memo
        return ways;
    }

    return dfs(0); // Start DFS from node 0
}

try {
    const data = fs.readFileSync('inputs/day19.txt', 'utf8');

    let lines = data.split("\r\n")
    let substrings = lines.shift().split(", ");
    substrings.sort();
    console.log(substrings);
    
    let regexPart = substrings.join('|');
    let pattern = "^(?:" + regexPart +")*?$";
    // console.log(pattern);

   
    let re = new RegExp(pattern, "g");
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
        let string = lines[i];
        if  ( string.length === 0 ){
            continue;
        }
        console.log(string);
        // let result = canBeMadeFromSubstrings(string, substrings)
        let result = countWaysToFormString(string, substrings)
        if (result){
            count+= result;
        }
     
    }
    console.log(count);
} catch (err) {
    console.error(err);
}
//part 1 255 too low
//256 too low
// 313 correct
// part 2 666491493769758 correct