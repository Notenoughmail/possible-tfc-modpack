//priority 0

const CharcoalForgeBlock = java("net.dries007.tfc.common.blocks.devices.CharcoalForgeBlock");
const CharcoalForge = java("net.dries007.tfc.common.blockentities.CharcoalForgeBlockEntity");

// Loot tables do not work for this
onEvent('block.break', e => {
	if (!e.player.isCreativeMode() && e.block.id === 'tfc:calcite' && !e.level.minecraftLevel.isClientSide()) {
		let item_entity = e.level.createEntity('minecraft:item');
		let level_random = e.level.minecraftLevel.random;
		item_entity.setItem('tfc:calcite');
		item_entity.setDefaultPickupDelay();
		item_entity.setPosition(e.block.x + 0.1 + level_random.nextFloat() * 0.8, e.block.y + level_random.nextFloat() * 0.8, e.block.z + 0.1 + level_random.nextFloat() * 0.8);
		// I can't be bothered to open Intellij to see what the default values are, these look good
		item_entity.setMotion((level_random.nextFloat() - 0.5) * 0.1, level_random.nextFloat() * 0.25, (level_random.nextFloat() - 0.5) * 0.1);
		e.level.minecraftLevel.addFreshEntity(item_entity.minecraftEntity);
	}
})

onEvent('block.right_click', e => {
	let player_js = e.entity;
	if (player_js == null) { return; }
	let mc_player = player_js.minecraftPlayer;
	let block_js = e.block;
	let pos = block_js.pos;
	let level = block_js.minecraftLevel;
	let item_js = e.item;
	let level_js = block_js.level;
	let mc_level = level_js.minecraftLevel;

	if (player_js.isFake() && item_js.hasTag('tfc:starts_fires_with_durability')) {
		if (block_js.id === 'create:fluid_tank' && CharcoalForgeBlock.isValid(level, pos.below())) {
			item_js.itemStack.hurtAndBreak(1, mc_player, p => p.broadcastBreakEvent(e.hand));
			let be = level.getBlockEntity(pos.below());
			if (be instanceof CharcoalForge) {
				be.light(level.getBlockState(pos.below()))
			}
		} else if (block_js.id === 'tfc:charcoal_forge' && CharcoalForgeBlock.isValid(level, pos)) {
			item_js.itemStack.hurtAndBreak(1, mc_player, p => p.broadcastBreakEvent(e.hand));
			let be = level.getBlockEntity(pos);
			if (be instanceof CharcoalForge) {
				be.light(level.getBlockState(pos));
			}
		}
	}

	if (block_js.hasTag('tfc:barrels') && item_js.id === 'create:wrench' && player_js.isCrouching()) {
		let properties = block_js.getProperties();
		if (properties['rack'] === 'true' && properties['sealed'] === 'true') {
			let be = block_js.entity;
			level.setBlock(pos.immutable(), Block.getBlock('tfc:barrel_rack').defaultBlockState(), 2);
			let entities = level_js.getEntitiesWithin(AABB.ofBlock(pos.immutable()));
			let rack_age = 10;
			let entity_num = 0;
			for (let i = 0 ; i < entities.size() ; i++) {
				let entity = entities.get(i);
				try {
					if (entity.item.id === 'tfc:barrel_rack') {
						rack_age = entity.age;
						entity_num = i;
					}
				} catch (ignored) {}
			}
			if (rack_age < 0.1) {
				entities.get(entity_num).kill();
				player_js.give(Item.of(block_js.id, {BlockEntityTag: be.serializeNBT()}));
				e.player.swingArm(e.hand); // e.player gives the ServerPlayerJS which has this method
				mc_level.playSound(null, pos, 'minecraft:block.wood.break', 'blocks', 0.8, 0.8);
			}
		}
	}
})