//priority 10

ServerEvents.recipes( e => {
	
	[
		/firmalife:heating.*(?:ore|metal).*/,
		'minecraft:charcoal',
		'minecraft:copper_block',
		'minecraft:copper_ingot',
		'minecraft:brick',
		'minecraft:iron_block',
		'minecraft:paper',
		'firmalife:alloy/stainless_steel',
		'morered:smooth_stone_slab_from_stone_plate',
		'ae2:transform/entangled_singularity_from_pearl'
	].forEach(id => {
		e.remove({id: id})
	})

	e.remove({
		or: [{
			output: [
				'toolbelt:pouch', 
				'toolbelt:belt',
				/minecraft:.*(?:diorite|granite|andesite|dripstone|limestone|deespslate).*/,
				'minecraft:iron_ingot',
				/.*netherite.*/,
				'minecraft:bucket',
				'minecraft:glass_bottle',
				/minecraft:brick.+/,
				/tfc:metal\/bucket\/(?:red|blue)_steel/,
				'minecraft:candle',
				'minecraft:gold_block',
				'minecraft:bucket',
				'minecraft:glass_bottle',
				/thoriumreactors:.*chest.*/
			]
		}, {
			input: [
				'minecraft:gold_block',
				'minecraft:bucket'
			]
		},
		{
			type: 'minecraft:smelting'
		}, {
			type: 'minecraft:blasting'
		}, {
			type: 'jumbofurnace:jumbo_smelting'
		}, {
			type: 'thoriumreactors:blasting'
		}]
	});
})