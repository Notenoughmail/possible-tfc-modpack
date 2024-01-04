// TODO: Fix all of this

TFCEvents.data(e => {
	
	e.itemHeat('#forge:double_ingots/constantan', 2.466, 760, 1012)
	e.itemHeat('#forge:ingots/constantan', 1.233, 760, 1012)
	e.itemHeat('#forge:rods/constantan', 0.616, 760, 1012)
	e.itemHeat('#forge:sheets/constantan', 2.166, 760, 1012)
	// e.itemHeat([/minecraft:(?:waxed_)?(?:(?:exposed|weathered|oxidized)_)?(?:cut_)?copper$/, /minecraft:(?:waxed_)?copper_block/], 7.145, null, null)
	e.itemHeat('#forge:double_ingots/electrum', 2.219, 606, 808)
	e.itemHeat('#forge:ingots/electrum', 1.11, 606, 808)
	e.itemHeat('#forge:rods/electrum', 0.555, 606, 808)
	e.itemHeat('#forge:sheets/electrum', 2.219, 606, 808)
	e.itemHeat('minecraft:gold_block', 4.165, null, null)
	e.itemHeat('#forge:double_ingots/lead', 3.379, 196, 261)
	e.itemHeat('#forge:ingots/lead', 1.69, 196, 261)
	e.itemHeat('#forge:rods/lead', 0.845, 196, 261)
	e.itemHeat('#forge:sheets/lead', 3.379, 196, 261)
	// e.itemHeat(/kubejs:ore\/.+_lead$/, 0.34, null, null)
	// e.itemHeat(/minecraft:(?:waxed_)?(?:(?:exposed|weathered|oxidized)_)?(?:cut_)?copper_slab/, 3.573, null, null)
	e.itemHeat('tfc:powder/coke', 7.31, null, null)
	e.itemHeat(['firmalife:ore/small_chromite', 'firmalife:ore/normal_chromite', 'firmalife:ore/poor_chromite', 'firmalife:ore/rich_chromite'], 1.143, 1144, 1526, 'firmalife:ore/chromite')
	e.itemHeat('#forge:double_ingots/chromium', 4.64, 1144, 1526, 'firmalife:metal/chromium_double_ingot')
	e.itemHeat('#forge:sheets/stainless_steel', 5.0533, 924, 1232, 'firmalife:metal/stainless_steel_sheet')
	e.itemHeat('#forge:rods/stainless_steel', 1.263, 924, 1232, 'firmalife:metal/stainless_steel_rod')
	e.itemHeat('#forge:ingots/stainless_steel', 2.527, 924, 1232, 'firmalife:metal/stainless_steel_ingot')
	e.itemHeat('#forge:double_sheets/stainless_steel', 10.107, 924, 1232, 'firmalife:metal/stainless_steel_double_sheet')
	e.itemHeat('#forge:double_ingots/stainless_steel', 5.0533, 924, 1232, 'firmalife:metal/stainless_steel_double_ingot')
	e.itemHeat('#forge:sheets/chromium', 4.64, 1144, 1526, 'firmalife:metal/chromium_sheet')
	e.itemHeat('#forge:rods/chromium', 1.16, 1144, 1526, 'firmalife:metal/chromium_rod')
	e.itemHeat('#forge:ingots/chromium', 2.32, 1144, 1526, 'firmalife:metal/chromium_ingot')
	e.itemHeat('#forge:double_sheets/chromium', 9.28, 1144, 1526, 'firmalife:metal/chromium_double_sheet')
	
	e.itemSize('toolbelt:belt', 'very_large', 'heavy')
	e.itemSize('toolbelt:pouch', 'normal', 'light')

	e.metal(
		'firmalife:metal/chromium',
		1907,
		0.00696,
		'firmalife:metal/ingot/chromium',
		'firmalife:metal/double_ingot/chromium',
		'firmalife:metal/sheet/chromium',
		4,
		'firmalife:chromium'
	)
	e.metal(
		'firmalife:metal/stainless_steel',
		1540,
		0.00758,
		'firmalife:metal/ingot/stainless_steel',
		'firmalife:metal/double_ingot/stainless_steel',
		'firmalife:metal/sheet/stainless_steel',
		4,
		'firmalife:stainless_steel'
	)
})

TFCEvents.worldgenData(e => {
})