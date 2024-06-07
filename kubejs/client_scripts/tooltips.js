// priority: 0

const Block = Java.loadClass("net.minecraft.world.level.block.Block");
const TFCBlockTags = Java.loadClass("net.dries007.tfc.common.TFCTags$Blocks");
const BlockInventory = Java.loadClass("net.dries007.tfc.common.recipes.inventory.BlockInventory");
const CollapseRecipe = Java.loadClass("net.dries007.tfc.common.recipes.CollapseRecipe");
const VesselLike = Java.loadClass("net.dries007.tfc.common.capabilities.VesselLike");
const VesselMode = Java.loadClass("net.dries007.tfc.common.capabilities.VesselLike$Mode");
const VesselCachedRecipe = Java.loadClass("net.dries007.tfc.common.items.VesselItem$VesselCapability").__javaObject__.getDeclaredField("cachedRecipes");
VesselCachedRecipe.setAccessible(true);
const Integer = Java.loadClass("java.lang.Integer");
const Alloy = Java.loadClass("net.dries007.tfc.util.Alloy");
const CanoeComponentBlock = Java.loadClass('com.alekiponi.firmaciv.common.block.CanoeComponentBlock');
const CanoeComponentBlockEntity = Java.loadClass('com.alekiponi.firmaciv.common.blockentity.CanoeComponentBlockEntity');
const BasicBlockJS$WithEntity = Java.loadClass('dev.latvian.mods.kubejs.block.custom.BasicBlockJS$WithEntity');

const THERMO = Text.translate('tooltip.kubejs.thermometer');
const HEATS_TO = Text.translatable('tooltip.kubejs.heats_to').gray();
const GROWS_IN = Text.translatable('tooltip.kubejs.grows_in').gray();

ItemEvents.tooltip(tip => {
	tip.addAdvanced(Ingredient.all, (item, advanced, text) => {
		if (tip.alt && item.nbt && global.clientConfig.debug.enabled.get()) {
			text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)));
		}
	});

	tip.add('kubejs:thermometer', THERMO);

	tip.addAdvanced('#tfc:fired_vessels', (item, advanced, text) => {
		let fluids = {};
		let items = {};
		let vessel = VesselLike.get(item);
		if (vessel != null && vessel.mode() == VesselMode.INVENTORY) {
			let cache = VesselCachedRecipe.get(vessel);
			for (let i = 0 ; i < 4 ; i++) {
				let recipe = cache[i];
				if (recipe != null) {
					let count = vessel.getStackInSlot(i).count;
					let recipeItemResult = recipe.getResultItem(null);
					if (!recipeItemResult.empty) {
						let old = items[recipeItemResult.item];
						if (old != null && old != undefined) {
							old.grow(recipeItemResult.count * count * recipe.chance);
							items[old.item] = old;
						} else {
							items[recipeItemResult.item] = Item.of(recipeItemResult, recipeItemResult.count * count * recipe.chance);
						}
					}
					let recipeFluidResult = recipe.displayOutputFluid;
					if (!recipeFluidResult.empty) {
						let old = fluids[recipeFluidResult.fluid];
						if (old != null && old != undefined) {
							old.grow(recipeFluidResult.amount * count);
							fluids[old.fluid] = old;
						} else {
							fluids[recipeFluidResult.fluid] = Fluid.of(recipeFluidResult.fluid, recipeFluidResult.amount * count).fluidStack;
						}
					}
				}
			}
		}
		let fluidLength = Object.keys(fluids).length;
		if (fluidLength > 0 || Object.keys(items).length > 0) {
			text.add(HEATS_TO);
			let amount = 0;
			let alloy = null;
			if (fluidLength > 1) {
				alloy = new Alloy();
			}
			for (let ref in fluids) {
				amount += fluids[ref].amount;
				let metal = TFC.misc.getMetal(fluids[ref].fluid);
				if (metal != null) {
					text.add(Text.translatable('tooltip.kubejs.heats_to.liquid', Text.aqua(Integer['valueOf(int)'](fluids[ref].amount).toString()), metal.displayName.copy().gold().italic()).gray());
					if (alloy != null && alloy != undefined) {
						alloy.add(metal, fluids[ref].amount, false);
					}
				}
			}
			if (fluidLength > 1) {
				text.add(Text.translatable('tooltip.kubejs.alloys_to', alloy.result.displayName.copy().gold().italic()).gray());
				text.add(Text.translatable('tooltip.kubejs.total_fluid', Text.aqua(Integer['valueOf(int)'](amount).toString())).gray());
			}
			for (let ref in items) {
				text.add(Text.translatable('tooltip.kubejs.heats_to.item', Text.aqua(Integer['valueOf(int)'](items[ref].count).toString()), items[ref].hoverName.copy().gold().italic()).gray())
			}
		}
	});

	global.crops.forEach(crop => {
		tip.addAdvanced(`${crop.mod}:seeds/${crop.name}`, (item, advanced, text) => {
			text.add(GROWS_IN);
			text.add(Text.translatable('tooltip.kubejs.grows_in.temp', Text.green(Integer['valueOf(int)'](crop.minT).toString()), Text.green(Integer['valueOf(int)'](crop.maxT).toString())).gray());
			text.add(Text.translatable('tooltip.kubejs.grows_in.hydration', Text.blue(Integer['valueOf(int)'](crop.minH).toString()), Text.blue(Integer['valueOf(int)'](crop.maxH).toString())).gray());
		});
	});

	global.plants.forEach(plant => {
		tip.addAdvanced(`${plant.mod}:plant/${plant.name}`, (item, advanced, text) => {
			text.add(GROWS_IN);
			text.add(Text.translatable('tooltip.kubejs.grows_in.temp', Text.green(Integer['valueOf(int)'](plant.minT).toString()), Text.green(Integer['valueOf(int)'](plant.maxT).toString())).gray());
			text.add(Text.translatable('tooltip.kubejs.grows_in.hydration', Text.blue(Integer['valueOf(int)'](plant.minH).toString()), Text.blue(Integer['valueOf(int)'](plant.maxH).toString())).gray());
		});
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
	e.block('kubejs:firmaciv/canoe_time', CanoeComponentBlock)
		.tooltip((tooltip, accessor, config) => global.canoeTimeLeft(tooltip, accessor, config));
	e.block('kubejs:jade_data', BasicBlockJS$WithEntity)
		.tooltip((tooltip, accessor, config) => global.jadeDataReceiver(tooltip, accessor, config));
})

