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

let planks = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir', 'hickory', 'kapok', 'maple', 'oak', 'palm', 'pine', 'rosewood', 'sequoia', 'spruce', 'sycamore', 'white_cedar', 'willow']

let tfc_metals = ['bismuth', 'bismuth_bronze', 'black_bronze', 'bronze', 'brass', 'copper', 'gold', 'nickel', 'rose_gold', 'silver', 'tin', 'zinc', 'sterling_silver', 'cast_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel']

let ie_metals = ['aluminum', 'lead', 'silver', 'nickel', 'uranium', 'constantan', 'electrum', 'steel']

onEvent('recipes', e => {
	let tfc_collapse = (input, output) => {
		e.custom({
			'type': 'tfc:collapse',
			'ingredient': input,
			'result': output
		})
	}
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
	let tfc_anvil = (input, output, count, tier, rule_1, rule_2, rule_3, id) => {
		e.custom({
			'type': 'tfc:anvil',
			'input': { 'item': input },
			'result': { 'item': output, 'count': count },
			'tier': tier,
			'rules': [ rule_1 + '_last', rule_2 + '_second_last', rule_3 + '_third_last' ]
		}).id('kubejs:anvil/' + id)
	}
	let tfc_melting = (input, output, amount, temperature, id) => {
		e.custom({
			'type': 'tfc:heating',
			'ingredient': { 'item': input },
			'result_fluid': { 'fluid': output, 'amount': amount },
			'temperature': temperature
		}).id('kubejs:heat/' + id)
	}
	let tfc_casting = (input, amount, output, chance, id) => {
		e.custom({
			'type': 'tfc:casting',
			'mold': { 'item': 'tfc:ceramic/ingot_mold' },
			'fluid': { 'ingredient': input, 'amount': amount },
			'result': { 'item': output },
			'break_chance': chance
		}).id('kubejs:casting/' + id)
	}
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
	let tfc_heating = (input, tag, output, temperature, id) => {
		if (tag) {
			e.custom({
				'type': 'tfc:heating',
				'ingredient': { 'tag': input },
				'result_item': { 'item': output },
				'temperature': temperature
			}).id('kubejs:heat/' + id)
		} else {
			e.custom({
				'type': 'tfc:heating',
				'ingredient': { 'item': input },
				'result_item': { 'item': output },
				'temperature': temperature
			}).id('kubejs:heat/' + id)
		}
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
	});
	colors.forEach(color => {
		tfc_sealed_barrel_tag('forge:sheetmetal/colorless', 'tfc:' + color + '_dye', 125, 'immersiveengineering:sheetmetal_colored_' + color, 1000, color + '_sheetmetal')
		e.recipes.createSplashing(['minecraft:' + color + '_concrete_powder'], 'minecraft:' + color + '_concrete').id('create:splashing/' + color + '_concrete_powder');
	});
	sheetmetals.forEach(sheetmetal => {
		tfc_chisel_extra('immersiveengineering:sheetmetal_' + sheetmetal, 'immersiveengineering:slab_sheetmetal_' + sheetmetal, 'slab', 'immersiveengineering:slab_sheetmetal_' + sheetmetal, 'sheetmetal_' + sheetmetal)
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
		tfc_chisel_extra('immersiveengineering:storage_' + metal, 'immersiveengineering:slab_storage_' + metal, 'slab', 'immersiveengineering:slab_storage_' + metal, metal)
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
		e.recipes.createDeploying('create:incomplete_track', ['create:incomplete_track', 'tfc:metal/rod/steel']),
		e.recipes.createDeploying('create:incomplete_track', ['create:incomplete_track', 'tfc:metal/rod/steel']),
		e.recipes.createPressing('create:incomplete_track', 'create:incomplete_track')
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
	
	//tfc_welding_tag:order = in1, in2, tier, out, count, id | in2 is a tag
	tfc_welding_tag('tfc:metal/ingot/wrought_iron', 'forge:cobblestone/normal', 1, 'create:andesite_alloy', 15, 'composite_material_from_wrought_iron')
	tfc_welding_tag('tfc:metal/ingot/zinc', 'forge:cobblestone/normal', 1, 'create:andesite_alloy', 5, 'composite_material_from_zinc')
	tfc_welding_tag('tfc:metal/helmet/copper', 'forge:glass', 2, 'create:diving_helmet', 1, 'diving_helmet')
	tfc_welding_tag('tfc:metal/ingot/steel', 'forge:cobblestone/normal', 1, 'create:andesite_alloy', 25, 'composite_material_from_steel')//remove /_from_.*/ when compsite matieral is redone, it stays for now
	
	//tfc_welding_item:order = in1, in2, tier, out, count, id
	tfc_welding_item('tfc:metal/sheet/copper', 'tfc:metal/rod/copper', 1, 'create:fluid_pipe', 6, 'copper_fluid_pipe')
	tfc_welding_item('tfc:fire_bricks', 'tfc:metal/double_sheet/steel', 4, 'immersiveengineering:alloybrick', 1, 'alloy_bricks')
	tfc_welding_item('immersiveengineering:ingot_electrum', 'immersiveengineering:ingot_electrum', 3, 'kubejs:metal/double_ingot/electrum', 1, 'double_electrum_ingot')
	tfc_welding_item('immersiveengineering:ingot_constantan', 'immersiveengineering:ingot_constantan', 2, 'kubejs:metal/double_ingot/constantan', 1, 'double_constantan_ingot')
	tfc_welding_item('immersiveengineering:ingot_lead', 'immersiveengineering:ingot_lead', 1, 'kubejs:metal/double_ingot/lead', 1, 'double_lead_ingot')
	tfc_welding_item('tfc:metal/boots/copper', 'create:andesite_alloy', 2, 'create:diving_boots', 1, 'diving_boots')
	tfc_welding_item('firmalife:metal/sheet/stainless_steel', 'firmalife:metal/rod/stainless_steel', 4, 'immersiveengineering:fluid_pipe', 6, 'stainless_steel_fluid_pipe')
	
	//tfc_anvil:order = input, output, count, tier, rule_1, rule_2, rule_3, id | three rules needed
	tfc_anvil('tfc:metal/rod/brass', 'create:brass_ladder', 3, 2, 'draw', 'bend', 'draw', 'brass_ladder_working')
	tfc_anvil('tfc:metal/rod/copper', 'create:copper_ladder', 3, 1, 'draw', 'bend', 'draw', 'copper_ladder_working')
	tfc_anvil('kubejs:metal/double_ingot/electrum', 'immersiveengineering:plate_electrum', 1, 3, 'hit', 'hit', 'hit', 'electrum_sheet_working')
	tfc_anvil('kubejs:metal/double_ingot/constantan', 'immersiveengineering:plate_constantan', 1, 2, 'hit', 'hit', 'hit', 'constantan_sheet_working')
	tfc_anvil('kubejs:metal/double_ingot/lead', 'immersiveengineering:plate_lead', 1, 1, 'hit', 'hit', 'hit', 'lead_sheet_working')
	tfc_anvil('immersiveengineering:ingot_electrum', 'immersiveposts:stick_electrum', 2, 3, 'bend', 'draw', 'draw', 'electrum_rod_working')
	tfc_anvil('immersiveengineering:ingot_constantan', 'immersiveposts:stick_constantan', 2, 2, 'bend', 'draw', 'draw', 'constantan_rod_working')
	tfc_anvil('immersiveengineering:ingot_lead', 'immersiveposts:stick_lead', 2, 1, 'bend', 'draw', 'draw', 'lead_rod_working')
	tfc_anvil('tfc:metal/ingot/copper', 'create:copper_nugget', 12, 1, 'draw', 'bend', 'punch', 'copper_bullet')
	
	//tfc_melting:order = input, output, amount, temperature, id
	tfc_melting('immersiveengineering:ingot_constantan', 'kubejs:constantan', 100, 1266, 'constantan_ingot')
	tfc_melting('immersiveengineering:ingot_electrum', 'kubejs:electrum', 100, 1010, 'electrum_ingot')
	tfc_melting('immersiveengineering:ingot_lead', 'kubejs:lead', 100, 327, 'lead_ingot')
	tfc_melting('kubejs:metal/double_ingot/constantan', 'kubejs:constantan', 200, 1266, 'constantan_double_ingot')
	tfc_melting('kubejs:metal/double_ingot/electrum', 'kubejs:electrum', 200, 1010, 'electrum_double_ingot')
	tfc_melting('kubejs:metal/double_ingot/lead', 'kubejs:lead', 200, 327, 'lead_double_ingot')
	tfc_melting('immersiveengineering:plate_constantan', 'kubejs:constantan', 200, 1266, 'constantan_sheet')
	tfc_melting('immersiveengineering:plate_electrum', 'kubejs:electrum', 200, 1010, 'electrum_sheet')
	tfc_melting('immersiveengineering:plate_lead', 'kubejs:lead', 200, 327, 'lead_plate')
	tfc_melting('immersiveposts:stick_constantan', 'kubejs:constantan', 50, 1266, 'constantan_rod')
	tfc_melting('immersiveposts:stick_electrum', 'kubejs:electrum', 50, 1010, 'electrum_rod')
	tfc_melting('immersiveposts:stick_lead', 'kubejs:lead', 50, 327, 'lead_rod')
	tfc_melting('kubejs:ore/normal_lead', 'kubejs:lead', 25, 327, 'normal_lead_ore')
	tfc_melting('kubejs:ore/poor_lead', 'kubejs:lead', 15, 327, 'poor_lead_ore')
	tfc_melting('kubejs:ore/rich_lead', 'kubejs:lead', 35, 327, 'rich_lead_ore')
	tfc_melting('kubejs:ore/small_lead', 'kubejs:lead', 10, 327, 'small_lead_ore')
	tfc_melting('firmalife:metal/ingot/chromium', 'firmalife:metal/chromium', 100, 1907, 'chromium_ingot')
	tfc_melting('firmalife:metal/sheet/chromium', 'firmalife:metal/chromium', 200, 1907, 'chromium_sheet')
	tfc_melting('firmalife:metal/double_ingot/chromium', 'firmalife:metal/chromium', 200, 1907, 'chromium_double_ingot')
	tfc_melting('firmalife:metal/double_sheet/chromium', 'firmalife:metal/chromium', 400, 1907, 'chromium_double_sheet')
	tfc_melting('firmalife:metal/rod/chromium', 'firmalife:metal/chromium', 50, 1907, 'chromium_rod')
	tfc_melting('firmalife:metal/ingot/stainless_steel', 'firmalife:metal/stainless_steel', 100, 1540, 'stainless_steel_ingot')
	tfc_melting('firmalife:metal/sheet/stainless_steel', 'firmalife:metal/stainless_steel', 200, 1540, 'stainless_steel_sheet')
	tfc_melting('firmalife:metal/double_ingot/stainless_steel', 'firmalife:metal/stainless_steel', 200, 1540, 'stainless_steel_double_ingot')
	tfc_melting('firmalife:metal/double_sheet/stainless_steel', 'firmalife:metal/stainless_steel', 400, 1540, 'stainless_steel_double_sheet')
	tfc_melting('firmalife:metal/rod/stainless_steel', 'firmalife:metal/stainless_steel', 50, 1540, 'stainless_steel_rod')
	tfc_melting('firmalife:ore/small_chromite', 'firmalife:metal/chromium', 10, 1907, 'small_chromite')
	tfc_melting('firmalife:ore/poor_chromite', 'firmalife:metal/chromium', 15, 1907, 'poor_chromite')
	tfc_melting('firmalife:ore/normal_chromite', 'firmalife:metal/chromium', 25, 1907, 'normal_chromite')
	tfc_melting('firmalife:ore/rich_chromite', 'firmalife:metal/chromium', 35, 1907, 'rich_chromite')
	tfc_melting('create:zinc_block', 'tfc:metal/zinc', 250, 420, 'zinc_block')
	tfc_melting('immersiveengineering:storage_electrum', 'kubejs:electrum', 250, 1010, 'electrum_block')
	tfc_melting('create:brass_block', 'tfc:metal/brass', 250, 930, 'brass_block')
	tfc_melting('immersiveengineering:storage_steel', 'tfc:metal/steel', 250, 1540, 'steel_block')
	tfc_melting('immersiveengineering:storage_constantan', 'kubejs:constantan', 250, 1266, 'constantan_block')
	tfc_melting('immersiveengineering:storage_nickel', 'tfc:metal/nickel', 250, 1453, 'nickel_block')
	tfc_melting('immersiveengineering:storage_silver', 'tfc:metal/silver', 250, 961, 'silver_block')
	tfc_melting('immersiveengineering:storage_lead', 'kubejs:lead', 250, 327, 'lead_block')
	tfc_melting('minecraft:gold_block', 'tfc:metal/gold', 250, 1060, 'gold_block')
	tfc_melting('minecraft:copper_block', 'tfc:metal/copper', 250, 1080, 'copper_block')
	tfc_melting('immersiveengineering:dust_hop_graphite', 'kubejs:graphite', 75, 2574, 'graphite_dust')//the temperature is complete rubbish and is actually ~1000 degrees higher in real life but there is nothing that burns that hot (yet?)
	tfc_melting('immersiveengineering:ingot_hop_graphite', 'kubejs:graphite', 100, 2574, 'graphite_ingot')
	
	//tfc_heating:order = input, tag, output, temperature, id | tag, is a boolean
	tfc_heating('create:tiled_glass', false, 'minecraft:glass', 350, 'tiled_glass')
	tfc_heating('create:vertical_framed_glass', false, 'minecraft:glass', 350, 'vertical_framed_glass')
	tfc_heating('create:framed_glass', false, 'minecraft:glass', 350, 'framed_glass')
	tfc_heating('create:horizontal_framed_glass', false, 'minecraft:glass', 350, 'horizontal_framed_glass')
	tfc_heating('create:tiled_glass_pane', false, 'minecraft:glass_pane', 350, 'tiled_glass_pane')
	tfc_heating('create:vertical_framed_glass_pane', false, 'minecraft:glass_pane', 350, 'vertical_framed_glass_pane')
	tfc_heating('create:framed_glass_pane', false, 'minecraft:glass_pane', 350, 'framed_glass_pane')
	tfc_heating('create:horizontal_framed_glass_pane', false, 'minecraft:glass_pane', 350, 'horizontal_framed_glass_pane')
	tfc_heating('forge:slag', true, 'immersiveengineering:slag_glass', 650, 'slag_glass')
	
	//tfc_casting:order = input, amount, output, chance, id | chance = chance to break
	tfc_casting('kubejs:electrum', 100, 'immersiveengineering:ingot_electrum', 0.1, 'electrum_ingot')
	tfc_casting('kubejs:constantan', 100, 'immersiveengineering:ingot_constantan', 0.1, 'constantan_ingot')
	tfc_casting('kubejs:lead', 100, 'immersiveengineering:ingot_lead', 0.1, 'lead_ingot')
	tfc_casting('kubejs:graphite', 100, 'immersiveengineering:ingot_hop_graphite', 1, 'graphite')
	
	//tfc_alloy:order = output, input1, min1, max1, input2, min2, max2, id
	tfc_alloy('tfc:electrum', 'tfc:gold', 0.4, 0.6, 'tfc:silver', 0.4, 0.6, 'electrum')
	tfc_alloy('tfc:constantan', 'tfc:copper', 0.5, 0.6, 'tfc:nickel', 0.4, 0.5, 'constantan')
	
	//tfc_sealed_barrel_item:order = input_item, input_fluid, amount, output, duration, id
	tfc_sealed_barrel_item('tfc:straw', 'tfc:vinegar', 50, 'minecraft:paper', 1000, 'paper')
	
	//tfc_sealed_barrel_tag:order = input_tag, input_fluid, amount, output, duration, id
	
	//tfc_chisel:order = input, output, mode, id
	tfc_chisel('immersiveengineering:treated_wood_horizontal', 'immersiveengineering:stairs_treated_wood_horizontal', 'stair', 'stained_wood_horizontal')
	tfc_chisel('immersiveengineering:treated_wood_vertical', 'immersiveengineering:stairs_treated_wood_vertical', 'stair', 'stained_wood_vertical')
	tfc_chisel('immersiveengineering:treated_wood_packaged', 'immersiveengineering:stairs_treated_wood_packaged', 'stair', 'stained_wood_packaged')
	tfc_chisel('immersiveengineering:concrete', 'immersiveengineering:concrete_tile', 'smooth', 'concrete_tile')
	tfc_chisel('immersiveengineering:steel_scaffolding_standard', 'immersiveengineering:stairs_steel_scaffolding_standard', 'stair', 'standard_steel_scaffolding')
	tfc_chisel('immersiveengineering:alu_scaffolding_standard', 'immersiveengineering:stairs_alu_scaffolding_standard', 'stair', 'standard_alu_scaffolding')
	tfc_chisel('immersiveengineering:steel_scaffolding_grate_top', 'immersiveengineering:stairs_steel_scaffolding_grate_top', 'stair', 'grate_top_steel_scaffolding')
	tfc_chisel('immersiveengineering:alu_scaffolding_grate_top', 'immersiveengineering:stairs_alu_scaffolding_grate_top', 'stair', 'grate_top_alu_scaffolding')
	tfc_chisel('immersiveengineering:steel_scaffolding_wooden_top', 'immersiveengineering:stairs_steel_scaffolding_wooden_top', 'stair', 'wooden_top_steel_scaffolding')
	tfc_chisel('immersiveengineering:alu_scaffolding_wooden_top', 'immersiveengineering:stairs_alu_scaffolding_wooden_top', 'stair', 'wooden_top_alu_scaffolding')
	tfc_chisel('immersiveengineering:hempcrete', 'immersiveengineering:stairs_hempcrete', 'stair', 'jutecrete')
	tfc_chisel('immersiveengineering:concrete', 'immersiveengineering:stairs_concrete', 'stair', 'concrete')
	tfc_chisel('immersiveengineering:concrete_tile', 'immersiveengineering:stairs_concrete_tile', 'stair', 'concrete_tile')
	tfc_chisel('minecraft:copper_block', 'minecraft:cut_copper', 'smooth', 'cut_copper')
	tfc_chisel('minecraft:cut_copper', 'minecraft:cut_copper_stairs', 'stair', 'cut_copper')
	
	//tfc_chisel_extra:order = input, output, mode, extra, id
	tfc_chisel_extra('immersiveengineering:treated_wood_horizontal', 'immersiveengineering:slab_treated_wood_horizontal', 'slab', 'immersiveengineering:slab_treated_wood_horizontal', 'stained_wood_horizontal')
	tfc_chisel_extra('immersiveengineering:treated_wood_vertical', 'immersiveengineering:slab_treated_wood_vertical', 'slab', 'immersiveengineering:slab_treated_wood_vertical', 'stained_wood_vertical')
	tfc_chisel_extra('immersiveengineering:treated_wood_packaged', 'immersiveengineering:slab_treated_wood_packaged', 'slab', 'immersiveengineering:slab_treated_wood_packaged', 'stained_wood_packaged')
	tfc_chisel_extra('immersiveengineering:steel_scaffolding_standard', 'immersiveengineering:slab_steel_scaffolding_standard', 'slab', 'immersiveengineering:slab_steel_scaffolding_standard', 'standard_steel_scaffolding')
	tfc_chisel_extra('immersiveengineering:alu_scaffolding_standard', 'immersiveengineering:slab_alu_scaffolding_standard', 'slab', 'immersiveengineering:slab_alu_scaffolding_standard', 'standard_alu_scaffolding')
	tfc_chisel_extra('immersiveengineering:steel_scaffolding_grate_top', 'immersiveengineering:slab_steel_scaffolding_grate_top', 'slab', 'immersiveengineering:slab_steel_scaffolding_grate_top', 'grate_top_steel_scaffolding')
	tfc_chisel_extra('immersiveengineering:alu_scaffolding_grate_top', 'immersiveengineering:slab_alu_scaffolding_grate_top', 'slab', 'immersiveengineering:slab_alu_scaffolding_grate_top', 'grate_top_alu_scaffolding')
	tfc_chisel_extra('immersiveengineering:steel_scaffolding_wooden_top', 'immersiveengineering:slab_steel_scaffolding_wooden_top', 'slab', 'immersiveengineering:slab_steel_scaffolding_wooden_top', 'wooden_top_steel_scaffolding')
	tfc_chisel_extra('immersiveengineering:alu_scaffolding_wooden_top', 'immersiveengineering:slab_alu_scaffolding_wooden_top', 'slab', 'immersiveengineering:slab_alu_scaffolding_wooden_top', 'wooden_top_alu_scaffolding')
	tfc_chisel_extra('immersiveengineering:cokebrick', 'immersiveengineering:slab_cokebrick', 'slab', 'immersiveengineering:slab_cokebrick', 'cokebrick')
	tfc_chisel_extra('immersiveengineering:blastbrick_reinforced', 'immersiveengineering:slab_blastbrick_reinforced', 'slab', 'immersiveengineering:slab_blastbrick_reinforced', 'blastbrick')
	tfc_chisel_extra('immersiveengineering:coke', 'immersiveengineering:slab_coke', 'slab', 'immersiveengineering:slab_coke', 'coal_coke')
	tfc_chisel_extra('immersiveengineering:hempcrete', 'immersiveengineering:slab_hempcrete', 'slab', 'immersiveengineering:slab_hempcrete', 'jutecrete')
	tfc_chisel_extra('immersiveengineering:concrete', 'immersiveengineering:slab_concrete', 'slab', 'immersiveengineering:slab_concrete', 'concrete')
	tfc_chisel_extra('immersiveengineering:concrete_tile', 'immersiveengineering:slab_concrete_tile', 'slab', 'immersiveengineering:slab_concrete_tile', 'concrete_tile')
	tfc_chisel_extra('immersiveengineering:insulating_glass', 'immersiveengineering:slab_insulating_glass', 'slab', 'immersiveengineering:slab_insulating_glass', 'insulating_glass')
	tfc_chisel_extra('immersiveengineering:alloybrick', 'immersiveengineering:slab_alloybrick', 'slab', 'immersiveengineering:slab_alloybrick', 'kiln_brick')
	tfc_chisel_extra('minecraft:cut_copper', 'minecraft:cut_copper_slab', 'slab', 'minecraft:cut_copper_slab', 'cut_copper')
	
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_copper', '1x tfc:metal/sheet/copper', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/copper_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_electrum', '1x immersiveengineering:plate_electrum', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/electrum_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_aluminum', '1x immersiveengineering:plate_aluminum', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/aluminum_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_steel', '1x tfc:metal/sheet/steel', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/steel_wire');
	e.recipes.immersiveengineeringMetalPress('8x immersiveengineering:wire_lead', '1x immersiveengineering:plate_lead', 'immersiveengineering:mold_wire').energy(2400).id('kubejs:metal_press/lead_wire');
	e.recipes.immersiveengineeringMetalPress(Item.of('immersiveengineering:graphite_electrode', '{graphDmg:57600}'), '4x immersiveengineering:ingot_hop_graphite', 'immersiveengineering:mold_rod').energy(9600).id('immersiveengineering:metalpress/electrode');
	
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
	
	//knapping
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
})