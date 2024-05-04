// priority: 0

ServerEvents.tags('block', e => {

	e.add('kubejs:vertical_support', [
    	'tfc:wood/vertical_support/acacia',
    	'tfc:wood/vertical_support/ash',
    	'tfc:wood/vertical_support/aspen',
    	'tfc:wood/vertical_support/birch',
    	'tfc:wood/vertical_support/blackwood',
    	'tfc:wood/vertical_support/chestnut',
    	'tfc:wood/vertical_support/douglas_fir',
    	'tfc:wood/vertical_support/hickory',
    	'tfc:wood/vertical_support/kapok',
    	'tfc:wood/vertical_support/maple',
    	'tfc:wood/vertical_support/oak',
    	'tfc:wood/vertical_support/palm',
    	'tfc:wood/vertical_support/pine',
    	'tfc:wood/vertical_support/rosewood',
    	'tfc:wood/vertical_support/sequoia',
    	'tfc:wood/vertical_support/spruce',
    	'tfc:wood/vertical_support/sycamore',
    	'tfc:wood/vertical_support/white_cedar',
    	'tfc:wood/vertical_support/willo'
	]);

	e.add('kubejs:glass_sand', [
		'tfc:sand/white',
		'tfc:sand/red',
		'tfc:sand/pink',
		'tfc:sand/yellow',
		'tfc:sand/green',
		'tfc:sand/brown',
		'tfc:sand/black'
	]);

	e.add('tfc:prospectable', [
		'ae2:flawless_budding_quartz',
		'ae2:flawed_budding_quartz',
		'ae2:chipped_budding_quartz',
		'ae2:damaged_budding_quartz',
		'ae2:quartz_block'
	]);
	e.add('tfc:can_trigger_collapse', [
		'ae2:flawless_budding_quartz',
		'ae2:flawed_budding_quartz',
		'ae2:chipped_budding_quartz',
		'ae2:damaged_budding_quartz',
		'ae2:quartz_block'
	]);
	e.add('tfc:can_collapse', [
		'ae2:flawless_budding_quartz',
		'ae2:flawed_budding_quartz',
		'ae2:chipped_budding_quartz',
		'ae2:damaged_budding_quartz',
		'ae2:quartz_block'
	]);
	e.add('tfc:can_start_collapse', [
		'ae2:flawless_budding_quartz',
		'ae2:flawed_budding_quartz',
		'ae2:chipped_budding_quartz',
		'ae2:damaged_budding_quartz',
		'ae2:quartz_block'
	]);
});

