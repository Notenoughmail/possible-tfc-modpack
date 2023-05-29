// priority: 0

onEvent('item.tooltip', tip => {
	tip.addAdvanced(Ingredient.all, (item, advanced, text) => {
		if (tip.alt && item.nbt) {
			text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)))
		}
	})
	tip.add('immersiveengineering:storage_uranium', Text.translate("tooltip.kubejs.block_has_passive_heat"))
})