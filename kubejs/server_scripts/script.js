// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

console.info('Welcome to my personal hell!')

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let json_stones = ["granite", "diorite", "gabbro", "shale", "claystone", "limestone", "conglomerate", "dolomite", "chert", "chalk", "rhyolite", "basalt", "andesite", "dacite", "quartzite", "slate", "phyllite", "schist", "gneiss", "marble"]

let powders = ['amethyst', 'diamond', 'emerald', 'lapis_lazuli', 'opal', 'pyrite', 'ruby', 'sapphire', 'topaz', 'graphite', 'kaolinite', 'sylvite', 'sulfur', 'saltpeter']

let metals = ['malachite', 'hematite', 'limonite']

let grains = ['barley', 'maize', 'oat', 'rye', 'rice', 'wheat']

let molds = ["plate", "gear", "rod", "bullet_casing", "wire", "packing_4", "packing_9", "unpacking"]

onEvent('recipes', e => {
	let tfc_collapse = (input, output) => {
		e.custom({
			"type": "tfc:collapse",
			"ingredient": input,
			"result": output
		})
	}
	stones.forEach(rock => {
		e.recipes.createMilling(['1x tfc:rock/gravel/' + rock], 'tfc:rock/cobble/' + rock).id('kubejs:milling/' + rock)
	});
	powders.forEach(powder => {
		e.recipes.createCrushing(['4x tfc:powder/' + powder, Item.of('tfc:powder/' + powder).withChance(0.35)], 'tfc:ore/' + powder).id('kubejs:crushing/' + powder)
	});
	metals.forEach(metal => {
		e.recipes.createCrushing(['2x tfc:powder/' + metal, Item.of('tfc:powder/' + metal).withChance(0.15)], 'tfc:ore/small_' + metal).id('kubejs:crushing/small_' + metal);
		e.recipes.createCrushing(['3x tfc:powder/' + metal, Item.of('tfc:powder/' + metal).withChance(0.15)], 'tfc:ore/poor_' + metal).id('kubejs:crushing/poor_' + metal);
		e.recipes.createCrushing(['5x tfc:powder/' + metal, Item.of('tfc:powder/' + metal).withChance(0.15)], 'tfc:ore/normal_' + metal).id('kubejs:crushing/normal_' + metal);
		e.recipes.createCrushing(['7x tfc:powder/' + metal, Item.of('tfc:powder/' + metal).withChance(0.15)], 'tfc:ore/rich_' + metal).id('kubejs:crushing/rich_' + metal);
	});
	grains.forEach(grain => {
		e.recipes.createMilling(['1x tfc:food/' + grain + '_flour'], 'tfc:food/' + grain + '_grain').id('kubejs:milling/' + grain);
	});
	json_stones.forEach(stone => {
		tfc_collapse("kubejs:ore/rich_lead/" + stone, "kubejs:ore/normal_lead/" + stone)
		tfc_collapse("kubejs:ore/normal_lead/" + stone, "kubejs:ore/poor_lead/" + stone)
		tfc_collapse("kubejs:ore/poor_lead/" + stone, "tfc:rock/cobble/" + stone)
	})
	
	let mold_blueprint = (result) => {
		e.custom({
			"type": "immersiveengineering:blueprint",
			"inputs": [
			{
				"item": "tfc:metal/double_sheet/black_steel"
			},
			{
				"item": "immersiveengineering:wirecutter"
			}
			],
			"category": "molds",
			"result": {
				"item": "immersiveengineering:mold_" + result
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
	
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_native_copper').withChance(0.015),
	Item.of('tfc:ore/small_native_gold').withChance(0.015),
	Item.of('tfc:ore/small_hematite').withChance(0.015),
	Item.of('tfc:ore/sulfur').withChance(0.007)
	], 'tfc:rock/gravel/rhyolite').id('kubejs:washing/rhyolite');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_native_copper').withChance(0.015),
	Item.of('tfc:ore/small_native_gold').withChance(0.015),
	Item.of('tfc:ore/small_hematite').withChance(0.015),
	Item.of('tfc:ore/sulfur').withChance(0.007)
	], 'tfc:rock/gravel/basalt').id('kubejs:washing/basalt');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_native_copper').withChance(0.015),
	Item.of('tfc:ore/small_native_gold').withChance(0.015),
	Item.of('tfc:ore/small_hematite').withChance(0.015),
	Item.of('tfc:ore/sulfur').withChance(0.007)
	], 'tfc:rock/gravel/andesite').id('kubejs:washing/andesite');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_native_copper').withChance(0.015),
	Item.of('tfc:ore/small_native_gold').withChance(0.015),
	Item.of('tfc:ore/small_hematite').withChance(0.015),
	Item.of('tfc:ore/sulfur').withChance(0.007)
	], 'tfc:rock/gravel/dacite').id('kubejs:washing/dacite');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_native_gold').withChance(0.015),
	Item.of('tfc:ore/small_native_silver').withChance(0.015),
	Item.of('tfc:ore/small_cassiterite').withChance(0.015),
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/cryolite').withChance(0.01),
	Item.of('tfc:ore/cinnabar').withChance(0.008),
	Item.of('tfc:ore/sulfur').withChance(0.003),
	Item.of('tfc:ore/topaz').withChance(0.003),
	Item.of('tfc:ore/small_garnierite').withChance(0.002),
	Item.of('tfc:ore/emerald').withChance(0.0002)
	], 'tfc:rock/gravel/granite').id('kubejs:washing/granite');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_native_gold').withChance(0.015),
	Item.of('tfc:ore/small_cassiterite').withChance(0.015),
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/cinnabar').withChance(0.008),
	Item.of('tfc:ore/sulfur').withChance(0.003),
	Item.of('tfc:ore/small_garnierite').withChance(0.002),
	Item.of('tfc:ore/emerald').withChance(0.0002)
	], 'tfc:rock/gravel/diorite').id('kubejs:washing/diorite');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_native_gold').withChance(0.015),
	Item.of('tfc:ore/small_cassiterite').withChance(0.015),
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/small_garnierite').withChance(0.015),
	Item.of('tfc:ore/cinnabar').withChance(0.008),
	Item.of('tfc:ore/sulfur').withChance(0.003),
	Item.of('tfc:ore/emerald').withChance(0.0002),
	Item.of('tfc:ore/diamond').withChance(0.0001)
	], 'tfc:rock/gravel/gabbro').id('kubejs:washing/gabbro');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_native_silver').withChance(0.015),
	Item.of('tfc:ore/small_sphalerite').withChance(0.015),
	Item.of('tfc:ore/small_tetrahedrite').withChance(0.015),
	Item.of('tfc:ore/graphite').withChance(0.01),
	Item.of('tfc:ore/gypsum').withChance(0.01)
	], 'tfc:rock/gravel/gneiss').id('kubejs:washing/gneiss');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_sphalerite').withChance(0.015),
	Item.of('tfc:ore/small_tetrahedrite').withChance(0.015),
	Item.of('tfc:ore/small_native_silver').withChance(0.01),
	Item.of('tfc:ore/graphite').withChance(0.01),
	Item.of('tfc:ore/gypsum').withChance(0.01),
	Item.of('tfc:ore/cinnabar').withChance(0.008),
	Item.of('tfc:ore/opal').withChance(0.0005)
	], 'tfc:rock/gravel/quartzite').id('kubejs:washing/quartzite');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_sphalerite').withChance(0.015),
	Item.of('tfc:ore/small_tetrahedrite').withChance(0.015),
	Item.of('tfc:ore/small_native_silver').withChance(0.01),
	Item.of('tfc:ore/gypsum').withChance(0.01)
	], 'tfc:rock/gravel/slate').id('kubejs:washing/slate');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_sphalerite').withChance(0.015),
	Item.of('tfc:ore/small_tetrahedrite').withChance(0.015),
	Item.of('tfc:ore/small_native_silver').withChance(0.01),
	Item.of('tfc:ore/gypsum').withChance(0.01),
	Item.of('tfc:ore/small_malachite').withChance(0.005)
	], 'tfc:rock/gravel/phyllite').id('kubejs:washing/phyllite');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_sphalerite').withChance(0.015),
	Item.of('tfc:ore/small_tetrahedrite').withChance(0.015),
	Item.of('tfc:ore/small_native_silver').withChance(0.01),
	Item.of('tfc:ore/graphite').withChance(0.01),
	Item.of('tfc:ore/gypsum').withChance(0.01)
	], 'tfc:rock/gravel/schist').id('kubejs:washing/schist');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_malachite').withChance(0.015),
	Item.of('tfc:ore/small_sphalerite').withChance(0.015),
	Item.of('tfc:ore/small_tetrahedrite').withChance(0.015),
	Item.of('tfc:ore/small_native_silver').withChance(0.01),
	Item.of('tfc:ore/graphite').withChance(0.01),
	Item.of('tfc:ore/lapis_lazuli').withChance(0.01),
	Item.of('tfc:ore/gypsum').withChance(0.01)
	], 'tfc:rock/gravel/marble').id('kubejs:washing/marble');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/small_magnetite').withChance(0.015),
	Item.of('tfc:ore/small_limonite').withChance(0.015),
	Item.of('tfc:ore/kaolinite').withChance(0.01),
	Item.of('tfc:ore/saltpeter').withChance(0.01),
	Item.of('tfc:ore/sylvite').withChance(0.01),
	Item.of('tfc:ore/borax').withChance(0.01),
	Item.of('tfc:ore/cinnabar').withChance(0.008),
	Item.of('tfc:ore/halite').withChance(0.007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.004),
	Item.of('tfc:ore/lignite').withChance(0.002),
	Item.of('tfc:ore/ruby').withChance(0.0005)
	], 'tfc:rock/gravel/shale').id('kubejs:washing/shale');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/small_magnetite').withChance(0.015),
	Item.of('tfc:ore/small_limonite').withChance(0.015),
	Item.of('tfc:ore/kaolinite').withChance(0.01),
	Item.of('tfc:ore/saltpeter').withChance(0.01),
	Item.of('tfc:ore/sylvite').withChance(0.01),
	Item.of('tfc:ore/borax').withChance(0.01),
	Item.of('tfc:ore/halite').withChance(0.007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.004),
	Item.of('tfc:ore/lignite').withChance(0.002)
	], 'tfc:rock/gravel/claystone').id('kubejs:washing/claystone');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/small_malachite').withChance(0.015),
	Item.of('tfc:ore/small_magnetite').withChance(0.015),
	Item.of('tfc:ore/small_limonite').withChance(0.015),
	Item.of('kubejs:ore/small_lead').withChance(0.015),
	Item.of('tfc:ore/kaolinite').withChance(0.01),
	Item.of('tfc:ore/saltpeter').withChance(0.01),
	Item.of('tfc:ore/borax').withChance(0.01),
	Item.of('tfc:ore/lapis_lazuli').withChance(0.01),
	Item.of('tfc:ore/halite').withChance(0.007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.004),
	Item.of('tfc:ore/lignite').withChance(0.002),
	Item.of('tfc:ore/gypsum').withChance(0.001),
	Item.of('tfc:ore/ruby').withChance(0.0005)
	], 'tfc:rock/gravel/limestone').id('kubejs:washing/limestone');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/small_magnetite').withChance(0.015),
	Item.of('tfc:ore/small_limonite').withChance(0.015),
	Item.of('tfc:ore/kaolinite').withChance(0.01),
	Item.of('tfc:ore/saltpeter').withChance(0.01),
	Item.of('tfc:ore/halite').withChance(0.007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.004),
	Item.of('tfc:ore/lignite').withChance(0.002)
	], 'tfc:rock/gravel/conglomerate').id('kubejs:washing/conglomerate');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/small_malachite').withChance(0.005),
	Item.of('tfc:ore/small_magnetite').withChance(0.015),
	Item.of('tfc:ore/small_limonite').withChance(0.015),
	Item.of('kubejs:ore/small_lead').withChance(0.015),
	Item.of('tfc:ore/kaolinite').withChance(0.01),
	Item.of('tfc:ore/saltpeter').withChance(0.01),
	Item.of('tfc:ore/halite').withChance(0.007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.004),
	Item.of('tfc:ore/lignite').withChance(0.002)
	], 'tfc:rock/gravel/dolomite').id('kubejs:washing/dolomite');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/small_magnetite').withChance(0.015),
	Item.of('tfc:ore/small_limonite').withChance(0.015),
	Item.of('tfc:ore/kaolinite').withChance(0.01),
	Item.of('tfc:ore/saltpeter').withChance(0.01),
	Item.of('tfc:ore/sylvite').withChance(0.01),
	Item.of('tfc:ore/halite').withChance(0.007),
	Item.of('tfc:ore/bituminous_coal').withChance(0.004),
	Item.of('tfc:ore/lignite').withChance(0.002)
	], 'tfc:rock/gravel/chert').id('kubejs:washing/chert');
	e.recipes.createSplashing([
	Item.of('tfc:ore/small_bismuthinite').withChance(0.015),
	Item.of('tfc:ore/small_magnetite').withChance(0.015),
	Item.of('tfc:ore/small_limonite').withChance(0.015),
	Item.of('tfc:ore/kaolinite').withChance(0.01),
	Item.of('tfc:ore/saltpeter').withChance(0.01),
	Item.of('tfc:ore/halite').withChance(0.007),
	Item.of('tfc:ore/small_malachite').withChance(0.005),
	Item.of('tfc:ore/bituminous_coal').withChance(0.004),
	Item.of('tfc:ore/lignite').withChance(0.002)
	], 'tfc:rock/gravel/chalk').id('kubejs:washing/chalk');
	
	e.recipes.createPressing('create:crafter_slot_cover', 'tfc:metal/sheet/brass').id('kubejs:pressing/crafter_slot_from_tfc');
	
	e.recipes.createDeploying('4x create:attribute_filter', ['tfc:silk_cloth', 'tfc:metal/ingot/brass']).id('kubejs:deploying/attribute_filter_from_tfc');
	e.recipes.createDeploying('4x create:filter', ['tfc:silk_cloth', 'tfc:metal/ingot/wrought_iron']).id('kubejs:deploying/filter_from_tfc');
	e.recipes.createDeploying('create:blaze_burner', ['create:empty_blaze_burner', '#minecraft:coals']).id('kubejs:deploying/blaze_burner_from_tfc');
	
	e.recipes.createFilling('create:chocolate_glazed_berries', ['#tfc:foods/berries', Fluid.of('create:chocolate', 250)]).id('kubejs:filling/chocolate_berries_from_tfc_berries');
	
	e.recipes.createMechanicalCrafting('create:potato_cannon', [
	'SSSAB',
	'   CC'
	], {
		S: 'create:fluid_pipe',
		A: 'create:precision_mechanism',
		B: 'create:andesite_alloy',
		C: 'tfc:metal/ingot/copper'
	}).id('kubejs:mechanical_crafting/potato_cannon_from_tfc');
	
	e.recipes.createItemApplication('create:andesite_casing', ['#minecraft:logs', 'create:andesite_alloy']).id('kubejs:item_application/andesite_casing_from_tfc_logs');
	e.recipes.createItemApplication('create:brass_casing', ['#minecraft:logs', 'tfc:metal/ingot/brass']).id('kubejs:item_application/brass_casing_from_tfc_logs');
	e.recipes.createItemApplication('create:copper_casing', ['#minecraft:logs', 'tfc:metal/ingot/copper']).id('kubejs:item_application/copper_casing_from_tfc_logs');
	e.recipes.createItemApplication('create:mechanical_pump', ['create:fluid_pipe', 'create:cogwheel']).id('kubejs:item_application/mechanical_pump');
	e.recipes.createItemApplication('create:smart_fluid_pipe', ['create:fluid_pipe', 'create:electron_tube']).id('kubejs:item_application/smart_fluid_pipe');
	e.recipes.createItemApplication('create:fluid_valve', ['create:fluid_pipe', 'create:shaft']).id('kubejs:item_application/fluid_valve');
	e.recipes.createItemApplication('create_crystal_clear:steel_tinted_glass_casing', ['create_crystal_clear:steel_glass_casing', 'tfc:gem/amethyst']).id('kubejs:item_application/steel_tinted_glass_casing');
	e.recipes.createItemApplication('create_crystal_clear:steel_glass_casing', ['#forge:glass/colorless', 'tfc:metal/sheet/steel']).id('kubejs:item_application/steel_glass_casing');
	
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
	]).transitionalItem('tfc:metal/ingot/copper').loops(4).id('kubes:sequenced_assembly/iron_component_from_wrought_iron_sheets');
	e.recipes.createSequencedAssembly(['immersiveengineering:component_steel'], 'tfc:metal/ingot/copper', [
		e.recipes.createDeploying('tfc:metal/ingot/copper', ['tfc:metal/ingot/copper', 'tfc:metal/sheet/steel'])
	]).transitionalItem('tfc:metal/ingot/copper').loops(4).id('kubes:sequenced_assembly/steel_component_from_steel_sheets');
	
	let tfc_welding_tag = (in1, in2, tier, out, count, id) => {
		e.custom({
			"type": "tfc:welding",
			"first_input": { "item": in1 },
			"second_input": { "tag": in2 },
			"tier": tier,
			"result": { "item": out, "count": count }
		}).id('kubejs:weld/' + id)
	}
	let tfc_welding_item = (in1, in2, tier, out, count, id) => {
		e.custom({
			"type": "tfc:welding",
			"first_input": { "item": in1 },
			"second_input": { "item": in2 },
			"tier": tier,
			"result": { "item": out, "count": count }
		}).id('kubejs:weld/' + id)
	}
	tfc_welding_tag("tfc:metal/ingot/cast_iron", "forge:cobblestone/normal", 1, "create:andesite_alloy", 15, 'composite_compound_from_cast_iron')
	tfc_welding_tag("tfc:metal/ingot/zinc", "forge:cobblestone/normal", 1, "create:andesite_alloy", 10, 'composite_compound_from_zinc')
	tfc_welding_tag("tfc:metal/helmet/copper", "forge:glass", 2, "create:diving_helmet", 1, 'diving_helmet_from_tfc_copper_helmet')
	tfc_welding_item("tfc:metal/sheet/copper", "tfc:metal/rod/copper", 1, "create:fluid_pipe", 6, 'fluid_pipe_from_tfc_coppers')
	tfc_welding_item("tfc:fire_bricks", "tfc:metal/double_sheet/steel", 4, "immersiveengineering:alloybrick", 1, 'alloy_bricks_from_tfc')
	tfc_welding_item("immersiveengineering:ingot_electrum", "immersiveengineering:ingot_electrum", 3, "immersiveengineering:nugget_electrum", 1, 'weld_double_electrum_ingot')
	tfc_welding_item("immersiveengineering:ingot_constantan", "immersiveengineering:ingot_constantan", 2, "immersiveengineering:nugget_constantan", 1, 'weld_double_constantan_ingot')
	tfc_welding_item("immersiveengineering:ingot_lead", "immersiveengineering:ingot_lead", 1, "immersiveengineering:nugget_lead", 1, 'weld_double_lead_ingot')
	tfc_welding_item("tfc:metal/boots/copper", "create:andesite_alloy", 2, "create:diving_boots", 1, 'diving_boots_from_tfc_copper_boots')
	
	let tfc_anvil = (input, output, count, tier, rule_1, rule_2, rule_3, id) => {
		e.custom({
			"type": "tfc:anvil",
			"input": { "item": input },
			"result": { "item": output, "count": count },
			"tier": tier,
			"rules": [ rule_1 + "_last", rule_2 + "_second_last", rule_3 + "_third_last" ]
		}).id('kubejs:anvil/' + id)
	}
	tfc_anvil("tfc:metal/rod/brass", "create:brass_ladder", 3, 2, "draw", "bend", "draw", 'brass_ladder_working')
	tfc_anvil("tfc:metal/rod/copper", "create:copper_ladder", 3, 1, "draw", "bend", "draw", 'copper_ladder_working')
	tfc_anvil("tfc:metal/tuyere/wrought_iron", "kubejs:unfilled_wrought_iron_shots", 1, 2, "punch", "draw", "draw", 'wrought_iron_shots_working')
	tfc_anvil("tfc:metal/tuyere/steel", "kubejs:unfilled_steel_shots", 1, 4, "punch", "draw", "draw", 'steel_shots_working')
	tfc_anvil("immersiveengineering:nugget_electrum", "immersiveengineering:plate_electrum", 1, 3, "hit", "hit", "hit", 'electrum_sheet_working')
	tfc_anvil("immersiveengineering:nugget_constantan", "immersiveengineering:plate_constantan", 1, 2, "hit", "hit", "hit", 'constantan_sheet_working')
	tfc_anvil("immersiveengineering:nugget_lead", "immersiveengineering:plate_lead", 1, 1, "hit", "hit", "hit", 'lead_sheet_working')
	tfc_anvil("immersiveengineering:ingot_electrum", "immersiveposts:stick_electrum", 2, 3, "bend", "draw", "draw", 'electrum_rod_working')
	tfc_anvil("immersiveengineering:ingot_constantan", "immersiveposts:stick_constantan", 2, 2, "bend", "draw", "draw", 'constantan_rod_working')
	tfc_anvil("immersiveengineering:ingot_lead", "immersiveposts:stick_lead", 2, 1, "bend", "draw", "draw", 'lead_rod_working')
	
	let tfc_heating = (input, output, amount, temperature, id) => {
		e.custom({
			"type": "tfc:heating",
			"ingredient": { "item": input },
			"result_fluid": { "fluid": output, "amount": amount },
			"temperature": temperature
		}).id('kubejs:heat/' + id)
	}
	tfc_heating("immersiveengineering:ingot_constantan", "kubejs:constantan", 100, 1266, 'constantan_ingot')
	tfc_heating("immersiveengineering:ingot_electrum", "kubejs:electrum", 100, 1010, 'electrum_ingot')
	tfc_heating("immersiveengineering:ingot_lead", "kubejs:lead", 100, 327, 'lead_ingot')
	tfc_heating("immersiveengineering:nugget_constantan", "kubejs:constantan", 200, 1266, 'constantan_double_ingot')
	tfc_heating("immersiveengineering:nugget_electrum", "kubejs:electrum", 200, 1010, 'electrum_double_ingot')
	tfc_heating("immersiveengineering:nugget_lead", "kubejs:lead", 200, 327, 'lead_double_ingot')
	tfc_heating("immersiveengineering:plate_constantan", "kubejs:constantan", 200, 1266, 'constantan_sheet')
	tfc_heating("immersiveengineering:plate_electrum", "kubejs:electrum", 200, 1010, 'electrum_sheet')
	tfc_heating("immersiveengineering:plate_lead", "kubejs:lead", 200, 327, 'lead_plate')
	tfc_heating("immersiveposts:stick_constantan", "kubejs:constantan", 50, 1266, 'constantan_rod')
	tfc_heating("immersiveposts:stick_electrum", "kubejs:electrum", 50, 1010, 'electrum_rod')
	tfc_heating("immersiveposts:stick_lead", "kubejs:lead", 50, 327, 'lead_rod')
	tfc_heating("kubejs:ore/normal_lead", "kubejs:lead", 25, 327, 'normal_lead_ore')
	tfc_heating("kubejs:ore/poor_lead", "kubejs:lead", 15, 327, 'poor_lead_ore')
	tfc_heating("kubejs:ore/rich_lead", "kubejs:lead", 35, 327, 'rich_lead_ore')
	tfc_heating("kubejs:ore/small_lead", "kubejs:lead", 10, 327, 'small_lead_ore')
	
	let tfc_casting = (input, amount, output, chance, id) => {
		e.custom({
			"type": "tfc:casting",
			"mold": { "item": "tfc:ceramic/ingot_mold" },
			"fluid": { "ingredient": input, "amount": amount },
			"result": { "item": output },
			"break_chance": chance
		}).id('kubejs:casting/' + id)
	}
	tfc_casting("kubejs:electrum", 100, "immersiveengineering:ingot_electrum", 0.1, 'electrum_ingot')
	tfc_casting("kubejs:constantan", 100, "immersiveengineering:ingot_constantan", 0.1, 'constantan_ingot')
	tfc_casting("kubejs:lead", 100, "immersiveengineering:ingot_lead", 0.1, 'lead_ingot')
	
	let tfc_alloy = (output, input1, min1, max1, input2, min2, max2, id) => {
		e.custom({
			"type": "tfc:alloy",
			"result": output,
			"contents": [
			{ "metal": input1, "min": min1, "max": max1 },
			{ "metal": input2, "min": min2, "max": max2 }
			]
		}).id('kubejs:alloy/' + id)
	}
	tfc_alloy("tfc:electrum", "tfc:gold", 0.4, 0.6, "tfc:silver", 0.4, 0.6, 'electrum_from_gold_silver')
	tfc_alloy("tfc:constantan", "tfc:copper", 0.5, 0.6, "tfc:nickel", 0.4, 0.5, 'constantan_from_copper_nickel')
	
	let IE_blueprint_2 = (input_1, count_1, input_2, count_2, blueprint, result, count_out, id) => {
		e.custom({
			"type": "immersiveengineering:blueprint",
			"inputs": [
			{
				"item": input_1,
				"count": count_1
			},
			{
				"tag": input_2,
				"count": count_2
			}
			],
			"category": blueprint,
			"result": {
				"item": result,
				"count": count_out
			}
		}).id("kubejs:blueprint_" + blueprint + "/" + id)
	}
	let IE_blueprint_3 = (input_1, count_1, input_2, count_2, input_3, count_3, blueprint, result, count_out, id) => {
		e.custom({
			"type": "immersiveengineering:blueprint",
			"inputs": [
			{
				"item": input_1,
				"count": count_1
			},
			{
				"tag": input_2,
				"count": count_2
			},
			{
				"item": input_3,
				"count": count_3
			}
			],
			"category": blueprint,
			"result": {
				"item": result,
				"count": count_out
			}
		}).id("kubejs:blueprint_" + blueprint + "/" + id)
	}
	let IE_blueprint_4 = (input_1, count_1, input_2, count_2, input_3, count_3, input_4, count_4, blueprint, result, count_out, id) => {
		e.custom({
			"type": "immersiveengineering:blueprint",
			"inputs": [
			{
				"item": input_1,
				"count": count_1
			},
			{
				"tag": input_2,
				"count": count_2
			},
			{
				"item": input_3,
				"count": count_3
			},
			{
				"item": input_4,
				"count": count_4
			}
			],
			"category": blueprint,
			"result": {
				"item": result,
				"count": count_out
			}
		}).id("kubejs:blueprint_" + blueprint + "/" + id)
	}
	/*IE_blueprint_n rules
	* the tag|item section cannot be defined i nthe constructor for unknown reasons
	* cannot use "minecraft:air" or "minecraft:empty" for reasons unknown, hence three constructors
	* I would absoluely love have only one using some fancy JS magic, but, as with many of my dreams, I don't know how
	*/
	IE_blueprint_2("tfc:metal/sheet/wrought_iron", 2, "forge:ingots/copper", 1, "components", "immersiveengineering:component_iron", 1, "iron_component_from_wrought_iron_sheets")
	IE_blueprint_2("tfc:metal/sheet/steel", 2, "forge:ingots/copper", 1, "components", "immersiveengineering:component_steel", 1, "steel_component_from_steel_sheets")
	IE_blueprint_4("immersiveengineering:wire_copper", 1, "forge:glass/colorless", 1, "tfc:metal/rod/nickel", 1, "tfc:powder/graphite", 2, "components", "immersiveengineering:light_bulb", 1, "light_blub_from_tfc")
	
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_copper', '1x tfc:metal/sheet/copper', 'immersiveengineering:mold_wire').id('kubejs:metal_press/copper_wire');
	
	e.custom({
		"type": "tfc:barrel_sealed",
		"input_item": {
			"ingredient": {
				"item": "tfc:straw"
			}
		},
		"input_fluid": {
			"ingredient": {
				"fluid": "tfc:vinegar"
			},
			"amount": 50
		},
		"output_item": {
			"item": "minecraft:paper"
		},
		"duration": 1000
	}).id('kubejs:sealed_barrel/paper_from_vinegar');
	e.custom({
		"type": "tfc:leather_knapping",
		"pattern": [
		"XX XX",
		"X   X",
		"X   X",
		"X   X",
		"XXXXX"
		],
		"result": {
			"item": "kubejs:leather_pouch"
		}
	}).id('kubejs:leather_knapping/leather_pouch');
})