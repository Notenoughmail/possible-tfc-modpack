const BlockItem = Java.loadClass("net.minecraft.world.item.BlockItem");
const CharcoalForgeBlock = Java.loadClass("net.dries007.tfc.common.blocks.devices.CharcoalForgeBlock");
const CharcoalForge = Java.loadClass("net.dries007.tfc.common.blockentities.CharcoalForgeBlockEntity");
const FluidHelpers = Java.loadClass("net.dries007.tfc.common.fluids.FluidHelpers");

// TODO: port event handlers to 1.20 syntax

// Loot tables do not work for this
BlockEvents.broken(e => {
})

BlockEvents.rightClicked(e => {
	let { player, block, item, hand } = e;
	let { level, pos, entity, properties } = block;

	if (player.fake && item.hasTag('tfc:starts_fires_with_durability')) {
		if (block.id == 'tfc:charcoal_forge' && CharcoalForgeBlock.isValid(level, pos)) {
			item.hurtAndBreak(1, player, p => p.broadcastBreakEvent(hand));
			if (entity instanceof CharcoalForge) {
				entity.light(level.getBlockState(pos));
			}
		}
	}

	if (block.hasTag('kubejs:vertical_support') && item.hasTag('tfc:support_beams')) {
		if (!level.clientSide && hand.name() == 'MAIN_HAND' && player.crouching) {
			for (let i = 1 ; i < 4 ; i++) {
				let above = block.offset(0, i, 0);
				let item0 = item.item;
				if (above.blockState.canBeReplaced() && item0 instanceof BlockItem) {
					let placeState = FluidHelpers.fillWithFluid(item0.block.defaultBlockState(), level.getFluidState(above.pos).type);
					if (placeState) {
						level.setBlockAndUpdate(above.pos, placeState);
						if (!player.creative) {
							item.shrink(1);
						}
						player.swing(hand);
						level.playSound(null, above.x, above.y, above.z, item0.block.getSoundType(placeState, level, above.pos, player).placeSound, 'blocks', 1.0, 1.0);
						e.cancel();
					}
				}
			}
		}
	}
})

PlayerEvents.loggedIn(e => {
	let data = e.player.persistentData;
	if (data.contains('rocketIds')) {
		data.remove('rocketIds');
	}
})