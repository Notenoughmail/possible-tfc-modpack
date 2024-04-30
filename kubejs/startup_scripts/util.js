// priority 10

const Integer = Java.loadClass('java.lang.Integer');
const Float = Java.loadClass('java.lang.Float');

global.oreGrades = ['normal', 'poor', 'rich'];

global.gradedOres = ['lead', 'lithium', 'titanium', 'molybdenum'];

global.ungradedOres = ['bauxite', 'lithium'];

global.allOres = [];
global.gradedOres.forEach(ore => {
    global.allOres.push(ore);
});
global.ungradedOres.forEach(ore => {
    global.allOres.push(ore);
});

global.tfcMetals = ['bismuth', 'bismuth_bronze', 'black_bronze', 'bronze', 'brass', 'copper', 'gold', 'nickel', 'rose_gold', 'silver', 'tin', 'zinc', 'sterling_silver', 'cast_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel'];