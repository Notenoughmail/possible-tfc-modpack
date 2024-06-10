// priority: 0

ServerEvents.tags('block', e => {

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
	e.add('forge:ores', [
		/ae2:.*bud(?:ding)?.*/,
		'ae2:quartz_block'
	]);
	e.add('tfc:mineable_with_glass_saw', [
		/ae2:.*bud(?:ding)?.*/,
		'ae2:quartz_block',
		'minecraft:amethyst_block'
	]);
});

ServerEvents.tags('item', e => {

	// Removal
	e.remove('forge:cobblestone/normal', /tfc:rock.*mossy_cobble.*/);
	e.removeAll('ae2:metal_ingots');
	
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
		'firmalife:watering_can',
		'tfc:wooden_bucket'
	]);

	e.add('forge:cobblestone', [
		/tfc:rock.*mossy_cobble.*/
	]);

	e.add('forge:cobblestone/mossy', [
		/tfc:rock.*mossy_cobble.*/
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
		'morered:red_alloy_ingot',
		'thoriumreactors:graphite_ingot'
	]);

	e.add('tfc:gem_powders', [
		'ae2:certus_quartz_dust'
	]);

	e.add('ae2:metal_ingots', [
		'tfc:metal/ingot/wrought_iron',
		'tfc:metal/ingot/steel'
	]);

	e.add('kubejs:generator_fuels', [
		'minecraft:coal',
		'minecraft:charcoal',
		'tfc:ore/bituminous_coal',
		'tfc:ore/lignite'
	]);

	e.add('tfc:fluid_item_ingredient_empty_containers', [
		'tfc:ceramic/ingot_mold',
		'tfc:ceramic/fire_ingot_mold'
	]);

	e.add('kubejs:allowed_in_electronics_assembler', [
		'ae2:engineering_processor',
		'ae2:logic_processor',
		'ae2:calculation_processor',
		'ae2:cell_component_1k',
		'ae2:cell_component_4k',
		'ae2:cell_component_16k',
		'ae2:cell_component_64k',
		'ae2:cell_component_256k',
		'megacells:cell_component_1m',
		'megacells:cell_component_4m',
		'megacells:cell_component_16m',
		'megacells:cell_component_64m',
		'megacells:cell_component_256m',
		'ae2:spatial_cell_component_2',
		'ae2:spatial_component_16',
		'ae2:spatial_component_128',
		'morered:read_alloy_wire',
		'morered:bundled_network_cable',
		'megacells:accumulation_processor',
		'ae2:quartz_fiber',
		'ae2:fluix_dust',
		'ae2:fluix_glass_cable',
		'thoriumreactors:redstone_processor',
		'ae2:certus_quartz_dust',
		'#forge:glass',
		'ae2:fluix_crystal',
		'ae2:certus_quartz_crystal',
		'tfc:metal/sheet/steel',
		'tfc:metal/sheet/gold',
		'tfc:metal/rod/steel',
		'tfc:metal/rod/copper',
		'tfc:metal/rod/gold',
		'tfc:metal/rod/nickel',
		'tfc:metal/rod/brass',
		'tfc:metal/rod/zinc',
		'#forge:chests/wooden',
		'minecraft:daylight_detector',
		'#minecraft:stone_pressure_plates',
		'#tfc:barrels',
		'kubejs:graphite_plate',
		'kubejs:lithium_plate',
		'minecraft:redstone_torch',
		'minecraft:repeater',
		'minecraft:comparator',
		'minecraft:observer',
		'morered:red_alloy_wire',
		'ae2:quartz_glass',
		'ae2:spatial_cell_component_2',
		'ae2:spatial_cell_component_16',
		'ae2:spatial_cell_component_128',
		'thoriumreactors:module_processing',
		'thoriumreactors:module_energy',
		'thoriumreactors:module_storage',
		'thoriumreactors:module_sensor',
		'thoriumreactors:module_tank',
		'thoriumreactors:module_io'
	]);

	TFC.misc.wood.forEach((wood, reg) => {
		e.add('kubejs:generator_fuels', [
			reg.getBlock('log').get().idLocation,
			reg.getBlock('stripped_log').get().idLocation,
			reg.getBlock('wood').get().idLocation,
			reg.getBlock('stripped_wood').get().idLocation
		]);
	});

	let tools = [];

	global.metals.forEach(metal => {
		if (metal.tools) {
			tools.push(`tfc:metal/axe/${metal.name}`);
			tools.push(`tfc:metal/pickaxe/${metal.name}`);
			tools.push(`tfc:metal/shovel/${metal.name}`);
			tools.push(`tfc:metal/hoe/${metal.name}`);
			tools.push(`tfc:metal/sword/${metal.name}`);
			tools.push(`tfc:metal/chisel/${metal.name}`);
			tools.push(`tfc:metal/hammer/${metal.name}`);
			tools.push(`tfc:metal/saw/${metal.name}`);
			tools.push(`tfc:metal/knife/${metal.name}`);
			tools.push(`tfc:metal/scythe/${metal.name}`);
			tools.push(`tfc:metal/propick/${metal.name}`);
			tools.push(`tfc:metal/javelin/${metal.name}`);
			tools.push(`tfc:metal/mace/${metal.name}`);
			tools.push(`tfc:metal/shears/${metal.name}`);
			tools.push(`tfc:metal/fishing_rod/${metal.name}`);
			tools.push(`precisionprospecting:metal/prospector_hammer/${metal.name}`);
			tools.push(`precisionprospecting:metal/prospector_drill/${metal.name}`);
			tools.push(`precisionprospecting:metal/mineral_prospector/${metal.name}`);
		}
	});
	[
		'igneous_intrusive',
		'igneous_extrusive',
		'metamorphic',
		'sedimentary'
	].forEach(rock => {
		tools.push(`tfc:stone/axe/${rock}`);
		tools.push(`tfc:stone/hammer/${rock}`);
		tools.push(`tfc:stone/hoe/${rock}`);
		tools.push(`tfc:rock/javelin/${rock}`);
		tools.push(`tfc:rock/knife/${rock}`);
		tools.push(`tfc:rock/shovel/${rock}`);
	});
	tools.push('tfc:gem_saw');
	tools.push('tfc:firestarter');

	e.add('kubejs:tool_auto_replace', tools);

	// Weight and size
	e.add('tfc:minecarts', [
		'minecraft:minecart',
		'minecraft:furnace_minecart',
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
		'ae2:certus_quartz_crystal',
		'ae2:quartz_block'
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
		'tfc:ore/rich_sphalerite',
		'tfc:ore/normal_sphalerite',
		'tfc:ore/poor_sphalerite',
		'tfc:ore/small_sphalerite'
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
	e.add('kubejs:ore/chromite', /firmalife:.*chromite.*/);
	
	let rockTypes = {};
	TFC.misc.rock.forEach((rock, reg) => {
		rockTypes[rock] = [
			reg.getBlock('loose').get().asItem().arch$registryName(),
			reg.getBlock('hardened').get().asItem().arch$registryName(),
			reg.getBlock('mossy_loose').get().asItem().arch$registryName(),
			reg.getBlock('raw').get().asItem().arch$registryName()
		]
	});
	let meta = [];
	rockTypes['slate'].forEach(b => meta.push(b));
	rockTypes['quartzite'].forEach(b => meta.push(b));
	rockTypes['phyllite'].forEach(b => meta.push(b));
	rockTypes['schist'].forEach(b => meta.push(b));
	rockTypes['gneiss'].forEach(b => meta.push(b));
	rockTypes['marble'].forEach(b => meta.push(b));
	let sed = [];
	rockTypes['shale'].forEach(b => sed.push(b));
	rockTypes['claystone'].forEach(b => sed.push(b));
	rockTypes['limestone'].forEach(b => sed.push(b));
	rockTypes['conglomerate'].forEach(b => sed.push(b));
	rockTypes['dolomite'].forEach(b => sed.push(b));
	rockTypes['chert'].forEach(b => sed.push(b));
	rockTypes['chalk'].forEach(b => sed.push(b));
	let ignIn = [];
	rockTypes['granite'].forEach(b => ignIn.push(b));
	rockTypes['diorite'].forEach(b => ignIn.push(b));
	rockTypes['gabbro'].forEach(b => ignIn.push(b));
	let ignEx = [];
	rockTypes['rhyolite'].forEach(b => ignEx.push(b));
	rockTypes['basalt'].forEach(b => ignEx.push(b));
	rockTypes['andesite'].forEach(b => ignEx.push(b));
	rockTypes['dacite'].forEach(b => ignEx.push(b));

	e.add('kubejs:rock/native_copper_bearing', ignEx);
	e.add('kubejs:rock/native_gold_bearing', ignEx);
	e.add('kubejs:rock/native_gold_bearing', ignIn);
	e.add('kubejs:rock/native_silver_bearing', rockTypes['granite']);
	e.add('kubejs:rock/native_silver_bearing', rockTypes['diorite']);
	e.add('kubejs:rock/native_silver_bearing', rockTypes['schist']);
	e.add('kubejs:rock/native_silver_bearing', rockTypes['gneiss']);
	e.add('kubejs:rock/tetrahedrite_bearing', meta);
	e.add('kubejs:rock/malachite_bearing', rockTypes['marble']);
	e.add('kubejs:rock/malachite_bearing', rockTypes['limestone']);
	e.add('kubejs:rock/malachite_bearing', rockTypes['chalk']);
	e.add('kubejs:rock/malachite_bearing', rockTypes['dolomite']);
	e.add('kubejs:rock/cassiterite_bearing', ignIn);
	e.add('kubejs:rock/bismuthinite_bearing', sed);
	e.add('kubejs:rock/bismuthinite_bearing', ignIn);
	e.add('kubejs:rock/garnierite_bearing', ignIn);
	e.add('kubejs:rock/hematite_bearing', ignEx);
	e.add('kubejs:rock/magnetite_bearing', sed);
	e.add('kubejs:rock/limonite_bearing', sed);
	e.add('kubejs:rock/sphalerite_bearing', ignEx);
	e.add('kubejs:rock/sphalerite_bearing', ignIn);
	e.add('kubejs:rock/lignite_bearing', sed);
	e.add('kubejs:rock/bituminous_coal_bearing', sed);
	e.add('kubejs:rock/graphite_bearing', rockTypes['gneiss']);
	e.add('kubejs:rock/graphite_bearing', rockTypes['marble']);
	e.add('kubejs:rock/graphite_bearing', rockTypes['quartzite']);
	e.add('kubejs:rock/graphite_bearing', rockTypes['schist']);
	e.add('kubejs:rock/cinnabar_bearing', rockTypes['quartzite']);
	e.add('kubejs:rock/cinnabar_bearing', rockTypes['granite']);
	e.add('kubejs:rock/cinnabar_bearing', rockTypes['phyllite']);
	e.add('kubejs:rock/cinnabar_bearing', rockTypes['schist']);
	e.add('kubejs:rock/cryolite_bearing', rockTypes['granite']);
	e.add('kubejs:rock/cryolite_bearing', rockTypes['diorite']);
	e.add('kubejs:rock/saltpeter_bearing', sed);
	e.add('kubejs:rock/sulfur_bearing', meta);
	e.add('kubejs:rock/sulfur_bearing', ignIn);
	e.add('kubejs:rock/sylvite_bearing', rockTypes['shale']);
	e.add('kubejs:rock/sylvite_bearing', rockTypes['claystone']);
	e.add('kubejs:rock/sylvite_bearing', rockTypes['chert']);
	e.add('kubejs:rock/borax_bearing', rockTypes['claystone']);
	e.add('kubejs:rock/borax_bearing', rockTypes['limestone']);
	e.add('kubejs:rock/borax_bearing', rockTypes['shale']);
	e.add('kubejs:rock/gypsum_bearing', sed);
	e.add('kubejs:rock/halite_bearing', sed);
	e.add('kubejs:rock/emerald_bearing', ignIn);
	e.add('kubejs:rock/diamond_bearing', rockTypes['gabbro']);
	e.add('kubejs:rock/lapis_lazuli_bearing', rockTypes['limestone']);
	e.add('kubejs:rock/lapis_lazuli_bearing', rockTypes['marble']);
	e.add('kubejs:rock/amethyst_bearing', sed);
	e.add('kubejs:rock/amethyst_bearing', meta);
	e.add('kubejs:rock/opal_bearing', sed);
	e.add('kubejs:rock/opal_bearing', ignEx);
	e.add('kubejs:rock/kaolin_bearing', [
		'tfc:grass/loam',
		'tfc:grass/silt',
		'tfc:grass/sandy_loam',
		'tfc:grass/silty_loam',
		'tfc:dirt/loam',
		'tfc:dirt/silt',
		'tfc:dirt/sandy_loam',
		'tfc:dirt/silty_loam'
	]);
	e.add('kubejs:rock/certus_quartz_bearing', rockTypes['claystone']);
	e.add('kubejs:rock/certus_quartz_bearing', rockTypes['phyllite']);
	e.add('kubejs:rock/chromite_bearing', ignIn);
	e.add('kubejs:rock/chromite_bearing', meta);
	e.add('kubejs:rock/lithium_bearing', [
		'tfc:grass/loam',
		'tfc:grass/silt',
		'tfc:grass/sandy_loam',
		'tfc:grass/silty_loam',
		'tfc:dirt/loam',
		'tfc:dirt/silt',
		'tfc:dirt/sandy_loam',
		'tfc:dirt/silty_loam'
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
	e.add('tfc:feature/soil_discs', [
		'kubejs:soil_disc/lithium_salt'
	])
})