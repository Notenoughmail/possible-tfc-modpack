// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = false
settings.logSkippedRecipes = true
settings.logErroringRecipes = true

console.info('Welcome to my personal hell!')

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let powders = ['amethyst', 'diamond', 'emerald', 'lapis_lazuli', 'opal', 'pyrite', 'ruby', 'sapphire', 'topaz', 'graphite', 'kaolinite', 'sylvite', 'sulfur', 'saltpeter']

let coppers = ['native_copper', 'malachite', 'tetrahedrite']

let irons = ['hematite', 'magnetite', 'limonite']

let grains = ['barley', 'maize', 'oat', 'rye', 'rice', 'wheat']

let molds = ['plate', 'gear', 'rod', 'bullet_casing', 'wire', 'packing_4', 'packing_9', 'unpacking']

let sands = ['brown', 'white', 'black', 'red', 'yellow', 'green', 'pink']

let colors = ['black', 'red', 'green', 'brown', 'blue', 'purple', 'cyan', 'light_gray', 'gray', 'pink', 'lime', 'yellow', 'light_blue', 'magenta', 'orange', 'white']

let sheetmetals = ['copper', 'aluminum', 'lead', 'silver', 'nickel', 'uranium', 'constantan', 'electrum', 'steel', 'iron', 'gold', 'colored_white', 'colored_orange', 'colored_magenta', 'colored_light_blue', 'colored_yellow', 'colored_lime', 'colored_pink', 'colored_gray', 'colored_light_gray', 'colored_cyan', 'colored_purple', 'colored_blue', 'colored_brown', 'colored_green', 'colored_red', 'colored_black']

let planks = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir', 'hickory', 'kapok', 'maple', 'oak', 'palm', 'pine', 'rosewood', 'sequoia', 'spruce', 'sycamore', 'white_cedar', 'willow']

let tfc_metals = ['bismuth', 'bismuth_bronze', 'black_bronze', 'bronze', 'brass', 'copper', 'gold', 'nickel', 'rose_gold', 'silver', 'tin', 'zinc', 'sterling_silver', 'cast_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel']

let ie_metals = ['aluminum', 'lead', 'silver', 'nickel', 'uranium', 'constantan', 'electrum', 'steel']

