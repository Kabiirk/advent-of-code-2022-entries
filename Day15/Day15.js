const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

function parse_input(input_strings){
    let pattern = /-?\d{1,10}/g;

    const sensor_layout = []
    let beacons_set = new Set();

    for(var input_string of input_strings){
        var pattern_matches = input_string.match(pattern).map(Number);
        sensor_layout.push( {
                                "sensor": [pattern_matches[0], pattern_matches[1]],
                                "beacon": [pattern_matches[2], pattern_matches[3]]
                            } )

        beacons_set.add(`${pattern_matches[2]},${pattern_matches[3]}`);
    }

    return [sensor_layout, beacons_set];
}

function manhattan_distance(sensor, beacon){
    /*
    let 2 points be P1(x1, y1) & P2(x2, y2)
    then manhattan_distance(P1, P2) = |x1 - x2| + |y1 - y2|
    */
    return Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
}

function coverage_calculator(sensor_layout, beacons_set){
    var y = 2000000;
    var not_beacon = new Set();
    for(s of sensor_layout){
        var radius = manhattan_distance(s["sensor"], s["beacon"]);
        var dist = Math.abs(s["sensor"][1] - y);
        if(dist <= radius){
            for (let i = s["sensor"][0] - (radius - dist); i <= s["sensor"][0] + (radius - dist); i++) {
                if (!beacons_set.has(`${i},${y}`)){
                    not_beacon.add(`${i},${y}`);
                }
            }
        }
    }

    return not_beacon.size;
}

var [sensor_list, beacons] = parse_input(input);

// Part 1
var no_beacon_position = coverage_calculator(sensor_list, beacons);
console.log(no_beacon_position)// 4876693
