// priority: 0

ServerEvents.recipes(e => {
	let { tfc, minecraft, exposure, firmalife, ae2, thoriumreactors } = e.recipes;

	TFC.misc.wood.forEach((wood, reg) => {
		minecraft.crafting_shaped(reg.getBlock('planks').get(), [
			'S',
			'S'
		], {
			S: reg.getBlock('slab').get()
		}).id(`kubejs:crafting/${wood}_slab_to_plank`);
		minecraft.crafting_shaped(`3x kubejs:panel/${wood}`, [
			'SSS',
			'SSS'
		], {
			S: `tfc:wood/lumber/${wood}`
		}).id(`kubejs:crafting/${wood}_panel`);
	});
	TFC.misc.rock.keySet().forEach(stone => {
		minecraft.crafting_shaped('tfc:rock/bricks/' + stone, [
			'S',
			'S'
		], {
			S: 'tfc:rock/bricks/' + stone + '_slab'
		}).id('kubejs:crafting/' + stone + '_slab_to_brick');
		tfc.collapse('kubejs:ore/normal_lead/' + stone, 'kubejs:ore/rich_lead/' + stone);
		tfc.collapse('kubejs:ore/poor_lead/' + stone, 'kubejs:ore/normal_lead/' + stone);
		tfc.collapse('tfc:rock/cobble/' + stone, 'kubejs:ore/poor_lead/' + stone);
	});
	global.colors.forEach(color => {
		thoriumreactors.crystallizing(`minecraft:${color}_dye`, Fluid.of(`tfc:${color}_dye`, 1000), 20, 2)
			.id(`kubejs:crystallizing/${color}_dye`);
		tfc.barrel_sealed(1000)
			.inputs('morered:red_alloy_wire', Fluid.of(`tfc:${color}_dye`, 5))
			.outputItem(`morered:${color}_network_cable`)
			.id(`kubejs:sealed_barrel/${color}_red_wire`);
		tfc.barrel_sealed(1000)
			.inputs('ae2:fluix_glass_cable', Fluid.of(`tfc:${color}_dye`, 10))
			.outputItem(`ae2:${color}_glass_cable`)
			.id(`kubejs:sealed_barrel/${color}_fluix_cable`);
	});
	[
		'engineering',
		'calculation',
		'logic'
	].forEach(type => {
		ae2.inscriber(`ae2:${type}_processor_press`, `ae2:${type}_processor_press`, 'tfc:metal/sheet/wrought_iron')
			.id(`ae2:inscriber/${type}_processor_press`);
		ae2.inscriber(`ae2:${type}_processor`, `ae2:printed_${type}_processor`, 'morered:red_alloy_wire', 'thoriumreactors:redstone_processor')
			.id(`ae2:inscriber/${type}_processor`);
	});
	global.metals.forEach(metal => {
		thoriumreactors.blasting(`${metal.mod}:metal/double_ingot/${metal.name}`, [
			`${metal.mod}:metal/ingot/${metal.name}`,
			`${metal.mod}:metal/ingot/${metal.name}`
		], ((Math.log(metal.tier + 1) + 1) * metal.sh * 20000), (metal.mt - 10)).id(`kubejs:blasting/${metal.name}_double_ingot`);
		thoriumreactors.blasting(`${metal.mod}:metal/double_sheet/${metal.name}`, [
			`${metal.mod}:metal/sheet/${metal.name}`,
			`${metal.mod}:metal/sheet/${metal.name}`
		], ((Math.log(metal.tier + 1) + 1) * metal.sh * 20000), (metal.mt - 10)).id(`kubejs:blasting/${metal.name}_double_sheet`);
		thoriumreactors.blasting(`2x ${metal.mod}:metal/rod/${metal.name}`, 'kubejs:rod_mold', [
			`${metal.mod}:metal/ingot/${metal.name}`,
			'kubejs:rod_mold'
		], (((Math.log(metal.tier + 1) + 1) * metal.sh * 20000) / 3), (metal.mt - 120)).id(`kubejs:blasting/${metal.name}_rod`);
		thoriumreactors.blasting(`${metal.mod}:metal/sheet/${metal.name}`, 'kubejs:sheet_mold', [
			`${metal.mod}:metal/double_ingot/${metal.name}`,
			'kubejs:sheet_mold'
		], (((Math.log(metal.tier + 1) + 1) * metal.sh * 20000) / 1.5), (metal.mt - 10)).id(`kubejs:blasting/${metal.name}_sheet`);
	});

	// Film Developing
	exposure.film_developing('exposure:developed_black_and_white_film', 'exposure:black_and_white_film', [
		TFC.ingredient.fluid(Fluid.of('minecraft:water', 50))
	]).id('exposure:developing_black_and_white_film');
	exposure.film_developing('exposure:developed_color_film', 'exposure:color_film', [
		TFC.ingredient.fluid(Fluid.of('minecraft:water', 50)),
		TFC.ingredient.fluid(Fluid.of('tfc:vinegar', 100))
	]).id('exposure:developing_color_film');

	// Shapeless
	tfc.damage_inputs_shapeless_crafting(minecraft.crafting_shapeless('4x morered:stone_plate', [
		'#tfc:chisels',
		'#forge:smooth_stone_slab'
	])).id('morered:stone_plate');
	minecraft.crafting_shapeless('exposure:album', ['minecraft:writable_book', 'minecraft:paper', 'minecraft:paper'])
		.id('exposure:album');
	minecraft.crafting_shapeless('morered:bundled_cable_post', ['tfc:metal/rod/wrought_iron', 'morered:bundled_network_cable'])
		.id('morered:bundled_cable_post');

	// Shaped
	minecraft.crafting_shaped('toolbelt:pouch', [
		' S ',
		'A A',
		' B '
	], {
		S: 'tfc:metal/sheet/rose_gold',
		A: '#forge:string',
		B: 'kubejs:leather_pouch'
	}).id('kubejs:crafting/tool_pouch');
	minecraft.crafting_shaped(Item.of('toolbelt:belt', '{Size:5}'), [
		'SAS',
		'B B',
		'BBB'
	], {
		S: '#forge:string',
		A: 'tfc:metal/sheet/nickel',
		B: 'toolbelt:pouch'
	}).id('kubejs:crafting/tool_belt');
	minecraft.crafting_shaped('exposure:camera', [
		'ABC',
		'DED',
		'FDF'
	], {
		A: 'minecraft:lever',
		B: 'minecraft:heavy_weighted_pressure_plate',
		C: '#minecraft:buttons',
		D: 'tfc:metal/sheet/wrought_iron',
		E: 'tfc:lens',
		F: 'tfc:metal/rod/wrought_iron'
	}).id('exposure:camera');
	minecraft.crafting_shaped('exposure:color_film', [
		'ABB',
		'ACD'
	], {
		A: 'tfc:metal/tuyere/wrought_iron',
		B: 'tfc:food/dried_kelp',
		C: 'tfc:powder/lapis_lazuli',
		D: 'tfc:powder/native_gold'
	}).id('exposure:color_film');
	minecraft.crafting_shaped('exposure:black_and_white_film', [
		'ABB',
		'ACD'
	], {
		A: 'tfc:metal/tuyere/wrought_iron',
		B: 'tfc:food/dried_kelp',
		C: 'minecraft:gunpowder',
		D: '#forge:dyes/white'
	}).id('exposure:black_and_white_film');
	minecraft.crafting_shaped('exposure:lightroom', [
		'ABA',
		'CDC',
		'ECE'
	], {
		A: 'tfc:metal/sheet/cast_iron',
		B: 'minecraft:redstone_torch',
		C: '#minecraft:planks',
		D: 'tfc:lamp_glass',
		E: 'tfc:metal/rod/cast_iron'
	}).id('exposure:lightroom');
	minecraft.crafting_shaped('morered:multiplexer', [
		'SAS',
		'ABA',
		'SAS'
	], {
		S: 'morered:stone_plate',
		A: 'minecraft:redstone',
		B: 'tfc:metal/double_ingot/wrought_iron'
	}).id('morered:multiplexer');
	minecraft.crafting_shaped('morered:redwire_post_plate', [
		' S ',
		' A ',
		'BBB'
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'morered:red_alloy_ingot',
		B: 'morered:stone_plate'
	}).id('morered:redwire_post_plate');
	minecraft.crafting_shaped('morered:redwire_post_relay_plate', [
		' S ',
		'ABA',
		'CCC'
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'minecraft:redstone',
		B: 'morered:red_alloy_ingot',
		C: 'morered:stone_plate'
	}).id('morered:redwire_post_relay_plate');
	minecraft.crafting_shaped('morered:pulse_gate', [
		'SAS',
		'BBB'
	], {
		S: 'minecraft:redstone',
		A: 'tfc:metal/rod/wrought_iron',
		B: 'morered:stone_plate'
	}).id('morered:pulse_gate');
	minecraft.crafting_shaped('morered:bundled_cable_relay_plate', [
		' S ',
		'SAS',
		'BBB'
	], {
		S: 'morered:bundled_network_cable',
		A: 'tfc:metal/rod/wrought_iron',
		B: 'morered:stone_plate'
	}).id('morered:bundled_cable_relay_plate');
	minecraft.crafting_shaped('morered:bundled_cable_spool', [
		'SAB',
		'ASA',
		'BAS'
	], {
		S: 'morered:bundled_network_cable',
		A: 'tfc:metal/rod/wrought_iron',
		B: '#forge:rods/wooden'
	}).id('morered:bundled_cable_spool');
	minecraft.crafting_shaped('morered:redwire_spool', [
		'SAB',
		'ASA',
		'BAS'
	], {
		S: 'morered:red_alloy_wire',
		A: 'tfc:metal/rod/wrought_iron',
		B: '#forge:rods/wooden'
	}).id('morered:redwire_spool');
	minecraft.crafting_shaped('morered:redwire_post', [
		'S',
		'A'
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'morered:red_alloy_ingot'
	}).id('morered:redwire_post');
	minecraft.crafting_shaped('5x thoriumreactors:warning_block_lined_black_yellow_left', [
		'SAS',
		'BSA',
		'SBS'
	], {
		S: '#forge:smooth_stone',
		A: '#forge:dyes/black',
		B: '#forge:dyes/yellow'
	}).id('thoriumreactors:thorium_crafting/warning_block_lined_black_yellow_left');
	minecraft.crafting_shaped('5x thoriumreactors:warning_block_lined_black_yellow_right', [
		'SAS',
		'ASB',
		'SBS'
	], {
		S: '#forge:smooth_stone',
		A: '#forge:dyes/black',
		B: '#forge:dyes/yellow'
	}).id('thoriumreactors:thorium_crafting/warning_block_lined_black_yellow_right');
	minecraft.crafting_shaped('thoriumreactors:warning_block_lined_white_orange_left', [
		'SAS',
		'BSA',
		'SBS'
	], {
		S: '#forge:smooth_stone',
		A: '#forge:dyes/white',
		B: '#forge:dyes/orange'
	}).id('thoriumreactors:thorium_crafting/warning_block_lined_white_orange_left');
	minecraft.crafting_shaped('thoriumreactors:warning_block_lined_white_orange_right', [
		'SAS',
		'ASB',
		'SBS'
	], {
		S: '#forge:smooth_stone',
		A: '#forge:dyes/white',
		B: '#forge:dyes/orange'
	}).id('thoriumreactors:thorium_crafting/warning_block_lined_white_orange_right');
	minecraft.crafting_shaped('thoriumreactors:warning_block_lined_white_black_left', [
		'SAS',
		'BSA',
		'SBS'
	], {
		S: '#forge:smooth_stone',
		A: '#forge:dyes/white',
		B: '#forge:dyes/black'
	}).id('thoriumreactors:thorium_crafting/warning_block_lined_white_black_left');
	minecraft.crafting_shaped('thoriumreactors:warning_block_lined_white_black_right', [
		'SAS',
		'ASB',
		'SBS'
	], {
		S: '#forge:smooth_stone',
		A: '#forge:dyes/white',
		B: '#forge:dyes/black'
	}).id('thoriumreactors:thorium_crafting/warning_block_lined_white_black_right');
	minecraft.crafting_shaped('5x thoriumreactors:turbine_glass', [
		'SAS',
		'ABA',
		'SAS'
	], {
		S: 'tfc:metal/rod/steel',
		A: 'ae2:quartz_glass',
		B: 'thoriumreactors:turbine_casing'
	}).id('thoriumreactors:thorium_crafting/turbine_glass');
	minecraft.crafting_shaped('5x thoriumreactors:reactor_glass', [
		'SAC',
		'ABA',
		'CAS'
	], {
		S: 'tfc:metal/rod/steel',
		A: 'ae2:quartz_glass',
		B: 'thoriumreactors:reactor_casing',
		C: 'thoriumreactors:graphite_ingot'
	}).id('thoriumreactors:thorium_crafting/reactor_glass');
	minecraft.crafting_shaped('thoriumreactors:thorium_crafting_table', [
		'SAS',
		'ABA',
		'SAS'
	], {
		S: '#tfc:workbenches',
		A: 'tfc:metal/double_sheet/steel',
		B: 'tfc:metal/rod/nickel'
	}).id('thoriumreactors:thorium_crafting_table');
	minecraft.crafting_shaped('thoriumreactors:thermal_conductor', [
		'SAS',
		'ABA',
		'SAS'
	], {
		S: 'tfc:metal/rod/steel',
		A: 'tfc:metal/ingot/steel',
		B: 'tfc:metal/double_ingot/copper'
	}).id('thoriumreactors:thorium_crafting/thermal_conductor');
	minecraft.crafting_shaped('thoriumreactors:thermal_heat_sink', [
		'SSS',
		'AAA',
		'BBB'
	], {
		S: 'tfc:metal/rod/copper',
		A: 'tfc:metal/sheet/copper',
		B: 'thoriumreactors:thermal_conductor'
	}).id('thoriumreactors:thorium_crafting/thermal_heatsink');
	minecraft.crafting_shaped('minecraft:amethyst_block', [
		'SS',
		'SS'
	], {
		S: 'tfc:gem/amethyst'
	}).id('minecraft:amethyst_block');
	minecraft.crafting_shaped('ae2:energy_acceptor', [
		'SAS',
		'ABA',
		'SAS'
	], {
		S: 'tfc:metal/rod/wrought_iron',
		A: 'ae2:quartz_glass',
		B: 'thoriumreactors:module_energy'
	}).id('ae2:network/blocks/energy_energy_acceptor'); // Its actually called that
	minecraft.crafting_shaped('ae2:charger', [
		'SAS',
		'B  ',
		'SAS'
	], {
		S: 'tfc:metal/ingot/wrought_iron',
		A: 'tfc:metal/sheet/copper',
		B: 'thoriumreactors:module_energy'
	}).id('ae2:network/blocks/crystal_processing_charger');
	minecraft.crafting_shaped('ae2:crank', [
		'SSS',
		'  S',
		'  A'
	], {
		S: 'minecraft:stick',
		A: 'tfc:metal/sheet/copper'
	}).id('ae2:network/blocks/crank');
	minecraft.crafting_shaped('ae2:energy_cell', [
		'SAS',
		'BCB',
		'SAS'
	], {
		S: 'thoriumreactors:module_energy',
		A: 'ae2:fluix_crystal',
		B: 'ae2:charged_certus_quartz_crystal',
		C: 'ae2:quartz_glass'
	}).id('ae2:network/blocks/energy_energy_cell');
	minecraft.crafting_shaped('ae2:energy_cell', [
		'SAS',
		'BCB',
		'SAS'
	], {
		S: 'thoriumreactors:module_energy',
		A: 'ae2:charged_certus_quartz_crystal',
		B: 'ae2:fluix_crystal',
		C: 'ae2:quartz_glass'
	}).id('kubejs:crafting/energy_cell');
	minecraft.crafting_shaped('merequester:requester', [
		'SAS',
		'BCB',
		'DED'
	], {
		S: 'tfc:metal/sheet/wrought_iron',
		A: '#ae2:interface',
		B: 'ae2:crafting_accelerator',
		C: 'ae2:engineering_processor',
		D: 'tfc:metal/rod/copper',
		E: 'thoriumreactors:module_io'
	}).id('merequester:requester');
	minecraft.crafting_shaped('3x ae2:semi_dark_monitor', [
		' SA',
		'BCA',
		' SA'
	], {
		S: 'ae2:charged_certus_quartz_crystal',
		A: 'ae2:quartz_glass',
		B: 'tfc:metal/rod/zinc',
		C: 'thoriumreactors:redstone_processor'
	}).id('ae2:network/parts/panels_semi_dark_monitor');

	// Anvil
	tfc.anvil('tfc:metal/tuyere/bismuth_bronze', '#forge:double_sheets/bismuth_bronze', ['bend_last', 'bend_second_last'])
		.bonus(true)
		.tier(2)
		.id('tfc:anvil/bismuth_bronze_tuyere');
	tfc.anvil('tfc:metal/tuyere/black_bronze', '#forge:double_sheets/black_bronze', ['bend_last', 'bend_second_last'])
		.bonus(true)
		.tier(2)
		.id('tfc:anvil/black_bronze_tuyere');
	tfc.anvil('tfc:metal/tuyere/black_steel', '#forge:double_sheets/black_steel', ['bend_last', 'bend_second_last'])
		.bonus(true)
		.tier(5)
		.id('tfc:anvil/black_steel_tuyere');
	tfc.anvil('tfc:metal/tuyere/blue_steel', '#forge:double_sheets/blue_steel', ['bend_last', 'bend_second_last'])
		.bonus(true)
		.tier(6)
		.id('tfc:anvil/blue_steel_tuyere');
	tfc.anvil('tfc:metal/tuyere/bronze', '#forge:double_sheets/bronze', ['bend_last', 'bend_not_last'])
		.bonus(true)
		.tier(2)
		.id('tfc:anvil/bronze_tuyere');
	tfc.anvil('tfc:metal/tuyere/copper', '#forge:double_sheets/copper', ['bend_last', 'bend_not_last'])
		.bonus(true)
		.tier(1)
		.id('tfc:anvil/copper_tuyere');
	tfc.anvil('tfc:metal/tuyere/red_steel', '#forge:double_sheets/red_steel', ['bend_last', 'bend_not_last'])
		.bonus(true)
		.tier(6)
		.id('tfc:anvil/red_steel_tuyere');
	tfc.anvil('tfc:metal/tuyere/steel', '#forge:double_sheets/steel', ['bend_last', 'bend_not_last'])
		.bonus(true)
		.tier(4)
		.id('tfc:anvil/steel_tuyere');
	tfc.anvil('tfc:metal/tuyere/wrought_iron', '#forge:double_sheets/wrought_iron', ['bend_last', 'bend_not_last'])
		.bonus(true)
		.tier(3)
		.id('tfc:anvil/wrought_iron_tuyere');
	tfc.anvil('2x kubejs:iron_belt_clip', 'tfc:metal/rod/wrought_iron', ['bend_last', 'bend_not_last', 'hit_any'])
		.tier(2)
		.id('kubejs:anvil/iron_belt_clips');
	tfc.anvil('12x morered:red_alloy_wire', 'morered:red_alloy_ingot', ['draw_any', 'hit_any', 'punch_not_last'])
		.tier(3)
		.id('morered:red_alloy_wire');
	tfc.anvil('8x thoriumreactors:grate_floor_block', 'tfc:metal/sheet/steel', ['draw_any', 'hit_last', 'hit_any'])
		.tier(4)
		.id('kubejs:anvil/floor_grate');
	tfc.anvil('8x thoriumreactors:grate_wall_block', 'tfc:metal/sheet/steel', ['draw_any', 'hit_last', 'hit_any'])
		.tier(4)
		.id('kubejs:anvil/wall_grate');

	// Heating
	tfc.heating('firmalife:metal/ingot/chromium', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 100))
		.id('kubejs:heating/chromium_ingot');
	tfc.heating('firmalife:metal/sheet/chromium', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 200))	
		.id('kubejs:heating/chromium_sheet');
	tfc.heating('firmalife:metal/double_ingot/chromium', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 200))
		.id('kubejs:heating/chromium_double_ingot');
	tfc.heating('firmalife:metal/double_sheet/chromium', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 400))
		.id('kubejs:heating/chromium_double_sheet');
	tfc.heating('firmalife:metal/rod/chromium', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 50))
		.id('kubejs:heating/chromium_rod');
	tfc.heating('firmalife:metal/ingot/stainless_steel', 1540)
		.resultFluid(Fluid.of('firmalife:metal/stainless_steel', 100))
		.id('kubejs:heating/stainless_steel_ingot');
	tfc.heating('firmalife:metal/sheet/stainless_steel', 1540)
		.resultFluid(Fluid.of('firmalife:metal/stainless_steel', 200))
		.id('kubejs:heating/stainless_steel_sheet');
	tfc.heating('firmalife:metal/double_ingot/stainless_steel', 1540)
		.resultFluid(Fluid.of('firmalife:metal/stainless_steel', 200))
		.id('kubejs:heating/stainless_steel_double_ingot');
	tfc.heating('firmalife:metal/double_sheet/stainless_steel', 1540)
		.resultFluid(Fluid.of('firmalife:metal/stainless_steel', 400))
		.id('kubejs:heating/stainless_steel_double_sheet');
	tfc.heating('firmalife:metal/rod/stainless_steel', 1540)
		.resultFluid(Fluid.of('firmalife:metal/stainless_steel', 50))
		.id('kubejs:heating/stainless_steel_rod');
	tfc.heating('firmalife:ore/small_chromite', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 10))
		.id('kubejs:heating/small_chromite');
	tfc.heating('firmalife:ore/poor_chromite', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 15))
		.id('kubejs:heating/poor_chromite');
	tfc.heating('firmalife:ore/normal_chromite', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 25))
		.id('kubejs:heating/normal_chromite');
	tfc.heating('firmalife:ore/rich_chromite', 1907)
		.resultFluid(Fluid.of('firmalife:metal/chromium', 35))
		.id('kubejs:heating/rich_chromite');
	tfc.heating('tfc:powder/coke', 2135)
		.resultFluid(Fluid.of('kubejs:unrefined_graphite', 10))
		.id('kubejs:heating/coke_powder');
	tfc.heating('minecraft:redstone', 2013)
		.resultFluid(Fluid.of('kubejs:unrefined_redstone', 50))
		.id('kubejs:heating/unrefined_redstone');
	tfc.heating('morered:red_alloy_ingot', 1573)
		.resultFluid(Fluid.of('kubejs:redstone_alloy', 100))
		.id('kubejs:heating/redstone_alloy');
	tfc.heating('minecraft:redstone_block', 2013)
		.resultFluid(Fluid.of('kubejs:unrefined_redstone', 450))
		.id('kubejs:heating/unrefined_redstone_block');

	// Blast Furnace
	tfc.blast_furnace(Fluid.of('kubejs:refined_redstone', 1), 'tfc:powder/cassiterite', Fluid.of('kubejs:unrefined_redstone', 1))
		.id('kubejs:blast_furnace/redstone_refinement');

	// Casting
	tfc.casting('morered:red_alloy_ingot', 'tfc:ceramic/ingot_mold', Fluid.of('kubejs:redstone_alloy', 100), 0.1)
		.id('kubejs:casting/redstone_alloy_ingot');
	tfc.casting('morered:red_alloy_ingot', 'tfc:ceramic/fire_ingot_mold', Fluid.of('kubejs:redstone_alloy', 100), 0.01)
		.id('kubejs:casting/fire_redstone_alloy_ingot');

	// Chisel
	tfc.chisel('thoriumreactors:industrial_block_paving', 'thoriumreactors:industrial_block', 'smooth')
		.id('kubejs:chisel/smooth/industrial_paving');
	tfc.chisel('thoriumreactors:white_industrial_block_paving', 'thoriumreactors:white_industrial_block', 'smooth')
		.id('kubejs:chisel/smooth/white_industrial_paving');
	tfc.chisel('thoriumreactors:black_industrial_block_paving', 'thoriumreactors:black_industrial_block', 'smooth')
		.id('kubejs:chisel/smooth/black_industrial_paving');
	tfc.chisel('thoriumreactors:warning_block_lined_black_yellow_right', 'thoriumreactors:warning_block_lined_black_yellow_left', 'smooth')
		.id('kubejs:chisel/smooth/yb_warning_block_l2r');
	tfc.chisel('thoriumreactors:warning_block_lined_black_yellow_left', 'thoriumreactors:warning_block_lined_black_yellow_right', 'smooth')
		.id('kubejs:chisel/smooth/yb_warning_block_r2l');
	tfc.chisel('thoriumreactors:warning_block_lined_white_orange_left', 'thoriumreactors:warning_block_lined_white_orange_right', 'smooth')
		.id('kubejs:chisel/smooth/wo_warning_block_r2l');
	tfc.chisel('thoriumreactors:warning_block_lined_white_orange_right', 'thoriumreactors:warning_block_lined_white_orange_left', 'smooth')
		.id('kubejs:chisel/smooth/wo_warning_block_l2r');
	tfc.chisel('thoriumreactors:warning_block_lined_white_black_left', 'thoriumreactors:warning_block_lined_white_black_right', 'smooth')
		.id('kubejs:chisel/smooth/wb_warning_block_r2l');
	tfc.chisel('thoriumreactors:warning_block_lined_white_black_right', 'thoriumreactors:warning_block_lined_white_black_left', 'smooth')
		.id('kubejs:chisel/smooth/wb_warning_block_l2r');
	tfc.chisel('thoriumreactors:frameless_industrial_block_floor', 'thoriumreactors:industrial_block_floor', 'smooth')
		.id('kubejs:chisel/smooth/frameless_industrial_floor');
	tfc.chisel('thoriumreactors:frameless_black_industrial_block_floor', 'thoriumreactors:black_industrial_block_floor', 'smooth')
		.id('kubejs:chisel/smooth/frameless_black_industrial_floor');
	
	// Knapping
	tfc.knapping('kubejs:leather_pouch', 'tfc:leather',[
		'XX XX',
		'X   X',
		'X   X',
		'X   X',
		'XXXXX'
	]).id('kubejs:knapping/leather_pouch');

	// Alloying
	tfc.alloy('kubejs:redstone_alloy', [
		TFC.alloyPart('tfc:copper', 0.65, 0.7),
		TFC.alloyPart('kubejs:refined_redstone', 0.3, 0.35),
		TFC.alloyPart('tfc:nickel', 0.05, 0.12)
	]).id('kubejs:alloy/redstone_alloy');
	tfc.alloy('firmalife:stainless_steel', [
		TFC.alloyPart('tfc:steel', 0.65, 0.85),
		TFC.alloyPart('firmalife:chromium', 0.1, 0.25),
		TFC.alloyPart('tfc:nickel', 0.05, 0.15)
	]).id('firmalife:alloy/stainless_steel');

	// Quern
	tfc.quern('3x ae2:certus_quartz_dust', ['#forge:buds', '#ae2:all_certus_quartz'])
		.id('kubejs:quern/certus_quartz');
	tfc.quern('2x ae2:fluix_dust', 'ae2:fluix_crystal')
		.id('kubejs:quern/fluix_dust');

	// Collapse
	tfc.collapse('ae2:flawed_budding_quartz', 'ae2:flawless_budding_quartz')
		.id('kubejs:collapse/flawed_certus_quartz');
	tfc.collapse('ae2:chipped_budding_quartz', 'ae2:flawed_budding_quartz')
		.id('kubejs:collapse/chipped_certus_quartz');
	tfc.collapse('ae2:damaged_budding_quartz', 'ae2:chipped_budding_quartz')
		.id('kubejs:collapse/damaged_budding_quartz');
	tfc.collapse('ae2:quartz_block', ['ae2:damaged_budding_quartz', 'ae2:quartz_block'])
		.id('kubejs:collapse/certus_quartz');

	// Welding
	tfc.welding('16x thoriumreactors:industrial_block', '#forge:smooth_stone', 'tfc:metal/sheet/nickel')
		.id('kubejs:welding/industrial_block');
	tfc.welding('16x thoriumreactors:factory_block', '#forge:stone_bricks', 'tfc:metal/sheet/silver')
		.id('kubejs:welding/factory_block');
	tfc.welding('16x thoriumreactors:industrial_block_floor', '#forge:smooth_stone', 'tfc:metal/sheet/cast_iron')
		.id('kubejs:welding/industrial_floor');

	// Sealed Barrel
	tfc.barrel_sealed(1000)
		.inputs('thoriumreactors:industrial_block', Fluid.of('tfc:black_dye', 25))
		.outputItem('thoriumreactors:black_industrial_block')
		.id('kubejs:sealed_barrel/black_industrial_block');
	tfc.barrel_sealed(1000)
		.inputs('thoriumreactors:industrial_block', Fluid.of('tfc:white_dye', 25))
		.outputItem('thoriumreactors:white_industrial_block')
		.id('kubejs:sealed_barrel/white_industrial_block');
	tfc.barrel_sealed(1000)
		.inputs('thoriumreactors:industrial_block_floor', Fluid.of('tfc:black_dye', 25))
		.outputItem('thoriumreactors:black_industrial_block_floor')
		.id('kubejs:sealed_barrel/black_industrial_floor');

	// Instant Barrel
	tfc.barrel_instant()
		.outputItem('ae2:fluix_glass_cable')
		.inputs(IngredientHelper.subtract('#ae2:glass_cable', 'ae2:fluix_glass_cable'), Fluid.water(10))
		.id('ae2:network/cables/glass_fluix_clean');
	tfc.barrel_instant()
		.outputItem('ae2:fluix_smart_cable')
		.inputs(IngredientHelper.subtract('#ae2:smart_cable', 'ae2:fluix_smart_cable'), Fluid.water(10))
		.id('ae2:network/cables/smart_fluix_clean');
	tfc.barrel_instant()
		.outputItem('ae2:fluix_smart_dense_cable')
		.inputs(IngredientHelper.subtract('#ae2:smart_dense_cable', 'ae2:fluix_smart_dense_cable'), Fluid.water(10))
		.id('ae2:network/cables/dense_smart_fluix_clean');
	tfc.barrel_instant()
		.outputItem('ae2:fluix_covered_cable')
		.inputs(IngredientHelper.subtract('#ae2:covered_cable', 'ae2:fluix_covered_cable'), Fluid.water(10))
		.id('ae2:network/cables/covered_fluix_clean');
	tfc.barrel_instant()
		.outputItem('ae2:fluix_covered_dense_cable')
		.inputs(IngredientHelper.subtract('#ae2:covered_dense_cable', 'ae2:fluix_covered_dense_cable'), Fluid.water(10))
		.id('ae2:network/cables/dense_covered_fluix_clean');

	// Landslide
	tfc.landslide('kubejs:lithium_salt', ['kubejs:lithium_salt', 'kubejs:lithium_salt_grass'])
		.id('kubejs:landslide/lithium_salt');

	// Mixing Bowl
	firmalife.mixing_bowl()
		.outputItem('3x kubejs:rubber_bar')
		.itemIngredients(['tfc:powder/sulfur', '3x kubejs:latex_clump'])
		.id('kubejs:mixing_bowl/rubber_vulcanization');

	// In World Transformation
	ae2.transform('2x ae2:fluix_crystal', [
		'ae2:charged_certus_quartz_crystal',
		'minecraft:redstone',
		'tfc:powder/sapphire',
		'tfc:powder/bismuthinite'
	], {
		type: 'fluid',
		tag: 'forge:true_water'
	}).id('ae2:transform/fluix_crystals');
	ae2.transform('ae2:flawed_budding_quartz', [
		'ae2:charged_certus_quartz_crystal',
		'ae2:chipped_budding_quartz'
	], {
		type: 'fluid',
		tag: 'forge:true_water'
	}).id('ae2:transform/flawed_budding_quartz');
	ae2.transform('2x ae2:certus_quartz_crystal', [
		'ae2:certus_quartz_dust',
		'ae2:charged_certus_quartz_crystal'
	], {
		type: 'fluid',
		tag: 'forge:true_water'
	}).id('ae2:transform/certus_quartz_crystals');
	ae2.transform('ae2:fluix_crystal', [
		'ae2:charged_certus_quartz_crystal',
		'ae2:fluix_dust'
	], {
		type: 'fluid',
		tag: 'forge:true_water'
	}).id('ae2:transform/fluix_crystal');
	ae2.transform('ae2:chipped_budding_quartz', [
		'ae2:charged_certus_quartz_crystal',
		'ae2:damaged_budding_quartz'
	], {
		type: 'fluid',
		tag: 'forge:true_water'
	}).id('ae2:transform/chipped_budding_quartz');
	ae2.transform('ae2:damaged_budding_quartz', [
		'ae2:charged_certus_quartz_crystal',
		'ae2:quartz_block'
	], {
		type: 'fluid',
		tag: 'forge:true_water'
	}).id('ae2:transform/damaged_budding_quartz');
	ae2.transform('2x ae2:quantum_entangled_singularity', [
		'ae2:singularity',
		'ae2:fluix_dust',
		'ae2:fluix_crystal'
	], {
		type: 'explosion'
	}).id('ae2:transform/entangled_singularity');

	// Inscriber
	ae2.inscriber('ae2:printed_logic_processor', 'ae2:logic_processor_press', 'tfc:powder/native_gold')
		.id('ae2:inscriber/logic_processor_print');
	ae2.inscriber('ae2:printed_engineering_processor', 'ae2:engineering_processor_press', ['tfc:powder/diamond', 'tfc:powder/opal', 'tfc:powder/sapphire'])
		.id('ae2:inscriber/engineering_processor_print');
	ae2.inscriber('ae2:printed_calculation_processor', 'ae2:calculation_processor_press', 'ae2:certus_quartz_dust')
		.id('ae2:inscriber/calculation_processor_print');
	ae2.inscriber('megacells:printed_accumulation_processor', 'megacells:accumulation_processor_press', 'tfc:metal/sheet/black_steel')
		.id('megacells:inscriber/accumulation_processor_print');
	ae2.inscriber('megacells:accumulation_processor', 'megacells:printed_accumulation_processor', 'morered:red_alloy_wire', 'thoriumreactors:redstone_processor')
		.id('megacells:inscriber/accumulation_processor');
	ae2.inscriber('megacells:accumulation_processor_press', 'megacells:accumulation_processor_press', 'tfc:metal/sheet/wrought_iron')
		.id('megacells:inscriber/accumulation_processor_press_extra');

	// Bigger Crafting
	thoriumreactors.thorium_crafting('thoriumreactors:redstone_processor', [
		'  S  ',
		' ABA ',
		' CDE ',
		' AFA ',
		'  S  '
	], {
		S: 'tfc:metal/rod/copper',
		A: 'morered:bundled_network_cable',
		B: 'minecraft:redstone_torch',
		C: 'minecraft:repeater',
		D: 'tfc:metal/sheet/gold',
		E: 'minecraft:comparator',
		F: 'minecraft:observer'
	}).id('thoriumreactors:thorium_crafting/redstone_processor');
	thoriumreactors.thorium_crafting('thoriumreactors:module_empty', [
		' SAS ',
		'SBCBS',
		'ACDCA',
		'SBCBS',
		' SAS '
	], {
		S: 'tfc:metal/rod/steel',
		A: 'tfc:metal/sheet/gold',
		B: 'morered:bundled_network_cable',
		C: 'tfc:metal/rod/nickel',
		D: 'thoriumreactors:redstone_processor'
	}).id('thoriumreactors:thorium_crafting/module_empty');
	thoriumreactors.thorium_crafting('thoriumreactors:module_energy', [
		' SAS ',
		'SBBBS',
		'ACCCA',
		'SDEDS',
		' SAS '
	], {
		S: 'tfc:metal/ingot/steel',
		A: 'tfc:metal/rod/copper',
		B: 'kubejs:lithium_plate',
		C: 'kubejs:graphite_plate',
		D: 'morered:bundled_network_cable',
		E: 'thoriumreactors:module_empty'
	}).id('thoriumreactors:thorium_crafting/module_energy');
	thoriumreactors.thorium_crafting('thoriumreactors:module_io', [
		' SAS ',
		'SBCBS',
		'ABCBA',
		'SBDBS',
		' SAS '
	], {
		S: 'tfc:metal/ingot/steel',
		A: 'tfc:metal/rod/gold',
		B: 'morered:bundled_network_cable',
		C: 'morered:red_alloy_wire',
		D: 'thoriumreactors:module_empty'
	}).id('thoriumreactors:thorium_crafting/module_io');
	thoriumreactors.thorium_crafting('thoriumreactors:module_storage', [
		' SAS ',
		'SBBBS',
		'ACCCA',
		'SBDBS',
		' SAS '
	], {
		S: 'tfc:metal/ingot/steel',
		A: 'tfc:metal/rod/zinc',
		B: 'morered:bundled_network_cable',
		C: '#forge:chests/wooden',
		D: 'thoriumreactors:module_empty'
	}).id('thoriumreactors:thorium_crafting/module_storage');
	thoriumreactors.thorium_crafting('thoriumreactors:module_sensor', [
		' SAS ',
		'SBCBS',
		'ACBCA',
		'SDEDS',
		' SAS '
	], {
		S: 'tfc:metal/ingot/steel',
		A: 'tfc:metal/rod/nickel',
		B: 'minecraft:daylight_detector',
		C: '#minecraft:stone_pressure_plates',
		D: 'morered:bundled_network_cable',
		E: 'thoriumreactors:module_empty'
	}).id('thoriumreactors:thorium_crafting/module_sensor');
	thoriumreactors.thorium_crafting('thoriumreactors:module_processing', [
		' SAS ',
		'SBBBS',
		'ACCCA',
		'SBDBS',
		' SAS '
	], {
		S: 'tfc:metal/ingot/steel',
		A: 'tfc:metal/rod/brass',
		B: 'morered:bundled_network_cable',
		C: 'ae2:calculation_processor',
		D: 'thoriumreactors:module_empty'
	}).id('thoriumreactors:thorium_crafting/module_processing');
	thoriumreactors.thorium_crafting('thoriumreactors:module_tank', [
		' SAS ',
		'SBBBS',
		'ACCCA',
		'SBDBS',
		' SAS '
	], {
		S: 'tfc:metal/ingot/steel',
		A: 'tfc:metal/rod/steel',
		B: 'morered:bundled_network_cable',
		C: '#tfc:barrels',
		D: 'thoriumreactors:module_empty'
	}).id('kubejs:thorium_crafting/module_tank');

	// Tests
	if (global.serverConfig.debug.debugRecipes.get()) {
		thoriumreactors.blasting('acacia_boat', [
			'#minecraft:anvil',
			'#ae2:all_quartz'
		], 300, 1500).id('kubejs:thorium_blasting/test_0');
		thoriumreactors.blasting('villager_spawn_egg', [
			'#ae2:quartz_wrench'
		], 200, 450).id('kubejs:thorium_blasting/test_1');
		thoriumreactors.blasting('acacia_sign', 'ae2:certus_quartz_sword', [
			'#forge:double_ingots/copper',
			'#ae2:covered_cable'
		], 20, 8).id('kubejs:thorium_blasting/test_2');
		thoriumreactors.blasting('ae2:certus_quartz_dust', 'acacia_stairs', [
			'white_candle'
		], 10, 10).id('kubejs:thorium_blasting/test_3');
	
		thoriumreactors.centrifuging(
			Fluid.of('firmalife:metal/chromium', 100),
			Fluid.of('thoriumreactors:depleted_molten_salt', 50),
			50,
			50
		).id('kubejs:centrifuging/test');
	
		thoriumreactors.concentrating(
			'minecraft:stone',
			'minecraft:cobblestone',
			200
		).id('kubejs:thorium_concentrating/test');
	
		thoriumreactors.crystallizing(
			'minecraft:stone',
			Fluid.of('minecraft:lava', 60),
			800,
			800
		).id('kubejs:thorium_crystallizing/test');
	
		thoriumreactors.decomposing(
			Fluid.of('minecraft:water', 80),
			'minecraft:poppy',
			Fluid.of('minecraft:milk', 40),
			80, 80
		).id('kubejs:thorium_decomposing/test');
	
		thoriumreactors.electrolysing(
			'minecraft:cobblestone',
			Fluid.of('thoriumreactors:molten_salt', 86),
			Fluid.of('tfc:corn_whiskey', 40),
			80,
			80
		).id('kubejs:thorium_electrolysing/test');
	
		thoriumreactors.evaporating(
			'minecraft:cobblestone',
			Fluid.of('kubejs:latex', 60),
			80,
			80
		).id('kubejs:thorium_evaporating/test');
	
		thoriumreactors.fluid_enriching(
			Fluid.of('tfc:cyan_dye', 1000),
			'minecraft:dirt',
			Fluid.of('tfc:olive_oil', 50),
			80,
			80
		).id('kubejs:thorium_enriching/test');
	
		thoriumreactors.oxidizing(
			Fluid.of('kubejs:alumina', 60),
			'tfc:brick/dacite',
			Fluid.of('tfc:vinegar', 950),
			100,
			100
		).id('kubejs:thorium_oxidizing/test');
	
		thoriumreactors.salt_smelting(
			Fluid.of('thoriumreactors:hydrofluorite', 120),
			'minecraft:dirt',
			'minecraft:stone',
			'minecraft:cobblestone',
			80,
			80,
			80
		).id('kubejs:thorium_salt/test');
	
		thoriumreactors.thorium_crafting('minecraft:dirt', [
			'S   S',
			'AS SA',
			'BASAB',
			'AS SA',
			'S   S'
		], {
			S: 'minecraft:cobblestone',
			A: 'minecraft:stone',
			B: 'minecraft:red_sandstone'
		}).id('kubejs:thorium_crafting/test');
		}
})