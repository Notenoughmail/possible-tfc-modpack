
TFCEvents.data(e => {
	
	e.itemHeat('#forge:double_ingots/constantan', 2.466, 760, 1012);
	e.itemHeat('#forge:ingots/constantan', 1.233, 760, 1012);
	e.itemHeat('#forge:rods/constantan', 0.616, 760, 1012);
	e.itemHeat('#forge:sheets/constantan', 2.166, 760, 1012);
	e.itemHeat('#forge:double_ingots/electrum', 2.219, 606, 808);
	e.itemHeat('#forge:ingots/electrum', 1.11, 606, 808);
	e.itemHeat('#forge:rods/electrum', 0.555, 606, 808);
	e.itemHeat('#forge:sheets/electrum', 2.219, 606, 808);
	e.itemHeat('minecraft:gold_block', 4.165, null, null);
	e.itemHeat('#forge:double_ingots/lead', 3.379, 196, 261);
	e.itemHeat('#forge:ingots/lead', 1.69, 196, 261);
	e.itemHeat('#forge:rods/lead', 0.845, 196, 261);
	e.itemHeat('#forge:sheets/lead', 3.379, 196, 261);
	e.itemHeat('tfc:powder/graphite', 7.31, null, null);
	e.itemHeat(['firmalife:ore/small_chromite', 'firmalife:ore/normal_chromite', 'firmalife:ore/poor_chromite', 'firmalife:ore/rich_chromite'], 1.143, 1144, 1526, 'firmalife:ore/chromite');
	e.itemHeat('#forge:double_ingots/chromium', 4.64, 1144, 1526, 'firmalife:metal/chromium_double_ingot');
	e.itemHeat('#forge:sheets/stainless_steel', 5.0533, 924, 1232, 'firmalife:metal/stainless_steel_sheet');
	e.itemHeat('#forge:rods/stainless_steel', 1.263, 924, 1232, 'firmalife:metal/stainless_steel_rod');
	e.itemHeat('#forge:ingots/stainless_steel', 2.527, 924, 1232, 'firmalife:metal/stainless_steel_ingot');
	e.itemHeat('#forge:double_sheets/stainless_steel', 10.107, 924, 1232, 'firmalife:metal/stainless_steel_double_sheet');
	e.itemHeat('#forge:double_ingots/stainless_steel', 5.0533, 924, 1232, 'firmalife:metal/stainless_steel_double_ingot');
	e.itemHeat('#forge:sheets/chromium', 4.64, 1144, 1526, 'firmalife:metal/chromium_sheet');
	e.itemHeat('#forge:rods/chromium', 1.16, 1144, 1526, 'firmalife:metal/chromium_rod');
	e.itemHeat('#forge:ingots/chromium', 2.32, 1144, 1526, 'firmalife:metal/chromium_ingot');
	e.itemHeat('#forge:double_sheets/chromium', 9.28, 1144, 1526, 'firmalife:metal/chromium_double_sheet');
	e.itemHeat('minecraft:redstone', 0.824, null, null);
	e.itemHeat('morered:red_alloy_ingot', 0.654, null, null);
	e.itemHeat('minecraft:redstone_block', 7.416, null, null);
	
	e.itemSize('toolbelt:belt', 'very_large', 'heavy');
	e.itemSize('toolbelt:pouch', 'normal', 'light');
	e.itemSize(['#morered:network_cables', '#morered:red_alloy_wires'], 'tiny', 'light');
	e.itemSize('kubejs:rocket_engine', 'huge', 'very_heavy');

	e.metal(
		'firmalife:metal/chromium',
		1907,
		0.00696,
		'firmalife:metal/ingot/chromium',
		'firmalife:metal/double_ingot/chromium',
		'firmalife:metal/sheet/chromium',
		4,
		'firmalife:chromium'
	);
	e.metal(
		'firmalife:metal/stainless_steel',
		1540,
		0.00758,
		'firmalife:metal/ingot/stainless_steel',
		'firmalife:metal/double_ingot/stainless_steel',
		'firmalife:metal/sheet/stainless_steel',
		4,
		'firmalife:stainless_steel'
	);
	e.metal(
		'kubejs:unrefined_redstone',
		2013,
		0.00768,
		null,
		null,
		null,
		0,
		'kubejs:unrefined_redstone'
	);
	e.metal(
		'kubejs:refined_redstone',
		2013,
		0.00851,
		null,
		null,
		null,
		0,
		'kubejs:refined_redstone'
	);
	e.metal(
		'kubejs:redstone_alloy',
		1573,
		0.00632,
		'morered:red_alloy_ingot',
		null,
		null,
		0,
		'kubejs:redstone_alloy'
	);
	e.metal(
		'kubejs:graphite',
		2000, // TODO: Find a better number for this
		0.00912,
		'thoriumreactors:graphite_ingot',
		null,
		null,
		6,
		'kubejs:refined_graphite'
	);
	e.metal(
		'kubejs:unrefined_graphite',
		2000,
		0.00912,
		null,
		null,
		null,
		4,
		'kubejs:unrefined_graphite'
	);
	e.metal(
		'kubejs:solar_paste',
		87,
		0.00412,
		null,
		null,
		null,
		0,
		'kubejs:solar_paste'
	);

	e.knappingType(
		'tfc:metal/sheet/steel',
		1,
		1,
		'tfc:block.anvil.hit',
		false,
		false,
		false,
		'tfc:metal/sheet/steel',
		'kubejs:steel_sheet_carving'
	);
})

TFCEvents.worldgenData(e => {
	e.clusterVein('kubejs:vein/certus_quartz', [
		e.blockToWeightedBlockState([
			'tfc:rock/raw/claystone',
			'tfc:rock/raw/phyllite'
		], [
			'45 ae2:quartz_block',
			'15 ae2:damaged_budding_quartz',
			'5 ae2:chipped_budding_quartz',
			'3 ae2:flawed_budding_quartz',
			'ae2:flawless_budding_quartz'
		])
	], 96, 0.2, -64, 12, 15, vein => {
		vein.nearLava(true)
	}, placement => {});

	e.soilDisc('kubejs:soil_disc/lithium_salt', [
		e.blockToBlockState('tfc:grass/loam', 'kubejs:lithium_salt_grass'),
		e.blockToBlockState('tfc:grass/silt', 'kubejs:lithium_salt_grass'),
		e.blockToBlockState('tfc:grass/sandy_loam', 'kubejs:lithium_salt_grass'),
		e.blockToBlockState('tfc:grass/silty_loam', 'kubejs:lithium_salt_grass'),
		e.blockToBlockState('tfc:dirt/loam', 'kubejs:lithium_salt'),
		e.blockToBlockState('tfc:dirt/silt', 'kubejs:lithium_salt'),
		e.blockToBlockState('tfc:dirt/sandy_loam', 'kubejs:lithium_salt'),
		e.blockToBlockState('tfc:dirt/silty_loam', 'kubejs:lithium_salt')
	], 6, 12, 5, 0.85, placement => {
		placement.climate(climate => {
			climate.minRain(350)
			climate.minTemp(10)
			climate.maxForest('sparse')
		});
	});
})

ServerEvents.highPriorityData(e => {
	e.addJson('kubejs:curios/slots/thermometer', {
		icon: 'curios:slot/empty_charm_slot'
	});
	e.addJson('kubejs:curios/entities/thermometer', {
		entities: ['player'],
		slots: ['thermometer']
	});
})