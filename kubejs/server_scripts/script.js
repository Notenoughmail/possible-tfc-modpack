// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
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

onEvent('recipes', e => {
	let tfc_collapse = (input, output) => {
		e.custom({
			'type': 'tfc:collapse',
			'ingredient': input,
			'result': output
		})
	}
	stones.forEach(rock => {
		e.recipes.createMilling(['1x tfc:rock/gravel/' + rock], 'tfc:rock/cobble/' + rock).id('kubejs:milling/' + rock);
		e.recipes.immersiveengineeringCrusher('1x tfc:rock/gravel/' + rock, 'tfc:rock/cobble/' + rock).id('kubejs:crushing/' + rock);
		tfc_collapse('kubejs:ore/rich_lead/' + rock, 'kubejs:ore/normal_lead/' + rock)
		tfc_collapse('kubejs:ore/normal_lead/' + rock, 'kubejs:ore/poor_lead/' + rock)
		tfc_collapse('kubejs:ore/poor_lead/' + rock, 'tfc:rock/cobble/' + rock)
	});
	powders.forEach(powder => {
		e.recipes.createCrushing(['4x tfc:powder/' + powder, Item.of('tfc:powder/' + powder).withChance(0.35)], 'tfc:ore/' + powder).id('kubejs:crushing/' + powder)
	});
	grains.forEach(grain => {
		e.recipes.createMilling(['1x tfc:food/' + grain + '_flour'], 'tfc:food/' + grain + '_grain').id('kubejs:milling/' + grain);
	});
	
	let mold_blueprint = (result) => {
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
				'item': 'immersiveengineering:mold_' + result
			}
		})
	}
	molds.forEach(mold => {
		mold_blueprint(mold)
	})
	
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
	], 'tfc:rock/raw/limestone').id('kubejs:crushing/gypsum_from_raw_limestone');
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
	
	e.recipes.createPressing('create:crafter_slot_cover', 'tfc:metal/sheet/brass').id('kubejs:pressing/crafter_slot_from_tfc');
	
	e.recipes.createDeploying('4x create:attribute_filter', ['tfc:silk_cloth', 'tfc:metal/ingot/brass']).id('kubejs:deploying/attribute_filter_from_tfc');
	e.recipes.createDeploying('4x create:filter', ['tfc:silk_cloth', 'tfc:metal/ingot/wrought_iron']).id('kubejs:deploying/filter_from_tfc');
	e.recipes.createDeploying('create:blaze_burner', ['create:empty_blaze_burner', 'immersiveengineering:coal_coke']).id('kubejs:deploying/blaze_burner_from_tfc');
	
	e.recipes.createFilling('create:chocolate_glazed_berries', ['#tfc:foods/berries', Fluid.of('create:chocolate', 250)]).id('kubejs:filling/chocolate_berries_from_tfc_berries');
	e.recipes.createFilling(Item.of('tfc:ceramic/jug', '{fluid:{Amount:100,FluidName:"minecraft:water"}}'), ['tfc:ceramic/jug', Fluid.of('minecraft:water', 100)]).id('kubejs:filling/jug_with_water');
	
	e.recipes.createMechanicalCrafting('create:potato_cannon', [
	'SSSAB',
	'   CC'
	], {
		S: 'create:fluid_pipe',
		A: 'create:precision_mechanism',
		B: 'create:andesite_alloy',
		C: 'tfc:metal/ingot/copper'
	}).id('kubejs:mechanical_crafting/potato_cannon_from_tfc');
	e.recipes.createMechanicalCrafting('2x immersiveengineering:light_engineering', [
	'SAS',
	'ABA',
	'SAS'
	], {
		S: 'immersiveengineering:sheetmetal_steel',
		A: 'immersiveengineering:component_iron',
		B: 'create:gearbox'
	}).id('kubejs:mechanical_crafting/light_engineering_from_tfc');
	e.recipes.createMechanicalCrafting('2x immersiveengineering:rs_engineering', [
	'SAS',
	'ABA',
	'SAS'
	], {
		S: 'tfc:metal/sheet/steel',
		A: 'immersiveengineering:insulating_glass',
		B: 'create:electron_tube'
	}).id('kubejs:mechanical_crafting/rs_engineering_from_tfc');
	e.recipes.createMechanicalCrafting('3x immersiveengineering:blastbrick_reinforced', [
	' SAS ',
	'SBBBS',
	' SAS '
	], {
		S: 'tfc:powder/coke',
		A: 'immersiveengineering:sheetmetal_steel',
		B: 'immersiveengineering:cokebrick'
	}).id('kubejs:mechanical_crafting/blastbrick_from_tfc');
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
	}).id('kubejs:mechanical_crafting/alternator_from_tfc');
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
	}).id('kubejs:mechanical_crafting/electric_motor_from_tfc');
	
	e.recipes.createItemApplication('create:andesite_casing', ['#minecraft:logs', 'create:andesite_alloy']).id('kubejs:item_application/andesite_casing_from_tfc_logs');
	e.recipes.createItemApplication('create:brass_casing', ['#minecraft:logs', 'tfc:metal/ingot/brass']).id('kubejs:item_application/brass_casing_from_tfc_logs');
	e.recipes.createItemApplication('create:copper_casing', ['#minecraft:logs', 'tfc:metal/ingot/copper']).id('kubejs:item_application/copper_casing_from_tfc_logs');
	e.recipes.createItemApplication('create:mechanical_pump', ['create:fluid_pipe', 'create:cogwheel']).id('kubejs:item_application/mechanical_pump');
	e.recipes.createItemApplication('create:smart_fluid_pipe', ['create:fluid_pipe', 'create:electron_tube']).id('kubejs:item_application/smart_fluid_pipe');
	e.recipes.createItemApplication('create:fluid_valve', ['create:fluid_pipe', 'create:shaft']).id('kubejs:item_application/fluid_valve');
	
	e.recipes.createSequencedAssembly(['create:sturdy_sheet'], 'tfc:metal/sheet/steel', [
		e.recipes.createPressing('create:unprocessed_obsidian_sheet', 'create:unprocessed_obsidian_sheet'),
		e.recipes.createCutting('create:unprocessed_obsidian_sheet', 'create:unprocessed_obsidian_sheet').processingTime(100),
		e.recipes.createPressing('create:unprocessed_obsidian_sheet', 'create:unprocessed_obsidian_sheet')
	]).transitionalItem('create:unprocessed_obsidian_sheet').loops(1).id('kubejs:sequenced_assembly/sturdy_sheet_from_steel_sheet');
	e.recipes.createSequencedAssembly(['16x create:track'], '#create:sleepers', [
		e.recipes.createDeploying('create:incomplete_track', ['create:incomplete_track', 'tfc:metal/rod/steel']),
		e.recipes.createDeploying('create:incomplete_track', ['create:incomplete_track', 'tfc:metal/rod/steel']),
		e.recipes.createPressing('create:incomplete_track', 'create:incomplete_track')
	]).transitionalItem('create:incomplete_track').loops(1).id('kubejs:sequenced_assembly/track_from_steel_rods');
	e.recipes.createSequencedAssembly(['create:precision_mechanism'], 'tfc:brass_mechanisms', [
		e.recipes.createCutting('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism').processingTime(200),
		e.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:electron_tube']),
		e.recipes.createPressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism'),
		e.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:cogwheel']),
		e.recipes.createPressing('create:incomplete_precision_mechanism', 'create:incomplete_precision_mechanism')
	]).transitionalItem('create:incomplete_precision_mechanism').loops(3).id('kubejs:sequenced_assembly/precision_mechanism_from_brass_mechanisms');
	e.recipes.createSequencedAssembly(['immersiveengineering:component_iron'], 'tfc:metal/ingot/copper', [
		e.recipes.createDeploying('tfc:metal/ingot/copper', ['tfc:metal/ingot/copper', 'tfc:metal/sheet/wrought_iron'])
	]).transitionalItem('tfc:metal/ingot/copper').loops(4).id('kubejs:sequenced_assembly/iron_component_from_wrought_iron_sheets');
	e.recipes.createSequencedAssembly(['immersiveengineering:component_steel'], 'tfc:metal/ingot/copper', [
		e.recipes.createDeploying('tfc:metal/ingot/copper', ['tfc:metal/ingot/copper', 'tfc:metal/sheet/steel'])
	]).transitionalItem('tfc:metal/ingot/copper').loops(4).id('kubejs:sequenced_assembly/steel_component_from_steel_sheets');
	e.recipes.createSequencedAssembly(['immersiveengineering:heavy_engineering'], 'immersiveengineering:light_engineering', [
		e.recipes.createFilling('immersiveengineering:light_engineering', ['immersiveengineering:light_engineering', Fluid.of('tfc:metal/black_steel', 100)]),
		e.recipes.createDeploying('immersiveengineering:light_engineering', ['immersiveengineering:light_engineering', 'immersiveengineering:component_steel']),
		e.recipes.createPressing('immersiveengineering:light_engineering', 'immersiveengineering:light_engineering')
	]).transitionalItem('immersiveengineering:light_engineering').loops(4).id('kubejs:sequenced_assembly/heavy_engineering_from_black_steel');
	e.recipes.createSequencedAssembly(['immersiveengineering:cokebrick'], 'tfc:fire_bricks', [
		e.recipes.createDeploying('tfc:fire_bricks', ['tfc:fire_bricks', 'minecraft:brick']),
		e.recipes.createDeploying('tfc:fire_bricks', ['tfc:fire_bricks', 'tfc:ore/bituminous_coal']),
		e.recipes.createFilling('tfc:fire_bricks', ['tfc:fire_bricks', Fluid.of('minecraft:water', 250)])
	]).transitionalItem('tfc:fire_bricks').loops(2).id('kubejs:sequenced_assembly/coke_bricks_from_fire_bricks');
	
	e.recipes.createCutting('minecraft:stick', '#tfc:lumber').id('kubejs:cutting/stick');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_copper', 'minecraft:copper_block').id('kubejs:cutting/copper_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_lead', 'immersiveengineering:storage_lead').id('kubejs:cutting/lead_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_silver', 'immersiveengineering:storage_silver').id('kubejs:cutting/silver_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_nickel', 'immersiveengineering:storage_nickel').id('kubeks:cutting/nickel_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_constantan', 'immersiveengineering:storage_constantan').id('kubejs:cutting/constantan_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_electrum', 'immersiveengineering:storage_electrum').id('kubejs:cutting/electrum_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_steel', 'immersiveengineering:storage_steel').id('kubejs:cutting/steel_sheetmetal');
	e.recipes.createCutting('4x immersiveengineering:sheetmetal_gold', 'minecraft:gold_block').id('kubejs:cutting/gold_sheetmetal');
	e.recipes.createCutting('6x create:shaft', 'create:andesite_alloy').id('create:cutting/andesite_alloy');
	
	let cbc_melting = (input, output, amount, time, heat, id) => {
		e.custom({
			'type': 'createbigcannons:melting',
			'ingredients': [
			{
				'item': input
			}
			],
			'results': [
			{
				'fluid': output,
				'amount': amount
			}
			],
			'processingTime': time,
			'heatRequirement': heat
		}).id('kubejs:melting/' + id)
	}//time = ((amount^1.003)*temp)/7 #divide by 1.5 when superheated
	cbc_melting('kubejs:ore/rich_lead', 'kubejs:lead', 35, 1653, 'heated', 'rich_lead_heated')
	cbc_melting('kubejs:ore/rich_lead', 'kubejs:lead', 35, 1102, 'superheated', 'rich_lead_superheated')
	cbc_melting('kubejs:ore/poor_lead', 'kubejs:lead', 15, 706, 'heated', 'poor_lead_heated')
	cbc_melting('kubejs:ore/poor_lead', 'kubejs:lead', 15, 471, 'superheated', 'poor_lead_superheated')
	cbc_melting('kubejs:ore/normal_lead', 'kubejs:lead', 25, 1179, 'heated', 'normal_lead_heated')
	cbc_melting('kubejs:ore/normal_lead', 'kubejs:lead', 25, 786, 'superheated', 'normal_lead_superheated')
	cbc_melting('kubejs:ore/small_lead', 'kubejs:lead', 10, 470, 'heated', 'small_lead_heated')
	cbc_melting('kubejs:ore/small_lead', 'kubejs:lead', 10, 314, 'superheated', 'small_lead_superheated')
	cbc_melting('firmalife:ore/small_chromite', 'firmalife:metal/chromium', 10, 2743, 'heated', 'small_chromite_heated')
	cbc_melting('firmalife:ore/small_chromite', 'firmalife:metal/chromium', 10, 1829, 'superheated', 'small_chromite_superheated')
	cbc_melting('firmalife:ore/rich_chromite', 'firmalife:metal/chromium', 35, 9637, 'heated', 'rich_chromite_heated')
	cbc_melting('firmalife:ore/rich_chromite', 'firmalife:metal/chromium', 35, 6425, 'superheated', 'rich_chromite_superheated')
	cbc_melting('firmalife:ore/poor_chromite', 'firmalife:metal/chromium', 15, 4120, 'heated', 'poor_chromite_heated')
	cbc_melting('firmalife:ore/poor_chromite', 'firmalife:metal/chromium', 15, 2747, 'superheated', 'poor_chromite_superheated')
	cbc_melting('firmalife:ore/normal_chromite', 'firmalife:metal/chromium', 25, 6877, 'heated', 'normal_chromite_heated')
	cbc_melting('firmalife:ore/normal_chromite', 'firmalife:metal/chromium', 25, 4585, 'superheated', 'normal_chromite_superheated')
	cbc_melting('tfc:ore/small_tetrahedrite', 'tfc:metal/copper', 10, 1554, 'heated', 'small_tetrahedrite_heated')
	cbc_melting('tfc:ore/small_tetrahedrite', 'tfc:metal/copper', 10, 1036, 'superheated', 'small_tetrahedrite_superheated')
	cbc_melting('tfc:ore/rich_tetrahedrite', 'tfc:metal/copper', 35, 5458, 'heated', 'rich_tetrahedrite_heated')
	cbc_melting('tfc:ore/rich_tetrahedrite', 'tfc:metal/copper', 35, 3639, 'superheated', 'rich_tetrahedrite_superheated')
	cbc_melting('tfc:ore/poor_tetrahedrite', 'tfc:metal/copper', 15, 2333, 'heated', 'poor_tetrahedrite_heated')
	cbc_melting('tfc:ore/poor_tetrahedrite', 'tfc:metal/copper', 15, 1555, 'superheated', 'poor_tetrahedrite_superheated')
	cbc_melting('tfc:ore/normal_tetrahedrite', 'tfc:metal/copper', 15, 3895, 'heated', 'normal_tetrahedrite_heated')
	cbc_melting('tfc:ore/normal_tetrahedrite', 'tfc:metal/copper', 15, 2596, 'superheated', 'normal_tetrahedrite_superheated')
	cbc_melting('tfc:ore/small_malachite', 'tfc:metal/copper', 10, 1554, 'heated', 'small_malachite_heated')
	cbc_melting('tfc:ore/small_malachite', 'tfc:metal/copper', 10, 1036, 'superheated', 'small_malachite_superheated')
	cbc_melting('tfc:ore/rich_malachite', 'tfc:metal/copper', 35, 5458, 'heated', 'rich_malachite_heated')
	cbc_melting('tfc:ore/rich_malachite', 'tfc:metal/copper', 35, 3639, 'superheated', 'rich_malachite_superheated')
	cbc_melting('tfc:ore/poor_malachite', 'tfc:metal/copper', 15, 2333, 'heated', 'poor_malachite_heated')
	cbc_melting('tfc:ore/poor_malachite', 'tfc:metal/copper', 15, 1555, 'superheated', 'poor_malachite_superheated')
	cbc_melting('tfc:ore/normal_malachite', 'tfc:metal/copper', 15, 3895, 'heated', 'normal_malachite_heated')
	cbc_melting('tfc:ore/normal_malachite', 'tfc:metal/copper', 15, 2596, 'superheated', 'normal_malachite_superheated')
	cbc_melting('tfc:ore/small_native_copper', 'tfc:metal/copper', 10, 1554, 'heated', 'small_native_copper_heated')
	cbc_melting('tfc:ore/small_native_copper', 'tfc:metal/copper', 10, 1036, 'superheated', 'small_native_copper_superheated')
	cbc_melting('tfc:ore/rich_native_copper', 'tfc:metal/copper', 35, 5458, 'heated', 'rich_native_copper_heated')
	cbc_melting('tfc:ore/rich_native_copper', 'tfc:metal/copper', 35, 3639, 'superheated', 'rich_native_copper_superheated')
	cbc_melting('tfc:ore/poor_native_copper', 'tfc:metal/copper', 15, 2333, 'heated', 'poor_native_copper_heated')
	cbc_melting('tfc:ore/poor_native_copper', 'tfc:metal/copper', 15, 1555, 'superheated', 'poor_native_copper_superheated')
	cbc_melting('tfc:ore/normal_native_copper', 'tfc:metal/copper', 15, 3895, 'heated', 'normal_native_copper_heated')
	cbc_melting('tfc:ore/normal_native_copper', 'tfc:metal/copper', 15, 2596, 'superheated', 'normal_native_copper_superheated')
	cbc_melting('tfc:ore/small_sphalerite', 'tfc:metal/zinc', 10, 604, 'heated', 'small_sphalerite_heated')
	cbc_melting('tfc:ore/small_sphalerite', 'tfc:metal/zinc', 10, 403, 'superheated', 'small_sphalerite_superheated')
	cbc_melting('tfc:ore/rich_sphalerite', 'tfc:metal/zinc', 35, 2123, 'heated', 'rich_sphalerite_heated')
	cbc_melting('tfc:ore/rich_sphalerite', 'tfc:metal/zinc', 35, 1415, 'superheated', 'rich_sphalerite_superheated')
	cbc_melting('tfc:ore/poor_sphalerite', 'tfc:metal/zinc', 15, 907, 'heated', 'poor_sphalerite_heated')
	cbc_melting('tfc:ore/poor_sphalerite', 'tfc:metal/zinc', 15, 605, 'superheated', 'poor_sphalerite_superheated')
	cbc_melting('tfc:ore/normal_sphalerite', 'tfc:metal/zinc', 15, 1515, 'heated', 'normal_sphalerite_heated')
	cbc_melting('tfc:ore/normal_sphalerite', 'tfc:metal/zinc', 15, 1010, 'superheated', 'normal_sphalerite_superheated')
	cbc_melting('tfc:ore/small_limonite', 'tfc:metal/cast_iron', 10, 2208, 'heated', 'small_limonite_heated')
	cbc_melting('tfc:ore/small_limonite', 'tfc:metal/cast_iron', 10, 1472, 'superheated', 'small_limonite_superheated')
	cbc_melting('tfc:ore/rich_limonite', 'tfc:metal/cast_iron', 35, 7757, 'heated', 'rich_limonite_heated')
	cbc_melting('tfc:ore/rich_limonite', 'tfc:metal/cast_iron', 35, 5172, 'superheated', 'rich_limonite_superheated')
	cbc_melting('tfc:ore/poor_limonite', 'tfc:metal/cast_iron', 15, 3316, 'heated', 'poor_limonite_heated')
	cbc_melting('tfc:ore/poor_limonite', 'tfc:metal/cast_iron', 15, 2211, 'superheated', 'poor_limonite_superheated')
	cbc_melting('tfc:ore/normal_limonite', 'tfc:metal/cast_iron', 15, 5535, 'heated', 'normal_limonite_heated')
	cbc_melting('tfc:ore/normal_limonite', 'tfc:metal/cast_iron', 15, 3690, 'superheated', 'normal_limonite_superheated')
	cbc_melting('tfc:ore/small_magnetite', 'tfc:metal/cast_iron', 10, 2208, 'heated', 'small_magnetite_heated')
	cbc_melting('tfc:ore/small_magnetite', 'tfc:metal/cast_iron', 10, 1472, 'superheated', 'small_magnetite_superheated')
	cbc_melting('tfc:ore/rich_magnetite', 'tfc:metal/cast_iron', 35, 7757, 'heated', 'rich_magnetite_heated')
	cbc_melting('tfc:ore/rich_magnetite', 'tfc:metal/cast_iron', 35, 5172, 'superheated', 'rich_magnetite_superheated')
	cbc_melting('tfc:ore/poor_magnetite', 'tfc:metal/cast_iron', 15, 3316, 'heated', 'poor_magnetite_heated')
	cbc_melting('tfc:ore/poor_magnetite', 'tfc:metal/cast_iron', 15, 2211, 'superheated', 'poor_magnetite_superheated')
	cbc_melting('tfc:ore/normal_magnetite', 'tfc:metal/cast_iron', 15, 5535, 'heated', 'normal_magnetite_heated')
	cbc_melting('tfc:ore/normal_magnetite', 'tfc:metal/cast_iron', 15, 3690, 'superheated', 'normal_magnetite_superheated')
	cbc_melting('tfc:ore/small_hematite', 'tfc:metal/cast_iron', 10, 2208, 'heated', 'small_hematite_heated')
	cbc_melting('tfc:ore/small_hematite', 'tfc:metal/cast_iron', 10, 1472, 'superheated', 'small_hematite_superheated')
	cbc_melting('tfc:ore/rich_hematite', 'tfc:metal/cast_iron', 35, 7757, 'heated', 'rich_hematite_heated')
	cbc_melting('tfc:ore/rich_hematite', 'tfc:metal/cast_iron', 35, 5172, 'superheated', 'rich_hematite_superheated')
	cbc_melting('tfc:ore/poor_hematite', 'tfc:metal/cast_iron', 15, 3316, 'heated', 'poor_hematite_heated')
	cbc_melting('tfc:ore/poor_hematite', 'tfc:metal/cast_iron', 15, 2211, 'superheated', 'poor_hematite_superheated')
	cbc_melting('tfc:ore/normal_hematite', 'tfc:metal/cast_iron', 15, 5535, 'heated', 'normal_hematite_heated')
	cbc_melting('tfc:ore/normal_hematite', 'tfc:metal/cast_iron', 15, 3690, 'superheated', 'normal_hematite_superheated')
	cbc_melting('tfc:ore/small_garnierite', 'tfc:metal/nickel', 10, 2090, 'heated', 'small_garnierite_heated')
	cbc_melting('tfc:ore/small_garnierite', 'tfc:metal/nickel', 10, 1393, 'superheated', 'small_garnierite_superheated')
	cbc_melting('tfc:ore/rich_garnierite', 'tfc:metal/nickel', 35, 7343, 'heated', 'rich_garnierite_heated')
	cbc_melting('tfc:ore/rich_garnierite', 'tfc:metal/nickel', 35, 4895, 'superheated', 'rich_garnierite_superheated')
	cbc_melting('tfc:ore/poor_garnierite', 'tfc:metal/nickel', 15, 3139, 'heated', 'poor_garnierite_heated')
	cbc_melting('tfc:ore/poor_garnierite', 'tfc:metal/nickel', 15, 2093, 'superheated', 'poor_garnierite_superheated')
	cbc_melting('tfc:ore/normal_garnierite', 'tfc:metal/nickel', 25, 5240, 'heated', 'normal_garnierite_heated')
	cbc_melting('tfc:ore/normal_garnierite', 'tfc:metal/nickel', 25, 3493, 'superheated', 'normal_garnierite_superheated')
	cbc_melting('tfc:ore/small_bismuthinite', 'tfc:metal/bismuth', 10, 388, 'heated', 'small_bismuthinite_heated')
	cbc_melting('tfc:ore/small_bismuthinite', 'tfc:metal/bismuth', 10, 259, 'superheated', 'small_bismuthinite_superheated')
	cbc_melting('tfc:ore/rich_bismuthinite', 'tfc:metal/bismuth', 35, 1364, 'heated', 'rich_bismuthinite_heated')
	cbc_melting('tfc:ore/rich_bismuthinite', 'tfc:metal/bismuth', 35, 910, 'superheated', 'rich_bismuthinite_superheated')
	cbc_melting('tfc:ore/poor_bismuthinite', 'tfc:metal/bismuth', 15, 583, 'heated', 'poor_bismuthinite_heated')
	cbc_melting('tfc:ore/poor_bismuthinite', 'tfc:metal/bismuth', 15, 389, 'superheated', 'poor_bismuthinite_superheated')
	cbc_melting('tfc:ore/normal_bismuthinite', 'tfc:metal/bismuth', 25, 974, 'heated', 'normal_bismuthinite_heated')
	cbc_melting('tfc:ore/normal_bismuthinite', 'tfc:metal/bismuth', 25, 649, 'superheated', 'normal_bismuthinite_superheated')
	cbc_melting('tfc:ore/small_cassiterite', 'tfc:metal/tin', 10, 331, 'heated', 'small_cassiterite_heated')
	cbc_melting('tfc:ore/small_cassiterite', 'tfc:metal/tin', 10, 221, 'superheated', 'small_cassiterite_superheated')
	cbc_melting('tfc:ore/rich_cassiterite', 'tfc:metal/tin', 35, 1162, 'heated', 'rich_cassiterite_heated')
	cbc_melting('tfc:ore/rich_cassiterite', 'tfc:metal/tin', 35, 775, 'superheated', 'rich_cassiterite_superheated')
	cbc_melting('tfc:ore/poor_cassiterite', 'tfc:metal/tin', 15, 497, 'heated', 'poor_cassiterite_heated')
	cbc_melting('tfc:ore/poor_cassiterite', 'tfc:metal/tin', 15, 331, 'superheated', 'poor_cassiterite_superheated')
	cbc_melting('tfc:ore/normal_cassiterite', 'tfc:metal/tin', 25, 829, 'heated', 'normal_cassiterite_heated')
	cbc_melting('tfc:ore/normal_cassiterite', 'tfc:metal/tin', 25, 553, 'superheated', 'normal_cassiterite_superheated')
	cbc_melting('tfc:ore/small_native_silver', 'tfc:metal/silver', 10, 1382, 'heated', 'small_native_silver_heated')
	cbc_melting('tfc:ore/small_native_silver', 'tfc:metal/silver', 10, 922, 'superheated', 'small_native_silver_superheated')
	cbc_melting('tfc:ore/rich_native_silver', 'tfc:metal/silver', 35, 4857, 'heated', 'rich_native_silver_heated')
	cbc_melting('tfc:ore/rich_native_silver', 'tfc:metal/silver', 35, 3238, 'superheated', 'rich_native_silver_superheated')
	cbc_melting('tfc:ore/poor_native_silver', 'tfc:metal/silver', 15, 2076, 'heated', 'poor_native_silver_heated')
	cbc_melting('tfc:ore/poor_native_silver', 'tfc:metal/silver', 15, 1384, 'superheated', 'poor_native_silver_superheated')
	cbc_melting('tfc:ore/normal_native_silver', 'tfc:metal/silver', 25, 3465, 'heated', 'normal_native_silver_heated')
	cbc_melting('tfc:ore/normal_native_silver', 'tfc:metal/silver', 25, 2310, 'superheated', 'normal_native_silver_superheated')
	cbc_melting('tfc:ore/small_native_gold', 'tfc:metal/gold', 10, 1525, 'heated', 'small_native_gold_heated')
	cbc_melting('tfc:ore/small_native_gold', 'tfc:metal/gold', 10, 1017, 'superheated', 'small_native_gold_superheated')
	cbc_melting('tfc:ore/rich_native_gold', 'tfc:metal/gold', 35, 5357, 'heated', 'rich_native_gold_heated')
	cbc_melting('tfc:ore/rich_native_gold', 'tfc:metal/gold', 35, 3571, 'superheated', 'rich_native_gold_superheated')
	cbc_melting('tfc:ore/poor_native_gold', 'tfc:metal/gold', 15, 2290, 'heated', 'poor_native_gold_heated')
	cbc_melting('tfc:ore/poor_native_gold', 'tfc:metal/gold', 15, 1527, 'superheated', 'poor_native_gold_superheated')
	cbc_melting('tfc:ore/normal_native_gold', 'tfc:metal/gold', 25, 3822, 'heated', 'normal_native_gold_heated')
	cbc_melting('tfc:ore/normal_native_gold', 'tfc:metal/gold', 25, 2548, 'superheated', 'normal_native_gold_superheated')
	
	let tfc_welding_tag = (in1, in2, tier, out, count, id) => {
		e.custom({
			'type': 'tfc:welding',
			'first_input': { 'item': in1 },
			'second_input': { 'tag': in2 },
			'tier': tier,
			'result': { 'item': out, 'count': count }
		}).id('kubejs:weld/' + id)
	}
	let tfc_welding_item = (in1, in2, tier, out, count, id) => {
		e.custom({
			'type': 'tfc:welding',
			'first_input': { 'item': in1 },
			'second_input': { 'item': in2 },
			'tier': tier,
			'result': { 'item': out, 'count': count }
		}).id('kubejs:weld/' + id)
	}
	tfc_welding_tag('tfc:metal/ingot/wrought_iron', 'forge:cobblestone/normal', 1, 'create:andesite_alloy', 15, 'composite_material_from_wrought_iron')
	tfc_welding_tag('tfc:metal/ingot/zinc', 'forge:cobblestone/normal', 1, 'create:andesite_alloy', 5, 'composite_material_from_zinc')
	tfc_welding_tag('tfc:metal/helmet/copper', 'forge:glass', 2, 'create:diving_helmet', 1, 'diving_helmet_from_tfc_copper_helmet')
	tfc_welding_item('tfc:metal/sheet/copper', 'tfc:metal/rod/copper', 1, 'create:fluid_pipe', 6, 'fluid_pipe_from_tfc_coppers')
	tfc_welding_item('tfc:fire_bricks', 'tfc:metal/double_sheet/steel', 4, 'immersiveengineering:alloybrick', 1, 'alloy_bricks_from_tfc')
	tfc_welding_item('immersiveengineering:ingot_electrum', 'immersiveengineering:ingot_electrum', 3, 'immersiveengineering:nugget_electrum', 1, 'double_electrum_ingot')
	tfc_welding_item('immersiveengineering:ingot_constantan', 'immersiveengineering:ingot_constantan', 2, 'immersiveengineering:nugget_constantan', 1, 'double_constantan_ingot')
	tfc_welding_item('immersiveengineering:ingot_lead', 'immersiveengineering:ingot_lead', 1, 'immersiveengineering:nugget_lead', 1, 'double_lead_ingot')
	tfc_welding_item('tfc:metal/boots/copper', 'create:andesite_alloy', 2, 'create:diving_boots', 1, 'diving_boots_from_tfc_copper_boots')
	tfc_welding_item('firmalife:metal/sheet/stainless_steel', 'firmalife:metal/rod/stainless_steel', 4, 'immersiveengineering:fluid_pipe', 6, 'fluid_pipe_from_firmalife_stainless_steels')
	tfc_welding_tag('tfc:metal/ingot/steel', 'forge:cobblestone/normal', 1, 'create:andesite_alloy', 25, 'composite_material_from_steel')
	
	let tfc_anvil = (input, output, count, tier, rule_1, rule_2, rule_3, id) => {
		e.custom({
			'type': 'tfc:anvil',
			'input': { 'item': input },
			'result': { 'item': output, 'count': count },
			'tier': tier,
			'rules': [ rule_1 + '_last', rule_2 + '_second_last', rule_3 + '_third_last' ]
		}).id('kubejs:anvil/' + id)
	}
	tfc_anvil('tfc:metal/rod/brass', 'create:brass_ladder', 3, 2, 'draw', 'bend', 'draw', 'brass_ladder_working')
	tfc_anvil('tfc:metal/rod/copper', 'create:copper_ladder', 3, 1, 'draw', 'bend', 'draw', 'copper_ladder_working')
	tfc_anvil('immersiveengineering:nugget_electrum', 'immersiveengineering:plate_electrum', 1, 3, 'hit', 'hit', 'hit', 'electrum_sheet_working')
	tfc_anvil('immersiveengineering:nugget_constantan', 'immersiveengineering:plate_constantan', 1, 2, 'hit', 'hit', 'hit', 'constantan_sheet_working')
	tfc_anvil('immersiveengineering:nugget_lead', 'immersiveengineering:plate_lead', 1, 1, 'hit', 'hit', 'hit', 'lead_sheet_working')
	tfc_anvil('immersiveengineering:ingot_electrum', 'immersiveposts:stick_electrum', 2, 3, 'bend', 'draw', 'draw', 'electrum_rod_working')
	tfc_anvil('immersiveengineering:ingot_constantan', 'immersiveposts:stick_constantan', 2, 2, 'bend', 'draw', 'draw', 'constantan_rod_working')
	tfc_anvil('immersiveengineering:ingot_lead', 'immersiveposts:stick_lead', 2, 1, 'bend', 'draw', 'draw', 'lead_rod_working')
	
	let tfc_heating = (input, output, amount, temperature, id) => {
		e.custom({
			'type': 'tfc:heating',
			'ingredient': { 'item': input },
			'result_fluid': { 'fluid': output, 'amount': amount },
			'temperature': temperature
		}).id('kubejs:heat/' + id)
	}
	tfc_heating('immersiveengineering:ingot_constantan', 'kubejs:constantan', 100, 1266, 'constantan_ingot')
	tfc_heating('immersiveengineering:ingot_electrum', 'kubejs:electrum', 100, 1010, 'electrum_ingot')
	tfc_heating('immersiveengineering:ingot_lead', 'kubejs:lead', 100, 327, 'lead_ingot')
	tfc_heating('immersiveengineering:nugget_constantan', 'kubejs:constantan', 200, 1266, 'constantan_double_ingot')
	tfc_heating('immersiveengineering:nugget_electrum', 'kubejs:electrum', 200, 1010, 'electrum_double_ingot')
	tfc_heating('immersiveengineering:nugget_lead', 'kubejs:lead', 200, 327, 'lead_double_ingot')
	tfc_heating('immersiveengineering:plate_constantan', 'kubejs:constantan', 200, 1266, 'constantan_sheet')
	tfc_heating('immersiveengineering:plate_electrum', 'kubejs:electrum', 200, 1010, 'electrum_sheet')
	tfc_heating('immersiveengineering:plate_lead', 'kubejs:lead', 200, 327, 'lead_plate')
	tfc_heating('immersiveposts:stick_constantan', 'kubejs:constantan', 50, 1266, 'constantan_rod')
	tfc_heating('immersiveposts:stick_electrum', 'kubejs:electrum', 50, 1010, 'electrum_rod')
	tfc_heating('immersiveposts:stick_lead', 'kubejs:lead', 50, 327, 'lead_rod')
	tfc_heating('kubejs:ore/normal_lead', 'kubejs:lead', 25, 327, 'normal_lead_ore')
	tfc_heating('kubejs:ore/poor_lead', 'kubejs:lead', 15, 327, 'poor_lead_ore')
	tfc_heating('kubejs:ore/rich_lead', 'kubejs:lead', 35, 327, 'rich_lead_ore')
	tfc_heating('kubejs:ore/small_lead', 'kubejs:lead', 10, 327, 'small_lead_ore')
	tfc_heating('firmalife:metal/ingot/chromium', 'firmalife:metal/chromium', 100, 1907, 'chromium_ingot')
	tfc_heating('firmalife:metal/sheet/chromium', 'firmalife:metal/chromium', 200, 1907, 'chromium_sheet')
	tfc_heating('firmalife:metal/double_ingot/chromium', 'firmalife:metal/chromium', 200, 1907, 'chromium_double_ingot')
	tfc_heating('firmalife:metal/double_sheet/chromium', 'firmalife:metal/chromium', 400, 1907, 'chromium_double_sheet')
	tfc_heating('firmalife:metal/rod/chromium', 'firmalife:metal/chromium', 50, 1907, 'chromium_rod')
	tfc_heating('firmalife:metal/ingot/stainless_steel', 'firmalife:metal/stainless_steel', 100, 1540, 'stainless_steel_ingot')
	tfc_heating('firmalife:metal/sheet/stainless_steel', 'firmalife:metal/stainless_steel', 200, 1540, 'stainless_steel_sheet')
	tfc_heating('firmalife:metal/double_ingot/stainless_steel', 'firmalife:metal/stainless_steel', 200, 1540, 'stainless_steel_double_ingot')
	tfc_heating('firmalife:metal/double_sheet/stainless_steel', 'firmalife:metal/stainless_steel', 400, 1540, 'stainless_steel_double_sheet')
	tfc_heating('firmalife:metal/rod/stainless_steel', 'firmalife:metal/stainless_steel', 50, 1540, 'stainless_steel_rod')
	tfc_heating('firmalife:ore/small_chromite', 'firmalife:metal/chromium', 10, 1907, 'small_chromite')
	tfc_heating('firmalife:ore/poor_chromite', 'firmalife:metal/chromium', 15, 1907, 'poor_chromite')
	tfc_heating('firmalife:ore/normal_chromite', 'firmalife:metal/chromium', 25, 1907, 'normal_chromite')
	tfc_heating('firmalife:ore/rich_chromite', 'firmalife:metal/chromium', 35, 1907, 'rich_chromite')
	tfc_heating('create:zinc_block', 'tfc:metal/zinc', 250, 420, 'zinc_block')
	tfc_heating('immersiveengineering:storage_electrum', 'kubejs:electrum', 250, 1010, 'electrum_block')
	tfc_heating('create:brass_block', 'tfc:metal/brass', 250, 930, 'brass_block')
	tfc_heating('immersiveengineering:storage_steel', 'tfc:metal/steel', 250, 1540, 'steel_block')
	tfc_heating('immersiveengineering:storage_constantan', 'kubejs:constantan', 250, 1266, 'constantan_block')
	tfc_heating('immersiveengineering:storage_nickel', 'tfc:metal/nickel', 250, 1453, 'nickel_block')
	tfc_heating('immersiveengineering:storage_silver', 'tfc:metal/silver', 250, 961, 'silver_block')
	tfc_heating('immersiveengineering:storage_lead', 'kubejs:lead', 250, 327, 'lead_block')
	tfc_heating('minecraft:gold_block', 'tfc:metal/gold', 250, 1060, 'gold_block')
	tfc_heating('minecraft:copper_block', 'tfc:metal/copper', 250, 1080, 'copper_block')
	
	let tfc_casting = (input, amount, output, chance, id) => {
		e.custom({
			'type': 'tfc:casting',
			'mold': { 'item': 'tfc:ceramic/ingot_mold' },
			'fluid': { 'ingredient': input, 'amount': amount },
			'result': { 'item': output },
			'break_chance': chance
		}).id('kubejs:casting/' + id)
	}
	tfc_casting('kubejs:electrum', 100, 'immersiveengineering:ingot_electrum', 0.1, 'electrum_ingot')
	tfc_casting('kubejs:constantan', 100, 'immersiveengineering:ingot_constantan', 0.1, 'constantan_ingot')
	tfc_casting('kubejs:lead', 100, 'immersiveengineering:ingot_lead', 0.1, 'lead_ingot')
	
	let tfc_alloy = (output, input1, min1, max1, input2, min2, max2, id) => {
		e.custom({
			'type': 'tfc:alloy',
			'result': output,
			'contents': [
			{ 'metal': input1, 'min': min1, 'max': max1 },
			{ 'metal': input2, 'min': min2, 'max': max2 }
			]
		}).id('kubejs:alloy/' + id)
	}
	tfc_alloy('tfc:electrum', 'tfc:gold', 0.4, 0.6, 'tfc:silver', 0.4, 0.6, 'electrum_from_gold_silver')
	tfc_alloy('tfc:constantan', 'tfc:copper', 0.5, 0.6, 'tfc:nickel', 0.4, 0.5, 'constantan_from_copper_nickel')
	
	let tfc_sealed_barrel_item = (input_item, input_fluid, amount, output, duration, id) => {
		e.custom({
			'type': 'tfc:barrel_sealed',
			'input_item': {
				'ingredient': {
					'item': input_item
				}
			},
			'input_fluid': {
				'ingredient': {
					'fluid': input_fluid
				},
				'amount': amount
			},
			'output_item': {
				'item': output
			},
			'duration': duration
		}).id('kubejs:barrel_sealed/' + id)
	}
	let tfc_sealed_barrel_tag = (input_tag, input_fluid, amount, output, duration, id) => {
		e.custom({
			'type': 'tfc:barrel_sealed',
			'input_item': {
				'ingredient': {
					'tag': input_tag
				}
			},
			'input_fluid': {
				'ingredient': {
					'fluid': input_fluid
				},
				'amount': amount
			},
			'output_item': {
				'item': output
			},
			'duration': duration
		}).id('kubejs:barrel_sealed/' + id)
	}
	tfc_sealed_barrel_item('tfc:straw', 'tfc:vinegar', 50, 'minecraft:paper', 1000, 'paper_from_vinegar')
	colors.forEach(color => {
		tfc_sealed_barrel_tag('forge:sheetmetal/colorless', 'tfc:' + color + '_dye', 125, 'immersiveengineering:sheetmetal_colored_' + color, 1000, color + '_sheetmetal')
	})
	
	let tfc_chisel = (input, output, mode, id) => {
		e.custom({
			'type': 'tfc:chisel',
			'ingredient': input,
			'result': output,
			'mode': mode
		}).id('kubejs:chisel/' + mode + '/' + id)
	}
	let tfc_chisel_extra = (input, output, mode, extra, id) => {
		e.custom({
			'type': 'tfc:chisel',
			'ingredient': input,
			'result': output,
			'mode': mode,
			'extra_drop': {
				'item': extra
			}
		}).id('kubejs:chisel/' + mode + '/' + id)
	}
	sheetmetals.forEach(sheetmetal => {
		tfc_chisel_extra('immersiveengineering:sheetmetal_' + sheetmetal, 'immersiveengineering:slab_sheetmetal_' + sheetmetal, 'slab', 'immersiveengineering:slab_sheetmetal_' + sheetmetal, 'sheetmetal_' + sheetmetal)
	})
	tfc_chisel_extra('immersiveengineering:treated_wood_horizontal', 'immersiveengineering:slab_treated_wood_horizontal', 'slab', 'immersiveengineering:slab_treated_wood_horizontal', 'stained_wood_horizontal')
	tfc_chisel('immersiveengineering:treated_wood_horizontal', 'immersiveengineering:stairs_treated_wood_horizontal', 'stair', 'stained_wood_horizontal')
	tfc_chisel_extra('immersiveengineering:treated_wood_vertical', 'immersiveengineering:slab_treated_wood_vertical', 'slab', 'immersiveengineering:slab_treated_wood_vertical', 'stained_wood_vertical')
	tfc_chisel('immersiveengineering:treated_wood_vertical', 'immersiveengineering:stairs_treated_wood_vertical', 'stair', 'stained_wood_vertical')
	tfc_chisel_extra('immersiveengineering:treated_wood_packaged', 'immersiveengineering:slab_treated_wood_packaged', 'slab', 'immersiveengineering:slab_treated_wood_packaged', 'stained_wood_packaged')
	tfc_chisel('immersiveengineering:treated_wood_packaged', 'immersiveengineering:stairs_treated_wood_packaged', 'stair', 'stained_wood_packaged')
	
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_copper', '1x tfc:metal/sheet/copper', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/copper_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_electrum', '1x immersiveengineering:plate_electrum', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/electrum_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_aluminum', '1x immersiveengineering:plate_aluminum', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/aluminum_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_steel', '1x tfc:metal/sheet/steel', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/steel_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_lead', '1x immersiveengineering:plate_lead', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/lead_wire');
	
	e.recipes.immersiveengineeringCokeOven('2x immersiveengineering:coal_coke', '1x tfc:ore/bituminous_coal').creosote(250).time(9600).id('immersiveengineering:cokeoven/coke');
	e.recipes.immersiveengineeringCokeOven('1x minecraft:charcoal', '2x #tfc:log_pile_logs').creosote(50).time(1200).id('immersiveengineering:cokeoven/charcoal');
	
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_copper', 'minecraft:copper_block').id('kubejs:sawmill/copper_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_lead', 'immersiveengineering:storage_lead').id('kubejs:sawmill/lead_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_silver', 'immersiveengineering:storage_silver').id('kubejs:sawmill/silver_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_nickel', 'immersiveengineering:storage_nickel').id('kubeks:sawmill/nickel_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_constantan', 'immersiveengineering:storage_constantan').id('kubejs:sawmill/constantan_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_electrum', 'immersiveengineering:storage_electrum').id('kubejs:sawmill/electrum_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_steel', 'immersiveengineering:storage_steel').id('kubejs:sawmill/steel_sheetmetal');
	e.recipes.immersiveengineeringSawmill('4x immersiveengineering:sheetmetal_gold', 'minecraft:gold_block').id('kubejs:sawmill/gold_sheetmetal');
	
	e.recipes.immersiveengineeringAlloy('2x immersiveengineering:insulating_glass', '2x #forge:glass', 'immersiveengineering:dust_copper').id('kubejs:kiln/insulating_glass');
	
	e.recipes.immersiveengineeringBlastFurnace('tfc:metal/ingot/steel', 'tfc:metal/ingot/cast_iron', 'immersiveengineering:slag').time(1200).id('kubejs:blastfurnace/steel_ingot_cast_iron');
	e.recipes.immersiveengineeringBlastFurnace('tfc:metal/double_ingot/steel', 'tfc:metal/double_ingot/cast_iron', 'immersiveengineering:slag').time(2400).id('kubejs:blastfurnace/steel_double_ingot_cast_iron');
	e.recipes.immersiveengineeringBlastFurnace('tfc:metal/ingot/steel', 'tfc:metal/ingot/wrought_iron', 'immersiveengineering:slag').time(1200).id('kubejs:blastfurnace/steel_ingot_wrought_iron');
	e.recipes.immersiveengineeringBlastFurnace('tfc:metal/double_ingot/steel', 'tfc:metal/double_ingot/wrought_iron', 'immersiveengineering:slag').time(2400).id('kubejs:blastfurnace/steel_double_ingot_wrought_iron');
	
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
	sands.forEach(sand => {
		e.recipes.immersiveengineeringCrusher('2x tfc:sand/' + sand, 'tfc:raw_sandstone/' + sand/*, [{chance:0.5, output: 'immersiveengineering:dust_saltpeter'}]*/).id('kubejs:crusher/' + sand)
	})//I don't know why the secondaries won't work, but they won't
	e.recipes.immersiveengineeringCrusher('4x tfc:fire_clay', 'tfc:fire_clay_block').id('kubejs:crusher/fire_clay_block');
	
	//blueprints
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'item': 'tfc:metal/sheet/wrought_iron',
			'count': 2
		},
		{
			'item': 'tfc:metal/ingot/copper',
			'count': 1
		},
		{
			'item': 'create:cogwheel',
			'count': 2
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:component_iron',
			'count': 1
		}
		}).id('kubejs:blueprint_components/iron_component_from_wrought_iron_sheets');
		e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'item': 'tfc:metal/sheet/steel',
			'count': 2
		},
		{
			'item': 'tfc:metal/ingot/copper',
			'count': 1
		},
		{
			'item': 'create:large_cogwheel',
			'count': 2
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:component_steel',
			'count': 1
		}
	}).id('kubejs:blueprint_components/steel_component_from_steel_sheets');
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'tag': 'forge:glass/colorless',
			'count': 1
		},
		{
			'item': 'immersiveengineering:wire_copper',
			'count': 1
		},
		{
			'item': 'tfc:metal/sheet/nickel',
			'count': 1
		},
		{
			'item': 'minecraft:redstone',
			'count': 1
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:electron_tube',
			'count': 3
		}
	}).id('kubejs:blueprint_components/vacuum_tube_from_tfc');
	e.custom({
		'type': 'immersiveengineering:blueprint',
		'inputs': [
		{
			'tag': 'forge:glass/colorless',
			'count': 1
		},
		{
			'item': 'immersiveengineering:wire_copper',
			'count': 1
		},
		{
			'item': 'tfc:metal/rod/nickel',
			'count': 1
		},
		{
			'item': 'tfc:powder/graphite',
			'count': 2
		}
		],
		'category': 'components',
		'result': {
			'item': 'immersiveengineering:light_bulb',
			'count': 1
		}
	}).id('kubejs:blueprint_components/light_blub_from_tfc');
	
	e.custom({
		'type': 'tfc:leather_knapping',
		'pattern': [
		'XX XX',
		'X   X',
		'X   X',
		'X   X',
		'XXXXX'
		],
		'result': {
			'item': 'kubejs:leather_pouch'
		}
	}).id('kubejs:leather_knapping/leather_pouch');
	
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
})