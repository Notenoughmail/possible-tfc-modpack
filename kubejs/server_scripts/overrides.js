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
	let playerJS = e.entity;
	if (playerJS == null) { return; }
	let mc_player = playerJS.minecraftPlayer;
	let blockJS = e.block;
	let pos = blockJS.pos;
	let level = blockJS.minecraftLevel;
	let itemJS = e.item;
	let levelJS = blockJS.level;

	if (playerJS.isFake() && itemJS.hasTag('tfc:starts_fires_with_durability')) {
		if (blockJS.id === 'create:fluid_tank' && CharcoalForgeBlock.isValid(level, pos.below())) {
			itemJS.itemStack.hurtAndBreak(1, mc_player, p => p.broadcastBreakEvent(e.hand));
			let be = level.getBlockEntity(pos.below());
			if (be instanceof CharcoalForge) {
				be.light(level.getBlockState(pos.below()))
			}
		} else if (blockJS.id === 'tfc:charcoal_forge' && CharcoalForgeBlock.isValid(level, pos)) {
			itemJS.itemStack.hurtAndBreak(1, mc_player, p => p.broadcastBreakEvent(e.hand));
			let be = level.getBlockEntity(pos);
			if (be instanceof CharcoalForge) {
				be.light(level.getBlockState(pos));
			}
		}
	}

	if (blockJS.hasTag('tfc:barrels') && itemJS.id === 'create:wrench' && playerJS.isCrouching()) {
		let properties = blockJS.getProperties();
		if (properties['rack'] === 'true' && properties['sealed'] === 'true') {
			let be = blockJS.entity;
			level.setBlock(pos.immutable(), Block.getBlock('tfc:barrel_rack').defaultBlockState(), 2);
			let entities = levelJS.getEntitiesWithin(AABB.ofBlock(pos.immutable()));
			let rack_age = 10;
			let entity_num = 0;
			for (let i = 0 ; i < entities.size() ; i++) {
				let entity = entities.get(i);
				if (entity.item !== null && entity.item.id === 'tfc:barrel_rack' && entity.age < 0.1) {
					rack_age = entity.age;
					entity_num = i;
				}
			}
			if (rack_age < 0.1) {
				entities.get(entity_num).kill();
				playerJS.give(Item.of(blockJS.id, {BlockEntityTag: be.serializeNBT()}));
				e.player.swingArm(e.hand); // e.player gives the ServerPlayerJS which has this method
				level.playSound(null, pos, 'minecraft:block.wood.break', 'blocks', 1.0, 1.0);
			}
		}
	}

	if (blockJS.id === 'create:andesite_casing' && itemJS.hasTag('railways:conductor_caps')) {
		e.cancel();
	}
})

onEvent('player.tick', e => {
	if (e.level.time % 20 < 1) {
		let i = 0;
		e.player.inventory.minecraftInventory.forEach(stack => {
			if (stack.item.id === 'kubejs:uranium_block') {
				i += stack.count;
			} else if (stack.item.id === 'immersiveengineering:ingot_uranium') {
				i += stack.count / 4;
			} else if (stack.item.id === 'immersiveposts:stick_uranium') {
				i += stack.count / 8;
			}
		})
		if (i > 0) {
			e.player.attack('wither', i * e.level.minecraftLevel.random.nextFloat());
		}
	}
})