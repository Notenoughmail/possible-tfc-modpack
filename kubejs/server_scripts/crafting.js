// priority: 0

console.info('Loading TFC crafting recipes')

let wire_metals = ['copper', 'lead', 'steel', 'electrum', 'aluminum']

let partial_metal = ['copper', 'gold', 'silver', 'nickel']

onEvent('recipes', e => {
	//shapeless
	e.shapeless('1x create:encased_chain_drive', ['create:andesite_casing', 'tfc:metal/chain/wrought_iron', 'tfc:metal/chain/wrought_iron']).id('kubejs:shapeless_crafting/chain_drive_from_chains');
	e.shapeless('1x create:placard', ['minecraft:item_frame', 'tfc:metal/sheet/brass']).id('kubejs:shapeless_crafting/tfc_placard');
	e.shapeless('1x create:rose_quartz', ['tfc:ore/halite', '8x minecraft:redstone']).id('kubejs:shapeless_crafting/redstone_salt_from_halite');
	e.shapeless('1x create:rose_quartz', ['tfc:ore/sylvite', '8x minecraft:redstone']).id('kubejs:shapeless_crafting/redstone_salt_from_sylvite');
	e.shapeless('1x create:super_glue', ['tfc:glue', 'tfc:metal/tuyere/wrought_iron']).id('kubejs:shapeless_crafting/super_glue_from_tuyere');
	e.shapeless('2x create:train_door', ['#minecraft:wooden_doors', 'tfc:metal/sheet/brass', '#minecraft:wooden_doors']).id('kubejs:shapeless_crafting/train_door_from_tfc');
	e.shapeless('2x create:train_trapdoor', ['#minecraft:wooden_trapdoors', 'tfc:metal/sheet/brass', '#minecraft:wooden_trapdoors']).id('kubejs:shapeless_crafting/train_trapdoor_from_tfc');
	e.shapeless('32x gunswithoutroses:iron_bullet', ['minecraft:gunpowder', 'kubejs:unfilled_wrought_iron_shots']).id('kubejs:shapeless_crafting/wrought_iron_shots_filling');
	e.shapeless('32x gunswithoutroses:blaze_bullet', ['minecraft:gunpowder', 'kubejs:unfilled_steel_shots']).id('kubejs:shapeless_crafting/steel_shots_filling');
	e.shapeless('32x gunswithoutroses:flint_bullet', ['minecraft:gunpowder', '4x minecraft:flint']).id('kubejs:shapeless_crafting/flint_shot_crafting');
	e.shapeless('9x chunkloaders:single_chunk_loader', ['chunkloaders:basic_chunk_loader']).id('kubejs:shapeless_crafting/single_chunk_loader_crafting');
	e.shapeless('1x create:sand_paper', ['minecraft:paper', '#forge:sand']).id('kubejs:shapeless_crafting/sand_paper_from_sand');
	e.shapeless('1x usclb:clipboardfolder', ['minecraft:paper', ['#minecraft:wooden_pressure_plates', 'immersiveengineering:plate_duroplast']]).id('kubejs:shapeless_crafting/clipboard_frame')
	
	let blueprint = (input, output, id) => {
		e.shapeless( output, ['create:crafting_blueprint', input ]).id('kubejs:shapeless_crafting/' + id)
	}
	blueprint('tfc:metal/double_sheet/black_steel', Item.of('immersiveengineering:blueprint', '{blueprint:"molds"}'), 'metal_press_mold_blueprint')
	blueprint('create:precision_mechanism', Item.of('immersiveengineering:blueprint', '{blueprint:"components"}'), 'component_blueprint')
	blueprint('minecraft:gunpowder', Item.of('immersiveengineering:blueprint', '{blueprint:"bullet"}'), 'basic_bullet_blueprint')
	blueprint('#minecraft:banners', Item.of('immersiveengineering:blueprint', '{blueprint:"bannerpatterns"}'), 'banner_pattern_blueprint')
	blueprint('tfc:powderkeg', Item.of('immersiveengineering:blueprint', '{blueprint:"specialBullet"}'), 'special_bullet_blueprint')
	blueprint('tfc:metal/tuyere/red_steel', Item.of('immersiveengineering:blueprint', '{blueprint:"electrode"}'), 'metal_working_blueprint')
	
	wire_metals.forEach(metal => {
		e.shapeless('1x immersiveengineering:wire_' + metal, [['tfc:metal/rod/' + metal, 'immersiveengineering:stick_' + metal, 'immersiveposts:stick_' + metal], 'immersiveengineering:wirecutter']).id('kubejs:shapeless_crafting/cut_rod_to_wire_' + metal)
	})
	//shaped
	partial_metal.forEach(metal => {
		e.shaped('6x immersiveposts:fence_' + metal, [
		'SAS',
		'SAS'
		], {
			S: 'tfc:metal/ingot/' + metal,
			A: 'tfc:metal/rod/' + metal,
		}).id('kubejs:shaped_crafting/' + metal + '_fence_from_tfc')
	})
	
	e.shaped('2x immersiveengineering:conveyor_basic', [
	'S',
	'A'
	], {
		S: 'create:belt_connector',
		A: 'tfc:metal/sheet/steel'
	}).id('kubejs:shaped_crafting/conveyor_from_tfc');
	e.shaped('6x immersiveengineering:steel_fence', [
	'SAS',
	'SAS'
	], {
		S: 'tfc:metal/ingot/steel',
		S: 'tfc:metal/rod/steel'
	}).id('kubejs:shaped_crafting/steel_fence_from_tfc');
	e.shaped('6x immersiveposts:fence_iron', [
	'SAS',
	'SAS'
	], {
		S: 'tfc:metal/ingot/wrought_iron',
		A: 'tfc:metal/rod/wrought_iron'
	}).id('kubejs:shaped_crafting/iron_fence_from_tfc');
	e.shaped('6x immersiveposts:fence_lead', [
	'SAS',
	'SAS'
	], {
		S: 'immersiveengineering:ingot_lead',
		A: 'immersiveposts:stick_lead'
	}).id('kubejs:shaped_crafting/lead_fence_from_tfc');
	e.shaped('6x immersiveposts:fence_constantan', [
	'SAS',
	'SAS'
	], {
		S: 'immersiveengineering:ingot_constantan',
		A: 'immersiveposts:stick_constantan'
	}).id('kubejs:shaped_crafting/constantan_fence_from_tfc');
	e.shaped('6x immersiveposts:fence_electrum', [
	'SAS',
	'SAS'
	], {
		S: 'immersiveengineering:ingot_electrum',
		A: 'immersiveposts:stick_electrum'
	}).id('kubejs:shaped_crafting/electrum_fence_from_tfc');
	e.shaped('6x immersiveposts:postbase', [
	'S S',
	'SAS',
	'SAS',
	], {
		S: '#forge:stone_bricks',
		A: '#forge:cobblestone/normal'
	}).id('kubejs:shaped_crafting/post_base_from_tags');
	e.shaped('1x immersiveengineering:electric_lantern', [
	' S ',
	'ABA',
	' C '
	], {
		S: 'tfc:metal/sheet/steel',
		A: '#forge:glass_panes/colorless',
		B: 'immersiveengineering:light_bulb',
		C: 'immersiveengineering:wire_copper'
	}).id('kubejs:shaped_crafting/electric_lantern_from_tfc');
	e.shaped('1x immersiveengineering:wirecutter', [
	'SA',
	'SA'
	], {
		S: '#forge:rods/wooden',
		A: 'tfc:metal/knife_blade/steel'
	}).id('kubejs:shaped_crafting/wirecutters_from_tfc');
	e.shaped('1x immersiveengineering:screwdriver', [
	' S',
	'A '
	], {
		S: 'tfc:metal/rod/steel',
		A: '#forge:rods/wooden'
	}).id('kubejs:shaped_crafting/screwdriver_from_tfc');
	e.shaped('1x immersiveengineering:hammer', [
	' SA',
	' BS',
	'B  '
	], {
		S: 'tfc:metal/hammer_head/steel',
		A: '#forge:string',
		B: '#forge:rods/wooden'
	}).id('kubejs:shaped_crafting/hammer_from_tfc');
	e.shaped('1x immersiveengineering:thermoelectric_generator', [
	'SAS',
	'BCB',
	'BBB'
	], {
		S: 'tfc:metal/sheet/steel',
		A: 'immersiveengineering:wire_lead',
		B: 'immersiveengineering:plate_constantan',
		C: 'immersiveengineering:coil_lv'
	}).id('kubejs:shaped_crafting/thermoelectric_generator_from_tfc');
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
	}).id('kubejs:shaped_crafting/kinetic_dynamo_from_tfc');
	e.shaped('1x immersiveengineering:windmill', [
	'SSS',
	'SAS',
	'SSS'
	], {
		S: 'immersiveengineering:windmill_blade',
		A: 'tfc:metal/rod/steel'
	}).id('kubejs:shaped_crafting/windmill_from_tfc');
	e.shaped('1x immersiveengineering:watermill', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'immersiveengineering:waterwheel_segment',
		A: 'tfc:metal/rod/steel'
	}).id('kubejs:shaped_crafting/waterwheel_from_tfc');
	e.shaped('1x create:mechanical_press', [
	'S',
	'A',
	'B'
	], {
		S: 'create:shaft',
		A: 'create:andesite_casing',
		B: 'tfc:metal/double_ingot/wrought_iron'
	}).id('kubejs:shaped_crafting/mechanical_press_from_wrought_iron');
	e.shaped('1x create:weighted_ejector', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/double_sheet/gold',
		A: 'create:depot',
		B: 'create:cogwheel'
	}).id('kubejs:shaped_crafting/weighted_ejector_from_gold_double_sheet');
	e.shaped('8x create:chute', [
	'S',
	'A',
	'S'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:metal/ingot/cast_iron'
	}).id('kubejs:shaped_crafting/chute_from_cast_iron');
	e.shaped('1x create:smart_chute', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/sheet/brass',
		A: 'create:chute',
		B: 'create:electron_tube'
	}).id('kubejs:shaped_crafting/smart_chute_from_tfc');
	e.shaped('8x create:metal_bracket', [
	' S ',
	'ABA'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:metal/ingot/cast_iron',
		B: 'create:andesite_alloy'
	}).id('kubejs:shaped_crafting/metal_bracket_from_tfc');
	e.shaped('16x create:metal_girder', [
	'SSS',
	'AAA'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'create:andesite_alloy'
	}).id('kubejs:shaped_crafting/metal_girder_from_tfc');
	e.shaped('1x create:copper_valve_handle', [
	'S',
	'A'
	], {
		S: 'tfc:metal/sheet/copper',
		A: 'create:andesite_alloy'
	}).id('kubejs:shaped_crafting/valve_handle_from_tfc');
	e.shaped('2x create:fluid_tank', [
	'S',
	'A',
	'S'
	], {
		S: 'tfc:metal/sheet/copper',
		A: '#tfc:barrels'
	}).id('kubejs:shaped_crafting/fluid_tank_from_tfc');
	e.shaped('1x create:hose_pulley', [
	'S',
	'A',
	'B'
	], {
		S: 'create:copper_casing',
		A: '#tfc:kelp',
		B: 'tfc:metal/sheet/copper'
	}).id('kubejs:shaped_crafting/hose_pulley_from_tfc');
	e.shaped('1x create:spout', [
	'S',
	'A'
	], {
		S: 'create:copper_casing',
		A: '#tfc:kelp'
	}).id('kubejs:shaped_crafting/spout_from_tfc');
	e.shaped('1x create:steam_engine', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/sheet/gold',
		A: 'create:andesite_alloy',
		B: 'tfc:metal/double_ingot/copper'
	}).id('kubejs:shaped_crafting/steam_engine_from_tfc');
	e.shaped('4x create:steam_whistle', [
	'S',
	'A'
	], {
		S: 'tfc:metal/sheet/gold',
		A: 'tfc:metal/ingot/copper'
	}).id('kubejs:shaped_crafting/steam_whistle_from_tfc');
	e.shaped('1x create:rope_pulley', [
	'S',
	'A',
	'B'
	], {
		S: 'create:andesite_casing',
		A: '#minecraft:wool',
		B: 'tfc:metal/sheet/cast_iron'
	}).id('kubejs:shaped_crafting/rope_pulley_from_tfc');
	e.shaped('1x create:mechanical_drill', [
	' S ',
	'SAS',
	' B '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/ingot/wrought_iron',
		B: 'create:andesite_casing'
	}).id('kubejs:shaped_crafting/mechanical_drill_from_tfc');
	e.shaped('1x create:mechanical_saw', [
	' S ',
	'SAS',
	' B '
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'create:shaft',
		B: 'create:andesite_casing'
	}).id('kubejs:shaped_crafting/mechanical_saw_from_tfc');
	e.shaped('2x create:redstone_contact', [
	' S ',
	'ABA',
	'AAA'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: '#forge:cobblestone/normal',
		B: 'minecraft:redstone'
	}).id('kubejs:shaped_crafting/redstone_contact_from_tfc');
	e.shaped('1x create:mechanical_harvester', [
	'SAS',
	'SAS',
	' B '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/rod/wrought_iron',
		B: 'create:andesite_casing'
	}).id('kubejs:shaped_crafting/mechanical_harvester_from_tfc');
	e.shaped('2x create:andesite_funnel', [
	'S',
	'A'
	], {
		S: 'create:andesite_alloy',
		A: '#tfc:kelp'
	}).id('kubejs:shaped_crafting/andesite_funnel_from_kelp');
	e.shaped('2x create:andesite_tunnel', [
	'SS',
	'AA'
	], {
		S: 'create:andesite_alloy',
		A: '#tfc:kelp'
	}).id('kubejs:shaped_crafting/andesite_tunnel_from_kelp');
	e.shaped('4x create:brass_funnel', [
	'S',
	'A',
	'B'
	], {
		S: 'create:electron_tube',
		A: 'tfc:metal/sheet/brass',
		B: '#tfc:kelp'
	}).id('kubejs:shaped_crafting/brass_funnel_from_kelp');
	e.shaped('4x create:brass_tunnel', [
	'S',
	'A',
	'B'
	], {
		S: 'create:electron_tube',
		A: 'tfc:metal/double_sheet/brass',
		B: '#tfc:kelp'
	}).id('kubejs:shaped_crafting/brass_tunnel_from_kelp');
	e.shaped('2x create:display_link', [
	'S',
	'A',
	'B'
	], {
		S: 'minecraft:redstone_torch',
		A: 'tfc:metal/sheet/copper',
		B: 'create:brass_casing'
	}).id('kubejs:shaped_crafting/display_link_from_tfc');
	e.shaped('1x create:pulse_extender', [
	'  S',
	'ABS',
	'CCC'
	], {
		S: 'minecraft:redstone_torch',
		A: '#forge:dusts/redstone',
		B: 'tfc:metal/sheet/brass',
		C: '#forge:stone'
	}).id('kubejs:shaped_crafting/pulse_extender_from_tfc');
	e.shaped('1x create:pulse_repeater', [
	'SAB',
	'CCC'
	], {
		S: '#forge:dusts/redstone',
		A: 'tfc:metal/sheet/brass',
		B: 'minecraft:redstone_torch',
		C: '#forge:stone'
	}).id('kubejs:shaped_crafting/pulse_extender_from_tfc');
	e.shaped('1x create:belt_connector', [
	'SSS',
	'SSS'
	], {
		S: ['#tfc:kelp', '#forge:leather']
	}).id('kubejs:shaped_crafting/belt_from_kelp_or_leather');
	e.shaped('1x create:mechanical_plough', [
	'S',
	'A',
	'B'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'create:andesite_alloy',
		B: 'create:andesite_casing'
	}).id('kubejs:shaped_crafting/mechanical_plough_from_tfc');
	e.shaped('1x create:mechanical_arm', [
	'SSA',
	'S  ',
	'BC '
	], {
		S: 'tfc:metal/rod/brass',
		A: 'create:andesite_alloy',
		B: 'create:precision_mechanism',
		C: 'create:brass_casing'
	}).id('kubejs:shaped_crafting/mechanical_arm_from_tfc');
	e.shaped('1x create:item_vault', [
	'S',
	'A',
	'S'
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: '#tfc:barrels'
	}).id('kubejs:shaped_crafting/item_vault_from_tfc'); //look back at this
	e.shaped('1x create:propeller', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: 'create:andesite_alloy'
	}).id('kubejs:shaped_crafting/propeller_from_tfc');
	e.shaped('1x create:whisk', [
	' S ',
	'ASA',
	' A '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/sheet/wrought_iron'
	}).id('kubejs:shaped_crafting/whisk_from_tfc');
	e.shaped('1x create:brass_hand', [
	' S ',
	'AAA',
	' A '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/sheet/brass'
	}).id('kubejs:shaped_crafting/brass_hand_from_tfc');
	e.shaped('1x create:electron_tube', [
	'S',
	'A'
	], {
		S: 'create:polished_rose_quartz',
		A: 'tfc:metal/sheet/zinc'
	}).id('kubejs:shaped_crafting/redstone_salt_tube_from_tfc');
	e.shaped('1x create:goggles', [
	' S ',
	'ABA'
	], {
		S: '#forge:string',
		A: '#forge:glass',
		B: 'tfc:metal/sheet/gold'
	}).id('kubejs:shaped_crafting/goggles_from_tfc');
	e.shaped('4x create:minecart_coupling', [
	'  S',
	' A ',
	'S  '
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:metal/sheet/cast_iron'
	}).id('kubejs:shaped_crafting/coupling_from_tfc');
	e.shaped('1x create:copper_backtank', [
	'SAS',
	'BCB',
	' B '
	], {
		S: 'create:andesite_alloy',
		A: 'create:shaft',
		B: 'tfc:metal/ingot/copper',
		C: 'tfc:metal/double_ingot/copper'
	}).id('kubejs:shaped_crafting/backtank_from_tfc');
	e.shaped('1x create:peculiar_bell', [
	'S',
	'A'
	], {
		S: 'tfc:metal/double_ingot/brass',
		A: 'tfc:metal/sheet/brass'
	}).id('kubejs:shaped_crafting/peculiar_bell_from_tfc');
	e.shaped('1x create:wrench', [
	'SS',
	'SA',
	' B'
	], {
		S: 'tfc:metal/sheet/gold',
		A: 'create:cogwheel',
		B: 'minecraft:stick'
	}).id('kubejs:shaped_crafting/wrench_from_tfc');
	e.shaped('1x create:schematicannon', [
	' S ',
	'ASA',
	'BCB'
	], {
		S: 'tfc:metal/tuyere/wrought_iron',
		A: '#minecraft:logs',
		B: '#forge:smooth_stone',
		C: 'minecraft:dispenser'
	}).id('kubejs:shaped_crafting/schematicannon_from_tfc');
	e.shaped('1x create:schematic_table', [
	'SSS',
	' A ',
	' A '
	], {
		S: '#minecraft:wooden_slabs',
		A: '#forge:smooth_stone'
	}).id('kubejs:shaped_crafting/schematic_table_from_tfc');
	e.shaped('1x create:brown_toolbox', [
	' S ',
	'ABA',
	' C '
	], {
		S: 'create:cogwheel',
		A: 'tfc:metal/sheet/gold',
		B: '#forge:chests/wooden',
		C: 'minecraft:leather'
	}).id('kubejs:shaped_crafting/toolbox_from_tfc');
	e.shaped('16x create:controller_rail', [
	'SAS',
	'SBS',
	'SAS'
	], {
		S: 'tfc:metal/rod/gold',
		A: 'minecraft:stick',
		B: 'create:electron_tube'
	}).id('kubejs:shaped_crafting/controller_rail_from_tfc');
	e.shaped('1x gunswithoutroses:iron_gun', [
	'S  ',
	'ASB',
	' AC'
	], {
		S: 'tfc:metal/tuyere/wrought_iron',
		A: 'minecraft:stick',
		B: 'minecraft:flint',
		C: '#tfc:rocks/loose'
	}).id('kubejs:shaped_crafting/gwr_wrought_iron_rifle');
	e.shaped('1x gunswithoutroses:gold_gun', [
	'S  ',
	'ASB',
	' AC'
	], {
		S: 'tfc:metal/tuyere/bismuth_bronze',
		A: 'minecraft:stick',
		B: 'minecraft:flint',
		C: '#tfc:rocks/loose'
	}).id('kubejs:shaped_crafting/gwr_bismuth_bronze_rifle');
	e.shaped('1x gunswithoutroses:diamond_shotgun', [
	' SA',
	'SBS',
	' SC'
	], {
		S: 'tfc:metal/tuyere/steel',
		A: 'minecraft:flint_and_steel',
		B: 'tfc:metal/rod/steel',
		C: '#minecraft:logs'
	}).id('kubejs:shaped_crafting/gwr_steel_shotgun');
	e.shaped('1x gunswithoutroses:diamond_sniper', [
	'SA ',
	'BSC',
	' BS'
	], {
		S: 'tfc:metal/tuyere/black_steel',
		A: '#forge:glass',
		B: 'minecraft:stick',
		C: 'minecraft:flint_and_steel'
	}).id('kubejs:shaped_crafting/gwr_black_steel_sniper');
	e.shaped('1x gunswithoutroses:diamond_gatling', [
	'SSA',
	'SSB',
	'  C'
	], {
		S: 'tfc:metal/tuyere/blue_steel',
		A: 'minecraft:flint_and_steel',
		B: 'tfc:metal/double_ingot/black_steel',
		C: '#minecraft:logs'
	}).id('kubejs:shaped_crafting/gwr_blue_steel_gatling');
	e.shaped('1x uppers:upper', [
	' S ',
	'A A'
	], {
		S: '#forge:chests/wooden',
		A: 'tfc:metal/sheet/wrought_iron'
	}).id('kubejs:shaped_crafting/upper_from_wrought_iron');
	e.shaped('2x uppers:upper', [
	' S ',
	'A A'
	], {
		S: '#forge:chests/wooden',
		A: 'tfc:metal/sheet/steel'
	}).id('kubejs:shaped_crafting/upper_from_steel');
	e.shaped('1x chunkloaders:basic_chunk_loader', [
	'SSS',
	'SSS',
	'SSS'
	], {
		S: 'chunkloaders:single_chunk_loader'
	}).id('kubejs:shaped_crafting/small_chunk_loader_to_basic');
	e.shaped('1x chunkloaders:basic_chunk_loader', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:metal/double_ingot/cast_iron'
	}).id('kubejs:shaped_crafting/basic_chunk_loader');
	e.shaped('1x chunkloaders:advanced_chunk_loader', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/gold',
		A: 'tfc:metal/double_ingot/gold'
	}).id('kubejs:shaped_crafting/advanced_chunk_loader');
	e.shaped('1x chunkloaders:ultimate_chunk_loader', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/steel',
		A: 'tfc:metal/double_ingot/steel'
	}).id('kubejs:shaped_crafting/ultimate_chunk_loader');
	e.shaped('1x create:empty_blaze_burner', [
	' S ',
	'SAS',
	' S '
	], {
		S: 'tfc:metal/sheet/cast_iron',
		A: 'tfc:thatch'
	}).id('kubejs:shaped_crafting/empty_blaze_burner');
	e.shaped('1x immersiveengineering:cokebrick', [
	'SAS',
	'ABA',
	'SAS'
	], {
		S: 'tfc:fire_bricks',
		A: 'minecraft:brick',
		B: '#minecraft:coals'
	}).id('kubejs:shaped_crafting/cokebrick');
	e.shaped('1x immersiveengineering:blastbrick', [
	'SAS',
	'ABA',
	'SAS'
	], {
		S: 'immersiveengineering:cokebrick',
		A: 'tfc:powder/coke',
		B: 'immersiveengineering:creosote_bucket'
	}).id('kubejs:shaped_crafting/blastbrick');
	e.shaped('1x usclb:clipboard', [
	'S ',
	'AB'
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'usclb:clipboardfolder',
		B: 'usclb:inkandquill'
	}
	).id('kubejs:shaped_crafting/clipboard');
	e.shaped('1x toolbelt:pouch', [
	' S ',
	'A A',
	' B '
	], {
		S: 'tfc:metal/sheet/rose_gold',
		A: '#forge:string',
		B: 'kubejs:leather_pouch'
	}).id('kubejs:shaped_crafting/tool_pouch');
	e.shaped(Item.of('toolbelt:belt', '{Size:5}'), [
	'SAS',
	'B B',
	'BBB'
	], {
		S: '#forge:string',
		A: 'tfc:metal/sheet/nickel',
		B: 'toolbelt:pouch'
	}).id('kubejs:shaped_crafting/tool_belt');
	e.shaped('immersiveengineering:glider', [
	' S ',
	'ABA',
	'SAS'
	], {
		S: 'immersiveengineering:hemp_fabric',
		A: 'tfc:metal/rod/steel',
		B: 'minecraft:leather_chestplate'
	}).id('kubejs:shaped_crafting/glider_from_tfc');
	e.shaped('create:sticker', [
	'SAS',
	'BCB'
	], {
		S: 'create:andesite_alloy',
		A: 'tfc:glue',
		B: '#forge:cobblestone/normal',
		C: 'minecraft:redstone'
	}).id('kubejs:shaped_crafting/sticker_from_tfc');
	e.shaped('create:sticky_mechanical_piston', [
	'S',
	'A'
	], {
		S: 'tfc:glue',
		A: 'create:mechanical_piston'
	}).id('kubejs:shaped_crafting/sticky_mechanical_piston_from_tfc');
})