/**
 * @param {Internal.ITooltipWrapper} tooltip 
 * @param {Internal.BlockAccessor} accessor 
 * @param {Internal.IPluginConfig} config 
 */
global.collapseTooltip = (tooltip, accessor, config) => {
	let { blockState } = accessor;

	if (blockState.block.arch$holder()["containsTag(net.minecraft.tags.TagKey)"](TFCBlockTags.CAN_COLLAPSE) || blockState.block.arch$holder()["containsTag(net.minecraft.tags.TagKey)"](TFCBlockTags.CAN_LANDSLIDE)) {
		let { level, position } = accessor;

		let recipe = CollapseRecipe.getRecipe(level, new BlockInventory(position, blockState));
		if (recipe) {
			tooltip.add(Text.translatable('jade.tooltip.kubejs.collapses_into', recipe.getBlockCraftingResult(blockState).block.name.italic()));
		}
		
		if (TFC.misc.isSupported(level, position)) {
			tooltip.add(SUPPORTED);
		} else {
			tooltip.add(UNSUPPORTED);
		}
	}

	if (blockState.block.arch$holder()["containsTag(net.minecraft.tags.TagKey)"](TFCBlockTags.CAN_TRIGGER_COLLAPSE)) {
		let { level, position } = accessor;

		let collapseIterator = TFC.misc.findUnsupportedPositions(
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

	let support = TFC.misc.getSupport(blockState);

	if (support) {
		tooltip.add(SUPPORT);
		tooltip.add(Text.translatable('jade.tooltip.kubejs.horizontal_support', support.supportHorizontal).gray().italic());
		tooltip.add(Text.translatable('jade.tooltip.kubejs.up_support', support.supportUp).gray().italic());
		tooltip.add(Text.translatable('jade.tooltip.kubejs.down_support', support.supportDown).gray().italic());
	}
}

/**
 * @param {Internal.ITooltipWrapper} tooltip 
 * @param {Internal.BlockAccessor} accessor 
 * @param {Internal.IPluginConfig} config 
 */
global.canoeTimeLeft = (tooltip, accessor, config) => {
	let { level, blockEntity, blockState } = accessor;
	if (blockState.getValue(CanoeComponentBlock.CANOE_CARVED) > 11 && blockEntity instanceof CanoeComponentBlockEntity) {
		tooltip.add(Text.translatable('tfc.jade.time_left', TFC.calendar.getCalendar(level).getTimeDelta(blockEntity.ticksLeft)));
	}
}

/**
 * @param {Internal.ITooltipWrapper} tooltip 
 * @param {Internal.BlockAccessor} accessor 
 * @param {Internal.IPluginConfig} config 
 */
global.jadeDataReceiver = (tooltip, accessor, config) => {
	let { blockEntity, serverData } = accessor;
	let { elementHelper } = tooltip;
	if (serverData != null) {
		if (serverData.contains('kube_inv')) {
			let { inventory } = blockEntity;
			inventory.readAttachment(serverData.get('kube_inv'));
			let stacks = {};
			inventory.allItems.forEach(stack => {
				let old = stacks[stack.item];
				if (old != null && old != undefined) {
					old.grow(stack.count);
					stacks[stack.item] = old;
				} else {
					stacks[stack.item] = stack;
				}
			});
	
			for (var ref in stacks) {
				tooltip.addElements([
					elementHelper.smallItem(stacks[ref].item).clearCachedMessage(),
					elementHelper.text(Text.translatable('jade.tooltip.kubejs.item_count', Integer['valueOf(int)'](stacks[ref].count), stacks[ref].hoverName))
				])
			}
		}
	}
}