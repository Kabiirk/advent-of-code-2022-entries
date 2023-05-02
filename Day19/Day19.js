// const fs = require('fs');
// const path = require('path');

// var pattern = /Blueprint (?<blueprint_no>-?\d+): Each (?<robot_1>-?\w+) robot costs (?<robot_1_ore_cost>-?\d+) ore. Each (?<robot_2>-?\w+) robot costs (?<robot_2_ore_cost>-?\d+) ore. Each (?<robot_3>-?\w+) robot costs (?<robot_3_ore_cost>-?\d+) ore and (?<robot_3_clay_cost>-?\d+) clay. Each (?<robot_4>-?\w+) robot costs (?<robot_4_ore_cost>-?\d+) ore and (?<robot_4_obsidian_cost>-?\d+) obsidian./;
// const input = fs
//     .readFileSync(path.join(__dirname, 'test.txt'), 'utf8')
//     .toString()
//     .trim()
//     .split('\n').map(
//         (x) => x.match(pattern).groups
//     );

// // console.log(input);

// var state = {
//     "ore" : 0,
//     "ore_robots" : 1,
//     "clay" : 0,
//     "clay_robots" : 0,
//     "obsidian" : 0,
//     "obsidian_robots" : 0,
//     "geode_robots" : 0,
//     "geode" : 0,
//     "time":0,
// }

// function geode_count(minutes, blueprint){
//     var ore = 0;
//     var ore_robots = 1;
//     var clay = 0;
//     var clay_robots = 0;
//     var obsidian = 0;
//     var obsidian_robots = 0;
//     var geode = 0;
//     var geode_robots = 0;

//     for(var i = 1; i<minutes; i++){
//         ore+= ore_robots;
//         // Increase resource count as per number of robots
//         clay += clay_robots;
//         obsidian += obsidian_robots;
//         geode += geode_robots;

//         // Check Ore Count
//         if(ore >= blueprint.robot_2_ore_cost && clay_robots<3){
//             clay_robots++;
//             ore -= blueprint.robot_2_ore_cost;
//         }
//         // Check Clay Count
//         if(ore >= blueprint.robot_3_ore_cost && clay >= blueprint.robot_3_clay_cost){
//             obsidian_robots++;
//             ore -= blueprint.robot_3_ore_cost;
//             clay -= blueprint.robot_3_clay_cost;
//         }
//         // Check Obsidian Count
//         if(ore >= blueprint.robot_4_ore_cost && obsidian >= blueprint.robot_4_obsidian_cost){
//             geode_robots++;
//             ore -= blueprint.robot_4_ore_cost;
//             obsidian -= blueprint.robot_3_obsidian_cost;
//         }
//         console.log("=============",
//                         "minute:",i, "=============","\n",
//                         "Ore:", ore," ",
//                         "Ore_robot:", ore_robots,"\n",
//                         "clay:", clay," ",
//                         "clay_robot:", clay_robots,"\n",
//                         "Obsid:", obsidian," ",
//                         "Obsid_robot:", obsidian_robots,"\n",
//                         "Geode:", geode," ",
//                         "Geode_robot:", geode_robots,"\n",
//                         "=============");
//     }


//     return geode
// }

// // console.log(input[0])
// console.log(geode_count(24, input[0]));

// var string = 0;


// Attempt 2

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const readInterface: readline.Interface = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'input.txt')),
});

interface Blueprint {
  id: number;
  ore: State;
  clay: State;
  obsi: State;
  cracker: State;
}

interface State {
  ore: number;
  clay: number;
  obsi: number;
  crack: number;
}

// Put your code here
const onReadLine = (() => {
  // Result-relevant temporary states and functions
  const blueprints: Blueprint[] = [];
  return {
    // Callback function handling one line of the input file at a time
    stepper: (line: string) => {
      const splitLine = line
        .replace(/:/g, '')
        .split(' ')
        .map((val) => parseInt(val));
      blueprints.push({
        id: splitLine[1],
        ore: {
          ore: -splitLine[6],
          clay: 0,
          obsi: 0,
          crack: 0,
        },
        clay: {
          ore: -splitLine[12],
          clay: 0,
          obsi: 0,
          crack: 0,
        },
        obsi: {
          ore: -splitLine[18],
          clay: -splitLine[21],
          obsi: 0,
          crack: 0,
        },
        cracker: {
          ore: -splitLine[27],
          clay: 0,
          obsi: -splitLine[30],
          crack: 0,
        },
      });
    },
    // Finalizer callback function, creating one result based on the collected line information and temporary states
    result: () => {
      function mergeStates(state1: State, state2: State) {
        state1.ore += state2.ore;
        state1.clay += state2.clay;
        state1.obsi += state2.obsi;
        state1.crack += state2.crack;
      }

      function greedy(blueprint: Blueprint): number {
        const resources: State = {
          ore: 0,
          clay: 0,
          obsi: 0,
          crack: 0,
        };
        const bots: State = {
          ore: 1,
          clay: 0,
          obsi: 0,
          crack: 0,
        };
        for (let i = 0; i < 24; i++) {
          const toBuild: State = {
            ore: 0,
            clay: 0,
            obsi: 0,
            crack: 0,
          };
          if (
            -blueprint.cracker.ore <= resources.ore &&
            -blueprint.cracker.obsi <= resources.obsi
          ) {
            toBuild.crack += 1;
            mergeStates(resources, blueprint.cracker);
          } else if (
            -blueprint.obsi.ore <= resources.ore &&
            -blueprint.obsi.clay <= resources.clay
          ) {
            toBuild.obsi += 1;
            mergeStates(resources, blueprint.obsi);
          } else if (-blueprint.clay.ore <= resources.ore && Math.random() > 0.5) {
            toBuild.clay += 1;
            mergeStates(resources, blueprint.clay);
          } else if (-blueprint.ore.ore <= resources.ore && Math.random() > 0.5) {
            toBuild.ore += 1;
            mergeStates(resources, blueprint.ore);
          }
          mergeStates(resources, bots);
          mergeStates(bots, toBuild);
        }
        return resources.crack;
      }
      return blueprints
        .map((blueprint) => {
          let current = 0;
          for (let i = 0; i < 100000; i++) {
            const temp = greedy(blueprint);
            if (temp > current) {
              current = temp;
            }
          }
          return current * blueprint.id;
        })
        .reduce((acc, val) => acc + val, 0);
    },
  };
})();

readInterface.on('line', onReadLine.stepper);
readInterface.on('close', () => console.log(onReadLine.result()));


