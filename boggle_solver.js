// Elijah Prentice @02874763

/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

function fromStartingPoint(grid,j,k,visited,word) {
  
  if (j < 0 || k < 0 || j >= grid.length || k >= grid[0].length) {
    return false;
  }
  
  if (visited[j][k] == true) {
    return false;
  }
  
  if (word[0] == grid[j][k][0]) {
    
    //console.log(word[0]);
    
    if (word.length == 2 && (word[0] == 'Q' || word[0] == 'S')) {
      return true
    }
    
    if (word.length == 1) {
      return true;
    }

    //console.log(word);
    
    visited[j][k] = true;
    
    /*
     * check for:
     * [j-1 k+1] [j k+1] [j+1 k+1]
     * [j-1 k]   [j k]   [j+1 k]
     * [j-1 k-1] [j k-1] [j+1 k-1]
     * 
     * */
    
    let new_word = '';
    if (word[0] == 'Q' || word[0] == 'S') {
      new_word = word.slice(2);
    } else {
      new_word = word.slice(1);
    }
    
    if (fromStartingPoint(grid,j-1,k+1,visited,new_word)
       || fromStartingPoint(grid,j,k+1,visited,new_word)
       || fromStartingPoint(grid,j+1,k+1,visited,new_word)
       || fromStartingPoint(grid,j-1,k,visited,new_word)
       || fromStartingPoint(grid,j,k,visited,new_word)
       || fromStartingPoint(grid,j+1,k,visited,new_word)
       || fromStartingPoint(grid,j-1,k-1,visited,new_word)
       || fromStartingPoint(grid,j,k-1,visited,new_word)
       || fromStartingPoint(grid,j+1,k-1,visited,new_word)
       ) {
        visited[j][k] = false;
        return true;
    }
    
    visited[j][k] = false;
    return false;
  }
  
  return false;
}

function findOneSolution(grid,w,visited) {
  
  if (w.length < 3) {
    return false;
  }
  
  let row = grid.length;
  let col = grid[0].length;
  
  let word = w.toUpperCase();
  
  for (let j = 0; j < row; j++) {
    for (let k = 0; k < col; k++) {
      
      if (grid[j][k][0] == word[0]) {
        
        if (fromStartingPoint(grid,j,k,visited,word) == true) {
          return true;
        }
      }
    } 
  }
  
  return false;
}

exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];
  
  if (grid == null || dictionary == null) {
    return solutions;
  }
  
  if ((grid.length != grid[0].length) || (grid.length < 2)) {
    return solutions;
  }
  
  //console.log(grid);
  var visited = [];
  for (let a = 0; a < grid.length; a++) {
    
    visited.push([]);
    for (let b = 0; b < grid.length; b++) {
      
      if (grid[a][b] == 'Q' || grid[a][b] == 'S') {
        return solutions;
      }
      
      visited[0].push(false);
    }
  }
  
  for (let i = 0; i < dictionary.length; i++) {
    
    //console.log(dictionary[i]);
    let is_solution = findOneSolution(grid,dictionary[i],visited);
    if (is_solution) {
      solutions.push(dictionary[i]);
    }
  }
  
  return solutions;
}


var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));
