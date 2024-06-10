//priority 10

ServerEvents.recipes( e => {
	
	[
		/^firmalife:heating.*(?:ore|metal).*/,
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
		'thoriumreactors:thorium_crafting/water_source_block',
		'ae2:misc/tank_sky_stone',
		'ae2:tools/fluix_upgrade_smithing_template',
		'thoriumreactors:thorium_crafting/module_empty',
		'ae2:network/blocks/energy_vibration_chamber',
		'ae2:network/crystal_resonance_generator',
		/^thoriumreactors:thorium_crafting\/(?:simple|progressive|generic)_(?:energy|fluid)_tank$/,
		/^thoriumreactors:thorium_crafting\/.*(?:industrial|factory).*/,
		/^thoriumreactors:(?:(?:black(?:_inverted)?|white|inverted)_)?(?:industrial|factory)_block(?:_smooth)?$/,
		/^thoriumreactors:(?:black_)?industrial_block_floor$/,
		/^thoriumreactors:thorium_crafting\/(?:grate_floor|fluid_centrifuge|decomposer|blast_furnace|generator|fluid_evaporation|grate_wall|turbine|machine|crystallizer|thermal_heat|concentrator|electromagnetic_coil|reactor_graphite_moderator|graphite_tube|reactor|uranium_oxidizer|fluid_enricher)(?:_(?:block|casing|con(?:s)?troller|power_port|rotor|vent|control_rod|rotation_mount|blade))?$/,
		'ae2:network/cells/view_cell',
		/^ae2:network\/cells\/(?:item|fluid|spatial)_storage_cell_(?:1|2|4|16|64|128|256)(?:k|_cubed)$/,
		/^megacells:cells\/standard\/(?:item|fluid)_storage_cell_(?:1|4|16|64|256)m$/
	].forEach(id => {
		e.remove({id: id})
	})

	e.remove({
		or: [{
			output: [
				'toolbelt:pouch', 
				'toolbelt:belt',
				/^minecraft:.*(?:diorite|granite|andesite|dripstone|limestone|deespslate).*/,
				'minecraft:iron_ingot',
				/.*netherite.*/,
				'minecraft:bucket',
				'minecraft:glass_bottle',
				/^minecraft:brick.+/,
				/^tfc:metal\/bucket\/(?:red|blue)_steel$/,
				'minecraft:candle',
				'minecraft:gold_block',
				'minecraft:bucket',
				'minecraft:glass_bottle',
				/^thoriumreactors:.*(?:chest|ore).*/,
				'ae2:charger/meteorite_compass',
				/^ae2:(?:(?:certus|nether)_quartz|fluix)_(?:sword|hoe|axe|shovel|pickaxe)$/,
				/^ae2:nether_quartz_(?:wrench|cutting_knife)$/,
				/^ae2:.*sky_stone.*/,
				'ae2:sky_dust'
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
		}, {
			type: 'minecraft:crafting_shapeless',
			output: 'minecraft:sugar'
		}]
	});
})