const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n').map((row) => row.split('\n'));

const compare = (a, b) => {
    if(Array.isArray(a) && !Array.isArray(b)){
        b = [b];
    }
    if(!Array.isArray(a) && Array.isArray(b)){
        a = [a];
    }

    if(!Array.isArray(a) && !Array.isArray(a)){
        if(a<b){
            return 1;
        }
        if(a === b){
            return 0;
        }
        return -1;
    }

    // Iterate until either left or right is greater
    if(Array.isArray(a) && Array.isArray(a)){
        let i = 0;
        while(i < a.length && b.length){
            const res = compare(a[i], b[i]);
            if(res === 1 || res === -1){
                return res;
            }
            i++;
        }

        if(i === a.length ){
            if(a.length === b.length){
                return 0;
            }
            return 1;
        }

        return -1;
    }
}

function indice_pair(parts){
    var result = [];

    for(let i = 0; i<parts.length; i++){
        const a = eval(parts[i][0]);
        const b = eval(parts[i][1]);

        if(compare(a,b) === 1)[
            result.push(i+1)
        ]
    }

    return result.reduce((a, b) => a + b, 0);
}

function flatten(packets_2D){
    var packets_1D = [];

    for(var packet_pair of packets_2D){
        for(var packet of packet_pair){
            packets_1D.push( eval(packet) )
        }
    }

    return packets_1D;
}

function get_decoder_key(packets_1D){
    var result = 1;
    var sorted_packets = packets_1D.sort( (a, b) => compare(a, b)).reverse();

    for(var i = 0; i<sorted_packets.length; i++){
        var packet = sorted_packets[i];
        if(packet.length === 1 && packet[0].length === 1 && packet[0][0] === 2){
            result *= i+1;
        }
        if(packet.length === 1 && packet[0].length === 1 && packet[0][0] === 6){
            result *= i+1;
        }
    }
    return result;
}

// Part 1
var correct_indice_sum = indice_pair(input);
console.log(correct_indice_sum);// 5806

// Part 2
var flat_packets = flatten(input);
// Push decoder keys
flat_packets.push([[2]]);
flat_packets.push([[6]]);

var decoder_key = get_decoder_key(flat_packets);
console.log(decoder_key);// 23600
