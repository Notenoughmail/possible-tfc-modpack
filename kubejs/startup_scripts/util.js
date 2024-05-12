// priority 10

const Integer = Java.loadClass('java.lang.Integer');
const Float = Java.loadClass('java.lang.Float');

global.oreGrades = ['normal', 'poor', 'rich'];

global.gradedOres = [];

global.ungradedOres = [];

global.allOres = [];
global.gradedOres.forEach(ore => {
    global.allOres.push(ore);
});
global.ungradedOres.forEach(ore => {
    global.allOres.push(ore);
});

global.metals = [{
    name: 'bismuth',
    mod: 'tfc',
    tools: false,
    sh: 0.02143,
    mt: 270,
    tier: 1
}, {
    name: 'bismuth_bronze',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 985,
    tier: 2
}, {
    name: 'black_bronze',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 1070,
    tier: 2
}, {
    name: 'bronze',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 950,
    tier: 2
}, {
    name: 'brass',
    mod: 'tfc',
    tools: false,
    sh: 0.00857,
    mt: 930,
    tier: 2
}, {
    name: 'copper',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 1080,
    tier: 1
}, {
    name: 'gold',
    mod: 'tfc',
    tools: false,
    sh: 0.005,
    mt: 1060,
    tier: 1
}, {
    name: 'nickel',
    mod: 'tfc',
    tools: false,
    sh: 0.00625,
    mt: 1453,
    tier: 1
}, {
    name: 'rose_gold',
    mod: 'tfc',
    tools: false,
    sh: 0.00857,
    mt: 960,
    tier: 1
}, {
    name: 'silver',
    mod: 'tfc',
    tools: false,
    sh: 0.00625,
    mt: 961,
    tier: 1
}, {
    name: 'tin',
    mod: 'tfc',
    tools: false,
    sh: 0.02143,
    mt: 230,
    tier: 1
}, {
    name: 'zinc',
    mod: 'tfc',
    tools: false,
    sh: 0.01429,
    mt: 420,
    tier: 1
}, {
    name: 'sterling_silver',
    mod: 'tfc',
    tools: false,
    sh: 0.00857,
    mt: 950,
    tier: 1
}, {
    name: 'wrought_iron',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 1535,
    tier: 3
}, {
    name: 'cast_iron',
    mod: 'tfc',
    tools: false,
    sh: 0.00857,
    mt: 1535,
    tier: 1
}, {
    name: 'steel',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 1540,
    tier: 4
}, {
    name: 'black_steel',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 1485,
    tier: 5
}, {
    name: 'blue_steel',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 1540,
    tier: 6
}, {
    name: 'red_steel',
    mod: 'tfc',
    tools: true,
    sh: 0.00857,
    mt: 1540,
    tier: 6
}, {
    name: 'chromium',
    mod: 'firmalife',
    tools: false,
    sh: 0.00696,
    mt: 1907,
    tier: 4
}, {
    name: 'stainless_steel',
    mod: 'firmalife',
    tools: false,
    sh: 0.00758,
    mt: 1540,
    tier: 4
}];

global.colors = ['black', 'red', 'green', 'brown', 'blue', 'purple', 'cyan', 'light_gray', 'gray', 'pink', 'lime', 'yellow', 'light_blue', 'magenta', 'orange', 'white'];