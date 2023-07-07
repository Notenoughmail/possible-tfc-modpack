//priority 0

const CharcoalForgeBlock = java("net.dries007.tfc.common.blocks.devices.CharcoalForgeBlock");
const CharcoalForge = java("net.dries007.tfc.common.blockentities.CharcoalForgeBlockEntity");

console.info('I have no idea what I am doing, but it somehow works')

// Loot tables do not work for this
onEvent('block.break', e => {
	if (!e.player.isCreativeMode() && e.block.id === 'tfc:calcite') {
		let item_entity = e.level.createEntity('minecraft:item');
		let level_random = e.level.minecraftLevel.random;
		item_entity.setItem('tfc:calcite');
		item_entity.setDefaultPickupDelay();
		item_entity.setPosition(e.block.x + 0.1 + level_random.nextFloat() * 0.8, e.block.y + level_random.nextFloat() * 0.8, e.block.z + 0.1 + level_random.nextFloat() * 0.8);
		// I can't be bothered to open Intellij to see what the default values are, these look good
		item_entity.setMotion((level_random.nextFloat() - 0.5) * 0.1, level_random.nextFloat() * 0.25, (level_random.nextFloat() - 0.5) * 0.1);
		e.level.minecraftLevel.addFreshEntity(item_entity.minecraftEntity);
	}
});

onEvent('block.right_click', e => {
	let pos = e.block.pos;
	let level = e.block.minecraftLevel;

	if (e.entity.isFake() && e.item.hasTag('tfc:starts_fires_with_durability')) {
		if (e.block.id === 'create:fluid_tank' && CharcoalForgeBlock.isValid(level, pos.below())) {
			e.item.itemStack.hurtAndBreak(1, e.entity.minecraftPlayer, p => p.broadcastBreakEvent(e.hand));
			let be = level.getBlockEntity(pos.below());
			if (be instanceof CharcoalForge) {
				be.light(level.getBlockState(pos.below()))
			}
		} else if (e.block.id === 'tfc:charcoal_forge' && CharcoalForgeBlock.isValid(level, pos)) {
			e.item.itemStack.hurtAndBreak(1, e.entity.minecraftPlayer, p => p.broadcastBreakEvent(e.hand));
			let be = level.getBlockEntity(pos);
			if (be instanceof CharcoalForge) {
				be.light(level.getBlockState(pos));
			}
		}
	}
})