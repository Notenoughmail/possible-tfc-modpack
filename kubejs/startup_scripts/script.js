// priority: 0

console.info('Custom items, blocks, and liquids inbound!')

let types = ['normal', 'poor', 'rich']

onEvent('item.registry', e => {
	types.forEach(type => {
		e.create('ore/' + type +'_lead')
	})
	e.create('leather_pouch')
})

onEvent('item.modification', e => {
	e.modify('immersiveengineering:glider', item => {
		item.maxDamage = 500
	})
	e.modify('create:diving_helmet', item => {
		item.maxDamage = 153
	})
	e.modify('create:diving_boots', item => {
		item.maxDamage = 197
	})
	e.modify('#minecraft:boats', item => {
		item.maxStackSize = 1
	})
})

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']


onEvent('block.registry', e => {
	stones.forEach(rock => {
		types.forEach(type => {
			e.create('ore/' + type + '_lead/' + rock)
				.material('stone')
				.hardness(0.6)
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
})