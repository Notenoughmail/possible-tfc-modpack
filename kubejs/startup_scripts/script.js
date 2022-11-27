// priority: 0

console.info('Custom items, blocks, and liquids inbound!')

let types = ['normal', 'poor', 'rich']

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let planks = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir', 'hickory', 'kapok', 'maple', 'oak', 'palm', 'pine', 'rosewood', 'sequoia', 'spruce', 'sycamore', 'white_cedar', 'willow', 'stained_horizontal_wood', 'stained_vertical_wood', 'stained_packaged_wood']

onEvent('item.registry', e => {
	types.forEach(type => {
		e.create('ore/' + type +'_lead')
	})
	e.create('leather_pouch')
	stones.forEach(stone => {
		e.create(stone + '_brick_panel')
	})
	planks.forEach(plank => {
		e.create(plank + '_planks_panel')
	})
	e.create('brick_panel')
	e.create('dummy')
	e.create('mold/ingot')
	e.create('mold/double_ingot')
	e.create('mold/double_sheet')
	e.create('metal/double_ingot/constantan')
	e.create('metal/double_ingot/electrum')
	e.create('metal/double_ingot/lead')
})

onEvent('item.modification', e => {
	e.modify('immersiveengineering:glider', item => {
		item.maxDamage = 500
	})
	e.modify('create:diving_helmet', item => {
		item.maxDamage = 173
	})
	e.modify('create:diving_boots', item => {
		item.maxDamage = 197
	})
	e.modify('#minecraft:boats', item => {
		item.maxStackSize = 1
	})
	e.modify('minecraft:flint_and_steel', item => {
		item.maxDamage = 537
	})
	e.modify('gunswithoutroses:gold_gun', item => {
		item.maxDamage = 900
	})
	e.modify('gunswithoutroses:iron_gun', item => {
		item.maxDamage = 1650
	})
})

onEvent('block.registry', e => {
	stones.forEach(rock => {
		types.forEach(type => {
			e.create('ore/' + type + '_lead/' + rock)
				.material('stone')
				.hardness(3)
				.tagBlock('minecraft:mineable/pickaxe')
				.tagBlock('tfc:prospectable')
				.tagBlock('tfc:can_trigger_collapse')
				.tagBlock('tfc:rock/ores')
				.tagBlock('tfc:can_collapse')
				.tagBlock('tfc:can_start_collapse')
				.tagBlock('minecraft:needs_stone_tool')
				.tagBlock('forge:ores/lead')
				.tagBlock('tfc:ore/lead/' + type)
		})
	})
	e.create('ore/small_lead')
		.model("kubejs:block/ore/small_lead")
		.hardness(0.1)
		.noCollision()
		.renderType('cutout')
		.waterlogged()
		.box(5, 0, 5, 11, 2, 11, true)
		.tagBlock('tfc:can_be_snow_piled')
		.material('stone')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('immersiveengineering:mineable/drill')
		.tagItem('tfc:small_ore_pieces')
		.tagItem('tfc:nuggets')
	e.create('frame/capacitor_mv')//done this way to let the name be different in the lang file, as KubeJS's generated default overrides it
	e.create('frame/capacitor_hv')//+ expandability for future frames if that's something that happens
})

onEvent('fluid.registry', e => {
	e.create('constantan')
		.thickTexture(0xfc8d6f)
		.bucketColor(0xfc8d6f)
		.displayName('Molten Constantan')
	e.create('electrum')
		.thickTexture(0xf4e388)
		.bucketColor(0xf4e388)
		.displayName('Molten Electrum')
	e.create('lead')
		.thickTexture(0x4c5163)
		.bucketColor(0x4c5163)
		.displayName('Molten Lead')
	e.create('jutecrete')
		.thinTexture(0x34342f)
		.bucketColor(0x34342f)
		.displayName('Liquid Jutecrete')
		.noBlock()
	e.create('graphite')
		.thickTexture(0x101010)
		.bucketColor(0x101010)
		.displayName('Molten Graphite')
		.noBlock()
})