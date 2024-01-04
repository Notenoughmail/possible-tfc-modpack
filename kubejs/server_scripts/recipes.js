// priority: 0

ServerEvents.recipes(e => {
	let {tfc, minecraft, exposure, electrodynamics} = e.recipes;

	planks.forEach(plank => {
		minecraft.crafting_shaped('tfc:wood/planks/' + plank, [
			'S',
			'S'
		], {
			S: 'tfc:wood/planks/' + plank + '_slab'
		}).id('kubejs:crafting/' + plank + '_slab_to_plank');
	});
	stones.forEach(stone => {
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

	// Film Developing
	exposure.film_developing('exposure:developed_black_and_white_film', 'exposure:black_and_white_film', [
		TFC.ingredient.fluid(Fluid.of('minecraft:water', 50))
	]).id('exposure:developing_black_and_white_film');
	exposure.film_developing('exposure:developed_color_film', 'exposure:color_film', [
		TFC.ingredient.fluid(Fluid.of('minecraft:water', 50)),
		TFC.ingredient.fluid(Fluid.of('tfc:vinegar', 100))
	]).id('exposure:developing_color_film');

	// Shapeless
	tfc.damage_inputs_shapeless_crafting(minecraft.crafting_shapeless('kubejs:rubber_sheet', [
		'kubejs:rubber_bar',
		'#tfc:saws'
	])).id('kubejs:crafting/rubber_sheet');
	minecraft.crafting_shapeless('3x kubejs:latex_clump', [TFC.ingredient.fluid(Fluid.of('kubejs:latex', 1000)), 'tfc:powder/sulfur']).id('kubejs:crafting/latex_clump');

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

	// Anvil
	tfc.anvil('tfc:metal/tuyere/bismuth_bronze', '#forge:double_sheets/bismuth_bronze', ['bend_last', 'bend_second_last']).bonus(true).tier(2).id('tfc:anvil/bismuth_bronze_tuyere');
	tfc.anvil('tfc:metal/tuyere/black_bronze', '#forge:double_sheets/black_bronze', ['bend_last', 'bend_second_last']).bonus(true).tier(2).id('tfc:anvil/black_bronze_tuyere');
	tfc.anvil('tfc:metal/tuyere/black_steel', '#forge:double_sheets/black_steel', ['bend_last', 'bend_second_last']).bonus(true).tier(5).id('tfc:anvil/black_steel_tuyere');
	tfc.anvil('tfc:metal/tuyere/blue_steel', '#forge:double_sheets/blue_steel', ['bend_last', 'bend_second_last']).bonus(true).tier(6).id('tfc:anvil/blue_steel_tuyere');
	tfc.anvil('tfc:metal/tuyere/bronze', '#forge:double_sheets/bronze', ['bend_last', 'bend_not_last']).bonus(true).tier(2).id('tfc:anvil/bronze_tuyere');
	tfc.anvil('tfc:metal/tuyere/copper', '#forge:double_sheets/copper', ['bend_last', 'bend_not_last']).bonus(true).tier(1).id('tfc:anvil/copper_tuyere');
	tfc.anvil('tfc:metal/tuyere/red_steel', '#forge:double_sheets/red_steel', ['bend_last', 'bend_not_last']).bonus(true).tier(6).id('tfc:anvil/red_steel_tuyere');
	tfc.anvil('tfc:metal/tuyere/steel', '#forge:double_sheets/steel', ['bend_last', 'bend_not_last']).bonus(true).tier(4).id('tfc:anvil/steel_tuyere');
	tfc.anvil('tfc:metal/tuyere/wrought_iron', '#forge:double_sheets/wrought_iron', ['bend_last', 'bend_not_last']).bonus(true).tier(3).id('tfc:anvil/wrought_iron_tuyere');
	tfc.anvil('2x kubejs:iron_belt_clip', 'tfc:metal/rod/wrought_iron', ['bend_last', 'bend_not_last', 'hit_any']).tier(2).id('kubejs:anvil/iron_belt_clips')

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
	tfc.heating('minecraft:gold_block', 1060)
		.resultFluid(Fluid.of('tfc:metal/gold', 250))
		.id('kubejs:heating/gold_block');/*
	tfc.heating([/minecraft:(?:waxed_)?(?:(?:exposed|weathered|oxidized)_)?(?:cut_)?copper$/, /minecraft:(?:waxed_)?copper_block/], 1080)
		.resultFluid(Fluid.of('tfc:metal/copper', 250))
		.id('kubejs:heating/copper_block');*//*
	tfc.heating(/minecraft:(?:waxed_)?(?:(?:exposed|weathered|oxidized)_)?(?:cut_)?copper_slab$/, 1080)
		.resultFluid(Fluid.of('tfc:metal/copper', 125))
		.id('kubejs:heating/copper_block_slab');*//*
	tfc.heating('tfc:powder/coke', 2135)
		.resultFluid(Fluid.of('kubejs:unrefined_graphite', 10))
		.id('kubejs:heating/coke_powder');*/

	// Chisel
	tfc.chisel('minecraft:cut_copper', 'minecraft:copper_block', 'smooth').id('kubejs:chisel/smooth/cut_copper');
	tfc.chisel('minecraft:cut_copper_stairs', 'minecraft:cut_copper', 'stair').id('kubejs:chisel/stair/cut_copper');
	tfc.chisel('minecraft:cut_copper_slab', 'minecraft:cut_copper', 'slab').extraDrop('minecraft:cut_copper_slab').id('kubejs:chisel/slab/cut_copper');
	tfc.chisel('minecraft:exposed_cut_copper', 'minecraft:exposed_copper', 'smooth').id('kubejs:chisel/smooth/exposed_cut_copper');
	tfc.chisel('minecraft:exposed_cut_copper_stairs', 'minecraft:exposed_cut_copper', 'stair').id('kubejs:chisel/stair/exposed_cut_copper');
	tfc.chisel('minecraft:exposed_cut_copper_slab', 'minecraft:exposed_cut_copper', 'slab').extraDrop('minecraft:exposed_cut_copper_slab').id('kubejs:chisel/slab/exposed_cut_copper');
	tfc.chisel('minecraft:weathered_cut_copper', 'minecraft:weathered_copper', 'smooth').id('kubejs:chisel/smooth/weathered_cut_copper');
	tfc.chisel('minecraft:weathered_cut_copper_stairs', 'minecraft:weathered_cut_copper', 'stair').id('kubejs:chisel/stair/weathered_cut_copper');
	tfc.chisel('minecraft:weathered_cut_copper_slab', 'minecraft:weathered_cut_copper', 'slab').extraDrop('minecraft:weathered_cut_copper_slab').id('kubejs:chisel/slab/weathered_cut_copper');
	tfc.chisel('minecraft:oxidized_cut_copper', 'minecraft:oxidized_copper', 'smooth').id('kubejs:chisel/smooth/oxidized_cut_copper');
	tfc.chisel('minecraft:oxidized_cut_copper_stairs', 'minecraft:oxidized_cut_copper', 'stair').id('kubejs:chisel/stair/oxidized_cut_copper');
	tfc.chisel('minecraft:oxidized_cut_copper_slab', 'minecraft:oxidized_cut_copper', 'slab').extraDrop('minecraft:oxidized_cut_copper_slab').id('kubejs:chisel/slab/oxidized_cut_copper');
	tfc.chisel('minecraft:waxed_cut_copper', 'minecraft:waxed_copper_block', 'smooth').id('kubejs:chisel/smooth/waxed_cut_copper');
	tfc.chisel('minecraft:waxed_cut_copper_stairs', 'minecraft:waxed_cut_copper', 'stair').id('kubejs:chisel/stair/waxed_cut_copper');
	tfc.chisel('minecraft:waxed_cut_copper_slab', 'minecraft:waxed_cut_copper', 'slab').extraDrop('minecraft:waxed_cut_copper_slab').id('kubejs:chisel/slab/waxed_cut_copper');
	tfc.chisel('minecraft:waxed_exposed_cut_copper', 'minecraft:waxed_exposed_copper', 'smooth').id('kubejs:chisel/smooth/waxed_exposed_cut_copper');
	tfc.chisel('minecraft:waxed_exposed_cut_copper_stairs', 'minecraft:waxed_exposed_cut_copper', 'stair').id('kubejs:chisel/stair/waxed_exposed_cut_copper');
	tfc.chisel('minecraft:waxed_exposed_cut_copper_slab', 'minecraft:waxed_exposed_cut_copper', 'slab').extraDrop('minecraft:waxed_exposed_cut_copper_slab').id('kubejs:chisel/slab/waxed_exposed_cut_copper');
	tfc.chisel('minecraft:waxed_weathered_cut_copper', 'minecraft:waxed_weathered_copper', 'smooth').id('kubejs:chisel/smooth/waxed_weathered_cut_copper');
	tfc.chisel('minecraft:waxed_weathered_cut_copper_stairs', 'minecraft:waxed_weathered_cut_copper', 'stair').id('kubejs:chisel/stair/waxed_weathered_cut_copper');
	tfc.chisel('minecraft:waxed_weathered_cut_copper_slab', 'minecraft:waxed_weathered_cut_copper', 'slab').extraDrop('minecraft:waxed_weathered_cut_copper_slab').id('kubejs:chisel/slab/waxed_weathered_cut_copper');
	tfc.chisel('minecraft:waxed_oxidized_cut_copper', 'minecraft:waxed_oxidized_copper', 'smooth').id('kubejs:chisel/smooth/waxed_oxidized_cut_copper');
	tfc.chisel('minecraft:waxed_oxidized_cut_copper_stairs', 'minecraft:waxed_oxidized_cut_copper', 'stair').id('kubejs:chisel/stair/waxed_oxidized_cut_copper');
	tfc.chisel('minecraft:waxed_oxidized_cut_copper_slab', 'minecraft:waxed_oxidized_cut_copper', 'slab').extraDrop('minecraft:waxed_oxidized_cut_copper_slab').id('kubejs:chisel/slab/waxed_oxidized_cut_copper');
	
	// Knapping
	tfc.knapping('kubejs:leather_pouch', 'tfc:leather',[
		'XX XX',
		'X   X',
		'X   X',
		'X   X',
		'XXXXX'
	]).id('kubejs:knapping/leather_pouch');
	
	// tfc.blast_furnace(Fluid.of('kubejs:graphite', 1), 'tfc:powder/graphite', Fluid.of('kubejs:unrefined_graphite', 1))
	// 	.id('kubejs:blast_furnace/graphite_refinement');

	// Instant fluid barrel
	tfc.barrel_instant_fluid(Fluid.of('kubejs:diluted_milk', 8), Fluid.water(3), TFC.fluidStackIngredient('#tfc:milks', 5)).id('kubejs:fluid_barrel/diluted_milk');

	/*
	firmalifeMixingBowl('3x kubejs:rubber_bar', ['tfc:powder/sulfur', '3x kubejs:latex_clump']).id('kubejs:mixing_bowl/rubber_vulcanization');
	*/

	if (global.serverConfig.debug.debugRecipes.get()) {
		// F2G
		// Currently broken:
		// Found a broken recipe, failed to setRecipe with RecipeLayoutBuilder: 
		//     KubeJS kubejs:f2g_test class electrodynamics.common.recipe.categories.fluid2gas.specificmachines.ElectrolyticSeparatorRecipe
		electrodynamics.electrolytic_separator_recipe({
			gas: 'electrodynamics:steam',
			pressure: 50,
			amount: 50,
			temp: 50
		}, [{
			tag: 'forge:true_water',
			amount: 100
		}], 50, 50)
			.id('kubejs:f2g_test');

		// F2I
		electrodynamics.chemical_crystallizer_recipe('minecraft:dirt', [{
			fluid: 'minecraft:lava',
			amount: 20
		}], 51, 20)
			.id('kubejs:f21_test');

		// FI2F
		electrodynamics.fermentation_plant_recipe(Fluid.of('minecraft:water', 50), [
			'minecraft:grass'
		], [{
			fluid: 'minecraft:water',
			amount: 14
		}], 8, 19)
		.id('kubejs:fi2f_test');

		// I2I
		electrodynamics.lathe_recipe('minecraft:dirt', [
			'minecraft:grass',
			'minecraft:stone'
		], 3, 12)
			.id('kubejs:lathe_test');
	}
})