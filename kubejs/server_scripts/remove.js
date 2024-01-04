//priority 10

ServerEvents.recipes( e => {
	e.remove({output: [
		'toolbelt:pouch', 
		'toolbelt:belt',
		/minecraft:.*(?:diorite|granite|andesite|dripstone|limestone|deespslate).*/,
		'minecraft:iron_ingot',
		/.*netherite.*/,
		'minecraft:bucket',
		'minecraft:glass_bottle',
		/minecraft:brick.+/,
		/tfc:metal\/bucket\/(?:red|blue)_steel/,
		'minecraft:candle'
	]});
	
	[
		/firmalife:heating.*(?:ore|metal).*/,
		'minecraft:charcoal',
		'minecraft:copper_block',
		'minecraft:copper_ingot',
		'minecraft:brick',
		'minecraft:iron_block',
		'minecraft:paper',
		'firmalife:alloy/stainless_steel'
	].forEach(id => {
		e.remove({id: id})
	})
	e.remove({output: 'minecraft:gold_block'});
	e.remove({input: 'minecraft:gold_block'});
	e.remove({type: 'minecraft:smelting'});
	e.remove({type: 'minecraft:blasting'});
	e.remove({input: 'minecraft:bucket'})
	e.remove({output: 'minecraft:bucket'})
	e.remove({output: 'minecraft:glass_bottle'})
})