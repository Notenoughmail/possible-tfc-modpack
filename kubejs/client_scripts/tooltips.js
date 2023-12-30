// priority: 0

onEvent('item.tooltip', tip => {
	tip.addAdvanced(Ingredient.all, (item, advanced, text) => {
		if (debugMode && tip.alt && item.nbt) {
			text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)))
		}
	})
	tip.add('kubejs:uranium_block', Text.translate('tooltip.kubejs.block_has_passive_heat').color(Color.DARK_GREEN))
	tip.add('#create:diving_equipment/blue_steel', Text.translate('tooltip.kubejs.part_of_set'))
	
	tip.add('kubejs:kinetic_adapter', Text.translate('create.tooltip.speedRequirement', Text.translate('tooltip.kubejs.adapter_speed_req', Text.translate('create.generic.unit.rpm')).color(Color.RED)).color(Color.GRAY))
	tip.add('kubejs:kinetic_adapter', Text.translate('tooltip.kubejs.karma').color(Color.CYAN_DYE))

	tip.addAdvanced(['minecraft:leather_boots', 'minecraft:leather_chestplate', 'minecraft:leather_leggings', 'minecraft:leather_helmet'], (item, advanced, text) => {
		if (item.nbt?.getBoolean('AluPadding')) {
			text.add(Text.translate('tooltip.kubejs.shock_proof').color(Color.LIGHT_GRAY_DYE));
		}
	})
	tip.add('kubejs:thermometer', Text.translate('tooltip.kubejs.thermometer'))
})