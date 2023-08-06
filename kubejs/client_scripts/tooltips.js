// priority: 0

onEvent('item.tooltip', tip => {
	tip.addAdvanced(Ingredient.all, (item, advanced, text) => {
		if (tip.alt && item.nbt) {
			text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)))
		}
	})
	tip.add('kubejs:uranium_block', Text.translate('tooltip.kubejs.block_has_passive_heat').color(Color.DARK_GREEN))
	tip.add('#create:diving_equipment/blue_steel', Text.translate('tooltip.kubejs.part_of_set'))
	// It's close enough...
	tip.add('kubejs:kinetic_adapter', Text.translate('create.tooltip.stressImpact').color(Color.GRAY))
	tip.add('kubejs:kinetic_adapter', Text.translate('tooltip.kubejs.fake_4x').color(Color.GOLD).append(Text.translate('create.generic.unit.rpm').color(Color.GOLD)))
	tip.add('kubejs:kinetic_adapter', Text.translate('tooltip.kubejs.karma').color(Color.CYAN_DYE))
})