onEvent('recipes', e => {
	let ie_bottler_simple_mold = (type, metal, mold, amount) => {
		e.custom({
			'type': 'immersiveengineering:bottling_machine',
			'results': [
			{
				'item': 'tfc:metal/' + type + '/' + metal
			},
			{
				'item': mold
			}
			],
			'input': {
				'item': mold
			},
			'fluid': {
				'tag': 'tfc:' + metal,
				'amount': amount
			}
		}).id('kubejs:bottling/' + type + '_' + metal);
	}
	let ie_bottler_bucket = (metal) => {
		e.custom({
			'type': 'immersiveengineering:bottling_machine',
			'results': [
			{
				'item': 'tfc:bucket/metal/' + metal
			}
			],
			'input': {
				'item': 'minecraft:bucket'
			},
			'fluid': {
				'tag': 'tfc:' + metal,
				'amount': 1000
			}
		}).id('immersiveengineering:jei_bucket_metal/' + metal);//this exists purely to fix IE grabbing a random tag from a fluid for filling buckets as removing the recipes does not seem to work
	}
	let ie_bottler_mold = (output, mold, fluid_tag, amount, id) => {
		e.custom({
			'type': 'immersiveengineering:bottling_machine',
			'results': [
			{
				'item': output
			},
			{
				'item': mold
			}
			],
			'input': {
				'item': mold
			},
			'fluid': {
				'tag': fluid_tag,
				'amount': amount
			}
		}).id('kubejs:bottling/' + id);
	}
	stones.forEach(rock => {
		e.recipes.createMilling(['1x tfc:rock/gravel/' + rock], 'tfc:rock/cobble/' + rock).id('kubejs:milling/' + rock);
		e.recipes.immersiveengineeringCrusher('1x tfc:rock/gravel/' + rock, 'tfc:rock/cobble/' + rock).id('kubejs:crushing/' + rock);
		e.recipes.tfcCollapse('kubejs:ore/normal_lead/' + rock, 'kubejs:ore/rich_lead/' + rock);
		e.recipes.tfcCollapse('kubejs:ore/poor_lead/' + rock, 'kubejs:ore/normal_lead/' + rock);
		e.recipes.tfcCollapse('tfc:rock/cobble/' + rock, 'kubejs:ore/poor_lead/' + rock);
	});
	powders.forEach(powder => {
		e.recipes.createCrushing(['4x tfc:powder/' + powder, Item.of('tfc:powder/' + powder).withChance(0.35)], 'tfc:ore/' + powder).id('kubejs:crushing/' + powder)
	});
	coppers.forEach(copper => {
		e.recipes.createCrushing([
		Item.of('immersiveengineering:dust_copper').withChance(0.7)
		], 'tfc:ore/rich_' + copper).id('kubejs:crushing/rich_copper_dust_' + copper);
		e.recipes.createCrushing([
		Item.of('immersiveengineering:dust_copper').withChance(0.5)
		], 'tfc:ore/normal_' + copper).id('kubejs:crushing/normal_copper_dust_' + copper);
		e.recipes.createCrushing([
		Item.of('immersiveengineering:dust_copper').withChance(0.3)
		], 'tfc:ore/poor_' + copper).id('kubejs:crushing/poor_copper_dust_' + copper);
		e.recipes.createCrushing([
		Item.of('immersiveengineering:dust_copper').withChance(0.2)
		], 'tfc:ore/small_' + copper).id('kubejs:crushing/small_copper_dust_' + copper);
	})
	irons.forEach(iron => {
		e.recipes.createCrushing([
		Item.of('immersiveengineering:dust_iron').withChance(0.7)
		], 'tfc:ore/rich_' + iron).id('kubejs:crushing/rich_iron_dust_' + iron);
		e.recipes.createCrushing([
		Item.of('immersiveengineering:dust_iron').withChance(0.5)
		], 'tfc:ore/normal_' + iron).id('kubejs:crushing/normal_iron_dust_' + iron);
		e.recipes.createCrushing([
		Item.of('immersiveengineering:dust_iron').withChance(0.3)
		], 'tfc:ore/poor_' + iron).id('kubejs:crushing/poor_iron_dust_' + iron);
		e.recipes.createCrushing([
		Item.of('immersiveengineering:dust_iron').withChance(0.2)
		], 'tfc:ore/small_' + iron).id('kubejs:crushing/small_iron_dust_' + iron);
	})
	grains.forEach(grain => {
		e.recipes.createMilling(['1x tfc:food/' + grain + '_flour'], 'tfc:food/' + grain + '_grain').id('kubejs:milling/' + grain);
	});
	planks.forEach(plank => {
		e.recipes.createCutting('1x tfc:wood/stripped_log/' + plank, 'tfc:wood/log/' + plank).processingTime(150).id('kubejs:cutting/' + plank + '_stripping');
		e.recipes.immersiveengineeringSawmill('1x tfc:wood/stripped_log/' + plank, 'tfc:wood/log/' + plank).id('kubejs:sawmill/' + plank + '_stripping');
		e.recipes.createCutting('8x tfc:wood/lumber/' + plank, 'tfc:wood/stripped_log/' + plank).processingTime(350).id('kubejs:cutting/' + plank + '_lumber');
		e.recipes.immersiveengineeringSawmill('8x tfc:wood/lumber/' + plank, 'tfc:wood/stripped_log/' + plank).id('kubejs:sawmill/' + plank + '_lumber');
	});
	colors.forEach(color => {
		e.recipes.tfcBarrelSealed('immersiveengineering:sheetmetal_colored_' + color, ['#forge:sheetmetal/colorless', Fluid.of('tfc:' + color + '_dye', 125)], 1000).id('kubejs:sealed_barrel/' + color + '_sheetmetal');
		e.recipes.createSplashing(['minecraft:' + color + '_concrete_powder'], 'minecraft:' + color + '_concrete').id('create:splashing/' + color + '_concrete_powder');
	});
	sheetmetals.forEach(sheetmetal => {
		e.recipes.tfcChisel('immersiveengineering:slab_sheetmetal_' + sheetmetal, 'immersiveengineering:sheetmetal_' + sheetmetal, 'slab').extraDrop('immersiveengineering:slab_sheetmetal_' + sheetmetal).id('kubejs:chisel/slab/sheetmetal_' + sheetmetal);
	});
	sands.forEach(sand => {
		e.recipes.immersiveengineeringCrusher('2x tfc:sand/' + sand, 'tfc:raw_sandstone/' + sand/*, [{chance:0.5, output: 'immersiveengineering:dust_saltpeter'}]*/).id('kubejs:crusher/' + sand)
	});//I don't know why the secondaries won't work, but they won't
	tfc_metals.forEach(metal => {
		ie_bottler_simple_mold('sheet', metal, 'immersiveengineering:mold_plate', 200)
		ie_bottler_simple_mold('rod', metal, 'immersiveengineering:mold_rod', 50)
		ie_bottler_bucket(metal)//this only fixes half of them for some reason but I'll keep it
		ie_bottler_simple_mold('ingot', metal, 'kubejs:mold/ingot', 100)
		ie_bottler_simple_mold('double_ingot', metal, 'kubejs:mold/double_ingot', 200)
		ie_bottler_simple_mold('double_sheet', metal, 'kubejs:mold/double_sheet', 400)
	});
	ie_metals.forEach(metal => {
		e.recipes.tfcChisel('immersiveengineering:slab_storage_' + metal, 'immersiveengineering:storage_' + metal, 'slab').extraDrop('immersiveengineering:slab_storage_' + metal).id('kubejs:chisel/slab/' + metal);
	});
	
	let mold_blueprint = (result, id) => {
		e.custom({
			'type': 'immersiveengineering:blueprint',
			'inputs': [
			{
				'item': 'tfc:metal/double_sheet/black_steel'
			},
			{
				'item': 'immersiveengineering:wirecutter'
			}
			],
			'category': 'molds',
			'result': {
				'item': result
			}
		}).id('kubejs:blueprint/mold_' + id)
	}
	molds.forEach(mold => {
		mold_blueprint('immersiveengineering:mold_' + mold, mold)
	})
	mold_blueprint('kubejs:mold/ingot', 'ingot')
	mold_blueprint('kubejs:mold/double_ingot', 'double_ingot')
	mold_blueprint('kubejs:mold/double_sheet', 'double_sheet')
	
	e.recipes.createCrushing([
	'1x tfc:sand/white'
	], 'tfc:rock/gravel/marble').id('kubejs:crushing/sand_white_from_marble');
	e.recipes.createCrushing([
	'1x tfc:sand/white'
	], 'tfc:rock/gravel/chalk').id('kubejs:crushing/sand_white_from_chalk');
	e.recipes.createCrushing([
	'1x tfc:sand/brown'
	], 'tfc:rock/gravel/conglomerate').id('kubejs:crushing/sand_brown_from_conglomerate');
	e.recipes.createCrushing([
	'1x tfc:sand/black'
	], 'tfc:rock/gravel/basalt').id('kubejs:crushing/sand_black_from_basalt');
	e.recipes.createCrushing([
	'1x tfc:sand/red'
	], 'tfc:rock/gravel/chert').id('kubejs:crushing/sand_red_from_chert');
	e.recipes.createCrushing([
	'1x tfc:sand/yellow'
	], 'tfc:rock/gravel/limestone').id('kubejs:crushing/sand_yellow_from_limestone');
	e.recipes.createCrushing([
	'1x tfc:sand/green'
	], 'tfc:rock/gravel/schist').id('kubejs:crushing/sand_green_from_schist');
	e.recipes.createCrushing([
	'4x tfc:powder/salt',
	Item.of('tfc:powder/salt').withChance(0.15)
	], 'tfc:ore/halite').id('kubejs:crushing/halite');
	e.recipes.createCrushing([
	'1x tfc:ore/gypsum',
	Item.of('tfc:ore/gypsum').withChance(0.05)
	], 'tfc:rock/raw/limestone').id('kubejs:crushing/raw_limestone');
	e.recipes.createCrushing([
	'8x minecraft:redstone',
	Item.of('3x minecraft:redstone').withChance(0.1)
	], 'tfc:ore/cryolite').id('kubejs:crushing/cryolite');
	e.recipes.createCrushing([
	'4x tfc:powder/charcoal',
	Item.of('tfc:powder/charcoal').withChance(0.35)
	], 'minecraft:charcoal').id('kubejs:crushing/charcoal');
	e.recipes.createCrushing([
	'6x tfc:powder/flux',
	Item.of('tfc:powder/flux').withChance(0.75)
	], 'tfc:ore/borax').id('kubejs:crushing/borax');
	e.recipes.createCrushing([
	'2x tfc:powder/flux',
	Item.of('tfc:powder/flux').withChance(0.65)
	], '#tfc:fluxstone').id('kubejs:crushing/fluxstone');
	e.recipes.createCrushing([
	'4x tfc:powder/coke',
	Item.of('tfc:powder/coke').withChance(0.2)
	], 'immersiveengineering:coal_coke').id('kubejs:crushing/coal_coke');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_gold').withChance(0.7)
	], 'tfc:ore/rich_native_gold').id('kubejs:crushing/rich_gold_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_gold').withChance(0.5)
	], 'tfc:ore/normal_native_gold').id('kubejs:crushing/normal_gold_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_gold').withChance(0.3)
	], 'tfc:ore/poor_native_gold').id('kubejs:crushing/poor_gold_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_gold').withChance(0.2)
	], 'tfc:ore/small_native_gold').id('kubejs:crushing/small_gold_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_nickel').withChance(0.7)
	], 'tfc:ore/rich_garnierite').id('kubejs:crushing/rich_nickel_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_nickel').withChance(0.5)
	], 'tfc:ore/normal_garnierite').id('kubejs:crushing/normal_nickel_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_nickel').withChance(0.3)
	], 'tfc:ore/poor_garnierite').id('kubejs:crushing/poor_nickel_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_nickel').withChance(0.2)
	], 'tfc:ore/small_garnierite').id('kubejs:crushing/small_nickel_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_silver').withChance(0.7)
	], 'tfc:ore/rich_native_silver').id('kubejs:crushing/rich_silver_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_silver').withChance(0.5)
	], 'tfc:ore/normal_native_silver').id('kubejs:crushing/normal_silver_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_silver').withChance(0.3)
	], 'tfc:ore/poor_native_silver').id('kubejs:crushing/poor_silver_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_silver').withChance(0.2)
	], 'tfc:ore/small_native_silver').id('kubejs:crushing/small_silver_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_lead').withChance(0.7)
	], 'kubejs:ore/rich_lead').id('kubejs:crushing/rich_lead_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_lead').withChance(0.5)
	], 'kubejs:ore/normal_lead').id('kubejs:crushing/normal_lead_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_lead').withChance(0.3)
	], 'kubejs:ore/poor_lead').id('kubejs:crushing/poor_lead_dust');
	e.recipes.createCrushing([
	Item.of('immersiveengineering:dust_lead').withChance(0.2)
	], 'kubejs:ore/small_lead').id('kubejs:crushing/small_lead_dust');
	e.recipes.createCrushing([
	'8x minecraft:redstone',
	Item.of('3x minecraft:redstone').withChance(0.1)
	], 'tfc:ore/cinnabar').id('kubejs:crushing/cinnabar');
	
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/rhyolite').withChance(0.45),
	Item.of('tfc:ore/sulfur').withChance(0.0007)
	], 'tfc:rock/gravel/rhyolite').id('kubejs:washing/rhyolite');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/basalt').withChance(0.45),
	Item.of('tfc:ore/sulfur').withChance(0.0007)
	], 'tfc:rock/gravel/basalt').id('kubejs:washing/basalt');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/andesite').withChance(0.45),
	Item.of('tfc:ore/sulfur').withChance(0.0007)
	], 'tfc:rock/gravel/andesite').id('kubejs:washing/andesite');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/dacite').withChance(0.45),
	Item.of('tfc:ore/sulfur').withChance(0.0007)
	], 'tfc:rock/gravel/dacite').id('kubejs:washing/dacite');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/granite').withChance(0.45),
	Item.of('tfc:ore/cryolite').withChance(0.001),
	Item.of('tfc:ore/cinnabar').withChance(0.0008),
	Item.of('tfc:ore/sulfur').withChance(0.0003),
	Item.of('tfc:ore/topaz').withChance(0.0003),
	Item.of('tfc:ore/emerald').withChance(0.00002)
	], 'tfc:rock/gravel/granite').id('kubejs:washing/granite');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/diorite').withChance(0.45),
	Item.of('tfc:ore/cinnabar').withChance(0.0008),
	Item.of('tfc:ore/sulfur').withChance(0.0003),
	Item.of('tfc:ore/emerald').withChance(0.00002)
	], 'tfc:rock/gravel/diorite').id('kubejs:washing/diorite');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/gabbro').withChance(0.45),
	Item.of('tfc:ore/cinnabar').withChance(0.0008),
	Item.of('tfc:ore/sulfur').withChance(0.0003),
	Item.of('tfc:ore/emerald').withChance(0.00002),
	Item.of('tfc:ore/diamond').withChance(0.00001)
	], 'tfc:rock/gravel/gabbro').id('kubejs:washing/gabbro');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/gneiss').withChance(0.45),
	Item.of('tfc:ore/graphite').withChance(0.001),
	Item.of('tfc:ore/gypsum').withChance(0.001)
	], 'tfc:rock/gravel/gneiss').id('kubejs:washing/gneiss');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/quartzite').withChance(0.45),
	Item.of('tfc:ore/graphite').withChance(0.001),
	Item.of('tfc:ore/gypsum').withChance(0.001),
	Item.of('tfc:ore/cinnabar').withChance(0.0008),
	Item.of('tfc:ore/opal').withChance(0.00005)
	], 'tfc:rock/gravel/quartzite').id('kubejs:washing/quartzite');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/slate').withChance(0.45),
	Item.of('tfc:ore/gypsum').withChance(0.001)
	], 'tfc:rock/gravel/slate').id('kubejs:washing/slate');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/phyllite').withChance(0.45),
	Item.of('tfc:ore/gypsum').withChance(0.001)
	], 'tfc:rock/gravel/phyllite').id('kubejs:washing/phyllite');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/schist').withChance(0.45),
	Item.of('tfc:ore/graphite').withChance(0.001),
	Item.of('tfc:ore/gypsum').withChance(0.001)
	], 'tfc:rock/gravel/schist').id('kubejs:washing/schist');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/marble').withChance(0.45),
	Item.of('tfc:ore/graphite').withChance(0.001),
	Item.of('tfc:ore/lapis_lazuli').withChance(0.001),
	Item.of('tfc:ore/gypsum').withChance(0.001)
	], 'tfc:rock/gravel/marble').id('kubejs:washing/marble');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/shale').withChance(0.45),
	Item.of('tfc:ore/kaolinite').withChance(0.001),
	Item.of('tfc:ore/saltpeter').withChance(0.001),
	Item.of('tfc:ore/sylvite').withChance(0.001),
	Item.of('tfc:ore/borax').withChance(0.001),
	Item.of('tfc:ore/cinnabar').withChance(0.0008),
	Item.of('tfc:ore/halite').withChance(0.0007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.0004),
	Item.of('tfc:ore/lignite').withChance(0.0002),
	Item.of('tfc:ore/ruby').withChance(0.00005)
	], 'tfc:rock/gravel/shale').id('kubejs:washing/shale');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/claystone').withChance(0.45),
	Item.of('tfc:ore/kaolinite').withChance(0.001),
	Item.of('tfc:ore/saltpeter').withChance(0.001),
	Item.of('tfc:ore/sylvite').withChance(0.001),
	Item.of('tfc:ore/borax').withChance(0.001),
	Item.of('tfc:ore/halite').withChance(0.0007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.0004),
	Item.of('tfc:ore/lignite').withChance(0.0002)
	], 'tfc:rock/gravel/claystone').id('kubejs:washing/claystone');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/limestone').withChance(0.45),
	Item.of('tfc:ore/kaolinite').withChance(0.001),
	Item.of('tfc:ore/saltpeter').withChance(0.001),
	Item.of('tfc:ore/borax').withChance(0.001),
	Item.of('tfc:ore/lapis_lazuli').withChance(0.001),
	Item.of('tfc:ore/halite').withChance(0.0007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.0004),
	Item.of('tfc:ore/lignite').withChance(0.0002),
	Item.of('tfc:ore/gypsum').withChance(0.0001),
	Item.of('tfc:ore/ruby').withChance(0.00005)
	], 'tfc:rock/gravel/limestone').id('kubejs:washing/limestone');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/conglomerate').withChance(0.45),
	Item.of('tfc:ore/kaolinite').withChance(0.001),
	Item.of('tfc:ore/saltpeter').withChance(0.001),
	Item.of('tfc:ore/halite').withChance(0.0007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.0004),
	Item.of('tfc:ore/lignite').withChance(0.0002)
	], 'tfc:rock/gravel/conglomerate').id('kubejs:washing/conglomerate');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/dolomite').withChance(0.45),
	Item.of('tfc:ore/kaolinite').withChance(0.001),
	Item.of('tfc:ore/saltpeter').withChance(0.001),
	Item.of('tfc:ore/halite').withChance(0.0007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.0004),
	Item.of('tfc:ore/lignite').withChance(0.0002)
	], 'tfc:rock/gravel/dolomite').id('kubejs:washing/dolomite');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/chert').withChance(0.45),
	Item.of('tfc:ore/kaolinite').withChance(0.001),
	Item.of('tfc:ore/saltpeter').withChance(0.001),
	Item.of('tfc:ore/sylvite').withChance(0.001),
	Item.of('tfc:ore/halite').withChance(0.0007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.0004),
	Item.of('tfc:ore/lignite').withChance(0.0002)
	], 'tfc:rock/gravel/chert').id('kubejs:washing/chert');
	e.recipes.createSplashing([
	Item.of('tfc:rock/loose/chalk').withChance(0.45),
	Item.of('tfc:ore/kaolinite').withChance(0.001),
	Item.of('tfc:ore/saltpeter').withChance(0.001),
	Item.of('tfc:ore/halite').withChance(0.0007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.0004),
	Item.of('tfc:ore/lignite').withChance(0.0002)
	], 'tfc:rock/gravel/chalk').id('kubejs:washing/chalk');
	e.recipes.createSplashing(['minecraft:white_wool'], '#tfc:colored_wool').id('create:splashing/wool');
	
	e.recipes.createPressing('create:crafter_slot_cover', 'tfc:metal/sheet/brass').id('kubejs:pressing/crafter_slot');
	
	e.recipes.createDeploying('4x create:attribute_filter', ['tfc:silk_cloth', 'tfc:metal/ingot/brass']).id('kubejs:deploying/attribute_filter');
	e.recipes.createDeploying('4x create:filter', ['tfc:silk_cloth', 'tfc:metal/ingot/wrought_iron']).id('kubejs:deploying/filter');
	e.recipes.createDeploying('create:blaze_burner', ['create:empty_blaze_burner', 'immersiveengineering:coal_coke']).id('kubejs:deploying/blaze_burner');
	
	e.recipes.createFilling('create:chocolate_glazed_berries', ['#tfc:foods/berries', Fluid.of('create:chocolate', 250)]).id('kubejs:filling/chocolate_berries');
	e.recipes.createFilling(Item.of('tfc:ceramic/jug', '{fluid:{Amount:100,FluidName:"minecraft:water"}}'), ['tfc:ceramic/jug', Fluid.of('minecraft:water', 100)]).id('kubejs:filling/jug_with_water');
	
	e.recipes.createMechanicalCrafting('create:potato_cannon', [
	'SSSAB',
	'   CC'
	], {
		S: 'create:fluid_pipe',
		A: 'create:precision_mechanism',
		B: 'create:andesite_alloy',
		C: 'tfc:metal/ingot/copper'
	}).id('kubejs:mechanical_crafting/potato_cannon');
	e.recipes.createMechanicalCrafting('2x immersiveengineering:light_engineering', [
	'SAS',
	'ABA',
	'SAS'
	], {
		S: 'tfc:metal/sheet/steel',
		A: 'immersiveengineering:component_iron',
		B: 'create:gearbox'
	}).id('kubejs:mechanical_crafting/light_engineering');
	e.recipes.createMechanicalCrafting('2x immersiveengineering:rs_engineering', [
	'SAS',
	'ABA',
	'SAS'
	], {
		S: 'tfc:metal/sheet/steel',
		A: 'immersiveengineering:insulating_glass',
		B: 'create:electron_tube'
	}).id('kubejs:mechanical_crafting/rs_engineering');
	e.recipes.createMechanicalCrafting('3x immersiveengineering:blastbrick_reinforced', [
	' SAS ',
	'SBBBS',
	' SAS '
	], {
		S: 'tfc:powder/coke',
		A: 'immersiveengineering:sheetmetal_steel',
		B: 'immersiveengineering:cokebrick'
	}).id('kubejs:mechanical_crafting/blastbrick');
	e.recipes.createMechanicalCrafting('1x createaddition:alternator', [
	' S ',
	'ABA',
	'ACA',
	'ADA'
	], {
		S: 'create:shaft',
		A: 'tfc:metal/sheet/wrought_iron',
		B: 'immersiveengineering:coil_lv',
		C: 'tfc:metal/rod/wrought_iron',
		D: 'immersiveengineering:wire_lead'
	}).id('kubejs:mechanical_crafting/alternator');
	e.recipes.createMechanicalCrafting('1x createaddition:electric_motor', [
	' S ',
	'ABA',
	'ACA',
	'ADA'
	], {
		S: 'create:shaft',
		A: 'tfc:metal/sheet/brass',
		B: 'immersiveengineering:coil_lv',
		C: 'immersiveengineering:wire_lead',
		D: 'tfc:metal/rod/wrought_iron'
	}).id('kubejs:mechanical_crafting/electric_motor');
	
	e.recipes.createItemApplication('create:andesite_casing', ['#minecraft:logs', 'create:andesite_alloy']).id('kubejs:item_application/andesite_casing');
	e.recipes.createItemApplication('create:brass_casing', ['#minecraft:logs', 'tfc:metal/ingot/brass']).id('kubejs:item_application/brass_casing');
	e.recipes.createItemApplication('create:copper_casing', ['#minecraft:logs', 'tfc:metal/ingot/copper']).id('kubejs:item_application/copper_casing');
	e.recipes.createItemApplication('create:mechanical_pump', ['create:fluid_pipe', 'create:cogwheel']).id('kubejs:item_application/mechanical_pump');
	e.recipes.createItemApplication('create:smart_fluid_pipe', ['create:fluid_pipe', 'create:electron_tube']).id('kubejs:item_application/smart_fluid_pipe');
	e.recipes.createItemApplication('create:fluid_valve', ['create:fluid_pipe', 'create:shaft']).id('kubejs:item_application/fluid_valve');
	
	e.recipes.createSequencedAssembly(['create:sturdy_sheet'], 'tfc:metal/sheet/steel', [
		e.recipes.createPressing('create:unprocessed_obsidian_sheet', 'create:unprocessed_obsidian_sheet'),
		e.recipes.createCutting('create:unprocessed_obsidian_sheet', 'create:unprocessed_obsidian_sheet').processingTime(100),
		e.recipes.createPressing('create:unprocessed_obsidian_sheet', 'create:unprocessed_obsidian_sheet')
	]).transitionalItem('create:unprocessed_obsidian_sheet').loops(1).id('kubejs:sequenced_assembly/sturdy_sheet');
	e.recipes.createSequencedAssembly(['16x create:track'], ['immersiveengineering:slab_concrete', 'immersiveengineering:slab_concrete_tile'], [
		e.recipes.createDeploying('create:incomplete_track', ['create:incomplete_track', 'tfc:metal/rod/steel']),
		e.recipes.createDeploying('create:incomplete_track', ['create:incomplete_track', 'tfc:metal/rod/steel']),
		e.recipes.createPressing('create:incomplete_track', 'create:incomplete_track')
	]).transitionalItem('create:incomplete_track').loops(1).id('kubejs:sequenced_assembly/track');
	e.recipes.createSequencedAssembly(['create:precision_mechanism'], 'tfc:brass_mechanisms', [
		e.recipes.createCutting('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism').processingTime(200),
		e.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:electron_tube']),
		e.recipes.createPressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism'),
		e.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:cogwheel']),
		e.recipes.createPressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism')
	]).transitionalItem('create:incomplete_precision_mechanism').loops(3).id('kubejs:sequenced_assembly/precision_mechanism');
	e.recipes.createSequencedAssembly(['immersiveengineering:component_iron'], 'tfc:metal/ingot/copper', [
		e.recipes.createDeploying('tfc:metal/ingot/copper', ['tfc:metal/ingot/copper', 'tfc:metal/sheet/wrought_iron'])
	]).transitionalItem('tfc:metal/ingot/copper').loops(4).id('kubejs:sequenced_assembly/iron_component');
	e.recipes.createSequencedAssembly(['immersiveengineering:component_steel'], 'tfc:metal/ingot/copper', [
		e.recipes.createDeploying('tfc:metal/ingot/copper', ['tfc:metal/ingot/copper', 'tfc:metal/sheet/steel'])
	]).transitionalItem('tfc:metal/ingot/copper').loops(4).id('kubejs:sequenced_assembly/steel_component');
	e.recipes.createSequencedAssembly(['immersiveengineering:heavy_engineering'], 'immersiveengineering:light_engineering', [
		e.recipes.createFilling('immersiveengineering:light_engineering', ['immersiveengineering:light_engineering', Fluid.of('tfc:metal/black_steel', 100)]),
		e.recipes.createDeploying('immersiveengineering:light_engineering', ['immersiveengineering:light_engineering', 'immersiveengineering:component_steel']),
		e.recipes.createPressing('immersiveengineering:light_engineering', 'immersiveengineering:light_engineering')
	]).transitionalItem('immersiveengineering:light_engineering').loops(4).id('kubejs:sequenced_assembly/heavy_engineering_block');
	e.recipes.createSequencedAssembly(['immersiveengineering:cokebrick'], 'tfc:fire_bricks', [
		e.recipes.createDeploying('tfc:fire_bricks', ['tfc:fire_bricks', 'minecraft:brick']),
		e.recipes.createDeploying('tfc:fire_bricks', ['tfc:fire_bricks', 'tfc:ore/bituminous_coal']),
		e.recipes.createFilling('tfc:fire_bricks', ['tfc:fire_bricks', Fluid.of('minecraft:water', 250)])
	]).transitionalItem('tfc:fire_bricks').loops(2).id('kubejs:sequenced_assembly/coke_bricks');
	e.recipes.createSequencedAssembly(['immersiveengineering:capacitor_mv'], 'kubejs:frame/capacitor_mv', [
		e.recipes.createFilling('kubejs:frame/capacitor_mv', ['kubejs:frame/capacitor_mv', Fluid.of('immersiveengineering:redstone_acid', 1000)]),
		e.recipes.createDeploying('kubejs:frame/capacitor_mv', ['kubejs:frame/capacitor_mv', 'tfc:metal/sheet/nickel']),
		e.recipes.createPressing('kubejs:frame/capacitor_mv', 'kubejs:frame/capacitor_mv')
	]).transitionalItem('kubejs:frame/capacitor_mv').loops(1).id('kubejs:sequenced_assembly/mv_capacitor');
	e.recipes.createSequencedAssembly(['immersiveengineering:capacitor_hv'], 'kubejs:frame/capacitor_hv', [
		e.recipes.createFilling('kubejs:frame/capacitor_hv', ['kubejs:frame/capacitor_hv', Fluid.of('immersiveengineering:redstone_acid', 1000)]),
		e.recipes.createFilling('kubejs:frame/capacitor_hv', ['kubejs:frame/capacitor_hv', Fluid.of('immersiveengineering:redstone_acid', 1000)]),
		e.recipes.createFilling('kubejs:frame/capacitor_hv', ['kubejs:frame/capacitor_hv', Fluid.of('immersiveengineering:redstone_acid', 500)]),
		e.recipes.createDeploying('kubejs:frame/capacitor_hv', ['kubejs:frame/capacitor_hv', 'tfc:metal/sheet/steel']),
		e.recipes.createPressing('kubejs:frame/capacitor_hv', 'kubejs:frame/capacitor_hv')
	]).transitionalItem('kubejs:frame/capacitor_hv').loops(1).id('kubejs:sequenced_assembly/hv_capacitor');
	e.recipes.createSequencedAssembly(['16x railways:track_dark_oak'], '#forge:treated_wood_slab', [
		e.recipes.createDeploying('railways:track_incomplete_dark_oak', ['railways:track_incomplete_dark_oak', 'tfc:metal/rod/steel']),
		e.recipes.createDeploying('railways:track_incomplete_dark_oak', ['railways:track_incomplete_dark_oak', 'tfc:metal/rod/steel']),
		e.recipes.createPressing('railways:track_incomplete_dark_oak', 'railways:track_incomplete_dark_oak')
	]).transitionalItem('railways:track_incomplete_dark_oak').loops(1).id('kubejs:sequenced_assembly/treated_planks_track'); // Unfortunately, SnR doesn't have the ability to make rails from all of TFC's woods, so just one is here as irl creosote stained wood ties
	
	e.recipes.createCutting('minecraft:stick', '#tfc:lumber').id('kubejs:cutting/stick');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_copper', 'minecraft:copper_block').id('kubejs:cutting/copper_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_lead', 'immersiveengineering:storage_lead').id('kubejs:cutting/lead_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_silver', 'immersiveengineering:storage_silver').id('kubejs:cutting/silver_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_nickel', 'immersiveengineering:storage_nickel').id('kubejs:cutting/nickel_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_constantan', 'immersiveengineering:storage_constantan').id('kubejs:cutting/constantan_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_electrum', 'immersiveengineering:storage_electrum').id('kubejs:cutting/electrum_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_steel', 'immersiveengineering:storage_steel').id('kubejs:cutting/steel_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_gold', 'minecraft:gold_block').id('kubejs:cutting/gold_sheetmetal');
	e.recipes.createCutting('6x create:shaft', 'create:andesite_alloy').id('create:cutting/andesite_alloy');
	
	e.recipes.tfcWelding('create:diving_helmet', ['tfc:metal/helmet/copper', '#forge:glass']).tier(2).id('kubejs:welding/diving_helmet');
	e.recipes.tfcWelding('6x create:fluid_pipe', ['tfc:metal/sheet/copper', 'tfc:metal/rod/copper']).tier(1).id('kubejs:welding/copper_fluid_pipe');
	e.recipes.tfcWelding('immersiveengineering:alloybrick', ['tfc:fire_bricks', 'tfc:metal/double_sheet/steel']).tier(4).id('kubejs:welding/alloy_bricks');
	e.recipes.tfcWelding('kubejs:metal/double_ingot/electrum', ['immersiveengineering:ingot_electrum', 'immersiveengineering:ingot_electrum']).tier(3).id('kubejs:welding/double_electrum_ingot');
	e.recipes.tfcWelding('kubejs:metal/double_ingot/constantan', ['immersiveengineering:ingot_constantan', 'immersiveengineering:ingot_constantan']).tier(2).id('kubejs:welding/double_constantan_ingot');
	e.recipes.tfcWelding('kubejs:metal/double_ingot/lead', ['immersiveengineering:ingot_lead', 'immersiveengineering:ingot_lead']).tier(1).id('kubejs:welding/double_lead_ingot');
	e.recipes.tfcWelding('create:diving_boots', ['tfc:metal/boots/copper', 'create:andesite_alloy']).tier(2).id('kubejs:welding/diving_boots');
	e.recipes.tfcWelding('6x immersiveengineering:fluid_pipe', ['firmalife:metal/sheet/stainless_steel', 'firmalife:metal/rod/stainless_steel']).tier(4).id('kubejs:welding/stainless_steel_fluid_pipe');
	
	e.recipes.tfcAnvil('3x create:brass_ladder', 'tfc:metal/rod/brass', ['draw_last', 'bend_second_last', 'draw_third_last']).tier(2).id('kubejs:anvil/brass_ladder');
	e.recipes.tfcAnvil('3x create:copper_ladder', 'tfc:metal/rod/copper', ['draw_last', 'bend_second_last', 'draw_third_last']).tier(1).id('kubejs:anvil/copper_ladder');
	e.recipes.tfcAnvil('immersiveengineering:plate_electrum', 'kubejs:metal/double_ingot/electrum', ['hit_any', 'hit_any', 'hit_any']).tier(3).id('kubejs:anvil/electrum_sheet');
	e.recipes.tfcAnvil('immersiveengineering:plate_constantan', 'kubejs:metal/double_ingot/constantan', ['hit_any', 'hit_any', 'hit_any']).tier(2).id('kubejs:anvil/constantan_sheet');
	e.recipes.tfcAnvil('immersiveengineering:plate_lead', 'kubejs:metal/double_ingot/lead', ['hit_any', 'hit_any', 'hit_any']).tier(1).id('kubejs:anvil/lead_sheet');
	e.recipes.tfcAnvil('2x immersiveposts:stick_electrum', 'immersiveengineering:ingot_electrum', ['bend_last', 'draw_not_last']).tier(3).id('kubejs:anvil/electrum_rod');
	e.recipes.tfcAnvil('2x immersiveposts:stick_constantan', 'immersiveengineering:ingot_constantan', ['bend_last', 'draw_not_last']).tier(2).id('kubejs:anvil/constantan_rod');
	e.recipes.tfcAnvil('2x immersiveposts:stick_lead', 'immersiveengineering:ingot_lead', ['bend_last', 'draw_not_last']).tier(1).id('kubejs:anvil/lead_rod');
	e.recipes.tfcAnvil('12x create:copper_nugget', 'tfc:metal/ingot/copper', ['punch_last', 'bend_not_last', 'draw_not_last']).tier(1).id('kubejs:anvil/copper_bullet');
	e.recipes.tfcAnvil('railways:conductor_whistle', 'tfc:metal/double_sheet/brass', ['bend_last', 'draw_not_last', 'hit_any']).tier(2).id('kubejs:anvil/whistle');
	e.recipes.tfcAnvil('tfc:metal/tuyere/bismuth_bronze', '#forge:double_sheets/bismuth_bronze', ['bend_last', 'bend_second_last']).applyBonus().tier(2).id('tfc:anvil/bismuth_bronze_tuyere');
	e.recipes.tfcAnvil('tfc:metal/tuyere/black_bronze', '#forge:double_sheets/black_bronze', ['bend_last', 'bend_second_last']).applyBonus().tier(2).id('tfc:anvil/black_bronze_tuyere');
	e.recipes.tfcAnvil('tfc:metal/tuyere/black_steel', '#forge:double_sheets/black_steel', ['bend_last', 'bend_second_last']).applyBonus().tier(5).id('tfc:anvil/black_steel_tuyere');
	e.recipes.tfcAnvil('tfc:metal/tuyere/blue_steel', '#forge:double_sheets/blue_steel', ['bend_last', 'bend_second_last']).applyBonus().tier(6).id('tfc:anvil/blue_steel_tuyere');
	e.recipes.tfcAnvil('tfc:metal/tuyere/bronze', '#forge:double_sheets/bronze', ['bend_last', 'bend_not_last']).applyBonus().tier(2).id('tfc:anvil/bronze_tuyere');
	e.recipes.tfcAnvil('tfc:metal/tuyere/copper', '#forge:double_sheets/copper', ['bend_last', 'bend_not_last']).applyBonus().tier(1).id('tfc:anvil/copper_tuyere');
	e.recipes.tfcAnvil('tfc:metal/tuyere/red_steel', '#forge:double_sheets/red_steel', ['bend_last', 'bend_not_last']).applyBonus().tier(6).id('tfc:anvil/red_steel_tuyere');
	e.recipes.tfcAnvil('tfc:metal/tuyere/steel', '#forge:double_sheets/steel', ['bend_last', 'bend_not_last']).applyBonus().tier(4).id('tfc:anvil/steel_tuyere');
	e.recipes.tfcAnvil('tfc:metal/tuyere/wrought_iron', '#forge:double_sheets/wrought_iron', ['bend_last', 'bend_not_last']).applyBonus().tier(3).id('tfc:anvil/wrought_iron_tuyere');
		
	e.recipes.tfcHeating(Fluid.of('kubejs:constantan', 100), 'immersiveengineering:ingot_constantan', 1266).id('kubejs:heating/constantan_ingot');
	e.recipes.tfcHeating(Fluid.of('kubejs:electrum', 100), 'immersiveengineering:ingot_electrum', 1010).id('kubejs:heating/electrum_ingot');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 100), 'immersiveengineering:ingot_lead', 327).id('kubejs:heating/lead_ingot');
	e.recipes.tfcHeating(Fluid.of('kubejs:constantan', 200), 'kubejs:metal/double_ingot/constantan', 1266).id('kubejs:heating/constantan_double_ingot');
	e.recipes.tfcHeating(Fluid.of('kubejs:electrum', 200), 'kubejs:metal/double_ingot/electrum', 1010).id('kubejs:heating/electrum_double_ingot');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 200), 'kubejs:metal/double_ingot/lead', 327).id('kubejs:heating/lead_double_ingot');
	e.recipes.tfcHeating(Fluid.of('kubejs:constantan', 200), 'immersiveengineering:plate_constantan', 1266).id('kubejs:heating/constantan_sheet');
	e.recipes.tfcHeating(Fluid.of('kubejs:electrum', 200), 'immersiveengineering:plate_electrum', 1010).id('kubejs:heating/electrum_sheet');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 200), 'immersiveengineering:plate_lead', 327).id('kubejs:heating/lead_plate');
	e.recipes.tfcHeating(Fluid.of('kubejs:constantan', 50), 'immersiveposts:stick_constantan', 1266).id('kubejs:heating/constantan_rod');
	e.recipes.tfcHeating(Fluid.of('kubejs:electrum', 50), 'immersiveposts:stick_electrum', 1010).id('kubejs:heating/electrum_rod');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 50), 'immersiveposts:stick_lead', 327).id('kubejs:heating/lead_rod');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 25), 'kubejs:ore/normal_lead', 327).id('kubejs:heating/normal_lead_ore');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 15), 'kubejs:ore/poor_lead', 327).id('kubejs:heating/poor_lead_ore');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 35), 'kubejs:ore/rich_lead', 327).id('kubejs:heating/rich_lead_ore');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 10), 'kubejs:ore/small_lead', 327).id('kubejs:heating/small_lead_ore');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 100), 'firmalife:metal/ingot/chromium', 1907).id('kubejs:heating/chromium_ingot');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 200), 'firmalife:metal/sheet/chromium', 1907).id('kubejs:heating/chromium_sheet');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 200), 'firmalife:metal/double_ingot/chromium', 1907).id('kubejs:heating/chromium_double_ingot');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 400), 'firmalife:metal/double_sheet/chromium', 1907).id('kubejs:heating/chromium_double_sheet');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 50), 'firmalife:metal/rod/chromium', 1907).id('kubejs:heating/chromium_rod');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/stainless_steel', 100), 'firmalife:metal/ingot/stainless_steel', 1540).id('kubejs:heating/stainless_steel_ingot');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/stainless_steel', 200), 'firmalife:metal/sheet/stainless_steel', 1540).id('kubejs:heating/stainless_steel_sheet');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/stainless_steel', 200), 'firmalife:metal/double_ingot/stainless_steel', 1540).id('kubejs:heating/stainless_steel_double_ingot');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/stainless_steel', 400), 'firmalife:metal/double_sheet/stainless_steel', 1540).id('kubejs:heating/stainless_steel_double_sheet');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/stainless_steel', 50), 'firmalife:metal/rod/stainless_steel', 1540).id('kubejs:heating/stainless_steel_rod');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 10), 'firmalife:ore/small_chromite', 1907).id('kubejs:heating/small_chromite');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 15), 'firmalife:ore/poor_chromite', 1907).id('kubejs:heating/poor_chromite');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 25), 'firmalife:ore/normal_chromite', 1907).id('kubejs:heating/poor_chromite');
	e.recipes.tfcHeating(Fluid.of('firmalife:metal/chromium', 35), 'firmalife:ore/rich_chromite', 1907).id('kubejs:heating/rich_chromite');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/zinc', 250), 'create:zinc_block', 420).id('kubejs:heating/zinc_block');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/brass', 250), 'create:brass_block', 930).id('kubejs:heating/brass_block');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/steel', 250), 'immersiveengineering:storage_steel', 1540).id('kubejs:heating/steel_block');
	e.recipes.tfcHeating(Fluid.of('kubejs:constantan', 250), 'immersiveengineering:storage_constantan', 1266).id('kubejs:heating/cosntantan_block');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/nickel', 250), 'immersiveengineering:storage_nickel', 1453).id('kubejs:heating/nickel_block');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/silver', 250), 'immersiveengineering:storage_silver', 961).id('kubejs:heating/silver_block');
	e.recipes.tfcHeating(Fluid.of('kubejs:lead', 250), 'immersiveengineering:storage_lead', 327).id('kubejs:heating/lead_block');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/gold', 250), 'minecraft:gold_block', 1060).id('kubejs:heating/gold_block');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/copper', 250), 'minecraft:copper_block', 1080).id('kubejs:heating/copper_block');
	e.recipes.tfcHeating(Fluid.of('kubejs:graphite', 75), 'immersiveengineering:dust_hop_graphite', 2574).id('kubejs:heating/graphite_dust'); // Change the temperature once higher temp fuels added
	e.recipes.tfcHeating(Fluid.of('kubejs:graphite', 100), 'immersiveengineering:ingot_hop_graphite', 2574).id('kubejs:heating/graphite_ingot');
	e.recipes.tfcHeating('minecraft:glass', ['create:tiled_glass', 'create:vertical_framed_glass', 'create:framed_glass', 'create:horizontal_framed_glass'], 350).id('kubejs:heating/create_glass');
	e.recipes.tfcHeating('minecraft:glass_pane', ['create:tiled_glass_pane', 'create:vertical_framed_glass_pane', 'create:framed_glass_pane', 'create:horizontal_framed_glass_pane'], 350).id('kubejs:heating/create_glass_panes');
	e.recipes.tfcHeating('immersiveengineering:slag_glass', '#forge:slag', 650).id('kubejs:heating/slag_glass');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/bismuth_bronze', 800), Item.of('gunswithoutroses:gold_gun').ignoreNBT(), 985).useDurability().id('kubejs:heating/bismuth_bronze_rifle');
	e.recipes.tfcHeating(Fluid.of('tfc:metal/cast_iron', 800), Item.of('gunswithoutroses:iron_gun').ignoreNBT(), 1535).useDurability().id('kubejs:heating/wrought_iron_rifle');
	
	e.recipes.tfcCasting('immersiveengineering:ingot_electrum', 'tfc:ceramic/ingot_mold', Fluid.of('kubejs:electrum', 100), 0.1).id('kubejs:casting/electrum_ingot');
	// e.recipes.tfcCasting('immersiveengineering:ingot_electrum', 'tfc:ceramic/fire_ingot_mold', Fluid.of('kubejs:electrum', 100), 0.01).id('kubejs:casting/electrum_fire_ingot');
	e.recipes.tfcCasting('immersiveengineering:ingot_constantan', 'tfc:ceramic/ingot_mold', Fluid.of('kubejs:constantan', 100), 0.1).id('kubejs:casting/constantan_ingot');
	// e.recipes.tfcCasting('immersiveengineering:ingot_constantan', 'tfc:ceramic/fire_ingot_mold', Fluid.of('kubejs:constantan', 100), 0.01).id('kubejs:casting/constantan_fire_ingot');
	e.recipes.tfcCasting('immersiveengineering:ingot_lead', 'tfc:ceramic/ingot_mold', Fluid.of('kubejs:lead', 100), 0.1).id('kubejs:casting/lead_ingot');
	// e.recipes.tfcCasting('immersiveengineering:ingot_lead', 'tfc:ceramic/fire_ingot_mold', Fluid.of('kubejs:lead', 100), 0.01).id('kubejs:casting/lead_fire_ingot');
	e.recipes.tfcCasting('immersiveengineering:ingot_hop_graphite', 'tfc:ceramic/ingot_mold', Fluid.of('kubejs:graphite', 100), 0.1).id('kubejs:casting/graphite');
	// e.recipes.tfcCasting('immersiveengineering:ingot_hop_graphite', 'tfc:ceramic/fire_ingot_mold', Fluid.of('kubejs:graphite', 100), 0.01).id('kubejs:casting/graphite_fire');
	
	e.recipes.tfcAlloy('kubejs_tfc:kubejs_electrum', [
		['tfc:gold', 0.4, 0.6],
		['tfc:silver', 0.4, 0.6]
	]).id('kubejs:electrum');
	e.recipes.tfcAlloy('kubejs_tfc:kubejs_constantan', [
		['tfc:copper', 0.5, 0.6],
		['tfc:nickel', 0.4, 0.5]
	]).id('kubejs:constantan');
	
	e.recipes.tfcChisel('immersiveengineering:concrete_tile', 'immersiveengineering:concrete', 'smooth').id('kubejs:chisel/smooth/concrete_tile');
	e.recipes.tfcChisel('immersiveengineering:stairs_concrete', 'immersiveengineering:concrete', 'stair').id('kubejs:chisel/stair/concrete');
	e.recipes.tfcChisel('immersiveengineering:stairs_concrete_tile', 'immersiveengineering:concrete_tile', 'stair').id('kubejs:chisel/stair/concrete_tile');
	e.recipes.tfcChisel('immersiveengineering:stairs_hempcrete', 'immersiveengineering:hempcrete', 'stair').id('kubejs:chisel/stair/jutecrete');
	e.recipes.tfcChisel('minecraft:cut_copper', 'minecraft:copper_block', 'smooth').id('kubejs:chisel/smooth/cut_copper');
	e.recipes.tfcChisel('minecraft:cut_copper_stairs', 'minecraft:cut_copper', 'stair').id('kubejs:chisel/stair/cut_copper');
	e.recipes.tfcChisel('immersiveengineering:stairs_treated_wood_horizontal', 'immersiveengineering:treated_wood_horizontal', 'stair').id('kubejs:chisel/stair/stained_wood_horizontal');
	e.recipes.tfcChisel('immersiveengineering:stairs_treated_wood_vertical', 'immersiveengineering:treated_wood_vertical', 'stair').id('kubejs:chisel/stair/stained_wood_vertical');
	e.recipes.tfcChisel('immersiveengineering:stairs_treated_wood_packaged', 'immersiveengineering:treated_wood_packaged', 'stair').id('kubejs:chisel/stair/stained_wood_packaged');
	e.recipes.tfcChisel('immersiveengineering:stairs_steel_scaffolding_standard', 'immersiveengineering:steel_scaffolding_standard', 'stair').id('kubejs:chisel/stair/standard_steel_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:stairs_steel_scaffolding_grate_top', 'immersiveengineering:steel_scaffolding_grate_top', 'stair').id('kubejs:chisel/stair/grate_top_steel_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:stairs_steel_scaffolding_wooden_top', 'immersiveengineering:steel_scaffolding_wooden_top', 'stair').id('kubejs:chisel/stair/wooden_top_steel_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:stairs_alu_scaffolding_standard', 'immersiveengineering:alu_scaffolding_standard', 'stair').id('kubejs:chisel/stair/standard_alu_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:stairs_alu_scaffolding_grate_top', 'immersiveengineering:alu_scaffolding_grate_top', 'stair').id('kubejs:chisel/stair/grate_top_alu_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:stairs_alu_scaffolding_wooden_top', 'immersiveengineering:alu_scaffolding_wooden_top', 'stair').id('kubejs:chisel/stair/wooden_top_alu_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:slab_treated_wood_horizontal', 'immersiveengineering:treated_wood_horizontal', 'slab').extraDrop('immersiveengineering:slab_treated_wood_horizontal').id('kubejs:chisel/slab/stained_wood_horizontal');
	e.recipes.tfcChisel('immersiveengineering:slab_treated_wood_vertical', 'immersiveengineering:treated_wood_vertical', 'slab').extraDrop('immersiveengineering:slab_treated_wood_vertical').id('kubejs:chisel/slab/stained_wood_vertical');
	e.recipes.tfcChisel('immersiveengineering:slab_treated_wood_packaged', 'immersiveengineering:treated_wood_packaged', 'slab').extraDrop('immersiveengineering:slab_treated_wood_packaged').id('kubejs:chisel/slab/stained_wood_packaged');
	e.recipes.tfcChisel('immersiveengineering:slab_steel_scaffolding_standard', 'immersiveengineering:steel_scaffolding_standard', 'slab').extraDrop('immersiveengineering:slab_steel_scaffolding_standard').id('kubejs:chisel/slab/standard_steel_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:slab_steel_scaffolding_grate_top', 'immersiveengineering:steel_scaffolding_grate_top', 'slab').extraDrop('immersiveengineering:slab_steel_scaffolding_grate_top').id('kubejs:chisel/slab/grate_top_steel_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:slab_steel_scaffolding_wooden_top', 'immersiveengineering:steel_scaffolding_wooden_top', 'slab').extraDrop('immersiveengineering:slab_steel_scaffolding_wooden_top').id('kubejs:chisel/slab/wooden_top_steel_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:slab_alu_scaffolding_standard', 'immersiveengineering:alu_scaffolding_standard', 'slab').extraDrop('immersiveengineering:slab_alu_scaffolding_standard').id('kubejs:chisel/slab/standard_alu_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:slab_alu_scaffolding_grate_top', 'immersiveengineering:alu_scaffolding_grate_top', 'slab').extraDrop('immersiveengineering:slab_alu_scaffolding_grate_top').id('kubejs:chisel/slab/grate_top_alu_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:slab_alu_scaffolding_wooden_top', 'immersiveengineering:alu_scaffolding_wooden_top', 'slab').extraDrop('immersiveengineering:slab_alu_scaffolding_wooden_top').id('kubejs:chisel/slab/wooden_top_alu_scaffolding');
	e.recipes.tfcChisel('immersiveengineering:slab_cokebrick', 'immersiveengineering:cokebrick', 'slab').extraDrop('immersiveengineering:slab_cokebrick').id('kubejs:chisel/slab/cokebrick');
	e.recipes.tfcChisel('immersiveengineering:slab_blastbrick_reinforced', 'immersiveengineering:blastbrick_reinforced', 'slab').extraDrop('immersiveengineering:slab_blastbrick_reinforced').id('kubejs:chisel/slab/blastbrick');
	e.recipes.tfcChisel('immersiveengineering:slab_coke', 'immersiveengineering:coke', 'slab').extraDrop('immersiveengineering:slab_coke').id('kubejs:chisel/slab/coal_coke');
	e.recipes.tfcChisel('immersiveengineering:slab_hempcrete', 'immersiveengineering:hempcrete', 'slab').extraDrop('immersiveengineering:slab_hempcrete').id('kubejs:chisel/slab/jutecrete');
	e.recipes.tfcChisel('immersiveengineering:slab_concrete', 'immersiveengineering:concrete', 'slab').extraDrop('immersiveengineering:slab_concrete').id('kubejs:chisel/slab/concrete');
	e.recipes.tfcChisel('immersiveengineering:slab_concrete_tile', 'immersiveengineering:concrete_tile', 'slab').extraDrop('immersiveengineering:slab_concrete_tile').id('kubejs:chisel/slab/concrete_tile');
	e.recipes.tfcChisel('immersiveengineering:slab_insulating_glass', 'immersiveengineering:insulating_glass', 'slab').extraDrop('immersiveengineering:slab_insulating_glass').id('kubejs:chisel/slab/insulating_glass');
	e.recipes.tfcChisel('immersiveengineering:slab_alloybrick', 'immersiveengineering:alloybrick', 'slab').extraDrop('immersiveengineering:slab_alloybrick').id('kubejs:chisel/slab/kiln_brick');
	e.recipes.tfcChisel('minecraft:cut_copper_slab', 'minecraft:cut_copper', 'slab').extraDrop('minecraft:cut_copper_slab').id('kubejs:chisel/slab/cut_copper');
	
	e.recipes.tfcLeatherKnapping('kubejs:leather_pouch', [
		'XX XX',
		'X   X',
		'X   X',
		'X   X',
		'XXXXX'
	]).id('kubejs:leather_knapping/leather_pouch');
	
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_copper', '1x tfc:metal/sheet/copper', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/copper_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_electrum', '1x immersiveengineering:plate_electrum', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/electrum_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_aluminum', '1x immersiveengineering:plate_aluminum', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/aluminum_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_steel', '1x tfc:metal/sheet/steel', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/steel_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_lead', '1x immersiveengineering:plate_lead', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/lead_wire');
	e.recipes.immersiveengineeringMetalPress('1x immersiveengineering:graphite_electrode', '4x immersiveengineering:ingot_hop_graphite', 'immersiveengineering:mold_rod').energy(9600).id('immersiveengineering:metalpress/electrode');
	e.recipes.immersiveengineeringMetalPress('1x kubejs:sheet/graphite', '1x immersiveengineering:ingot_hop_graphite', 'immersiveengineering:mold_plate').energy(5000).id('kubejs:metal_press/graphite_sheet');
	
	e.recipes.immersiveengineeringCokeOven('2x immersiveengineering:coal_coke', '1x tfc:ore/bituminous_coal').creosote(250).time(9600).id('immersiveengineering:cokeoven/coke');
	e.recipes.immersiveengineeringCokeOven('1x minecraft:charcoal', '2x #tfc:log_pile_logs').creosote(50).time(1200).id('immersiveengineering:cokeoven/charcoal');
	
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_copper', 'minecraft:copper_block').id('kubejs:sawmill/copper_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_lead', 'immersiveengineering:storage_lead').id('kubejs:sawmill/lead_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_silver', 'immersiveengineering:storage_silver').id('kubejs:sawmill/silver_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_nickel', 'immersiveengineering:storage_nickel').id('kubejs:sawmill/nickel_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_constantan', 'immersiveengineering:storage_constantan').id('kubejs:sawmill/constantan_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_electrum', 'immersiveengineering:storage_electrum').id('kubejs:sawmill/electrum_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_steel', 'immersiveengineering:storage_steel').id('kubejs:sawmill/steel_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_gold', 'minecraft:gold_block').id('kubejs:sawmill/gold_sheetmetal');
	
	e.recipes.immersiveengineeringAlloy('2x immersiveengineering:insulating_glass', '2x #forge:glass', 'immersiveengineering:dust_copper').id('kubejs:kiln/insulating_glass');
	
	e.recipes.immersiveengineeringBlastFurnace('tfc:metal/ingot/pig_iron', 'tfc:metal/ingot/cast_iron', 'immersiveengineering:slag').time(1200).id('kubejs:blastfurnace/pig_iron_ingot_cast_iron');
	e.recipes.immersiveengineeringBlastFurnace('tfc:metal/ingot/pig_iron', 'tfc:metal/ingot/wrought_iron', 'immersiveengineering:slag').time(1200).id('kubejs:blastfurnace/pig_iron_ingot_wrought_iron');
	e.recipes.immersiveengineeringBlastFurnace('tfc:metal/ingot/steel', 'tfc:metal/ingot/pig_iron').time(1200).id('kubejs:blastfurnace/steel_ingot');
	
	e.recipes.immersiveengineeringCrusher('3x minecraft:bone_meal', 'minecraft:bone'/*, [{chance: 0.35, output: 'minecraft:bone_meal'}]*/).id('kubejs:crusher/bone_meal');
	e.recipes.immersiveengineeringCrusher('4x minecraft:clay_ball', 'minecraft:clay').id('immersiveengineering:crusher/clay');
	e.recipes.immersiveengineeringCrusher('1x immersiveengineering:slag_gravel', 'immersiveengineering:slag').id('immersiveengineering:crusher/slag');
	e.recipes.immersiveengineeringCrusher('1x tfc:sand/white', 'tfc:rock/gravel/marble'/*, [{chance: 0.05, output: 'minecraft:flint'}]*/).id('kubejs:crusher/sand_white_from_marble');
	e.recipes.immersiveengineeringCrusher('1x tfc:sand/white', 'tfc:rock/gravel/chalk'/*, [{chance: 0.05, output: 'minecraft:flint'}]*/).id('kubejs:crusher/sand_white_from_chalk');
	e.recipes.immersiveengineeringCrusher('1x tfc:sand/brown', 'tfc:rock/gravel/conglomerate'/*, [{chance: 0.05, output: 'minecraft:flint'}]*/).id('kubejs:crusher/sand_brown_from_conglomerate');
	e.recipes.immersiveengineeringCrusher('1x tfc:sand/black', 'tfc:rock/gravel/basalt'/*, [{chance: 0.05, output: 'minecraft:flint'}]*/).id('kubejs:crusher/sand_black_from_basalt');
	e.recipes.immersiveengineeringCrusher('1x tfc:sand/red', 'tfc:rock/gravel/chert'/*, [{chance: 0.05, output: 'minecraft:flint'}]*/).id('kubejs:crusher/sand_red_from_chert');
	e.recipes.immersiveengineeringCrusher('1x tfc:sand/yellow', 'tfc:rock/gravel/limestone'/*, [{chance: 0.05, output: 'minecraft:flint'}]*/).id('kubejs:crusher/sand_yellow_from_limestone');
	e.recipes.immersiveengineeringCrusher('1x tfc:sand/green', 'tfc:rock/gravel/schist'/*, [{chance: 0.05, output: 'minecraft:flint'}]*/).id('kubejs:crusher/sand_green_from_schist');
	e.recipes.immersiveengineeringCrusher('4x tfc:fire_clay', 'tfc:fire_clay_block').id('kubejs:crusher/fire_clay_block');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_copper', 'tfc:metal/ingot/copper').id('kubejs:crusher/copper_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_aluminum', 'immersiveengineering:ingot_aluminum').id('kubejs:crusher/aluminum_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_lead', 'immersiveengineering:ingot_lead').id('kubejs:crusher/lead_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_silver', 'tfc:metal/ingot/silver').id('kubejs:crusher/silver_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_nickel', 'tfc:metal/ingot/nickel').id('kubejs:crusher/nickel_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_uranium', 'immersiveengineering:ingot_uranium').id('kubejs:crusher/uranium_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_constantan', 'immersiveengineering:ingot_constantan').id('kubejs:crusher/constantan_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_electrum', 'immersiveengineering:ingot_electrum').id('kubejs:crusher/electrum_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_steel', 'tfc:metal/ingot/steel').id('kubejs:crusher/steel_grit');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_iron', 'tfc:metal/ingot/cast_iron').id('kubejs:crusher/iron_grit/cast_iron');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_iron', 'tfc:metal/ingot/wrought_iron').id('kubejs:crusher/iron_grit/wrought_iron');
	e.recipes.immersiveengineeringCrusher('2x immersiveengineering:dust_gold', 'tfc:metal/ingot/gold').id('kubejs:crusher/gold_grit');
	//I don't know why the secondaries won't work, but they won't
	
	//arc furnace - energy is total energy, not energy per tick
	e.recipes.immersiveengineeringArcFurnace(['1x immersiveengineering:ingot_hop_graphite'], 'immersiveengineering:dust_hop_graphite').time(100).energy(51200).id('kubejs:arc_furnace/hopg_ingot');
	e.recipes.immersiveengineeringArcFurnace(['1x tfc:metal/ingot/black_steel'], 'tfc:metal/ingot/weak_steel', ['tfc:metal/ingot/pig_iron'], 'immersiveengineering:slag').time(200).energy(204800).id('kubejs:arc_furnace/black_steel');
	e.recipes.immersiveengineeringArcFurnace(['1x tfc:metal/ingot/blue_steel'], 'tfc:metal/ingot/weak_blue_steel', ['tfc:metal/ingot/pig_iron'], 'immersiveengineering:slag').time(200).energy(204800).id('kubejs:arc_furnace/blue_steel');
	e.recipes.immersiveengineeringArcFurnace(['1x tfc:metal/ingot/red_steel'], 'tfc:metal/ingot/weak_red_steel', ['tfc:metal/ingot/pig_iron'], 'immersiveengineering:slag').time(200).energy(204800).id('kubejs:arc_furnace/red_steel');
	e.recipes.immersiveengineeringArcFurnace(['1x tfc:metal/ingot/steel'], 'tfc:metal/ingot/pig_iron').time(100).energy(102400).id('kubejs:arc_furnace/steel');
	e.recipes.immersiveengineeringArcFurnace(['1x tfc:metal/ingot/pig_iron'], 'tfc:metal/ingot/cast_iron').time(100).energy(102400).id('kubejs:arc_furnace/pig_iron_cast_iron');
	e.recipes.immersiveengineeringArcFurnace(['1x tfc:metal/ingot/pig_iron'], 'tfc:metal/ingot/wrought_iron').time(100).energy(102400).id('kubejs:arc_furnace/pig_iron_wrought_iron');
	
	//bottling machine
	//ie_bottler*:note - make sure everything is spelt correctly, else the game will crash while (re)loading the server
	//ie_bottler_mold:order = output, mold, fluid_tag, amount, id | yes, it must be a fluid tag, b/c IE's just like that
	ie_bottler_mold('immersiveengineering:ingot_lead', 'kubejs:mold/ingot', 'tfc:lead', 100, 'ingot_lead')
	ie_bottler_mold('immersiveengineering:ingot_constantan', 'kubejs:mold/ingot', 'tfc:constantan', 100, 'ingot_constantan')
	ie_bottler_mold('immersiveengineering:ingot_electrum', 'kubejs:mold/ingot', 'tfc:electrum', 100, 'ingot_electrum')
	ie_bottler_mold('tfc:metal/ingot/weak_steel', 'kubejs:mold/ingot', 'tfc:weak_steel', 100, 'ingot_weak_steel')
	ie_bottler_mold('tfc:metal/ingot/weak_blue_steel', 'kubejs:mold/ingot', 'tfc:weak_blue_steel', 100, 'ingot_weak_blue_steel')
	ie_bottler_mold('tfc:metal/ingot/weak_red_steel', 'kubejs:mold/ingot', 'tfc:weak_red_steel', 100, 'ingot_weak_red_steel')
	ie_bottler_mold('tfc:metal/ingot/high_carbon_steel', 'kubejs:mold/ingot', 'tfc:high_carbon_steel', 100, 'ingot_high_carbon_weak_steel')
	ie_bottler_mold('tfc:metal/ingot/high_carbon_black_steel', 'kubejs:mold/ingot', 'tfc:high_carbon_black_steel', 100, 'ingot_high_carbon_black_steel')
	ie_bottler_mold('tfc:metal/ingot/high_carbon_blue_steel', 'kubejs:mold/ingot', 'tfc:high_carbon_blue_steel', 100, 'ingot_high_carbon_blue_steel')
	ie_bottler_mold('tfc:metal/ingot/high_carbon_red_steel', 'kubejs:mold/ingot', 'tfc:high_carbon_red_steel', 100, 'ingot_high_carbon_red_steel')
	ie_bottler_mold('tfc:metal/ingot/unknown', 'kubejs:mold/ingot', 'tfc:unknown', 100, 'ingot_unknown')
	ie_bottler_mold('firmalife:metal/ingot/chromium', 'kubejs:mold/ingot', 'firmalife:chromium', 100, 'ingot_chromium')
	ie_bottler_mold('firmalife:metal/ingot/stainless_steel', 'kubejs:mold/ingot', 'firmalife:stainless_steel', 100, 'ingot_stainless_steel')
	ie_bottler_mold('kubejs:metal/double_ingot/lead', 'kubejs:mold/double_ingot', 'tfc:lead', 200, 'double_ingot_lead')
	ie_bottler_mold('kubejs:metal/double_ingot/constantan', 'kubejs:mold/double_ingot', 'tfc:constantan', 200, 'double_ingot_constantan')
	ie_bottler_mold('kubejs:metal/double_ingot/electrum', 'kubejs:mold/double_ingot', 'tfc:electrum', 200, 'double_ingot_electrum')
	ie_bottler_mold('firmalife:metal/double_ingot/chromium', 'kubejs:mold/double_ingot', 'firmalife:chromium', 200, 'double_ingot_chromium')
	ie_bottler_mold('firmalife:metal/double_ingot/stainless_steel', 'kubejs:mold/double_ingot', 'firmalife:stainless_steel', 200, 'double_ingot_stainless_steel')
	ie_bottler_mold('immersiveengineering:plate_lead', 'immersiveengineering:mold_plate', 'tfc:lead', 200, 'sheet_lead')
	ie_bottler_mold('immersiveengineering:plate_constantan', 'immersiveengineering:mold_plate', 'tfc:constantan', 200, 'sheet_cosntantan')
	ie_bottler_mold('immersiveengineering:plate_electrum', 'immersiveengineering:mold_plate', 'tfc:electrum', 200, 'sheet_electrum')
	ie_bottler_mold('firmalife:metal/sheet/chromium', 'immersiveengineering:mold_plate', 'firmalife:chromium', 200, 'sheet_chromium')
	ie_bottler_mold('firmalife:metal/sheet/stainless_steel', 'immersiveengineering:mold_plate', 'firmalife:stainless_steel', 200, 'sheet_stainless_steel')
	ie_bottler_mold('firmalife:metal/double_sheet/chromium', 'kubejs:mold/double_sheet', 'firmalife:chromium', 400, 'double_sheet_chromium')
	ie_bottler_mold('firmalife:metal/double_sheet/stainless_steel', 'kubejs:mold/double_sheet', 'firmalife:stainless_steel', 400, 'double_sheet_stainless_steel')
	ie_bottler_mold('immersiveposts:stick_lead', 'immersiveengineering:mold_rod', 'tfc:lead', 50, 'rod_lead')
	ie_bottler_mold('immersiveposts:stick_constantan', 'immersiveengineering:mold_rod', 'tfc:constantan', 50, 'rod_constantan')
	ie_bottler_mold('immersiveposts:stick_electrum', 'immersiveengineering:mold_rod', 'tfc:electrum', 50, 'rod_electrum')
	ie_bottler_mold('firmalife:metal/rod/chromium', 'immersiveengineering:mold_rod', 'firmalife:chromium', 50, 'rod_chromium')
	ie_bottler_mold('firmalife:metal/rod/stainless_steel', 'immersiveengineering:mold_rod', 'firmalife:stainless_steel', 50, 'rod_stainless_steel')
	
	//blueprints
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'item': 'tfc:metal/sheet/wrought_iron'
		},
		{
			'item': 'tfc:metal/ingot/copper'
		},
		{
			'item': 'create:cogwheel'
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:component_iron',
			'count': 1
		}
	}).id('kubejs:blueprint/iron_components');
		e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'item': 'tfc:metal/sheet/steel'
		},
		{
			'item': 'tfc:metal/ingot/copper'
		},
		{
			'item': 'create:large_cogwheel'
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:component_steel',
			'count': 1
		}
	}).id('kubejs:blueprint/steel_components');
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'tag': 'forge:glass/colorless'
		},
		{
			'item': 'immersiveengineering:wire_copper'
		},
		{
			'item': 'tfc:metal/sheet/nickel'
		},
		{
			'item': 'minecraft:redstone'
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:electron_tube',
			'count': 3
		}
	}).id('kubejs:blueprint/vacuum_tube');
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'tag': 'forge:glass/colorless'
		},
		{
			'item': 'immersiveengineering:wire_copper'
		},
		{
			'item': 'tfc:metal/rod/nickel'
		},
		{
			'count': 2,
			'base_ingredient': {
				'item': 'tfc:powder/graphite'
			}
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:light_bulb',
			'count': 1
		}
	}).id('kubejs:blueprint/light_blub');
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'item': 'minecraft:paper'
		},
		{
			'tag': 'forge:sheets'
		}
		],
		'category': 'bannerpatterns',
		'result': {
			'item': 'immersiveengineering:bannerpattern_bevels',
			'count': 1
		}
	}).id('immersiveengineering:blueprint/banner_bevels');
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'item': 'immersiveengineering:wooden_grip'
		},
		{
			'item': 'tfc:metal/tuyere/steel'
		},
		{
			'item': 'immersiveengineering:component_steel'
		},
		{
			'item': 'immersiveengineering:gunpart_drum'
		},
		{
			'item': 'immersiveengineering:gunpart_hammer'
		}
		],
		'category': 'electrode',
		'result': {
			'item': 'immersiveengineering:revolver',
			'count': 1
		}
	}).id('kubejs:blueprint/revolver');
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'item': 'immersiveengineering:wooden_grip'
		},
		{
			'count': 2,
			'base_ingredient': {
				'item': 'immersiveengineering:coil_mv'
			}
		},
		{
			'item': 'immersiveengineering:capacitor_hv'
		},
		{
			'item': 'immersiveengineering:component_electronic_adv'
		},
		{
			'count': 2,
			'base_ingredient': {
				'item': 'tfc:metal/rod/steel'
			}
		},
		{
			'item': 'tfc:metal/ingot/steel'
		}
		],
		'category': 'electrode',
		'result': {
			'item': 'immersiveengineering:railgun',
			'count': 1
		}
	}).id('kubejs:blueprint/railgun');
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'item': 'immersiveengineering:plate_duroplast'
		},
		{
			'item': 'tfc:metal/sheet/copper'
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:circuit_board',
			'count': 1
		}
	}).id('immersiveengineering:blueprint/circuit_board');
	
	//mixer
	e.custom({
		'type': 'immersiveengineering:mixer',
		'inputs': [
		{
			'tag': 'forge:sand',
			'count': 2
		},
		{
			'tag': 'forge:gravel'
		},
		{
			'item': 'minecraft:clay_ball'
		}
		],
		'result': {
			'fluid': 'immersiveengineering:concrete',
			'amount': 250
		},
		'fluid': {
			'tag': 'forge:true_water',
			'amount': 250
		},
		'energy': 3200
	}).id('kubejs:mixer/concrete');
	e.custom({
		'type': 'immersiveengineering:mixer',
		'inputs': [
		{
			'item': 'minecraft:redstone'
		}
		],
		'result': {
			'fluid': 'immersiveengineering:redstone_acid',
			'amount': 250
		},
		'fluid': {
			'tag': 'forge:true_water',
			'amount': 250
		},
		'energy': 1600
	}).id('kubejs:mixer/redstone_acid');
	e.custom({
		'type': 'immersiveengineering:mixer',
		'inputs': [
		{
			'item': 'tfc:jute_fiber',
			'count': 3
		}
		],
		'result': {
			'fluid': 'kubejs:jutecrete',
			'amount': 250
		},
		'fluid': {
			'tag': 'immersiveengineering:concrete',
			'amount': 250
		},
		'energy': 1600
	}).id('kubejs:mixer/jutecrete');
	
	//bottling
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:concrete'
		}
		],
		'input': {
			'tag': 'immersiveengineering:scaffoldings/steel'
		},
		'fluid': {
			'tag': 'immersiveengineering:concrete',
			'amount': 250
		}
	}).id('kubejs:bottling/concrete');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:hempcrete',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'kubejs:jutecrete',
			'amount': 250
		}
	}).id('kubejs:bottling/jutecrete');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'minecraft:gold_block',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:gold',
			'amount': 1000
		}
	}).id('kubejs:bottling/gold_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:storage_constantan',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:constantan',
			'amount': 1000
		}
	}).id('kubejs:bottling/constantan_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'create:zinc_block',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:zinc',
			'amount': 1000
		}
	}).id('kubejs:bottling/zinc_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'create:brass_block',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:brass',
			'amount': 1000
		}
	}).id('kubejs:bottling/brass_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:storage_electrum',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:electrum',
			'amount': 1000
		}
	}).id('kubejs:bottling/electrum_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:storage_steel',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:steel',
			'amount': 1000
		}
	}).id('kubejs:bottling/steel_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:storage_nickel',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:nickel',
			'amount': 1000
		}
	}).id('kubejs:bottling/nickel_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:storage_silver',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:silver',
			'amount': 1000
		}
	}).id('kubejs:bottling/silver_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:storage_lead',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:lead',
			'amount': 1000
		}
	}).id('kubejs:bottling/lead_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'minecraft:copper_block',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'input': {
			'item': 'immersiveengineering:mold_packing_4'
		},
		'fluid': {
			'tag': 'tfc:copper',
			'amount': 1000
		}
	}).id('kubejs:bottling/copper_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:treated_wood_horizontal'
		}
		],
		'input': {
			'tag': 'minecraft:planks'
		},
		'fluid': {
			'tag': 'forge:creosote',
			'amount': 100
		}
	}).id('kubejs:bottling/stained_wood');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'createaddition:diamond_grit_sandpaper'
		}
		],
		'inputs': [
		{
			'item': 'tfc:powder/diamond'
		},
		{
			'item': 'immersiveengineering:plate_duroplast'
		}
		],
		'fluid': {
			'tag': 'forge:phenolic_resin',
			'amount': 50
		}
	}).id('kubejs:bottling/high_durability_sandpaper');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:ingot_hop_graphite'
		},
		{
			'item': 'kubejs:mold/ingot'
		}
		],
		'inputs': [
		{
			'item': 'kubejs:mold/ingot'
		}
		],
		'fluid': {
			'tag': 'tfc:graphite',
			'amount': 100
		}
	}).id('kubejs:bottling/graphite');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:empty_shell',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_bullet_casing'
		}
		],
		'inputs': [
		{
			'item': 'immersiveengineering:mold_bullet_casing'
		},
		{
			'count': 4,
			'base_ingredient': {
				'item': 'create:copper_nugget'
			}
		}
		],
		'fluid': {
			'tag': 'forge:phenolic_resin',
			'amount': 250
		}
	}).id('immersiveengineering:bottling/empty_shell');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:duroplast',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'inputs': [
		{
			'item': 'immersiveengineering:mold_packing_4'
		}
		],
		'fluid': {
			'tag': 'forge:phenolic_resin',
			'amount': 1000
		}
	}).id('immersiveengineering:bottling/duroplast_block');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:plate_duroplast'
		},
		{
			'item': 'immersiveengineering:mold_plate'
		}
		],
		'inputs': [
		{
			'item': 'immersiveengineering:mold_plate'
		}
		],
		'fluid': {
			'tag': 'forge:phenolic_resin',
			'amount': 200
		}
	}).id('immersiveengineering:bottling/duroplast_plate');
	e.custom({
		'type': 'immersiveengineering:bottling_machine',
		'results': [
		{
			'item': 'immersiveengineering:empty_casing',
			'count': 4
		},
		{
			'item': 'immersiveengineering:mold_bullet_casing'
		}
		],
		'inputs': [
		{
			'item': 'immersiveengineering:mold_bullet_casing'
		}
		],
		'fluid': {
			'tag': 'forge:phenolic_resin',
			'amount': 250
		}
	}).id('kubejs:bottling/empty_casing');
	
	// Fluid burning
	e.custom({
		'type': 'createaddition:liquid_burning',
		'input': {
			'fluid': 'minecraft:lava',
			'amount': 1000
		},
		'burnTime': 20000
	}).id('createaddition:liquid_burning/lava');
})