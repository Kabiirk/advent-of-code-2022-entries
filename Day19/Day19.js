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

const fs = require("fs");
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')

console.log(input)

const blueprints = {};
for (const line of input) {
  const parts = line.split(" ");
  const blueprintid = parseInt(parts[1].replace(":", ""));
  const oreCost = parseInt(parts[6]);
  const clayCost = parseInt(parts[12]);
  const obsidianCostOre = parseInt(parts[18]);
  const obsidianCostClay = parseInt(parts[21]);
  const geodeCostOre = parseInt(parts[27]);
  const geodeCostObsidian = parseInt(parts[30]);
  blueprints[blueprintid] = {
    oreCost,
    clayCost,
    obsidianCostOre,
    obsidianCostClay,
    geodeCostOre,
    geodeCostObsidian,
  };
}

class Factory {
  blueprint = {};
  constructor(blueprint) {
    this.blueprint = blueprint;
    this.ore = 0;
    this.clay = 0;
    this.obsidian = 0;
    this.geode = 0;

    this.oreRobots = 1;
    this.clayRobots = 0;
    this.obsidianRobots = 0;
    this.geodeRobots = 0;
    this.minute = 0;
  }

  collect() {
    this.minute++;
    this.ore += this.oreRobots;
    this.clay += this.clayRobots;
    this.obsidian += this.obsidianRobots;
    this.geode += this.geodeRobots;
    return this;
  }
  canBuildOrerobot() {
    return this.ore >= this.blueprint.oreCost;
  }

  canBuildClayrobot() {
    return this.ore >= this.blueprint.clayCost;
  }

  canBuildObsidianrobot() {
    return (
      this.ore >= this.blueprint.obsidianCostOre &&
      this.clay >= this.blueprint.obsidianCostClay
    );
  }

  canBuildGeoderobot() {
    return (
      this.ore >= this.blueprint.geodeCostOre &&
      this.obsidian >= this.blueprint.geodeCostObsidian
    );
  }

  buildOrerobot() {
    this.ore -= this.blueprint.oreCost;
    this.oreRobots++;

    this.ore--;

    return this;
  }

  buildClayrobot() {
    this.ore -= this.blueprint.clayCost;
    this.clayRobots++;

    this.clay--;

    return this;
  }

  buildObsidianrobot() {
    this.ore -= this.blueprint.obsidianCostOre;
    this.clay -= this.blueprint.obsidianCostClay;
    this.obsidianRobots++;

    this.obsidian--;
    return this;
  }

  buildGeoderobot() {
    this.ore -= this.blueprint.geodeCostOre;
    this.obsidian -= this.blueprint.geodeCostObsidian;
    this.geodeRobots++;

    this.geode--;

    return this;
  }

  clone() {
    const factory = new Factory(this.blueprint);
    factory.ore = this.ore;
    factory.clay = this.clay;
    factory.obsidian = this.obsidian;
    factory.geode = this.geode;
    factory.oreRobots = this.oreRobots;
    factory.clayRobots = this.clayRobots;
    factory.obsidianRobots = this.obsidianRobots;
    factory.geodeRobots = this.geodeRobots;
    factory.minute = this.minute;
    return factory;
  }
}

function getFitness(factory) {
  const { geode } = factory;
  const { oreRobots, clayRobots, obsidianRobots, geodeRobots } = factory;
  const minute = factory.minute;
  const remaining = 24 - minute;

  //figure out how much future geode production we can get
  const futureGeodes = geode + remaining * geodeRobots;

  //compile that into a score
  return (
    futureGeodes * 10000000 +
    obsidianRobots * 10000 +
    clayRobots * 100 +
    oreRobots
  );
}

function process(blueprint) {
  let currentGen = [new Factory(blueprint)];
  let nextGen = [];
  let processed = 0;

  for (let gen = 0; gen < 24; gen++) {
    //process current gen
    for (const factory of currentGen) {
      processed++;

      /* Branching */

      //build geode robots
      if (factory.canBuildGeoderobot()) {
        nextGen.push(factory.clone().buildGeoderobot().collect());
      }
      //build obsidian robots
      if (factory.canBuildObsidianrobot()) {
        nextGen.push(factory.clone().buildObsidianrobot().collect());
      }

      //build clay robots
      if (factory.canBuildClayrobot()) {
        nextGen.push(factory.clone().buildClayrobot().collect());
      }

      //build ore robots
      if (factory.canBuildOrerobot()) {
        nextGen.push(factory.clone().buildOrerobot().collect());
      }

      //don't build any robots
      nextGen.push(factory.clone().collect());
    }

    //prune next gen
    const fitnessValues = nextGen.map((factory) => getFitness(factory));

    //sort by fitness
    currentGen = nextGen
      .map((factory, i) => ({ factory, fitness: fitnessValues[i] }))
      .sort((a, b) => b.fitness - a.fitness)
      .map((a) => a.factory)
      .slice(0, 20000);
    nextGen = [];
  }

  //sort by geodes
  const bestFactory = currentGen.sort((a, b) => {
    return b.geode - a.geode;
  })[0];

  return bestFactory.geode;
}

// // Part 1
// let score = 0;
// for (let i = 1; i <= input.length; i++) {
//   const geodes = process(blueprints[i]);
//   // console.log(`Case #${i}: ${geodes}`);
//   score += geodes * i;
// }
// console.log(score);

// // Part 2
// let product = 1;
// for (let i = 1; i <= 3; i++) {
//   const geodes = process(blueprints[i]);
//   // console.log(`Case #${i}: ${geodes}`);
//   product *= geodes;
// }
// console.log(product);
