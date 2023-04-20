const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n').map(
        (x) => x.split(',').map(
            (t) => Number(t)+1
            )
    );

// console.log(input)

function is_adjacent(cube_1, cube_2){
    var x_abs = Math.abs(cube_1[0]-cube_2[0])===1;
    var y_abs = Math.abs(cube_1[1]-cube_2[1])===1;
    var z_abs = Math.abs(cube_1[2]-cube_2[2])===1;

    return x_abs || y_abs || z_abs
}

// console.log(is_adjacent([1,1,1], [2,1,1]));

var input_2=`2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

function parse(input) {
    return input.split("\n").map((l) => l.split(",").map((t) => Number(t) + 1));
  }

// coords = parse(input_2);
// console.log(coords);

function gInit(row, col, value){
    var res_array = [];
    for(var i = 0; i<row; i++){
        var row_array = []
        for (let j = 0; j<col; j++) {
            row_array.push(value);
        }
        res_array.push(row_array);
    }
    return res_array;
}

function extents(coords) {
    return [
      Math.max(...coords.map((c) => c[0])),
      Math.max(...coords.map((c) => c[1])),
      Math.max(...coords.map((c) => c[2]))
    ];
  }

  function toVolume(coords, space = 0) {
    const [xMax, yMax, zMax] = extents(coords);
    const vol = Array(xMax + 2)
      .fill(0)
      .map((x) => gInit(yMax + 2, zMax + 2, space));
  
    coords.forEach(([x, y, z]) => (vol[x][y][z] = 1));
    return vol;
  }

function neighbours([x, y, z], vol) {
    return [
      vol[x + 1] === undefined ? [] : [x + 1, y, z],
      vol[x - 1] === undefined ? [] : [x - 1, y, z],
      vol[x][y - 1] === undefined ? [] : [x, y - 1, z],
      vol[x][y + 1] === undefined ? [] : [x, y + 1, z],
      vol[x][y][z - 1] === undefined ? [] : [x, y, z - 1],
      vol[x][y][z + 1] === undefined ? [] : [x, y, z + 1]
    ].filter((c) => c.length > 0);
  }

function surfaceArea(coords, vol) {
    return coords.reduce(
      (area, p) =>
        area +
        6 -
        neighbours(p, vol).filter(([x, y, z]) => vol[x][y][z] === 1).length,
      0
    );
  }

console.log(surfaceArea(input, toVolume(input)));// 3500

function outerVolume(coords) {
    const vol = toVolume(coords); // Voume of scanned lava
    const outerVol = toVolume(coords, 1); // Solid cube
    const toStr = ([x, y, z]) => x + "," + y + "," + z;
  
    // Breadth-first search of all empty voxels
    const [todo, visited] = [[[0, 0, 0]], new Set()];
    while (todo.length > 0) {
      const [x, y, z] = todo.shift();
      const pStr = toStr([x, y, z]);
      if (!visited.has(pStr)) {
        visited.add(pStr);
        if (vol[x][y][z] === 0) {
          outerVol[x][y][z] = 0; // Empty this voxel in the solid cube
          neighbours([x, y, z], vol).forEach(([nx, ny, nz]) => {
            if (!visited.has(toStr([nx, ny, nz]))) {
              todo.push([nx, ny, nz]);
            }
          });
        }
      }
    }
    return outerVol;
  }

console.log(surfaceArea(input, outerVolume(input)));// 2048