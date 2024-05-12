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
		'morered:smooth_stone_slab_from_stone_plate',
		'ae2:transform/entangled_singularity_from_pearl',
		'ae2:inscriber/ender_dust',
		'ae2:inscriber/silicon_print',
		'ae2:inscriber/certus_quartz_dust',
		'ae2:inscriber/silicon_press',
		'ae2:inscriber/fluix_dust',
		'ae2:inscriber/sky_stone_dust',
		'megacells:transform/sky_steel_ingot',
		'thoriumreactors:thorium_crafting/water_source_block'
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
				/thoriumreactors:.*(?:chest|ore).*/
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