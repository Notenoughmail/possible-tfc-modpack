let partial_metal = ['copper', 'gold', 'silver', 'nickel']

let sheetmetals = ['copper', 'aluminum', 'lead', 'silver', 'nickel', 'constantan', 'electrum', 'steel', 'iron', 'gold', 'colored_white', 'colored_orange', 'colored_magenta', 'colored_light_blue', 'colored_yellow', 'colored_lime', 'colored_pink', 'colored_gray', 'colored_light_gray', 'colored_cyan', 'colored_purple', 'colored_blue', 'colored_brown', 'colored_green', 'colored_red', 'colored_black']

let planks = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir', 'hickory', 'kapok', 'maple', 'oak', 'palm', 'pine', 'rosewood', 'sequoia', 'spruce', 'sycamore', 'white_cedar', 'willow']

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let deco_metals = ['gold', 'brass', 'cast_iron', 'copper', 'zinc']

let powders = ['amethyst', 'diamond', 'emerald', 'lapis_lazuli', 'opal', 'pyrite', 'ruby', 'sapphire', 'topaz', 'graphite', 'kaolinite', 'sylvite', 'sulfur', 'saltpeter']

let coppers = ['native_copper', 'malachite', 'tetrahedrite']

let irons = ['hematite', 'magnetite', 'limonite']

let grains = ['barley', 'maize', 'oat', 'rye', 'rice', 'wheat']

let molds = ['plate', 'gear', 'rod', 'bullet_casing', 'wire', 'packing_4', 'packing_9', 'unpacking']

let sands = ['brown', 'white', 'black', 'red', 'yellow', 'green', 'pink']

let colors = ['black', 'red', 'green', 'brown', 'blue', 'purple', 'cyan', 'light_gray', 'gray', 'pink', 'lime', 'yellow', 'light_blue', 'magenta', 'orange', 'white']

let tfc_metals = ['bismuth', 'bismuth_bronze', 'black_bronze', 'bronze', 'brass', 'copper', 'gold', 'nickel', 'rose_gold', 'silver', 'tin', 'zinc', 'sterling_silver', 'cast_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel']

let ie_metals = ['aluminum', 'lead', 'silver', 'nickel', 'constantan', 'electrum', 'steel']

let ore_grades = ['normal', 'poor', 'rich']

// I'm not doing these individually for every recipe, I don't care enough about all the percents being the same to do that
let granite_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/granite' } }
let granite_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/granite' } }
let diorite_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/diorite' } }
let diorite_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/diorite' } }
let gabbro_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/gabbro' } }
let gabbro_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/gabbro' } }
let shale_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/shale' } }
let shale_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/shale' } }
let claystone_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/claystone' } }
let claystone_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/claystone' } }
let limestone_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/limestone' } }
let limestone_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/limestone' } }
let conglomerate_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/conglomerate' } }
let conglomerate_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/conglomerate' } }
let dolomite_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/dolomite' } }
let dolomite_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/dolomite' } }
let chert_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/chert' } }
let chert_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/chert' } }
let chalk_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/chalk' } }
let chalk_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/chalk' } }
let rhyolite_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/rhyolite' } }
let rhyolite_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/rhyolite' } }
let basalt_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/basalt' } }
let basalt_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/basalt' } }
let andesite_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/andesite' } }
let andesite_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/andesite' } }
let dacite_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/dacite' } }
let dacite_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/dacite' } }
let quartzite_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/quartzite' } }
let quartzite_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/quartzite' } }
let slate_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/slate' } }
let slate_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/slate' } }
let phyllite_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/phyllite' } }
let phyllite_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/phyllite' } }
let schist_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/schist' } }
let schist_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/schist' } }
let gneiss_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/gneiss' } }
let gneiss_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/gneiss' } }
let marble_loose = { chance: 0.13, output: { item: 'tfc:rock/loose/marble' } }
let marble_grav = { chance: 0.26, output: { item: 'tfc:rock/gravel/marble' } }