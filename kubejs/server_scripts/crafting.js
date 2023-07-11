// priority: 0

console.info('Loading TFC crafting recipes')

onEvent('recipes', e => {
	//shapeless
	colors.forEach(color => {
		if (color != 'white') {
			e.shapeless('createdeco:' + color + '_placard', ['create:placard', '#forge:dyes/' + color]).id('kubejs:crafting/' + color + '_placard');
		}
		e.shapeless('createdeco:' + color + '_decal', ['#forge:sheets', '#forge:dyes/' + color]).id('kubejs:crafting/' + color + '_decal');
	})

	e.shapeless('1x create:encased_chain_drive', ['create:andesite_casing', '2x tfc:metal/chain/wrought_iron']).id('kubejs:crafting/chain_drive');
	e.shapeless('1x create:placard', ['minecraft:item_frame', 'tfc:metal/sheet/brass']).id('kubejs:crafting/placard');
	e.shapeless('1x create:rose_quartz', ['tfc:ore/halite', '8x minecraft:redstone']).id('kubejs:crafting/redstone_salt_halite');
	e.shapeless('1x create:rose_quartz', ['tfc:ore/sylvite', '8x minecraft:redstone']).id('kubejs:crafting/redstone_salt_sylvite');
	e.recipes.tfcAdvancedShapelessCrafting(ItemProvider.of('1x create:super_glue').copyForgingBonus(), [Item.of('tfc:metal/tuyere/wrought_iron').ignoreNBT(), 'tfc:glue']).id('kubejs:crafting/super_glue');
	e.shapeless('2x create:train_door', ['#minecraft:wooden_doors', 'tfc:metal/sheet/brass', '#minecraft:wooden_doors']).id('kubejs:crafting/train_door');
	e.shapeless('2x create:train_trapdoor', ['#minecraft:wooden_trapdoors', 'tfc:metal/sheet/brass', '#minecraft:wooden_trapdoors']).id('kubejs:crafting/train_trapdoor');
	e.shapeless('32x gunswithoutroses:flint_bullet', ['minecraft:gunpowder', '4x minecraft:flint']).id('kubejs:crafting/flint_shot');
	e.shapeless('9x chunkloaders:single_chunk_loader', ['chunkloaders:basic_chunk_loader']).id('kubejs:crafting/single_chunk_loader');
	e.shapeless('1x create:sand_paper', ['minecraft:paper', '#forge:sand']).id('kubejs:crafting/sand_paper');
	e.shapeless('2x create:track_station', ['create:railway_casing', '#minecraft:banners']).id('kubejs:crafting/train_station');
	e.shapeless('1x railways:benchcart', ['minecraft:minecart', ['minecraft:crafting_table', '#tfc:workbenches']]).id('railways:benchcart');
	e.shapeless('4x createaddition:portable_energy_interface', ['create:brass_casing', 'create:chute', 'immersiveengineering:coil_lv']).id('createaddition:crafting/portable_energy_interface');
	e.shapeless('1x kubejs:composite_catalyst', ['4x #tfc:igneous_rock', '#tfc:forge_fuel']).id('kubejs:crafting/composite_catalyst');
	e.shapeless('1x create:andesite_door', ['#minecraft:wooden_doors', 'create:andesite_casing']).id('create:crafting/kinetics/composite_door');
	e.shapeless('9x create:andesite_alloy', ['create:andesite_alloy_block']).id('create:crafting/materials/composite_material_from_block');
	e.recipes.tfcDamageInputsShapelessCrafting('2x immersiveengineering:wire_aluminum', [
		'immersiveengineering:stick_aluminum',
		Item.of('immersiveengineering:wirecutter').ignoreNBT()
	]).id('kubejs:crafting/aluminum_wire');
	
	let blueprint = (input, output, id) => {
		e.shapeless( output, ['create:crafting_blueprint', input ]).id('kubejs:crafting/' + id)
	}
	blueprint('tfc:metal/double_sheet/black_steel', Item.of('immersiveengineering:blueprint', '{blueprint:"molds"}'), 'metal_press_mold_blueprint')
	blueprint('create:precision_mechanism', Item.of('immersiveengineering:blueprint', '{blueprint:"components"}'), 'component_blueprint')
	blueprint('minecraft:gunpowder', Item.of('immersiveengineering:blueprint', '{blueprint:"bullet"}'), 'basic_bullet_blueprint')
	blueprint('#minecraft:banners', Item.of('immersiveengineering:blueprint', '{blueprint:"bannerpatterns"}'), 'banner_pattern_blueprint')
	blueprint('tfc:powderkeg', Item.of('immersiveengineering:blueprint', '{blueprint:"specialBullet"}'), 'special_bullet_blueprint')
	blueprint('immersiveengineering:wooden_grip', Item.of('immersiveengineering:blueprint', '{blueprint:"electrode"}'), 'advanced_tools_blueprint')
	
	e.recipes.tfcDamageInputsShapelessCrafting('2x immersiveengineering:wire_lead', [
		'immersiveposts:stick_lead',
		Item.of('immersiveengineering:wirecutter').ignoreNBT()
	]).id('kubejs:crafting/lead_wire');
	e.recipes.tfcDamageInputsShapelessCrafting('2x immersiveengineering:wire_steel', [
		'tfc:metal/rod/steel',
		Item.of('immersiveengineering:wirecutter').ignoreNBT()
	]).id('kubejs:crafting/steel_wire');
	e.recipes.tfcDamageInputsShapelessCrafting('2x immersiveengineering:wire_electrum', [
		'immersiveposts:stick_electrum',
		Item.of('immersiveengineering:wirecutter').ignoreNBT()
	]).id('kubejs:crafting/electrum_wire');
	e.recipes.tfcDamageInputsShapelessCrafting('2x immersiveengineering:wire_copper', [
		'tfc:metal/rod/copper',
		Item.of('immersiveengineering:wirecutter').ignoreNBT()
	]).id('kubejs:crafting/copper_wire');
	e.recipes.tfcDamageInputsShapelessCrafting('create:pulse_extender', [
		'create:pulse_extender',
		'minecraft:redstone_torch',
		Item.of('create:super_glue').ignoreNBT()
	]).id('kubejs:crafting/pulse_repeater_to_pulse_extender');
	e.recipes.tfcDamageInputsShapelessCrafting('minecraft:dropper', [
		'minecraft:dispenser',
		Item.of('immersiveengineering:wirecutter').ignoreNBT()
	]).id('kubejs:crafting/dispenser_to_dropper');
	
	e.recipes.tfcExtraProductsShapelessCrafting('minecraft:redstone_torch', e.recipes.tfcDamageInputsShapelessCrafting('create:pulse_repeater', [
		'create:pulse_extender',
		Item.of('immersiveengineering:wirecutter').ignoreNBT()
	])).id('kubejs:crafting/pulse_extender_to_pulse_repeater');
	
	//shaped
	partial_metal.forEach(metal => {
		e.shaped('6x immersiveposts:fence_' + metal, [
		'SAS',
		'SAS'
		], {
			S: 'tfc:metal/ingot/' + metal,
			A: 'tfc:metal/rod/' + metal,
		}).id('kubejs:crafting/' + metal + '_fence')
	})
	sheetmetals.forEach(sheetmetal => {
		e.shaped('6x immersiveengineering:slab_sheetmetal_' + sheetmetal, [
		'SSS'
		], {
			S: 'immersiveengineering:sheetmetal_' + sheetmetal
		}).id('immersiveengineering:sheetmetal_to_slab_' + sheetmetal);
		e.shaped('1x immersiveengineering:sheetmetal_' + sheetmetal, [
		'S',
		'S'
		], {
			S: 'immersiveengineering:slab_sheetmetal_' + sheetmetal
		}).id('immersiveengineering:slab_to_sheetmetal_' + sheetmetal);
	})
	planks.forEach(plank => {
		e.shaped('1x tfc:wood/planks/' + plank, [
		'S',
		'S'
		], {
			S: 'tfc:wood/planks/' + plank + '_slab'
		}).id('kubejs:crafting/' + plank + '_slab_to_plank');
	})
	stones.forEach(stone => {
		e.shaped('1x tfc:rock/bricks/' + stone, [
		'S',
		'S'
		], {
			S: 'tfc:rock/bricks/' + stone + '_slab'
		}).id('kubejs:crafting/' + stone + '_slab_to_brick');
	})
	deco_metals.forEach(metal => {
		e.shaped('1x createdeco:yellow_' + metal + '_lamp', [
			' S ',
			'CAC',
			' B '
		], {
			S: 'tfc:metal/rod/' + metal,
			A: 'create:rose_quartz_lamp',
			B: 'tfc:metal/sheet/' + metal,
			C: '#forge:dyes/yellow'
		}).id('kuebjs:crafting/yellow_' + metal + '_lamp');
		e.shaped('1x createdeco:red_' + metal + '_lamp', [
			' S ',
			'CAC',
			' B '
		], {
			S: 'tfc:metal/rod/' + metal,
			A: 'create:rose_quartz_lamp',
			B: 'tfc:metal/sheet/' + metal,
			C: '#forge:dyes/red'
		}).id('kuebjs:crafting/red_' + metal + '_lamp');
		e.shaped('1x createdeco:blue_' + metal + '_lamp', [
			' S ',
			'CAC',
			' B '
		], {
			S: 'tfc:metal/rod/' + metal,
			A: 'create:rose_quartz_lamp',
			B: 'tfc:metal/sheet/' + metal,
			C: '#forge:dyes/blue'
		}).id('kuebjs:crafting/blue_' + metal + '_lamp');
		e.shaped('1x createdeco:green_' + metal + '_lamp', [
			' S ',
			'CAC',
			' B '
		], {
			S: 'tfc:metal/rod/' + metal,
			A: 'create:rose_quartz_lamp',
			B: 'tfc:metal/sheet/' + metal,
			C: '#forge:dyes/green'
		}).id('kuebjs:crafting/green_' + metal + '_lamp');
	})
	
	e.shaped('2x immersiveengineering:conveyor_basic', [
	'S',
	'A'
	], {
		S: 'create:belt_connector',
		A: 'tfc:metal/sheet/steel'
	}).id('kubejs:crafting/conveyor');
	e.shaped('6x immersiveengineering:steel_fence', [
	'SAS',
	'SAS'
	], {
		S: 'tfc:metal/ingot/steel',
		A: 'tfc:metal/rod/steel'
	}).id('kubejs:crafting/steel_fence');
	e.shaped('6x immersiveposts:fence_iron', [
	'SAS',
	'SAS'
	], {
		S: 'tfc:metal/ingot/wrought_iron',
		A: 'tfc:metal/rod/wrought_iron'
	}).id('kubejs:crafting/iron_fence');
	e.shaped('6x immersiveposts:fence_lead', [
	'SAS',
	'SAS'
	], {
		S: 'immersiveengineering:ingot_lead',
		A: 'immersiveposts:stick_lead'
	}).id('kubejs:crafting/lead_fence');
	e.shaped('6x immersiveposts:fence_constantan', [
	'SAS',
	'SAS'
	], {
		S: 'immersiveengineering:ingot_constantan',
		A: 'immersiveposts:stick_constantan'
	}).id('kubejs:crafting/constantan_fence');
	e.shaped('6x immersiveposts:fence_electrum', [
	'SAS',
	'SAS'
	], {
		S: 'immersiveengineering:ingot_electrum',
		A: 'immersiveposts:stick_electrum'
	}).id('kubejs:crafting/electrum_fence');
	e.shaped('6x immersiveposts:postbase', [
	'S S',
	'SAS',
	'SAS',
	], {
		S: '#forge:stone_bricks',
		A: '#forge:cobblestone/normal'
	}).id('kubejs:crafting/post_base');
	e.shaped('1x immersiveengineering:electric_lantern', [
	' S ',
	'ABA',
	' C '
	], {
		S: 'tfc:metal/sheet/steel',
		A: '#forge:glass_panes/colorless',
		B: 'immersiveengineering:light_bulb',
		C: 'immersiveengineering:wire_copper'
	}).id('kubejs:crafting/electric_lantern');
	e.shaped('1x immersiveengineering:wirecutter', [
	'SA',
	'SA'
	], {
		S: '#forge:rods/wooden',
		A: 'tfc:metal/knife_blade/steel'
	}).id('kubejs:crafting/wirecutters');
	e.shaped('1x immersiveengineering:screwdriver', [
	' S',
	'A '
	], {
		S: 'tfc:metal/rod/steel',
		A: '#forge:rods/wooden'
	}).id('kubejs:crafting/screwdriver');
	e.shaped('1x immersiveengineering:hammer', [
	' SA',
	' BS',
	'B  '
	], {
		S: 'tfc:metal/hammer_head/steel',
		A: '#forge:string',
		B: '#forge:rods/wooden'
	}).id('kubejs:crafting/hammer');
	e.shaped('1x immersiveengineering:thermoelectric_generator', [
	'SAS',
	'BCB',
	'BBB'
	], {
		S: 'tfc:metal/sheet/steel',
		A: 'immersiveengineering:wire_lead',
		B: 'immersiveengineering:plate_constantan',
		C: 'immersiveengineering:coil_lv'
	}).id('kubejs:crafting/thermoelectric_generator');
	e.shaped('1x immersiveengineering:dynamo', [
	'SAS',
	'BCB',
	' D '
	], {
		S: 'minecraft:redstone',
		A: 'immersiveengineering:component_iron',
		B: 'tfc:metal/sheet/wrought_iron',
		C: 'immersiveengineering:coil_lv',
		D: 'immersiveengineering:wire_lead'
	}).id('kubejs:crafting/kinetic_dynamo');
	e.shaped('1x immersiveengineering:windmill', [
	'SSS',
	'SAS',
	'SSS'
	], {
		S: 'immersiveengineering:windmill_blade',
		A: 'tfc:metal/rod/steel'
	}).id('kubejs:crafting/windmill');
	e.shaped('1x immersiveengineering:watermill', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'immersiveengineering:waterwheel_segment',
		A: 'tfc:metal/rod/steel'
	}).id('kubejs:crafting/waterwheel');
	e.shaped('1x create:mechanical_press', [
	'S',
	'A',
	'B'
	], {
		S: 'create:shaft',
		A: 'create:andesite_casing',
		B: 'tfc:metal/double_ingot/wrought_iron'
	}).id('kubejs:crafting/mechanical_press');
	e.shaped('1x create:weighted_ejector', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/double_sheet/gold',
		A: 'create:depot',
		B: 'create:cogwheel'
	}).id('kubejs:crafting/weighted_ejector');
	e.shaped('4x create:chute', [
	'S',
	'A',
	'S'
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/sheet/cast_iron'
	}).id('kubejs:crafting/chute');
	e.shaped('1x create:smart_chute', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/sheet/brass',
		A: 'create:chute',
		B: 'create:electron_tube'
	}).id('kubejs:crafting/smart_chute');
	e.shaped('8x create:metal_bracket', [
	' S ',
	'ABA'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:metal/ingot/cast_iron',
		B: 'create:andesite_alloy'
	}).id('kubejs:crafting/metal_bracket');
	e.shaped('16x create:metal_girder', [
	'SSS',
	'AAA'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'create:andesite_alloy'
	}).id('kubejs:crafting/metal_girder');
	e.shaped('1x create:copper_valve_handle', [
	'S',
	'A'
	], {
		S: 'tfc:metal/sheet/copper',
		A: 'create:andesite_alloy'
	}).id('kubejs:crafting/valve_handle');
	e.shaped('2x create:fluid_tank', [
	'SAS',
	'S S',
	'SSS'
	], {
		S: '#tfc:lumber',
		A: 'tfc:metal/sheet/copper'
	}).id('kubejs:crafting/fluid_tank');
	e.shaped('1x create:hose_pulley', [
	'S',
	'A',
	'B'
	], {
		S: 'create:copper_casing',
		A: '#tfc:kelp',
		B: 'tfc:metal/sheet/copper'
	}).id('kubejs:crafting/hose_pulley');
	e.shaped('1x create:spout', [
	'S',
	'A'
	], {
		S: 'create:copper_casing',
		A: '#tfc:kelp'
	}).id('kubejs:crafting/spout');
	e.shaped('1x create:steam_engine', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/sheet/gold',
		A: 'create:andesite_alloy',
		B: 'minecraft:copper_block'
	}).id('kubejs:crafting/steam_engine');
	e.shaped('4x create:steam_whistle', [
	'S',
	'A'
	], {
		S: 'tfc:metal/sheet/gold',
		A: 'tfc:metal/ingot/copper'
	}).id('kubejs:crafting/steam_whistle');
	e.shaped('1x create:rope_pulley', [
	'S',
	'A',
	'B'
	], {
		S: 'create:andesite_casing',
		A: '#minecraft:wool',
		B: 'tfc:metal/sheet/cast_iron'
	}).id('kubejs:crafting/rope_pulley');
	e.shaped('1x create:mechanical_drill', [
	' S ',
	'SAS',
	' B '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/ingot/wrought_iron',
		B: 'create:andesite_casing'
	}).id('kubejs:crafting/mechanical_drill');
	e.shaped('1x create:mechanical_saw', [
	' S ',
	'SAS',
	' B '
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'create:shaft',
		B: 'create:andesite_casing'
	}).id('kubejs:crafting/mechanical_saw');
	e.shaped('2x create:redstone_contact', [
	' S ',
	'ABA',
	'AAA'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: '#forge:cobblestone/normal',
		B: 'minecraft:redstone'
	}).id('kubejs:crafting/redstone_contact');
	e.shaped('1x create:mechanical_harvester', [
	'SAS',
	'SAS',
	' B '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/rod/wrought_iron',
		B: 'create:andesite_casing'
	}).id('kubejs:crafting/mechanical_harvester');
	e.shaped('2x create:andesite_funnel', [
	'S',
	'A'
	], {
		S: 'create:andesite_alloy',
		A: '#tfc:kelp'
	}).id('kubejs:crafting/composite_funnel');
	e.shaped('2x create:andesite_tunnel', [
	'SS',
	'AA'
	], {
		S: 'create:andesite_alloy',
		A: '#tfc:kelp'
	}).id('kubejs:crafting/composite_tunnel');
	e.shaped('4x create:brass_funnel', [
	'S',
	'A',
	'B'
	], {
		S: 'create:electron_tube',
		A: 'tfc:metal/sheet/brass',
		B: '#tfc:kelp'
	}).id('kubejs:crafting/brass_funnel');
	e.shaped('4x create:brass_tunnel', [
	'S',
	'A',
	'B'
	], {
		S: 'create:electron_tube',
		A: 'tfc:metal/double_sheet/brass',
		B: '#tfc:kelp'
	}).id('kubejs:crafting/brass_tunnel');
	e.shaped('2x create:display_link', [
	'S',
	'A',
	'B'
	], {
		S: 'minecraft:redstone_torch',
		A: 'tfc:metal/sheet/copper',
		B: 'create:brass_casing'
	}).id('kubejs:crafting/display_link');
	e.shaped('1x create:pulse_extender', [
	'  S',
	'ABS',
	'CCC'
	], {
		S: 'minecraft:redstone_torch',
		A: '#forge:dusts/redstone',
		B: 'tfc:metal/sheet/brass',
		C: '#forge:smooth_stone'
	}).id('kubejs:crafting/pulse_extender');
	e.shaped('1x create:pulse_repeater', [
	'SAB',
	'CCC'
	], {
		S: '#forge:dusts/redstone',
		A: 'tfc:metal/sheet/brass',
		B: 'minecraft:redstone_torch',
		C: '#forge:smooth_stone'
	}).id('kubejs:crafting/pulse_repeater');
	e.shaped('1x create:belt_connector', [
	'SSS',
	'SSS'
	], {
		S: ['#tfc:kelp', '#forge:leather']
	}).id('kubejs:crafting/belt');
	e.shaped('1x create:mechanical_plough', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'create:andesite_alloy',
		B: 'create:andesite_casing'
	}).id('kubejs:crafting/mechanical_plough');
	e.shaped('1x create:mechanical_arm', [
	'SSA',
	'S  ',
	'BC '
	], {
		S: 'tfc:metal/rod/brass',
		A: 'create:andesite_alloy',
		B: 'create:precision_mechanism',
		C: 'create:brass_casing'
	}).id('kubejs:crafting/mechanical_arm');
	e.shaped('1x create:item_vault', [
	'S',
	'A',
	'S'
	], {
		S: 'tfc:metal/sheet/zinc',
		A: '#tfcbarrels:barrels'
	}).id('kubejs:crafting/item_vault');
	e.shaped('1x create:propeller', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'create:andesite_alloy'
	}).id('kubejs:crafting/propeller');
	e.shaped('1x create:whisk', [
	' S ',
	'ASA',
	' A '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/sheet/wrought_iron'
	}).id('kubejs:crafting/whisk');
	e.shaped('1x create:brass_hand', [
	' S ',
	'AAA',
	' A '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/sheet/brass'
	}).id('kubejs:crafting/brass_hand');
	e.shaped('1x create:electron_tube', [
	'S',
	'A'
	], {
		S: 'create:polished_rose_quartz',
		A: 'tfc:metal/sheet/zinc'
	}).id('kubejs:crafting/redstone_salt_tube');
	e.shaped('1x create:goggles', [
	' S ',
	'ABA'
	], {
		S: '#forge:string',
		A: '#forge:glass',
		B: 'tfc:metal/sheet/gold'
	}).id('kubejs:crafting/goggles');
	e.shaped('4x create:minecart_coupling', [
	'  S',
	' A ',
	'S  '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/rod/cast_iron'
	}).id('kubejs:crafting/coupling');
	e.shaped('1x create:copper_backtank', [
	'SAS',
	'BCB',
	' B '
	], {
		S: 'create:andesite_alloy',
		A: 'create:shaft',
		B: 'tfc:metal/double_ingot/copper',
		C: 'tfc:metal/chestplate/copper'
	}).id('kubejs:crafting/copper_backtank');
	e.shaped('1x create:peculiar_bell', [
	'S',
	'A'
	], {
		S: 'tfc:metal/double_ingot/brass',
		A: 'tfc:metal/sheet/brass'
	}).id('kubejs:crafting/peculiar_bell');
	e.shaped('1x create:wrench', [
	'SS',
	'SA',
	' B'
	], {
		S: 'tfc:metal/sheet/gold',
		A: 'create:cogwheel',
		B: 'minecraft:stick'
	}).id('kubejs:crafting/wrench');
	e.shaped('1x create:schematic_table', [
	'SSS',
	' A ',
	' A '
	], {
		S: '#minecraft:wooden_slabs',
		A: '#forge:smooth_stone'
	}).id('kubejs:crafting/schematic_table');
	e.shaped('1x create:brown_toolbox', [
	' S ',
	'ABA',
	' C '
	], {
		S: 'create:cogwheel',
		A: 'tfc:metal/sheet/gold',
		B: '#forge:chests/wooden',
		C: 'minecraft:leather'
	}).id('kubejs:crafting/toolbox');
	e.shaped('32x create:controller_rail', [
	'SAS',
	'SBS',
	'SAS'
	], {
		S: 'tfc:metal/rod/gold',
		A: 'minecraft:stick',
		B: 'create:electron_tube'
	}).id('kubejs:crafting/controller_rail');
	e.recipes.tfcAdvancedShapedCrafting(ItemProvider.of('gunswithoutroses:iron_gun').copyForgingBonus(), [
	'S  ',
	'ASB',
	' AC'
	], {
		S: Item.of('tfc:metal/tuyere/wrought_iron').ignoreNBT(),
		A: 'minecraft:stick',
		B: 'minecraft:flint',
		C: '#tfc:rocks/loose'
	}, 1, 1).id('kubejs:crafting/wrought_iron_rifle');
	e.recipes.tfcAdvancedShapedCrafting(ItemProvider.of('gunswithoutroses:gold_gun').copyForgingBonus(), [
	'S  ',
	'ASB',
	' AC'
	], {
		S: Item.of('tfc:metal/tuyere/bismuth_bronze').ignoreNBT(),
		A: 'minecraft:stick',
		B: 'minecraft:flint',
		C: '#tfc:rocks/loose'
	}, 1, 1).id('kubejs:crafting/bismuth_bronze_rifle');
	e.shaped('1x uppers:upper', [
	' S ',
	'A A'
	], {
		S: '#forge:chests/wooden',
		A: 'tfc:metal/sheet/wrought_iron'
	}).id('kubejs:crafting/upper_wrought_iron');
	e.shaped('2x uppers:upper', [
	' S ',
	'A A'
	], {
		S: '#forge:chests/wooden',
		A: 'tfc:metal/sheet/steel'
	}).id('kubejs:crafting/upper_steel');
	e.shaped('1x chunkloaders:basic_chunk_loader', [
	'SSS',
	'SSS',
	'SSS'
	], {
		S: 'chunkloaders:single_chunk_loader'
	}).id('kubejs:crafting/small_chunk_loader_to_basic');
	e.shaped('1x chunkloaders:basic_chunk_loader', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:metal/double_ingot/cast_iron'
	}).id('kubejs:crafting/basic_chunk_loader');
	e.shaped('1x chunkloaders:advanced_chunk_loader', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/gold',
		A: 'tfc:metal/double_ingot/gold'
	}).id('kubejs:crafting/advanced_chunk_loader');
	e.shaped('1x chunkloaders:ultimate_chunk_loader', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/steel',
		A: 'tfc:metal/double_ingot/steel'
	}).id('kubejs:crafting/ultimate_chunk_loader');
	e.shaped('1x create:empty_blaze_burner', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/black_steel',
		A: 'tfc:thatch'
	}).id('kubejs:crafting/empty_blaze_burner');
	e.shaped('1x toolbelt:pouch', [
	' S ',
	'A A',
	' B '
	], {
		S: 'tfc:metal/sheet/rose_gold',
		A: '#forge:string',
		B: 'kubejs:leather_pouch'
	}).id('kubejs:crafting/tool_pouch');
	e.shaped(Item.of('toolbelt:belt', '{Size:5}'), [
	'SAS',
	'B B',
	'BBB'
	], {
		S: '#forge:string',
		A: 'tfc:metal/sheet/nickel',
		B: 'toolbelt:pouch'
	}).id('kubejs:crafting/tool_belt');
	e.shaped('create:sticker', [
	'SAS',
	'BCB'
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:glue',
		B: '#forge:cobblestone/normal',
		C: 'minecraft:redstone'
	}).id('kubejs:crafting/sticker');
	e.shaped('create:sticky_mechanical_piston', [
	'S',
	'A'
	], {
		S: 'tfc:glue',
		A: 'create:mechanical_piston'
	}).id('kubejs:crafting/sticky_mechanical_piston');
	e.shaped('immersiveengineering:skyhook', [
	'SS ',
	'SA ',
	' BB'
	], {
		S: 'tfc:metal/rod/steel',
		A: 'immersiveengineering:component_iron',
		B: 'immersiveengineering:wooden_grip'
	}).id('kubejs:crafting/skyhook');
	e.shaped('8x createaddition:spool', [
	'S',
	'A',
	'S'
	], {
		S: ['#forge:treated_wood_slab', 'immersiveengineering:plate_duroplast'],
		A: 'tfc:metal/rod/steel'
	}).id('kubejs:crafting/spool');
	e.shaped('1x immersiveengineering:wirecoil_copper', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'immersiveengineering:wire_copper',
		A: 'createaddition:spool'
	}).id('kubejs:crafting/lv_wire_coil');
	e.shaped('1x immersiveengineering:wirecoil_electrum', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'immersiveengineering:wire_electrum',
		A: 'createaddition:spool'
	}).id('kubejs:crafting/mv_wire_coil');
	e.shaped('1x immersiveengineering:wirecoil_steel', [
	' S ',
	'ABA',
	' S '
	], {
		S: 'immersiveengineering:wire_steel',
		A: 'immersiveengineering:wire_aluminum',
		B: 'createaddition:spool'
	}).id('kubejs:crafting/hv_wire_coil_standard');
	e.shaped('1x immersiveengineering:wirecoil_steel', [
	' S ',
	'ABA',
	' S '
	], {
		S: 'immersiveengineering:wire_aluminum',
		A: 'immersiveengineering:wire_steel',
		B: 'createaddition:spool'
	}).id('kubejs:crafting/hv_wire_coil_rotated');
	e.shaped('1x immersiveengineering:wirecoil_redstone', [
	' S ',
	'ABA',
	' S '
	], {
		S: 'immersiveengineering:wire_aluminum',
		A: 'minecraft:redstone',
		B: 'createaddition:spool'
	}).id('kubejs:crafting/redstone_wire_coil_standard');
	e.shaped('1x immersiveengineering:wirecoil_redstone', [
	' S ',
	'ABA',
	' S '
	], {
		S: 'minecraft:redstone',
		A: 'immersiveengineering:wire_aluminum',
		B: 'createaddition:spool'
	}).id('kubejs:crafting/redstone_wire_coil_rotated');
	e.shaped('1x immersiveengineering:coil_lv', [
	'SSS',
	'SAS',
	'SSS'
	], {
		S: 'immersiveengineering:wirecoil_copper',
		A: Item.of('tfc:metal/tuyere/steel').ignoreNBT()
	}).id('kubejs:crafting/lv_coil');
	e.shaped('1x immersiveengineering:coil_mv', [
	'SSS',
	'SAS',
	'SSS'
	], {
		S: 'immersiveengineering:wirecoil_electrum',
		A: Item.of('tfc:metal/tuyere/steel').ignoreNBT()
	}).id('kubejs:crafting/mv_coil');
	e.shaped('1x immersiveengineering:coil_hv', [
	'SSS',
	'SAS',
	'SSS'
	], {
		S: 'immersiveengineering:wirecoil_steel',
		A: Item.of('tfc:metal/tuyere/steel').ignoreNBT()
	}).id('kubejs:crafting/hv_coil');
	e.shaped('1x create:powered_toggle_latch', [
	' S ',
	' A ',
	'BBB'
	], {
		S: 'minecraft:redstone_torch',
		A: 'minecraft:lever',
		B: '#forge:smooth_stone'
	}).id('kubejs:crafting/power_toggle_latch');
	e.shaped('1x create:powered_latch', [
	' S ',
	'ABA',
	'CCC'
	], {
		S: 'minecraft:redstone_torch',
		A: 'minecraft:redstone',
		B: 'minecraft:lever',
		C: '#forge:smooth_stone'
	}).id('kubejs:crafting/powered_latch');
	e.shaped('4x immersiveengineering:hemp_fabric', [
	' SA',
	'SAS',
	'AS '
	], {
		S: 'tfc:burlap_cloth',
		A: '#forge:rods/wooden'
	}).id('kubejs:crafting/tough_fabric');
	e.shaped('2x immersiveengineering:wirecoil_structure_rope', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:jute_fiber',
		A: '#forge:rods/wooden'
	}).id('kubejs:crafting/jute_rope_coil');
	e.shaped('1x immersiveengineering:workbench', [
	'SAA',
	'B C'
	], {
		S: 'tfc:metal/sheet/steel',
		A: '#forge:treated_wood_slab',
		B: 'immersiveengineering:craftingtable',
		C: 'immersiveengineering:treated_fence'
	}).id('kubejs:crafting/workbench');
	e.shaped('1x immersiveengineering:blastfurnace_preheater', [
	'S ',
	'A ',
	'BA'
	], {
		S: 'immersiveengineering:furnace_heater',
		A: 'immersiveengineering:sheetmetal_iron',
		B: 'create:encased_fan'
	}).id('kubejs:crafting/preheater');
	e.shaped('1x immersiveengineering:furnace_heater', [
	'SAS',
	'ABA',
	'SCS'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'tfc:metal/rod/copper',
		B: 'immersiveengineering:coil_lv',
		C: 'immersiveengineering:wire_lead'
	}).id('kubejs:crafting/heater');
	e.shaped('8x immersiveengineering:connector_lv_relay', [
	'S',
	'A',
	'B'
	], {
		S: 'immersiveengineering:wire_copper',
		A: 'minecraft:terracotta',
		B: 'create:andesite_alloy'
	}).id('kubejs:crafting/lv_relay');
	e.shaped('1x immersiveengineering:connector_lv', [
	'S',
	'A'
	], {
		S: 'immersiveengineering:connector_lv_relay',
		A: 'immersiveengineering:wire_lead'
	}).id('kubejs:crafting/lv_connector');
	e.shaped('8x immersiveengineering:connector_mv_relay', [
	'S',
	'A',
	'B'
	], {
		S: 'immersiveengineering:wire_electrum',
		A: 'immersiveengineering:duroplast',
		B: 'create:andesite_alloy'
	}).id('kubejs:crafting/mv_relay');
	e.shaped('1x immersiveengineering:connector_mv', [
	'S',
	'A'
	], {
		S: 'immersiveengineering:connector_mv_relay',
		A: 'immersiveengineering:wire_lead'
	}).id('kubejs:crafting/mv_connector');
	e.shaped('8x immersiveengineering:connector_hv_relay', [
	'S',
	'A',
	'B'
	], {
		S: 'immersiveengineering:wire_aluminum',
		A: 'immersiveengineering:insulating_glass',
		B: 'create:andesite_alloy'
	}).id('kubejs:crafting/hv_relay');
	e.shaped('1x immersiveengineering:connector_hv', [
	'S',
	'A'
	], {
		S: 'immersiveengineering:connector_hv_relay',
		A: 'immersiveengineering:wire_lead'
	}).id('kubejs:crafting/hv_connector');
	e.shaped('1x immersiveengineering:capacitor_lv', [
	'SAS',
	'BCB',
	'SAS'
	], {
		S: '#forge:treated_wood_slab',
		A: '#forge:sheets/lead',
		B: 'tfc:metal/ingot/copper',
		C: 'minecraft:redstone_block'
	}).id('kubejs:crafting/lv_capacitor');
	e.shaped('1x kubejs:frame/capacitor_mv', [
	'S S',
	'ABA',
	'SCS'
	], {
		S: '#forge:treated_wood_slab',
		A: 'immersiveengineering:ingot_electrum',
		B: 'immersiveengineering:metal_barrel',
		C: 'tfc:metal/sheet/wrought_iron'
	}).id('kubejs:crafting/mv_capacitor_frame');
	e.shaped('1x kubejs:frame/capacitor_hv', [
	'S S',
	'ABA',
	'SCS'
	], {
		S: '#forge:treated_wood_slab',
		A: 'immersiveengineering:ingot_aluminum',
		B: 'immersiveengineering:metal_barrel',
		C: 'immersiveengineering:ingot_hop_graphite'
	}).id('kubejs:crafting/hv_capacitor_frame');
	e.shaped('1x immersiveengineering:powerpack', [
	'SAS',
	'BCB'
	], {
		S: 'immersiveengineering:connector_lv',
		A: 'immersiveengineering:capacitor_lv',
		B: 'immersiveengineering:wirecoil_copper_ins',
		C: 'minecraft:leather_chestplate'
	}).id('kubejs:crafting/capacitor_backpack');
	e.shaped('1x immersiveengineering:floodlight', [
	'SAA',
	'BCD',
	'SEA'
	], {
		S: 'tfc:metal/sheet/silver',
		A: 'tfc:metal/ingot/steel',
		B: '#forge:glass_panes/colorless',
		C: 'immersiveengineering:light_bulb',
		D: 'immersiveengineering:component_iron',
		E: 'immersiveengineering:wire_copper'
	}).id('kubejs:crafting/floodlight');
	e.shaped('1x immersiveengineering:wooden_grip', [
	' SA',
	'SA ',
	'A  '
	], {
		S: 'tfc:metal/rod/copper',
		A: '#tfc:lumber'
	}).id('kubejs:crafting/wooden_grip');
	e.shaped('1x immersiveengineering:gunpart_drum', [
	'SSS',
	'SAS',
	'SSS'
	], {
		S: 'tfc:metal/rod/steel',
		A: 'tfc:metal/rod/wrought_iron'
	}).id('kubejs:crafting/gunpart_drum');
	e.shaped('1x immersiveengineering:gunpart_hammer', [
	'SAB',
	' S '
	], {
		S: 'tfc:metal/rod/steel',
		A: 'tfc:metal/ingot/steel',
		B: 'minecraft:flint_and_steel'
	}).id('kubejs:crafting/gunpart_hammer');
	e.shaped('1x create:speedometer', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/rod/brass',
		A: 'create:cogwheel',
		B: 'create:andesite_casing'
	}).id('kubejs:crafting/speedometer');
	e.shaped('1x immersiveengineering:voltmeter', [
	' S ',
	' A ',
	'BCB'
	], {
		S: 'tfc:metal/rod/brass',
		A: 'immersiveengineering:wirecoil_copper',
		B: '#forge:rods/wooden',
		C: 'tfc:metal/ingot/copper'
	}).id('kubejs:crafting/multimeter');
	e.shaped('4x railways:semaphore', [
	' S ',
	'ABC',
	' S '
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: '#forge:fences/wooden',
		B: 'create:andesite_casing',
		C: 'create:electron_tube'
	}).id('kubejs:crafting/semaphore');
	e.shaped('1x railways:track_coupler', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'minecraft:redstone',
		B: 'create:railway_casing'
	}).id('kubejs:crafting/track_coupler');
	e.shaped('6x create:ornate_iron_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'tfc:metal/sheet/wrought_iron',
		B: 'tfc:metal/rod/wrought_iron'
	}).id('kubejs:wrought_iron_window');
	e.shaped('6x create:oak_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'tfc:metal/sheet/brass',
		B: 'tfc:metal/rod/brass'
	}).id('kubejs:crafting/brass_window');
	e.shaped('6x create:spruce_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'tfc:metal/sheet/bronze',
		B: 'tfc:metal/rod/bronze'
	}).id('kubejs:crafting/bronze_window');
	e.shaped('6x create:birch_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'tfc:metal/sheet/sterling_silver',
		B: 'tfc:metal/rod/sterling_silver'
	}).id('kubejs:crafting/sterling_silver_window');
	e.shaped('6x create:jungle_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'immersiveengineering:plate_electrum',
		B: 'immersiveposts:stick_electrum'
	}).id('kubejs:crafting/electrum_window');
	e.shaped('6x create:acacia_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'immersiveengineering:plate_constantan',
		B: 'immersiveposts:stick_constantan'
	}).id('kubejs:crafting/constantan_window');
	e.shaped('6x create:dark_oak_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'tfc:metal/sheet/black_bronze',
		B: 'tfc:metal/rod/black_bronze'
	}).id('kubejs:crafting/black_bronze_window');
	e.shaped('6x create:crimson_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'tfc:metal/sheet/rose_gold',
		B: 'tfc:metal/rod/rose_gold'
	}).id('kubejs:crafting/rose_gold_window');
	e.shaped('6x create:warped_window', [
	'SAS',
	'BSB'
	], {
		S: '#forge:glass/colorless',
		A: 'tfc:metal/sheet/bismuth_bronze',
		B: 'tfc:metal/rod/bismuth_bronze'
	}).id('kubejs:crafting/bismuth_bronze_window');
	e.shaped('16x create:ornate_iron_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:ornate_iron_window'
	}).id('kubejs:crafting/wrought_iron_window_pane');
	e.shaped('16x create:oak_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:oak_window'
	}).id('kubejs:crafting/brass_window_pane');
	e.shaped('16x create:spruce_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:spruce_window'
	}).id('kubejs:crafting/bronze_window_pane');
	e.shaped('16x create:birch_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:birch_window'
	}).id('kubejs:crafting/sterling_silver_window_pane');
	e.shaped('16x create:jungle_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:jungle_window'
	}).id('kubejs:crafting/electrum_window_pane');
	e.shaped('16x create:acacia_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:acacia_window'
	}).id('kubejs:crafting/constantan_window_pane');
	e.shaped('16x create:dark_oak_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:dark_oak_window'
	}).id('kubejs:crafting/black_bronze_window_pane');
	e.shaped('16x create:crimson_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:crimson_window'
	}).id('kubejs:crafting/rose_gold_window_pane');
	e.shaped('16x create:warped_window_pane', [
	'SSS',
	'SSS'
	], {
		S: 'create:warped_window'
	}).id('kubejs:crafting/bismuth_bronze_window_pane');
	e.shaped('8x createaddition:barbed_wire', [
	' S ',
	'S S',
	' S '
	], {
		S: 'tfc:metal/rod/wrought_iron'
	}).id('createaddition:crafting/barbed_wire');
	e.shaped('1x createaddition:modular_accumulator', [
	'SAS',
	'BCB',
	'SDS'
	], {
		S: 'tfc:metal/rod/gold',
		A: 'tfc:metal/sheet/copper',
		B: 'immersiveengineering:wirecoil_electrum',
		C: 'immersiveengineering:capacitor_hv',
		D: 'create:brass_casing'
	}).id('kubejs:crafting/modular_accumulator');
	e.shaped('2x railways:smokestack_caboosestyle', [
	'S',
	'A'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:soot'
	}).id('railways:crafting/smokestack_caboosestyle');
	e.shaped('8x railways:smokestack_coalburner', [
	'S S',
	'S S',
	'SAS',
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:soot'
	}).id('railways:crafting/smokestack_coalburner');
	e.shaped('6x railways:smokestack_oilburner', [
	'S S',
	'SAS'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:soot'
	}).id('railways:crafting/smokestack_oilburner');
	e.shaped('2x railways:smokestack_streamlined', [
	'SAS'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:soot'
	}).id('railways:crafting/smokestack_streamlined');
	e.shaped('4x railways:smokestack_woodburner', [
	' S ',
	'SAS'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:soot'
	}).id('railways:crafting/smokestack_woodburner');
	e.shaped('4x railways:smokestack_diesel', [
	'SAS',
	' B '
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'create:propeller',
		B: 'tfc:soot'
	}).id('railways:crafting/smokestack_diesel');
	e.shaped('1x immersiveengineering:fluid_placer', [
	'SAS',
	'A A',
	'SAS'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: ['tfc:red_steel_bars', 'tfc:blue_steel_bars']
	}).id('immersiveengineering:crafting/fluid_placer');
	e.shaped('6x createdeco:cast_iron_catwalk', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/rod/cast_iron',
		A: 'tfc:metal/sheet/cast_iron'
	}).id('createdeco:cast_iron_catwalk');
	e.shaped('2x createdeco:cast_iron_catwalk_stair', [
	' S',
	'SA'
	], {
		S: 'createdeco:cast_iron_catwalk',
		A: 'tfc:metal/rod/cast_iron'
	}).id('createdeco:cast_iron_catwalk_stair');
	e.shaped('3x immersiveengineering:metal_ladder_alu', [
	'S',
	'A'
	], {
		S: '#immersiveengineering:scaffoldings/aluminum',
		A: '#forge:ladders/metal'
	}).id('immersiveengineering:crafting/metal_ladder_alu');
	e.shaped('3x immersiveengineering:metal_ladder_steel', [
	'S',
	'A'
	], {
		S: '#immersiveengineering:scaffoldings/steel',
		A: '#forge:ladders/metal'
	}).id('immersiveengineering:crafting/metal_ladder_steel');
	e.shaped('16x create:andesite_ladder', [
	'S S',
	'S S',
	'S S'
	], {
		S: 'create:andesite_alloy'
	}).id('kubejs:crafting/composite_ladder');
	e.shaped('8x immersiveengineering:connector_redstone', [
		'S',
		'A',
		'B'
	], {
		S: 'immersiveengineering:wire_aluminum',
		A: 'minecraft:redstone',
		B: 'create:andesite_alloy'
	}).id('kubejs:crafting/redstone_connector');
	e.shaped('8x immersiveengineering:connector_probe', [
		'S',
		'A',
		'B'
	], {
		S: 'immersiveengineering:wire_aluminum',
		A: 'immersiveengineering:component_electronic',
		B: 'create:andesite_alloy'
	}).id('kubejs:crafting/redstone_probe');
	e.shaped('8x immersiveengineering:connector_bundled', [
		'S',
		'A',
		'S'
	], {
		S: 'immersiveengineering:wire_aluminum',
		A: 'create:andesite_alloy'
	}).id('kubejs:crafting/restone_interface');
	e.shaped('1x immersiveengineering:item_batcher', [
		'SAS',
		'BCB',
		'SDS'
	], {
		S: '#forge:treated_wood',
		A: 'minecraft:redstone',
		B: 'tfc:metal/rod/wrought_iron',
		C: 'immersiveengineering:component_iron',
		D: 'immersiveengineering:component_electronic'
	}).id('kubejs:crafting/item_batcher');
	e.shaped('1x immersiveengineering:redstone_breaker', [
		'SAS',
		'BCB'
	], {
		S: 'immersiveengineering:connector_hv',
		A: 'minecraft:repeater',
		B: 'tfc:metal/sheet/wrought_iron',
		C: 'immersiveengineering:component_electronic'
	}).id('immersiveengineering:crafting/redstone_breaker');
	e.shaped('1x createdeco:yellow_andesite_lamp', [
		' S ',
		'BAB',
		' S '
	], {
		S: 'create:andesite_alloy',
		A: 'create:rose_quartz_lamp',
		B: '#forge:dyes/yellow'
	}).id('kuebjs:crafting/yellow_composite_material_lamp');
	e.shaped('1x createdeco:red_andesite_lamp', [
		' S ',
		'BAB',
		' S '
	], {
		S: 'create:andesite_alloy',
		A: 'create:rose_quartz_lamp',
		B: '#forge:dyes/red'
	}).id('kuebjs:crafting/red_composite_material_lamp');
	e.shaped('1x createdeco:blue_andesite_lamp', [
		' S ',
		'BAB',
		' S '
	], {
		S: 'create:andesite_alloy',
		A: 'create:rose_quartz_lamp',
		B: '#forge:dyes/blue'
	}).id('kuebjs:crafting/blue_composite_material_lamp');
	e.shaped('1x createdeco:green_andesite_lamp', [
		' S ',
		'BAB',
		' S '
	], {
		S: 'create:andesite_alloy',
		A: 'create:rose_quartz_lamp',
		B: '#forge:dyes/green'
	}).id('kuebjs:crafting/green_composite_material_lamp');
	e.shaped('1x createdeco:yellow_iron_lamp', [
		' S ',
		'CAC',
		' B '
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'create:rose_quartz_lamp',
		B: 'tfc:metal/sheet/wrought_iron',
		C: '#forge:dyes/yellow'
	}).id('kuebjs:crafting/yellow_wrought_iron_lamp');
	e.shaped('1x createdeco:red_iron_lamp', [
		' S ',
		'CAC',
		' B '
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'create:rose_quartz_lamp',
		B: 'tfc:metal/sheet/wrought_iron',
		C: '#forge:dyes/red'
	}).id('kuebjs:crafting/red_wrought_iron_lamp');
	e.shaped('1x createdeco:blue_iron_lamp', [
		' S ',
		'CAC',
		' B '
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'create:rose_quartz_lamp',
		B: 'tfc:metal/sheet/wrought_iron',
		C: '#forge:dyes/blue'
	}).id('kuebjs:crafting/blue_wrought_iron_lamp');
	e.shaped('1x createdeco:green_iron_lamp', [
		' S ',
		'CAC',
		' B '
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'create:rose_quartz_lamp',
		B: 'tfc:metal/sheet/wrought_iron',
		C: '#forge:dyes/green'
	}).id('kuebjs:crafting/green_wrought_iron_lamp');
	e.shaped('1x immersiveengineering:toolupgrade_drill_waterproof', [
		'SA ',
		'ASA',
		' AB'
	], {
		S: '#forge:dyes/blue',
		A: 'tfc:metal/sheet/wrought_iron',
		B: 'immersiveengineering:fluid_pipe'
	}).id('immersiveengineering:crafting/toolupgrade_drill_waterproof');
	e.shaped('1x immersiveengineering:toolupgrade_drill_lube', [
		' S ',
		'SAS',
		' SB'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: FluidIngredient.of('#forge:plantoil', 1000).asItemIngredient(),
		B: 'immersiveengineering:fluid_pipe'
	}).id('immersiveengineering:crafting/toolupgrade_drill_lube');
	e.shaped('1x immersiveengineering:toolupgrade_drill_capacity', [
		'SA ',
		'ABA',
		' AB'
	], {
		S: 'immersiveengineering:fluid_pipe',
		A: 'tfc:metal/sheet/steel',
		B: '#forge:dyes/red'
	}).id('immersiveengineering:crafting/toolupgrade_drill_capacity');
	e.shaped('1x immersiveengineering:toolupgrade_revolver_bayonet', [
		'SA',
		'BS'
	], {
		S: 'immersiveengineering:wire_copper',
		A: 'tfc:metal/sword_blade/steel',
		B: 'tfc:metal/rod/steel'
	}).id('immersiveengineering:crafting/toolupgrade_revolver_bayonet');
	e.shaped('1x immersiveengineering:toolupgrade_revolver_magazine', [
		' SA',
		'SAS',
		'BS '
	], {
		S: 'immersiveengineering:wire_copper',
		A: 'tfc:metal/sheet/steel',
		B: 'immersiveengineering:component_iron'
	}).id('immersiveengineering:crafting/toolupgrade_revolver_magazine');
	e.shaped('1x immersiveengineering:toolupgrade_chemthrower_focus', [
		'S  ',
		' SA',
		' AB'
	], {
		S: 'immersiveengineering:fluid_pipe',
		A: 'tfc:metal/sheet/steel',
		B: 'immersiveengineering:component_iron'
	}).id('immersiveengineering:crafting/toolupgrade_chemthrower_focus');
	e.shaped('1x immersiveengineering:toolupgrade_railgun_capacitors', [
		'SA ',
		' SA',
		'  S'
	], {
		S: 'tfc:metal/rod/steel',
		A: '#forge:sheets/constantan'
	}).id('immersiveengineering:crafting/toolupgrade_railgun_capacitors');
	e.shaped('1x immersiveengineering:toolupgrade_shield_flash', [
		' S ',
		'SAS'
	], {
		S: 'tfc:metal/sheet/silver',
		A: 'immersiveengineering:light_bulb'
	}).id('immersiveengineering:crafting/toolupgrade_shield_flash');
	e.shaped('1x immersiveengineering:toolupgrade_shield_shock', [
		'SAS',
		'SAS',
		'SAS'
	], {
		S: 'immersiveengineering:connector_lv',
		A: 'tfc:metal/rod/wrought_iron'
	}).id('immersiveengineering:crafting/toolupgrade_shield_shock');
	e.shaped('1x immersiveengineering:toolupgrade_shield_magnet', [
		'  S',
		'SA ',
		'SBS'
	], {
		S: '#forge:leather',
		A: 'immersiveengineering:coil_lv',
		B: 'tfc:metal/ingot/wrought_iron'
	}).id('immersiveengineering:crafting/toolupgrade_shield_magnet');
	e.shaped('1x immersiveengineering:toolupgrade_buzzsaw_spareblades', [
		'SAB',
		'SB '
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'tfc:burlap_cloth',
		B: '#forge:treated_wood'
	}).id('immersiveengineering:crafting/toolupgrade_buzzsaw_spareblades');
	e.shaped('1x immersiveengineering:speedloader', [
		'SAB'
	], {
		S: 'tfc:metal/rod/steel',
		A: 'immersiveengineering:gunpart_drum',
		B: 'immersiveengineering:component_iron'
	}).id('immersiveengineering:crafting/speedloader');
	e.shaped('1x create:andesite_alloy_block', [
		'SSS',
		'SSS',
		'SSS'
	], {
		S: 'create:andesite_alloy'
	}).id('create:crafting/materials/composite_block');
	e.shaped('1x create:elevator_pulley', [
		'S',
		'A',
		'B'
	], {
		S: 'create:brass_casing',
		A: '#tfc:kelp',
		B: 'tfc:metal/sheet/wrought_iron'
	}).id('create:crafting/kinetics/elevator_pulley');
	e.shaped('2x railways:smokestack_long', [
		'SAS'
	], {
		S: 'tfc:metal/ingot/cast_iron',
		A: 'tfc:soot'
	}).id('railways:crafting/smokestack_long');
	e.shaped('1x create:netherite_backtank', [
		'SAS',
		'BCB',
		' B '
	], {
		S: 'tfc:metal/rod/red_steel',
		A: 'create:shaft',
		B: 'tfc:metal/double_ingot/blue_steel',
		C: 'tfc:metal/chestplate/blue_steel'
	}).id('kubejs:crafting/blue_steel_backtank');
	e.shaped('immersiveengineering:toolupgrade_drill_fortune', [
		'SA ',
		'ASA',
		'BBC'
	], {
		S: FluidIngredient.of('immersiveengineering:redstone_acid', 1000).asItemIngredient(),
		A: 'tfc:metal/sheet/steel',
		B: 'immersiveengineering:fluid_pipe',
		C: 'immersiveengineering:component_steel'
	}).id('immersiveengineering:crafting/toolupgrade_drill_fortune');
	e.shaped('immersivepetroleum:seismic_survey', [
		'SAB',
		'SAS',
		'CDC'
	], {
		S: '#immersiveengineering:scaffoldings/steel',
		A: 'tfc:metal/tuyere/steel',
		B: 'immersiveengineering:gunpart_hammer',
		C: 'immersiveengineering:component_iron',
		D: 'immersiveengineering:light_engineering'
	}).id('immersivepetroleum:seismic_survey_tool');
	e.shaped('immersivepetroleum:projector', [
		'S  ',
		'AB ',
		' AC'
	], {
		S: '#forge:glass/colorless',
		A: 'tfc:metal/rod/wrought_iron',
		B: 'tfc:metal/sheet/brass',
		C: '#forge:treated_wood'
	}).id('immersivepetroleum:projector');
	e.shaped('immersiveengineering:survey_tools', [
		'SAB',
		'CCC'
	], {
		S: Item.of('minecraft:writable_book').ignoreNBT(),
		A: '#forge:glass/colorless',
		B: Item.of('immersiveengineering:hammer').ignoreNBT(),
		C: '#forge:fabric_hemp'
	}).id('immersiveengineering:crafting/survey_tools');
	e.shaped('immersiveengineering:current_transformer', [
		' S ',
		' A ',
		'BCB'
	], {
		S: 'immersiveengineering:voltmeter',
		A: 'immersiveengineering:duroplast',
		B: 'tfc:metal/rod/steel',
		C: 'immersiveengineering:component_electronic'
	}).id('immersiveengineering:crafting/current_transformer');
	e.shaped('12x immersiveengineering:steel_scaffolding_standard', [
		'SSS',
		' A ',
		'A A'
	], {
		S: '#forge:ingots/steel',
		A: '#forge:rods/steel'
	}).id('immersiveengineering:crafting/steel_scaffolding_standard');
})