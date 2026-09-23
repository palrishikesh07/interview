//Given numCourses and prerequisites (where [a, b] means take course b before a), return a valid order to complete all courses. If multiple valid orders exist, return any. If a cycle makes it impossible, return an empty array [].
/**
 * Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.

So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].

numCourses = 2 prerequisites = [[1,0],[0,1]]
return []
 * 
 */
//

// 0,1,2,3
// [0,1],[1,0]
// 0,1,2,3
// 

const arr = [[1,0],[2,0],[3,1],[3,2]];
const N = 4;



function findOrder(prerequisites, numCourses) {
    const indegree = new Array(numCourses).fill(0);
    console.log(indegree);

    // Count prerequisites for each course
    for (const [course, prerequisite] of prerequisites) {
        console.log(course +', '+prerequisite);
        indegree[course]++;
    }
    console.log(indegree);

}


console.log(findOrder(arr,N));

// function completeCourses(arr){
//   const alreadyCompleted = [];

//   const startingCoures={}

//   for(let [ coureB] of arr){
//     startingCoures[coureB] = startingCoures[coureB] + 1 || 1;
//   }
//   for(let [coureA, coureB] of arr){
//      if(startingCoures[coureB] > 1){
            
//      }
//   }

//   console.log("startingCoures: ",startingCoures);

// }

// completeCourses(arr);

