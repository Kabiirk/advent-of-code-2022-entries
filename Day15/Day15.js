const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

function manhattan_distance(sensor, beacon){
    /*
    let 2 points be P1(x1, y1) & P2(x2, y2)
    then manhattan_distance(P1, P2) = |x1 - x2| + |y1 - y2|
    */
    return Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
}

function parse_input(input_strings){
    let pattern = /-?\d{1,10}/g;

    const sensor_layout = []
    let beacons_set = new Set();

    for(var input_string of input_strings){
        var pattern_matches = input_string.match(pattern).map(Number);
        sensor_layout.push( {
                                "sensor": [pattern_matches[0], pattern_matches[1]],
                                "beacon": [pattern_matches[2], pattern_matches[3]],
                            } )

        beacons_set.add(`${pattern_matches[2]},${pattern_matches[3]}`);
    }

    return [sensor_layout, beacons_set];
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

function calc_tuning_freq(sensor_layout){
    b = 0;
    var y = 4000000;
    for(let row=0; row<=y; row++){
        let ranges = [];
        for(s of sensor_layout){
            let radius = manhattan_distance(s["sensor"], s["beacon"]);
            let dist = Math.abs(s["sensor"][1] - row);
            if(dist <= radius){
                let min_x = Math.max(0, s["sensor"][0] - (radius - dist));
                let max_x = Math.min(y, s["sensor"][0] + (radius - dist));
                if(ranges.length === 0){
                    ranges.push([min_x, max_x]);
                }
                else{
                    let current_range = [min_x, max_x];
                    for(let i = ranges.length-1; i>=0; i--){
                        if(current_range[0] <= ranges[i][1] && ranges[i][0] <= current_range[1]){
                            current_range[0] = Math.min(current_range[0], ranges[i][0]);
                            current_range[1] = Math.max(current_range[1], ranges[i][1]);
                            ranges.splice(i, 1);
                        }
                    }
                    ranges.push(current_range);
                }
            }
            b++;
        }
        b = 0;
        if(!( ranges[0][0]===0 && ranges[0][1] === y )){
            let result = (ranges[1][1]+1)*4000000 + row;
            return result;
        }
    }

    return 0;
}

var [sensor_list, beacons] = parse_input(input);

// Part 1
var no_beacon_position = coverage_calculator(sensor_list, beacons);
console.log(no_beacon_position);// 4876693

// Part 2
var tuning_freq = calc_tuning_freq(sensor_list);
console.log(tuning_freq);// 11645454855041