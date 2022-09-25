// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

let types = ['normal', 'poor', 'rich']

onEvent('item.registry', e => {
	e.create('unfilled_wrought_iron_shots')
	e.create('unfilled_steel_shots')
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
		})
	})
	e.create('ore/small_lead').parentmodel("kubejs:block/ore/small_lead")
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