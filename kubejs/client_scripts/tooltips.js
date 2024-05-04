// priority: 0

const Block = Java.loadClass("net.minecraft.world.level.block.Block");
const TFCBlockTags = Java.loadClass("net.dries007.tfc.common.TFCTags$Blocks");
const Support = Java.loadClass("net.dries007.tfc.util.Support");
const BlockInventory = Java.loadClass("net.dries007.tfc.common.recipes.inventory.BlockInventory");
const CollapseRecipe = Java.loadClass("net.dries007.tfc.common.recipes.CollapseRecipe");
const VesselLike = Java.loadClass("net.dries007.tfc.common.capabilities.VesselLike");
const VesselMode = Java.loadClass("net.dries007.tfc.common.capabilities.VesselLike$Mode");
const VesselCachedRecipe = Java.loadClass("net.dries007.tfc.common.items.VesselItem$VesselCapability").__javaObject__.getDeclaredField("cachedRecipes");
VesselCachedRecipe.setAccessible(true);
const Integer = Java.loadClass("java.lang.Integer");
const Alloy = Java.loadClass("net.dries007.tfc.util.Alloy");

const THERMO = Text.translate('tooltip.kubejs.thermometer');
const HEATS_TO = Text.translatable('kubejs.tooltip.heats_to').gray();

ItemEvents.tooltip(tip => {
	tip.addAdvanced(Ingredient.all, (item, advanced, text) => {
		if (tip.alt && item.nbt && global.clientConfig.debug.enabled.get()) {
			text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)));
		}
	});

	tip.add('kubejs:thermometer', THERMO);

	tip.addAdvanced('#tfc:fired_vessels', (item, advanced, text) => {
		let fluids = [];
		let items = [];
		let vessel = VesselLike.get(item);
		if (vessel != null && vessel.mode() == VesselMode.INVENTORY) {
			let cache = VesselCachedRecipe.get(vessel);
			for (let i = 0 ; i < 4 ; i++) {
				let count = vessel.getStackInSlot(i).count;
				let recipe = cache[i];
				if (recipe != null) {
					let recipeItemResult = recipe.getResultItem(null);
					if (!recipeItemResult.empty) {
						let preexistingItem = false;
						let index = 0;
						items.forEach(obj => {
							if (obj.item == recipeItemResult.item || preexistingItem) {
								preexistingItem = true;
							} else {
								index++;
							}
						});
						if (preexistingItem) {
							let value = items[index];
							items[index] = {
								item: value.item,
								count: (value.count + (recipeItemResult.count * count * recipe.chance))
							}
						} else {
							items.push({
								item: recipeItemResult.item,
								count: (recipeItemResult.count * count * recipe.chance)
							});
						}
					}
					let recipeFluidResult = recipe.displayOutputFluid;
					if (!recipeFluidResult.empty) {
						let preexistingFluid = false;
						let index = 0;
						fluids.forEach(obj => {
							if (obj.fluid == recipeFluidResult.fluid || preexistingFluid) {
								preexistingFluid = true;
							} else {
								index++;
							}
						});
						if (preexistingFluid) {
							let value = fluids[index];
							fluids[index] = {
								fluid: value.fluid,
								amount: (value.amount + (recipeFluidResult.amount * count))
							}
						} else {
							fluids.push({
								fluid: recipeFluidResult.fluid,
								amount: (recipeFluidResult.amount * count)
							});
						}
					}
				}
			}
		}
		if (fluids.length > 0 || items.length > 0) {
			text.add(HEATS_TO);
			fluids.forEach(obj => {
				let metal = TFC.misc.getMetal(obj.fluid);
				if (metal != null) {
					text.add(Text.translatable('kubejs.tooltip.heats_to_liquid', Text.literal(Integer['valueOf(int)'](obj.amount).toString()).aqua(), metal.displayName.copy().gold().italic()).gray());
				}
			});
			if (fluids.length > 1) {
				let alloy = new Alloy();
				fluids.forEach(obj => {
					let metal = TFC.misc.getMetal(obj.fluid);
					if (metal != null) {
						alloy.add(metal, obj.amount, false);
					}
				});
				text.add(Text.translatable('kubejs.tooltip.alloys_to', alloy.result.displayName.copy().gold().italic()).gray());
			}
			items.forEach(obj => {
				text.add(Text.translatable('kubejs.tooltip.heats_to_item', Text.literal(Integer['valueOf(int)'](obj.count).toString()).aqua(), obj.item.description.copy().gold().italic()).gray());
			});
		}
	});
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