ServerEvents.tags('item', e => {

	// Removal
	e.remove('forge:cobblestone/normal', /tfc:rock.*mossy_cobble.*/);
	
	// General
	e.add('forge:rods/all_metal', [
		'tfc:metal/rod/bismuth',
		'tfc:metal/rod/bismuth_bronze',
		'tfc:metal/rod/black_bronze',
		'tfc:metal/rod/bronze',
		'tfc:metal/rod/brass',
		'tfc:metal/rod/copper',
		'tfc:metal/rod/gold',
		'tfc:metal/rod/nickel',
		'tfc:metal/rod/rose_gold',
		'tfc:metal/rod/silver',
		'tfc:metal/rod/tin',
		'tfc:metal/rod/zinc',
		'tfc:metal/rod/sterling_silver',
		'tfc:metal/rod/wrought_iron',
		'tfc:metal/rod/cast_iron',
		'tfc:metal/rod/steel',
		'tfc:metal/rod/black_steel',
		'tfc:metal/rod/blue_steel',
		'tfc:metal/rod/red_steel'
	]);

	e.add('tfc:usable_on_tool_rack', [
		'create:wrench',
		'create:goggles',
		'firmalife:watering_can'
	]);

	e.add('tfc:rocks/loose', [
		'#tfc:rock_knapping'
	]);

	e.add('tfc:kelp', [
		'tfc:plant/winged_kelp',
		'tfc:plant/leafy_kelp',
		'tfc:plant/giant_kelp_flower'
	]);

	e.add('forge:cobblestone', [
		/tfc:rock.*mossy_cobble.*/
	]);

	e.add('forge:cobblestone/mossy', [
		/tfc:rock.*mossy_cobble.*/
	]);

	e.add('tfc:igneous_rock', [
		'#tfc:igneous_intrusive_rock',
		'#tfc:igneous_extrusive_rock'
	]);

	e.add('tfc:foods/berries', [
		'tfc:food/blackberry',
		'tfc:food/blueberry',
		'tfc:food/bunchberry',
		'tfc:food/cloudberry',
		'tfc:food/cranberry',
		'tfc:food/elderberry',
		'tfc:food/gooseberry',
		'tfc:food/raspberry',
		'tfc:food/snowberry',
		'tfc:food/strawberry',
		'tfc:food/wintergreen_berry'
	]);

	e.add('tfc:magma_blocks', [
		'tfc:rock/magma/granite',
		'tfc:rock/magma/diorite',
		'tfc:rock/magma/gabbro',
		'tfc:rock/magma/rhyolite',
		'tfc:rock/magma/basalt',
		'tfc:rock/magma/andesite',
		'tfc:rock/magma/dacite'
	]);

	e.add('tfc:raw_salts', [
		'tfc:ore/halite',
		'tfc:ore/sylvite'
	]);

	e.add('tfc:saplings', [
		'tfc:wood/sapling/acacia',
		'tfc:wood/sapling/ash',
		'tfc:wood/sapling/aspen',
		'tfc:wood/sapling/birch',
		'tfc:wood/sapling/blackwood',
		'tfc:wood/sapling/chestnut',
		'tfc:wood/sapling/douglas_fir',
		'tfc:wood/sapling/hickory',
		'tfc:wood/sapling/kapok',
		'tfc:wood/sapling/maple',
		'tfc:wood/sapling/oak',
		'tfc:wood/sapling/palm',
		'tfc:wood/sapling/pine',
		'tfc:wood/sapling/rosewood',
		'tfc:wood/sapling/sequoia',
		'tfc:wood/sapling/spruce',
		'tfc:wood/sapling/sycamore',
		'tfc:wood/sapling/white_cedar',
		'tfc:wood/sapling/willow',
		'tfc:plant/cherry_sapling',
		'tfc:plant/green_apple_sapling',
		'tfc:plant/lemon_sapling',
		'tfc:plant/olive_sapling',
		'tfc:plant/orange_sapling',
		'tfc:plant/peach_sapling',
		'tfc:plant/plum_sapling',
		'tfc:plant/red_apple_sapling',
		'tfc:plant/banana_sapling',
		'firmalife:plant/cocoa_sapling',
		'firmalife:plant/fig_sapling'
	]);

	e.add('exposure:lenses', [
		'tfc:lens'
	]);

	e.add('tfc:pileable_ingots', [
		'morered:red_alloy_ingot'
	]);

	// Weight and size
	e.add('tfc:minecarts', [
		'minecraft:minecart',
		'minecraft:furnace_minecart',
		'minecraft:tnt_minecart',
		'minecraft:hopper_minecart'
	]);

	// JEI Purposes
	e.add('kubejs:ore/certus_quartz', [
		'ae2:flawless_budding_quartz',
		'ae2:flawed_budding_quartz',
		'ae2:chipped_budding_quartz',
		'ae2:damaged_budding_quartz',
		'ae2:large_quartz_bud',
		'ae2:quartz_cluster',
		'ae2:medium_quartz_bud',
		'ae2:small_quartz_bud',
		'ae2:certus_quartz_crystal'
	]);
	e.add('kubejs:ore/kaolin', [
		'tfc:white_kaolin_clay',
		'tfc:pink_kaolin_clay',
		'tfc:red_kaolin_clay',
		'tfc:kaolin_clay_grass',
		'tfc:kaolin_clay'
	]);
	e.add('kubejs:ore/native_copper', [
		/tfc:ore\/.*_native_copper\/.*/,
		'tfc:ore/rich_native_copper',
		'tfc:ore/normal_native_copper',
		'tfc:ore/poor_native_copper',
		'tfc:ore/small_native_copper'
	]);
	e.add('kubejs:ore/native_gold', [
		/tfc:ore\/.*_native_gold\/.*/,
		'tfc:ore/rich_native_gold',
		'tfc:ore/normal_native_gold',
		'tfc:ore/poor_native_gold',
		'tfc:ore/small_native_gold'
	]);
	e.add('kubejs:ore/native_silver', [
		/tfc:ore\/.*_native_silver\/.*/,
		'tfc:ore/rich_native_silver',
		'tfc:ore/normal_native_silver',
		'tfc:ore/poor_native_silver',
		'tfc:ore/small_native_silver'
	]);
	e.add('kubejs:ore/tetrahedrite', [
		/tfc:ore\/.*_tetrahedrite\/.*/,
		'tfc:ore/rich_tetrahedrite',
		'tfc:ore/normal_tetrahedrite',
		'tfc:ore/poor_tetrahedrite',
		'tfc:ore/small_tetrahedrite'
	]);
	e.add('kubejs:ore/malachite', [
		/tfc:ore\/.*_malachite\/.*/,
		'tfc:ore/rich_malachite',
		'tfc:ore/normal_malachite',
		'tfc:ore/poor_malachite',
		'tfc:ore/small_malachite'
	]);
	e.add('kubejs:ore/cassiterite', [
		'#tfc:ores/tin/poor',
		'#tfc:ores/tin/normal',
		'#tfc:ores/tin/rich',
		'tfc:ore/rich_cassiterite',
		'tfc:ore/normal_cassiterite',
		'tfc:ore/poor_cassiterite',
		'tfc:ore/small_cassiterite'
	]);
	e.add('kubejs:ore/bismuthinite', [
		'#tfc:ores/bismuth/poor',
		'#tfc:ores/bismuth/normal',
		'#tfc:ores/bismuth/rich',
		'tfc:ore/rich_bismuthinite',
		'tfc:ore/normal_bismuthinite',
		'tfc:ore/poor_bismuthinite',
		'tfc:ore/small_bismuthinite'
	]);
	e.add('kubejs:ore/garnierite', [
		'#tfc:ores/nickel/poor',
		'#tfc:ores/nickel/normal',
		'#tfc:ores/nickel/rich',
		'tfc:ore/rich_garnierite',
		'tfc:ore/normal_garnierite',
		'tfc:ore/poor_garnierite',
		'tfc:ore/small_garnierite'
	]);
	e.add('kubejs:ore/hematite', [
		/tfc:ore\/.*_hematite\/.*/,
		'tfc:ore/rich_hematite',
		'tfc:ore/normal_hematite',
		'tfc:ore/poor_hematite',
		'tfc:ore/small_hematite'
	]);
	e.add('kubejs:ore/magnetite', [
		/tfc:ore\/.*_magnetite\/.*/,
		'tfc:ore/rich_magnetite',
		'tfc:ore/normal_magnetite',
		'tfc:ore/poor_magnetite',
		'tfc:ore/small_magnetite'
	]);
	e.add('kubejs:ore/limonite', [
		/tfc:ore\/.*_limonite\/.*/,
		'tfc:ore/rich_limonite',
		'tfc:ore/normal_limonite',
		'tfc:ore/poor_limonite',
		'tfc:ore/small_limonite'
	]);
	e.add('kubejs:ore/sphalerite', [
		'#tfc:ores/zinc/poor',
		'#tfc:ores/zinc/normal',
		'#tfc:ores/zinc/rich',
		'tfc:ore/rich_zinc',
		'tfc:ore/normal_zinc',
		'tfc:ore/poor_zinc',
		'tfc:ore/small_zinc'
	]);
	e.add('kubejs:ore/lignite', [
		/tfc:ore\/lignite\/.*/,
		'tfc:ore/lignite'
	]);
	e.add('kubejs:ore/bituminous_coal', [
		/tfc:ore\/bituminous_coal\/.*/,
		'tfc:ore/bituminous_coal'
	]);
	e.add('kubejs:ore/graphite', [
		'#forge:ores/graphite',
		'tfc:ore/graphite'
	]);
	e.add('kubejs:ore/cinnabar', [
		/tfc:ore\/cinnabar\/.*/,
		'tfc:ore/cinnabar'
	]);
	e.add('kubejs:ore/cryolite', [
		/tfc:ore\/cryolite\/.*/,
		'tfc:ore/cryolite'
	]);
	e.add('kubejs:ore/saltpeter', [
		/tfc:ore\/saltpeter\/.*/,
		'tfc:ore/saltpeter'
	]);
	e.add('kubejs:ore/sulfur', [
		/tfc:ore\/sulfur\/.*/,
		'tfc:ore/sulfur'
	]);
	e.add('kubejs:ore/sylvite', [
		/tfc:ore\/sylvite\/.*/,
		'tfc:ore/sylvite'
	]);
	e.add('kubejs:ore/borax', [
		'#forge:ores/borax',
		'tfc:ore/borax'
	]);
	e.add('kubejs:ore/gypsum', [
		'#forge:ores/gypsum',
		'tfc:ore/gypsum'
	]);
	e.add('kubejs:ore/halite', [
		'#forge:ores/halite',
		'tfc:ore/halite'
	]);
	e.add('kubejs:ore/emerald', [
		/tfc:ore\/emerald\/.*/,
		'tfc:ore/emerald'
	]);
	e.add('kubejs:ore/diamond', [
		/tfc:ore\/diamond\/.*/,
		'tfc:ore/diamond'
	]);
	e.add('kubejs:ore/lapis_lazuli', [
		/tfc:ore\/lapis_lazuli\/.*/,
		'tfc:ore/lapis_lazuli'
	]);
	e.add('kubejs:ore/amethyst', [
		'#forge:ores/amethyst',
		'tfc:ore/amethyst'
	]);
	e.add('kubejs:ore/opal', [
		'#forge:ores/opal',
		'tfc:ore/opal'
	]);
})

ServerEvents.tags('fluid', e => {

	e.add('tfc:molten_metals', [
		'firmalife:metal/stainless_steel',
		'firmalife:metal/chromium'
	]);

	e.add('forge:true_water', [
		'minecraft:water',
		'minecraft:flowing_water'
	]);

	e.add('forge:true_lava', [
		'minecraft:lava'
	]);
})

ServerEvents.tags('worldgen/placed_feature', e => {
	e.add('tfc:in_biome/veins', [
		'kubejs:vein/certus_quartz'
	]);
})