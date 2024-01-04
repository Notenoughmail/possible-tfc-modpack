// priority: 0

ServerEvents.tags('block', e => {
	e.add('kubejs:vertical_support', [
    	"tfc:wood/vertical_support/acacia",
    	"tfc:wood/vertical_support/ash",
    	"tfc:wood/vertical_support/aspen",
    	"tfc:wood/vertical_support/birch",
    	"tfc:wood/vertical_support/blackwood",
    	"tfc:wood/vertical_support/chestnut",
    	"tfc:wood/vertical_support/douglas_fir",
    	"tfc:wood/vertical_support/hickory",
    	"tfc:wood/vertical_support/kapok",
    	"tfc:wood/vertical_support/maple",
    	"tfc:wood/vertical_support/oak",
    	"tfc:wood/vertical_support/palm",
    	"tfc:wood/vertical_support/pine",
    	"tfc:wood/vertical_support/rosewood",
    	"tfc:wood/vertical_support/sequoia",
    	"tfc:wood/vertical_support/spruce",
    	"tfc:wood/vertical_support/sycamore",
    	"tfc:wood/vertical_support/white_cedar",
    	"tfc:wood/vertical_support/willow"
	])
});

ServerEvents.tags('item', e => {

	// Removal
	e.remove('forge:cobblestone/normal', /tfc:rock.*mossy_cobble.*/)
	
	//general
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
	])
	e.add('tfc:usable_on_tool_rack', [
		'create:wrench',
		'create:goggles',
		'firmalife:watering_can'
	])
	e.add('tfc:rocks/loose', [
		'#tfc:rock_knapping'
	])
	e.add('tfc:kelp', [
		'tfc:plant/winged_kelp',
		'tfc:plant/leafy_kelp',
		'tfc:plant/giant_kelp_flower'
	])
	e.add('forge:cobblestone',
		/tfc:rock.*mossy_cobble.*/
	)
	e.add('forge:cobblestone/mossy', [
		/tfc:rock.*mossy_cobble.*/
	])
	e.add('tfc:igneous_rock', [
		'#tfc:igneous_intrusive_rock',
		'#tfc:igneous_extrusive_rock'
	])
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
	])
	e.add('tfc:magma_blocks', [
		'tfc:rock/magma/granite',
		'tfc:rock/magma/diorite',
		'tfc:rock/magma/gabbro',
		'tfc:rock/magma/rhyolite',
		'tfc:rock/magma/basalt',
		'tfc:rock/magma/andesite',
		'tfc:rock/magma/dacite'
	])
	e.add('tfc:raw_salts', [
		'tfc:ore/halite',
		'tfc:ore/sylvite'
	])
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
	])

	e.add('exposure:lenses', [
		'tfc:lens'
	])

	//weight and size
	e.add('tfc:minecarts', [
		'minecraft:minecart',
		'minecraft:furnace_minecart',
		'minecraft:tnt_minecart',
		'minecraft:hopper_minecart'
	])
})

ServerEvents.tags('fluid', e => {

	e.removeAll('forge:plantoil')

	e.add('tfc:molten_metals',
		'firmalife:metal/stainless_steel',
		'firmalife:metal/chromium'
	)
	e.add('forge:true_water',
		'minecraft:water',
		'minecraft:flowing_water'
	)
	e.add('forge:true_lava',
		'minecraft:lava'
	)
})

/*
ServerEvents.tags('worldgen/placed_feature', e => {
	e.add('tfc:in_biome/veins',
		'kubejs_tfc:vein/poor_lead',
		'kubejs_tfc:vein/normal_lead',
		'kubejs_tfc:vein/deep_lead'
	)
})
*/