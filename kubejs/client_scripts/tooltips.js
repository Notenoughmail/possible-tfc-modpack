// priority: 0

ItemEvents.tooltip(tip => {
	tip.addAdvanced(Ingredient.all, (item, advanced, text) => {
		if (tip.alt && item.nbt && global.clientConfig.debug.enabled.get()) {
			text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)))
		}
	})
	tip.add('kubejs:uranium_block', Text.translate('tooltip.kubejs.block_has_passive_heat').color(Color.DARK_GREEN))
	tip.add('kubejs:thermometer', Text.translate('tooltip.kubejs.thermometer'))
})