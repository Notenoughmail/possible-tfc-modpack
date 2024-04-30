// priority: 0

const Block = Java.loadClass("net.minecraft.world.level.block.Block");
const TFCBlockTags = Java.loadClass("net.dries007.tfc.common.TFCTags$Blocks");
const Support = Java.loadClass("net.dries007.tfc.util.Support");
const BlockInventory = Java.loadClass("net.dries007.tfc.common.recipes.inventory.BlockInventory");
const CollapseRecipe = Java.loadClass("net.dries007.tfc.common.recipes.CollapseRecipe");

ItemEvents.tooltip(tip => {
	tip.addAdvanced(Ingredient.all, (item, advanced, text) => {
		if (tip.alt && item.nbt && global.clientConfig.debug.enabled.get()) {
			text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)))
		}
	})
	tip.add('kubejs:uranium_block', Text.translate('tooltip.kubejs.block_has_passive_heat').color(Color.DARK_GREEN))
	tip.add('kubejs:thermometer', Text.translate('tooltip.kubejs.thermometer'))
})

const SUPPORTED = Text.translatable('jade.tooltip.kubejs.supported').green();
const UNSUPPORTED = Text.translatable('jade.tooltip.kubejs.unsupported').yellow();
const WILL_NOT_TRIGGER_COLLAPSE = Text.translatable('jade.tooltip.kubejs.will_not_trigger_collapse').green();
const MAY_TRIGGER_COLLAPSE = Text.translatable('jade.tooltip.kubejs.may_trigger_collapse').color(Color.ORANGE_DYE);

JadeEvents.onClientRegistration(e => {
	e.block('kubejs:collapse', Block)
		.tooltip((tooltip, accessor, config) => global.collapseTooltip(tooltip, accessor, config));
	e.block('kubejs:support', Block)
		.tooltip((tooltip, accessor, config) => global.supportTooltip(tooltip, accessor, config));
})

/**
 * @param {Internal.ITooltipWrapper} tooltip 
 * @param {Internal.BlockAccessor} accessor 
 * @param {Internal.IPluginConfig} config 
 */
global.collapseTooltip = (tooltip, accessor, config) => {
	let { blockState } = accessor;

	if (blockState.block.arch$holder()["containsTag(net.minecraft.tags.TagKey)"](TFCBlockTags.CAN_COLLAPSE)) {
		let { level, position } = accessor;

		let recipe = CollapseRecipe.getRecipe(level, new BlockInventory(position, blockState));
		if (recipe) {
			tooltip.add(Text.translatable('jade.tooltip.kubejs.collapses_into', recipe.getBlockCraftingResult(blockState).block.name.italic()));
		}
		
		// TODO: Change Support access to KubeJS TFC accessors in 1.2.0
		if (Support.isSupported(level, position)) {
			tooltip.add(SUPPORTED);
		} else {
			tooltip.add(UNSUPPORTED);
		}
	}

	if (blockState.block.arch$holder()["containsTag(net.minecraft.tags.TagKey)"](TFCBlockTags.CAN_TRIGGER_COLLAPSE)) {
		let { level, position } = accessor;

		let collapseIterator = Support.findUnsupportedPositions(
			level,
			position.offset(-4 , -2, -4),
			position.offset(4, 2, 4)
		).iterator();

		if (global.mayTriggerCollapse(collapseIterator, level)) {
			tooltip.add(MAY_TRIGGER_COLLAPSE);
		} else {
			tooltip.add(WILL_NOT_TRIGGER_COLLAPSE);
		}
	}
}

/**
 * @param {Internal.Iterator<BlockPos>} posIterator 
 * @param {Internal.Level} level
 * @returns {boolean} 
 */
global.mayTriggerCollapse = (posIterator, level) => {
	let value = false;
	while (!value && posIterator.hasNext()) {
		if (TFC.misc.canStartCollapse(level, posIterator.next())) {
			value = true;
		}
	}
	return value;
}

const SUPPORT = Text.translatable('jade.tooltip.kubejs.support').gray();

/**
 * @param {Internal.ITooltipWrapper} tooltip 
 * @param {Internal.BlockAccessor} accessor 
 * @param {Internal.IPluginConfig} config 
 */
global.supportTooltip = (tooltip, accessor, config) => {
	let { blockState } = accessor;

	let support = Support.get(blockState);

	if (support) {
		tooltip.add(SUPPORT);
		tooltip.add(Text.translatable('jade.tooltip.kubejs.horizontal_support', support.supportHorizontal).gray().italic());
		tooltip.add(Text.translatable('jade.tooltip.kubejs.up_support', support.supportUp).gray().italic());
		tooltip.add(Text.translatable('jade.tooltip.kubejs.down_support', support.supportDown).gray().italic());
	}
}