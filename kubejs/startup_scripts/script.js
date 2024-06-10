// priority: 0

const IntTag = Java.loadClass('net.minecraft.nbt.IntTag');
const HarvestToolProvider = Java.loadClass('snownee.jade.addon.harvest.HarvestToolProvider');
const SimpleToolHandler = Java.loadClass('snownee.jade.addon.harvest.SimpleToolHandler');
const TFCBlockTags = Java.loadClass('net.dries007.tfc.common.TFCTags$Blocks');
const TFCMultiBlock = Java.loadClass('net.dries007.tfc.util.MultiBlock');
const CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag');
const Fuel = Java.loadClass('net.dries007.tfc.util.Fuel');
const BlockClass = Java.loadClass("net.minecraft.world.level.block.Block");

StartupEvents.registry('item', e => {

	e.create('pouch');
	e.create('thermometer')
		.unstackable()
		.tag('curios:thermometer');
	e.create('iron_belt_clip');
	e.create('lithium_ingot');
	e.create('lithium_plate');
	e.create('graphite_plate');
	e.create('lithium_salt_clump')
		.tag('kubejs:ore/lithium');
	e.create('sheet_mold');
	e.create('rod_mold');
})

StartupEvents.registry('block', e => {

	e.create('lithium_salt', 'tfc:dirt')
		.grass(grass => {
			grass.hardness(0.9);
			grass.gravelSoundType();
			grass.tagBlock('minecraft:mineable/shovel');
			grass.tagBlock('tfc:can_landslide');
			grass.displayName('Lithium Salt Grass');
			grass.tagBlock('forge:ores');
			grass.tagItem('kubejs:ore/lithium');
		})
		.hardness(0.9)
		.tagBlock('minecraft:mineable/shovel')
		.tagBlock('tfc:can_landslide')
		.tagBlock('forge:ores')
		.tagItem('kubejs:ore/lithium')
		.gravelSoundType()
		.displayName('Lithium Salt Soil');

	TFC.misc.wood.keySet().forEach(wood => {
		e.create(`panel/${wood}`, 'cardinal')
			.woodSoundType()
			.tagBlock('minecraft:mineable/axe')
			.displayName(`${Utils.toTitleCase(wood)} Panel`)
			.box(0, 0, 0, 16, 16, 2)
			.box(0, 0, 0, 3, 16, 3)
			.box(13, 0, 0, 16, 16, 3)
			.waterlogged();
	});

	e.create('rocket_engine')
		.rightClick(click => global.clickRocketEngine(click))
		.box(0, 11, 0, 16, 16, 16)
		.box(3, 9, 3, 13, 11, 13)
		.box(3, 6, 3, 13, 9, 13)
		.box(2, 4, 2, 14, 6, 14)
		.box(1, 2, 1, 15, 4, 15)
		.box(0, 0, 0, 16, 2, 16)
		.soundType('metal')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_diamond_tool')
		.requiresTool();

	e.create('rocket_scaffolding')
		.property(BlockProperties.AXIS)
		.placementState(place => {
			place.setValue(BlockProperties.AXIS, place.clickedFace.axis);
		})
		.soundType('metal')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.requiresTool()
		.waterlogged()
		.defaultCutout();

	e.create('rocket_payload')
		.soundType('metal')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.requiresTool()

	e.create('rocket_avionics')
		.soundType('metal')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.requiresTool();

	e.create('rocket_panelling', 'cardinal')
		.soundType('metal')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.requiresTool()
		.box(0, 0, 15, 16, 16, 16);

	e.create('glass_slab', 'slab')
		.soundType('glass')
		.waterlogged()
		.requiresTool()
		.defaultCutout()
		.tagBlock('tfc:mineable_with_glass_saw')
		.textureAll('minecraft:block/glass');
	
	global.colors.forEach(color => {
		e.create(`${color}_stained_glass_slab`, 'slab')
			.soundType('glass')
			.waterlogged()
			.requiresTool()
			.defaultTranslucent()
			.tagBlock('tfc:mineable_with_glass_saw')
			.textureAll(`minecraft:block/${color}_stained_glass`);
	});

	e.create('solar_panel')
		.blockEntity(info => {
			info.serverTick(be => global.solarTick(be));
		})
		.box(6, 0, 6, 10, 3, 10)
		.box(1, 3, 1, 15, 5, 15)
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.requiresTool()
		.soundType('glass')
		.waterlogged();

	e.create('generator')
		.blockEntity(info => {
			info.inventory(9, 1, '#kubejs:generator_fuels');
			info.attachCapability(
				CapabilityBuilder.ITEM.blockEntity()
					.availableOn((be, dir) => dir != Direction.UP)
					.extractItem((be, slot, amount, simulate) => be.inventory.extractItem(slot, amount, simulate))
					.insertItem((be, slot, stack, simulate) => be.inventory.insertItem(slot, stack, simulate))
					.getSlotLimit((be, slot) => be.inventory.getSlotLimit(slot))
					.getSlots(be => be.inventory.slots)
					.getStackInSlot((be, slot) => be.inventory.getStackInSlot(slot))
					.isItemValid((be, slot, stack) => be.inventory.isItemValid(slot, stack))
			);
			info.attachCapability(
				CapabilityBuilder.ENERGY.customBlockEntity()
					.availableOn((be, dir) => dir != Direction.UP)
					.canExtract(be => be.data.stored > 0)
					.canReceive(be => false)
					.getEnergyStored(be => be.data.stored)
					.getMaxEnergyStored(be => be.data.max)
					.withCapacity(15000)
					.extractEnergy((be, amount, simulate) => {
						let { stored } = be.data;
						let remaining = stored - amount;
						if (remaining < 0) {
							if (!simulate) {
								be.data.putInt('stored', 0)
							}
							return stored;
						} else {
							if (!simulate) {
								be.data.putInt('stored', remaining);
							}
							return amount;
						}
					})
					.receiveEnergy((be, amount, simulate) => 0)
			);
			info.serverTick(be => global.generatorTick(be));
			info.rightClickOpensInventory();
			info.enableSync();
			info.initialData(initialStored(15000))
		})
		.box(0, 0, 0, 16, 12, 16)
		.box(0, 12, 4, 16, 14, 12)
		.box(4, 12, 0, 12, 14, 4)
		.box(4, 12, 12, 12, 14, 16)
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.requiresTool()
		.soundType('metal');

	e.create('rtg')
		.box(2, 0, 2, 14, 16, 14)
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.requiresTool()
		.soundType('metal')
		.waterlogged()
		.displayName('RTG')
		.model('ae2:block/crystal_resonance_generator')
		.blockEntity(info => {
			info.initialData({
				quantity: 1
			});
			info.serverTick(be => global.rtgTick(be));
			info.enableSync();
		});

	e.create('electronics_assembler')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.requiresTool()
		.soundType('metal')
		.blockEntity(info => {
			info.serverTick(be => global.electronicsAssemblerTick(be));
			info.inventory(9, 1, '#kubejs:allowed_in_electronics_assembler');
			info.attachCapability(
				CapabilityBuilder.ITEM.blockEntity()
					.availableOn((be, dir) => true)
					.extractItem((be, slot, amount, simulate) => be.inventory.extractItem(slot, amount, simulate))
					.insertItem((be, slot, stack, simulate) => be.inventory.insertItem(slot, stack, simulate))
					.getSlotLimit((be, slot) => be.inventory.getSlotLimit(slot))
					.getSlots(be => be.inventory.slots)
					.getStackInSlot((be, slot) => be.inventory.getStackInSlot(slot))
					.isItemValid((be, slot, stack) => be.inventory.isItemValid(slot, stack))
			);
			info.attachCapability(
				CapabilityBuilder.ENERGY.customBlockEntity()
					.availableOn((be, dir) => true)
					.canExtract(be => false)
					.canReceive(be => be.data.stored < be.data.max)
					.getEnergyStored(be => be.data.stored)
					.getMaxEnergyStored(be => be.data.max)
					.withCapacity(50000)
					.extractEnergy((be, amount, simulate) => 0)
					.receiveEnergy((be, amount, simulate) => {
						let { stored, max } = be.data;
						let after = stored + amount;
						if (after > max) {
							if (!simulate) {
								data.putInt('stored', max);
							}
							return max - stored;
						} else {
							if (!simulate) {
								data.putInt('stored', after);
							}
							return amount;
						}
					})
			);
			info.rightClickOpensInventory();
			info.initialData(initialStored(50000));
		});
})

function initialStored(max) {
	return maxAndStored(max, 0);
}

function maxAndStored(max, stored) {
	let tag = new CompoundTag()
	tag.putInt('max', max);
	tag.putInt('stored', stored)
	return tag;
}

StartupEvents.registry('fluid', e => {
	e.create('unrefined_redstone')
		.noBlock()
		.noBucket()
		.thickTexture(0x9f0a2a)
		.displayName('Molten Redstone')
		.tag('tfc:molten_metals')
		.tag('kubejs:unrefined_redstone');
	e.create('refined_redstone')
		.noBlock()
		.noBucket()
		.thinTexture(0x9f0a2a)
		.displayName('Molten Redstone Mixture')
		.tag('tfc:molten_metals')
		.tag('kubejs:refined_redstone');
	e.create('redstone_alloy')
		.noBlock()
		.noBucket()
		.thinTexture(0x7c262e)
		.displayName('Molten Redstone Alloy')
		.tag('tfc:molten_metals')
		.tag('kubejs:redstone_alloy');
	e.create('graphite')
		.thickTexture(0x101010)
		.displayName('Molten Refined Graphite')
		.noBlock()
		.noBucket()
		.tag('tfc:molten_metals')
		.tag('kubejs:graphite');
	e.create('unrefined_graphite')
		.thickTexture(0x080a08)
		.displayName('Molten unrefined Graphite')
		.noBlock()
		.noBucket()
		.tag('tfc:molten_metals')
		.tag('kubejs:unrefined_graphite');
	e.create('solar_paste')
		.thickTexture(0x455bd9)
		.displayName('Solar Paste')
		.noBlock()
		.noBucket()
		.tag('tfc:molten_metals')
		.tag('tfc:usable_in_jug')
		.tag('tfc:usable_in_ingot_mold')
		.tag('kubejs:solar_paste');
})

StartupEvents.registry('sound_event', e => {
	e.create('rocket')/*
		.sound(entry => {
			entry.subtitle('subtitle.kubejs.rocket');
			entry.sounds('kubejs:rocket')
		})
	*/;
})

StartupEvents.registry('entity_type', e => {
	global.rocketTypeSupplier = e.create('rocket', 'entityjs:living')
		.sized(1.5, 5)
		.tick(rocket => global.rocketTick(rocket))
		.onInteract(ctx => global.rocketInteract(ctx))
		.isPushable(false)
		.isInvulnerableTo(ctx => true)
		.render(ctx => true);
})

StartupEvents.registry('particle_type', e => {
	global.rocketPlumeSupplier = e.create('rocket_plume')/*
		.textures(g => {
			g.textures([
				'kubejs:rocket_plume/0',
				'kubejs:rocket_plume/1',
				'kubejs:rocket_plume/2',
				'kubejs:rocket_plume/3',
				'kubejs:rocket_plume/4'
			]);
		})
	*/;
	global.rocketPlumeEjectaSupplier = e.create('rocket_plume_ejecta')/*
		.textures(g => {
			g.textures([
				'kubejs:rocket_plume_ejecta/0',
				'kubejs:rocket_plume_ejecta/1',
				'kubejs:rocket_plume_ejecta/2'
			])
		})
	*/;
})

StartupEvents.postInit(e => {
	HarvestToolProvider.registerHandler(new SimpleToolHandler('gem_saw', TFCBlockTags.MINEABLE_WITH_GLASS_SAW, 'tfc:gem_saw'));
})

/**
 * @param {Internal.LivingEntity} rocket 
 */
global.rocketTick = (rocket) => {
	let ticks = rocket.persistentData.ticks++;
	if (ticks) {
		if (ticks == 65) {
			rocket.addDeltaMovement([0, 0.075, 0]); // TODO: Edit this value and give different impulses at later points
			rocket.setAttributeBaseValue('forge:entity_gravity', -0.025);
		}
		if (ticks > 65) {
			let yMotion = rocket.motionY;
			rocket.level.spawnParticles(
				'kubejs:rocket_plume',
				true,
				rocket.x,
				rocket.y - 0.75,
				rocket.z,
				0,
				(-(yMotion/2) - 0.75),
				0,
				0,
				1
			);
			for (let i = 0 ; i < 3 ; i += 0.15) {
				let radians = Utils.random.nextFloat(0, 2 * JavaMath.PI);
				let sin = JavaMath.sin(radians);
				let cos = JavaMath.cos(radians);
				rocket.level.spawnParticles(
					'kubejs:rocket_plume_ejecta',
					true,
					(rocket.x + (sin * 0.25)),
					(rocket.y - 0.75),
					(rocket.z + (cos * 0.25)),
					(i * sin * 0.0625),
					(-(yMotion/3) - 0.6),
					(i * cos * 0.0625),
					0,
					1
				);
			}
			if (yMotion == rocket.persistentData.yMotion) {
				rocket.persistentData.stuckTicks++;
				if (rocket.persistentData.stuckTicks > 15) {
					rocket.level.createExplosion(rocket.x, rocket.y, rocket.z)
						.causesFire(true)
						.exploder(rocket)
						.explosionMode('block')
						.strength(14)
						.explode();
					rocket.level.players.forEach(player => {
						let { rocketIds } = player.persistentData;
						if (rocketIds) {
							let size = rocketIds.size();
							for (let i = 0 ; i < size ; i++) {
								if (rocketIds.get(i).asInt == rocket.id) {
									player.sendData('rocket_explosion');
									rocketIds.remove(i);
									break;
								}
							}
						}
					});
					rocket.discard();
				}
			} else {
				rocket.persistentData.putDouble('yMotion', yMotion);
				rocket.persistentData.putInt('stuckTicks', 0);
			}
		}
		if (ticks > 900) { // ¾ minute
			rocket.discard();
		}
	}
}

/**
 * @param {Internal.ContextUtils$MobInteractContext} ctx 
 */
global.rocketInteract = (ctx) => {
	let { player, entity, hand } = ctx;
	let { level } = entity;
	let ticks = entity.persistentData.ticks;
	if (!ticks && hand.name() == 'MAIN_HAND' && !level.clientSide) {
		entity.persistentData.putInt('ticks', 0);
		entity.persistentData.putInt('stuckTicks', 0);
		player.tell(Text.translatable('message.kubejs.begin_launch').green().italic());
		player.swing(hand);
		player.sendData('swing'); // To make the client swing their arm
		level.playSound(null, entity.x, entity.y, entity.z, 'kubejs:rocket', 'master', 1, 1);
		let { pos } = entity.block;
		let entities = level.getEntitiesWithin(AABB.ofBlocks(pos.offset(-20, -20, -20), pos.offset(20, 20, 20)));
		entities.forEach(maybePlayer => {
			if (maybePlayer.player) {
				let { persistentData } = maybePlayer;
				if (!persistentData.contains('rocketIds')) {
					persistentData.putIntArray('rocketIds', [entity.id]);
				} else {
					persistentData.get('rocketIds').add(0, IntTag.valueOf(entity.id));
				}
			}
		});
	}
}

// Wrapped in a lazy so blocks can be referenced 'before' they exist
const ROCKET_STRUCTURE = Utils.lazy(() => new TFCMultiBlock()
	.match([0, 0, 0], BlockStatePredicate.fromString('kubejs:rocket_engine'))
	.match([0, 1, 0], BlockStatePredicate.fromString('ae2:sky_stone_tank'))
	.match([0, 2, 0], BlockStatePredicate.fromString('ae2:sky_stone_tank'))
	.match([0, 3, 0], BlockStatePredicate.fromString('kubejs:rocket_avionics'))
	.match([0, 4, 0], BlockStatePredicate.fromString('kubejs:rocket_payload'))
	// TODO: Coverings on side?
);

const SCAFFOLD_STRUCTURE = Utils.lazy(() => new TFCMultiBlock()
	.matchOneOf([0, 0, 0],
		new TFCMultiBlock().matchHorizontal([0, 0, 0],
			new TFCMultiBlock()
				.match([0, 0, 0], BlockStatePredicate.fromString('kubejs:rocket_scaffolding[axis=y]'))
				.match([0, 1, 0], BlockStatePredicate.fromString('kubejs:rocket_scaffolding[axis=y]'))
				.match([0, 2, 0], BlockStatePredicate.fromString('kubejs:rocket_scaffolding[axis=y]'))
				.match([0, 3, 0], BlockStatePredicate.fromString('kubejs:rocket_scaffolding[axis=y]'))
			, 3
		)
	)
);

const ROCKET_FUEL_VALIDATOR = Utils.lazy(() => new TFCMultiBlock()['match(net.minecraft.core.BlockPos,java.util.function.BiPredicate)']([0, 1, 0], (level, pos) => {
		let bottomBE = level.getBlockEntity(pos, Utils.getRegistry('block_entity_type').getValue('ae2:sky_tank')).orElseGet(() => null);
		let topBE = level.getBlockEntity(pos.offset(0, 1, 0), Utils.getRegistry('block_entity_type').getValue('ae2:sky_tank')).orElseGet(() => null);
		if (bottomBE != null && topBE != null) {
			/**
			 * @type {Internal.IFluidTank} bottomTank
			 */
			let bottomTank = bottomBE.storage;
			let bottomFuel = bottomTank.fluid.fluid.arch$registryName();
			/**
			 * @type {Internal.IFluidTank} topTank
			 */
			let topTank = topBE.storage;
			let topFuel = topTank.fluid.fluid.arch$registryName();

			let mixesWith = ROCKET_FUELS[bottomFuel];
			if (mixesWith) {
				let range = mixesWith[topFuel];
				if (range) {
					if (topTank.fluidAmount + bottomTank.fluidAmount >= range.totalMinAmount) {
						let fuelRatio = bottomTank.fluidAmount / topTank.fluidAmount;	
						return fuelRatio > range.min && fuelRatio < range.max;
					}
				}
			} else {
				mixesWith = ROCKET_FUELS[topFuel];
				if (mixesWith) {
					let range = mixesWith[bottomFuel];
					if (range) {
						if (topTank.fluidAmount + bottomTank.fluidAmount >= range.totalMinAmount) {
							let fuelRatio = topTank.fluidAmount / bottomTank.fluidAmount;	
							return fuelRatio > range.min && fuelRatio < range.max;
						}
					}
				}
			}
		}
		return false;
	})
);

const ROCKET_PANELLING = Utils.lazy(() => new TFCMultiBlock()
	.match([1, 1, 0], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=east]'))
	.match([0, 1, 1], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=south]'))
	.match([-1, 1, 0], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=west]'))
	.match([0, 1, -1], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=north]'))
	.match([1, 2, 0], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=east]'))
	.match([0, 2, 1], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=south]'))
	.match([-1, 2, 0], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=west]'))
	.match([0, 2, -1], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=north]'))
	.match([1, 3, 0], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=east]'))
	.match([0, 3, 1], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=south]'))
	.match([-1, 3, 0], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=west]'))
	.match([0, 3, -1], BlockStatePredicate.fromString('kubejs:rocket_panelling[facing=north]'))
);

let rocketPosOffsets = [
	[0, 0, 0],
	[0, 1, 0],
	[0, 2, 0],
	[0, 3, 0],
	[0, 4, 0],
	[1, 1, 0],
	[0, 1, 1],
	[-1, 1, 0],
	[0, 1, -1],
	[1, 2, 0],
	[0, 2, 1],
	[-1, 2, 0],
	[0, 2, -1],
	[1, 3, 0],
	[0, 3, 1],
	[-1, 3, 0],
	[0, 3, -1]
];

const NEED_EMPTY_HAND = Text.translatable('message.kubejs.need_empty_hand').yellow();
const IMPROPER_STRUCTURE = Text.translatable('message.kubejs.improper_rocket_structure').darkRed();
const NO_SCAFFOLD = Text.translatable('message.kubejs.missing_scaffold').color(Color.ORANGE_DYE);
const ASSEMBLY_SUCCESSFUL = Text.translatable('message.kubejs.assembly_successful').green()
const IMPROPER_FUEL_RATIO = Text.translatable('message.kubejs.improper_rocket_fuel_ratio').darkAqua();
const REQUIRES_PANELLING = Text.translatable('message.kubejs.requires_panelling').color(Color.DARK_PURPLE);

/**
 * @param {Internal.BlockRightClickedEventJS} e 
 */
global.clickRocketEngine = (e) => {
	let { player, block, item, hand } = e;
	let { level, pos } = block;
	
	if (item.empty && hand.name() == 'MAIN_HAND') {
		if (ROCKET_STRUCTURE.get().test(level, pos)) {
			if (ROCKET_FUEL_VALIDATOR.get().test(level, pos)) {
				if (ROCKET_PANELLING.get().test(level, pos)) {
					if (SCAFFOLD_STRUCTURE.get().test(level, pos)) {
						// Clear blocks
						rocketPosOffsets.forEach(offset => {
							level.destroyBlock(pos.offset(offset[0], offset[1], offset[2]), false, player);
						});
			
						// Summon rocket
						let rocket = level.createEntity('kubejs:rocket');
						rocket.setPos(pos.x + 0.5, pos.y, pos.z + 0.5);
						level.addFreshEntity(rocket);
					
						// Inform player (as if it wasn't obvious)
						player.tell(ASSEMBLY_SUCCESSFUL);
					} else {
						player.tell(NO_SCAFFOLD);
					}
				} else {
					player.tell(REQUIRES_PANELLING);
				}
			} else {
				player.tell(IMPROPER_FUEL_RATIO);
			}
		} else {
			player.tell(IMPROPER_STRUCTURE);
		}
	} else {
		player.tell(NEED_EMPTY_HAND);
	}
}

const ROCKET_FUELS = {
	// Primary Fluid
	//     Secondary fluid
	//         Min primary / secondary ratio
	//         Max primary / secondary ratio
	//         Minimum total amount
	'minecraft:lava': {
		'minecraft:water': {
			min: 0.9,
			max: 1.1,
			totalMinAmount: 4000
		},
		'minecraft:milk': {
			min: 1.9,
			max: 2.1,
			totalMinAmount: 2000
		}
	}
}

/**
 * @param {Internal.BlockEntityJS} be 
 */
global.solarTick = (be) => {
	let { level, blockPos, block, blockState } = be;
	if (
		block.down.entity != null &&
		level.day &&
		!blockState.getValue(BlockProperties.WATERLOGGED)
		&& level.canSeeSky(blockPos) &&
		!level.isRainingAt(blockPos)
	) {
		block.down.entity.getCapability(ForgeCapabilities.ENERGY, 'up').ifPresent(energy => {
			let solar = Math.cos(level.getSunAngle(0));
			if (solar > 0.1) {
				energy.receiveEnergy(Math.pow(solar, 0.4) * 20, false);
			}
		});
	}
}

/**
 * @param {Internal.BlockEntityJS} be 
 */
global.generatorTick = (be) => {
	let { data, level, blockPos } = be;
	let { stored, max } = data;
	if (data.active) {
		let { gen, time } = data;
		let { ticks } = TFC.calendar.getCalendar(level);
		if (time - ticks > 0) {
			if (stored < max) {
				let withGen = stored + gen;
				if (withGen > max) {
					data.putInt('stored', max);
				} else {
					data.putInt('stored', withGen);
				}
			} else if (Utils.random.nextFloat() > 0.95) {
				level.spawnParticles(
					'minecraft:campfire_signal_smoke',
					true,
					blockPos.x + 0.5,
					blockPos.y + 1,
					blockPos.z + 0.5,
					(0.5 - Utils.random.nextFloat()) * 0.05,
					(0.5 + Utils.random.nextFloat(1.6)) * 0.05,
					(0.5 - Utils.random.nextFloat()) * 0.05,
					0,
					1
				);
			}
		} else {
			data.putBoolean('active', false);
			data.remove('gen');
			data.remove('time');
		}
	} else {
		if (stored < max && level.time % 10 == 0) {
			let { inventory } = be;
			if (inventory != null && inventory != undefined) {
				let slot = inventory.find();
				if (slot > -1) {
					let stack = inventory.extractItem(slot, 1, true);
					if (!stack.empty) {
						let fuel = Fuel.get(stack);
						if (fuel != null) {
							let { temperature, purity, duration } = fuel;
							inventory.extractItem(slot, 1, false);
							data.putBoolean('active', true);
							data.putInt('gen', Math.pow(KMath.E, temperature / 500) * purity * 0.833);
							data.putLong('time', duration + TFC.calendar.getCalendar(level).ticks);
						}
					}
				}
			}
		}
	}

	transferEnergy(be, [
		Direction.DOWN,
		Direction.EAST,
		Direction.WEST,
		Direction.NORTH,
		Direction.SOUTH
	], 50);
}

/**
 * @param {Internal.BlockEntityJS} be 
 * @param {Internal.Direction[]} dirs 
 * @param {number} maxTransfer 
 */
function transferEnergy(be, dirs, maxTransfer) {
	let { level, blockPos, data, type } = be;
	dirs.forEach(dir => {
		let { stored } = data; // Reload data to account for transfers/generation since beginning of tick
		let relBe = level.getBlockEntity(blockPos.relative(dir));
		if (relBe != null && relBe.type != type) {
			relBe.getCapability(ForgeCapabilities.ENERGY, dir.opposite).ifPresent(energy => {
				let transferAttempt = Math.min(stored, maxTransfer);
				let amount = energy.receiveEnergy(transferAttempt, true);
				let after = stored - amount;
				if (after >= 0) {
					energy.receiveEnergy(amount, false);
					data.putInt('stored', after);
				} else {
					amount = energy.receiveEnergy(stored, true);
					after = stored - amount;
					if (after >= 0) {
						energy.receiveEnergy(after, false);
						data.putInt('stored', after);
					}
				}
			})
		}
	});
}

/**
 * @param {Internal.BlockEntityJS} be 
 */
global.rtgTick = (be) => {
	let { data, level, blockPos, type } = be;
	let { quantity } = data;
	
	if (quantity > 0) {
		let receiver = level.getBlockEntity(blockPos.below());
		if (receiver != null && receiver.type != type) {
			receiver.getCapability(ForgeCapabilities.ENERGY, Direction.DOWN).ifPresent(energy => {
				energy.receiveEnergy(Math.pow(quantity, 0.4) * 50, false);
			});
		}

		if (Utils.random.nextFloat() > 0.9954 * (-Math.pow(quantity, 3.4) + 1)) { // Degrade slower as quantity decreases
			let newQ = quantity - 0.0001;
			data.putDouble('quantity', newQ);
		}
	}
}

/**
 * Absolutely awful, but deal with it, it works
 * @param {Internal.BlockEntityJS} be 
 */
global.electronicsAssemblerTick = (be) => {
	let { level, inventory, data } = be;
	let { stored } = data;
	if (level.time % 20 == 0 && stored > 2500 && !inventory.empty && inventory.allItems.size() != 9) {

		let cableIndex = inventory.find('morered:bundled_network_cable');
		if (cableIndex != -1) {
			// Modules
			let steelIndex = inventory.find('tfc:metal/sheet/steel');
			if (steelIndex != -1) {
				let processorIndex = inventory.find('thoriumreactors:redstone_processor');
				if (processorIndex != -1) {
					let bundleIndex = inventory.find('morered:bundled_network_cable');
					if (bundleIndex != -1) {
						// Energy
						let rodIndex = inventory.find('tfc:metal/rod/copper');
						if (rodIndex != -1) {
							let lithiumIndex = inventory.find('kubejs:lithium_plate');
							if (lithiumIndex != -1) {
								let graphiteIndex = inventory.find('kubejs:graphite_plate');
								if (
									graphiteIndex != -1 &&
									!inventory.extractItem(steelIndex, 1, true).empty &&
									!inventory.extractItem(processorIndex, 1, true).empty &&
									inventory.extractItem(bundleIndex, 2 ,true).count == 2 &&
									!inventory.extractItem(rodIndex, 1, true).empty &&
									!inventory.extractItem(lithiumIndex, 1, true).empty &&
									!inventory.extractItem(graphiteIndex, 1, true).empty
								) {
									inventory.extractItem(steelIndex, 1, false);
									inventory.extractItem(processorIndex, 1, false);
									inventory.extractItem(bundleIndex, 2 ,false);
									inventory.extractItem(rodIndex, 1, false);
									inventory.extractItem(lithiumIndex, 1, false);
									inventory.extractItem(graphiteIndex, 1, false);
									craftAndInsertItem('thoriumreactors:module_energy', be, 1);
									data.putInt('stored', stored - 1000);
									return;
								}
							}
						}
						// Tank
						rodIndex = inventory.find('tfc:metal/rod/steel');
						if (rodIndex != -1) {
							let barrelIndex = inventory.find('#tfc:barrels');
							if (
								barrelIndex != -1 &&
								!inventory.extractItem(steelIndex, 1, true).empty &&
								!inventory.extractItem(processorIndex, 1, true).empty &&
								inventory.extractItem(bundleIndex, 2 ,true).count == 2 &&
								!inventory.extractItem(rodIndex, 1, true).empty &&
								!inventory.extractItem(barrelIndex, 1, true).empty
							) {
								inventory.extractItem(steelIndex, 1, false);
								inventory.extractItem(processorIndex, 1, false);
								inventory.extractItem(bundleIndex, 2 ,false);
								inventory.extractItem(rodIndex, 1, false);
								inventory.extractItem(barrelIndex, 1, false);
								craftAndInsertItem('thoriumreactors:module_tank', be, 1);
								return;
							}
						}
						// I/O
						rodIndex = inventory.find('tfc:metal/rod/gold');
						if (rodIndex != -1) {
							let wireIndex = inventory.find('morered:red_alloy_wire');
							if (
								wireIndex != -1 &&
								!inventory.extractItem(steelIndex, 1, true).empty &&
								!inventory.extractItem(processorIndex, 1, true).empty &&
								inventory.extractItem(bundleIndex, 2 ,true).count == 2 &&
								!inventory.extractItem(rodIndex, 1, true).empty &&
								inventory.extractItem(wireIndex, 4, true).count == 4
							) {
								inventory.extractItem(steelIndex, 1, false);
								inventory.extractItem(processorIndex, 1, false);
								inventory.extractItem(bundleIndex, 2 ,false);
								inventory.extractItem(rodIndex, 1, false);
								inventory.extractItem(wireIndex, 4, false);
								craftAndInsertItem('thoriumreactors:module_io', be, 1);
								data.putInt('stored', stored - 1000);
								return;
							} 
						}
						// Sensor
						rodIndex = inventory.find('tfc:metal/rod/nickel');
						if (rodIndex != -1) {
							let detectorIndex = inventory.find('minecraft:daylight_detector');
							if (detectorIndex != -1) {
								let plateIndex = inventory.find('#minecraft:stone_pressure_plates');
								if (
									plateIndex != -1 &&
									!inventory.extractItem(steelIndex, 1, true).empty &&
									!inventory.extractItem(processorIndex, 1, true).empty &&
									inventory.extractItem(bundleIndex, 2 ,true).count == 2 &&
									!inventory.extractItem(rodIndex, 1, true).empty &&
									!inventory.extractItem(detectorIndex, 1, true).empty &&
									!inventory.extractItem(plateIndex, 1, true).empty
								) {
									inventory.extractItem(steelIndex, 1, false);
									inventory.extractItem(processorIndex, 1, false);
									inventory.extractItem(bundleIndex, 2 ,false);
									inventory.extractItem(rodIndex, 1, false);
									inventory.extractItem(detectorIndex, 1, false);
									inventory.extractItem(plateIndex, 1, false);
									craftAndInsertItem('thoriumreactors:module_sensor', be, 1);
									data.putInt('stored', stored - 1000);
									return;
								}
							}
						}
						// Processing
						rodIndex = inventory.find('tfc:metal/rod/brass');
						if (rodIndex != -1) {
							let calcIndex = inventory.find('ae2:calculation_processor');
							if (
								calcIndex != -1 &&
								!inventory.extractItem(steelIndex, 1, true).empty &&
								!inventory.extractItem(processorIndex, 1, true).empty &&
								inventory.extractItem(bundleIndex, 2 ,true).count == 2 &&
								!inventory.extractItem(rodIndex, 1, true).empty &&
								inventory.extractItem(calcIndex, 2, true).count == 2
							) {
								inventory.extractItem(steelIndex, 1, false);
								inventory.extractItem(processorIndex, 1, false);
								inventory.extractItem(bundleIndex, 2 ,false);
								inventory.extractItem(rodIndex, 1, false);
								inventory.extractItem(calcIndex, 2, false);
								craftAndInsertItem('thoriumreactors:module_processing', be, 1);
								data.putInt('stored', stored - 1000);
								return;
							}
						}
						// Storage
						rodIndex = inventory.find('tfc:metal/rod/zinc');
						if (rodIndex != -1) {
							let chestIndex = inventory.find('#forge:chests/wooden');
							if (
								chestIndex != -1 &&
								!inventory.extractItem(steelIndex, 1, true).empty &&
								!inventory.extractItem(processorIndex, 1, true).empty &&
								inventory.extractItem(bundleIndex, 2 ,true).count == 2 &&
								!inventory.extractItem(rodIndex, 1, true).empty &&
								!inventory.extractItem(chestIndex, 1, true).empty
							) {
								inventory.extractItem(steelIndex, 1, false);
								inventory.extractItem(processorIndex, 1, false);
								inventory.extractItem(bundleIndex, 2 ,false);
								inventory.extractItem(rodIndex, 1, false);
								inventory.extractItem(chestIndex, 1, false);
								craftAndInsertItem('thoriumreactors:module_storage', be, 1);
								data.putInt('stored', stored - 1000);
								return;
							}
						}
					}
				}
			}

			// Fluix cables
			let fiberIndex = inventory.find('ae2:quartz_fiber');
			if (fiberIndex != -1) {
				let dustIndex = inventory.find('ae2:fluix_dust');
				if (
					dustIndex != -1 &&
					!inventory.extractItem(fiberIndex, 1, true).empty &&
					!inventory.extractItem(dustIndex, 1, true).empty &&
					!inventory.extractItem(cableIndex, 1, true).empty
				) {
					inventory.extractItem(fiberIndex, 1, false);
					inventory.extractItem(dustIndex, 1, false);
					inventory.extractItem(cableIndex, 1, false);
					craftAndInsertItem('ae2:fluix_glass_cable', be, 12);
					data.putInt('stored', stored - 500);
					return;
				}
			}

			// Redstone processor
			let goldIndex = inventory.find('tfc:metal/sheet/gold');
			if (goldIndex != -1) {
				let comparatorIndex = inventory.find('minecraft:comparator');
				if (comparatorIndex != -1) {
					let rodIndex = inventory.find('tfc:metal/rod/copper');
					if (
						rodIndex != -1 &&
						!inventory.extractItem(cableIndex, 1, true).empty &&
						!inventory.extractItem(goldIndex, 1, true).empty &&
						!inventory.extractItem(rodIndex, 1, true).empty &&
						inventory.extractItem(comparatorIndex, 2, true).count == 2
					) {
						inventory.extractItem(cableIndex, 1, false);
						inventory.extractItem(goldIndex, 1, false);
						inventory.extractItem(rodIndex, 1, false);
						inventory.extractItem(comparatorIndex, 2, false);
						craftAndInsertItem('thoriumreactors:redstone_processor', be, 6);
						data.putInt('stored', stored - 750);
						return;
					}
				}
			}

			// Large components
			// 16m, 64m, 256m, 2s, 16s, 128s
			let processorIndex = inventory.find('megacells:accumulation_processor');
			if (processorIndex != -1) {
				// 256m
				let componentIndex = inventory.find('megacells:cell_component_64m');
				if (
					componentIndex != -1 &&
					inventory.extractItem(cableIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(cableIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('megacells:cell_component_256m', be, 1);
					data.putInt('stored', stored - 100);
					return;
				}
				// 64m
				componentIndex = inventory.find('megacells:cell_component_16m');
				if (
					componentIndex != -1 &&
					inventory.extractItem(cableIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(cableIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('megacells:cell_component_64m', be, 1);
					data.putInt('stored', stored - 100);
					return;
				}
				// 16m
				componentIndex = inventory.find('megacells:cell_component_4m');
				if (
					componentIndex != -1 &&
					inventory.extractItem(cableIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(cableIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('megacells:cell_component_16m', be, 1);
					data.putInt('stored', stored - 100);
					return;
				}
				// 128s
				componentIndex = inventory.find('ae2:spatial_cell_component_16');
				if (
					componentIndex != -1 &&
					!inventory.extractItem(cableIndex, 1, true).empty &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 6, true).count == 6
				) {
					inventory.extractItem(cableIndex, 1, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 6, false);
					craftAndInsertItem('ae2:spatial_cell_component_128', be, 1);
					data.putInt('stored', stored - 2500);
					return;
				}
				// 16s
				componentIndex = inventory.find('ae2:spatial_cell_component_2');
				if (
					componentIndex != -1 &&
					!inventory.extractItem(cableIndex, 1, true).empty &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 6, true).count == 6
				) {
					inventory.extractItem(cableIndex, 1, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 6, false);
					craftAndInsertItem('ae2:spatial_cell_component_16', be, 1);
					data.putInt('stored', stored - 2500);
					return;
				}
				// 2s
				componentIndex = inventory.find('ae2:fluix_crystal');
				if (componentIndex != -1) {
					let glassIndex = inventory.find('ae2:quartz_glass');
					if (
						glassIndex != -1 &&
						!inventory.extractItem(glassIndex, 1, true).empty &&
						inventory.extractItem(componentIndex, 5, true).count == 5 &&
						inventory.extractItem(processorIndex, 2, true).count == 2 &&
						inventory.extractItem(cableIndex, 10, true).count == 10
					) {
						inventory.extractItem(glassIndex, 1, false);
						inventory.extractItem(componentIndex, 5, false);
						inventory.extractItem(processorIndex, 2, false);
						inventory.extractItem(cableIndex, 10, false);
						craftAndInsertItem('ae2:spatial_cell_component_2', be, 1);
						data.putInt('stored', stored - 2500);
						return;
					}
				}
			}
			processorIndex = inventory.find('ae2:engineering_processor');
			if (processorIndex != -1) {
				// 4m
				let componentIndex = inventory.find('megacells:cell_component_1m');
				if (
					componentIndex != -1 &&
					inventory.extractItem(cableIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(cableIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('megacells:cell_component_4m', be, 1);
					data.putInt('stored', stored - 100);
					return;
				}
			}
		}

		// Small components
		let wireIndex = inventory.find('morered:red_alloy_wire');
		if (wireIndex != -1) {
			// 256k, 1m
			let processorIndex = inventory.find('ae2:engineering_processor');
			if (processorIndex != -1) {
				// 1m
				let componentIndex = inventory.find('ae2:cell_component_256k');
				if (
					componentIndex != -1 &&
					inventory.extractItem(wireIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(wireIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('megacells:cell_component_1m', be, 1);
					data.putInt('stored', stored - 1500);
					return;
				}
				// 256k
				componentIndex = inventory.find('ae2:cell_component_64k');
				if (
					componentIndex != -1 &&
					inventory.extractItem(wireIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(wireIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('ae2:cell_component_256k', be, 1);
					data.putInt('stored', stored - 1500);
					return;
				}
			}
			// 4k, 16k, 64k
			processorIndex = inventory.find('ae2:calculation_processor');
			if (processorIndex != -1) {
				// 64K
				let componentIndex = inventory.find('ae2:cell_component_16k');
				if (
					componentIndex != -1 &&
					inventory.extractItem(wireIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(wireIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('ae2:cell_component_64k', be, 1);
					data.putInt('stored', stored - 1500);
					return;
				}
				// 16k
				componentIndex = inventory.find('ae2:cell_component_4k');
				if (
					componentIndex != -1 &&
					inventory.extractItem(wireIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(wireIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('ae2:cell_component_16k', be, 1);
					data.putInt('stored', stored - 1500);
					return;
				}
				// 4k
				componentIndex = inventory.find('ae2:cell_component_1k');
				if (
					componentIndex != -1 &&
					inventory.extractItem(wireIndex, 3, true).count == 3 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(componentIndex, 3, true).count == 3
				) {
					inventory.extractItem(wireIndex, 3, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(componentIndex, 3, false);
					craftAndInsertItem('ae2:cell_component_4k', be, 1);
					data.putInt('stored', stored - 1500);
					return;
				}
			}
			// 1k
			processorIndex = inventory.find('ae2:logic_processor');
			if (processorIndex != -1) {
				let crystalIndex = inventory.find('ae2:certus_quartz_crystal');
				if (
					crystalIndex != -1 &&
					inventory.extractItem(crystalIndex, 2, true).count == 2 &&
					inventory.extractItem(processorIndex, 2, true).count == 2 &&
					inventory.extractItem(wireIndex, 3, true).count == 3
				) {
					inventory.extractItem(crystalIndex, 2, false);
					inventory.extractItem(processorIndex, 2, false);
					inventory.extractItem(wireIndex, 3, false);
					craftAndInsertItem('ae2:cell_component_1k', be, 1)
					data.putInt('stored', stored - 100);
					return;
				}
			}
		}

		// Quartz fiber
		let certusIndex = inventory.find('ae2:certus_quartz_dust');
		if (certusIndex != -1) {
			let glassIndex = inventory.find('#forge:glass');
			if (
				glassIndex != -1 &&
				!inventory.extractItem(certusIndex, 1, true).empty &&
				!inventory.extractItem(glassIndex, 1, true).empty
			) {
				inventory.extractItem(certusIndex, 1, false);
				inventory.extractItem(glassIndex, 1, false);
				craftAndInsertItem('ae2:quartz_fiber', be, 8);
				data.putInt('stored', stored - 20);
				return;
			}
		}

		organizeContainer(inventory);
	}
}

/**
 * @param {Internal.ItemStack_} item 
 * @param {Internal.BlockEntityJS} be
 * @param {number} count 
 */
function craftAndInsertItem(item, be, count) {
	let remainder = Item.of(item, count)
	let { level, blockPos } = be;

	let belBe = level.getBlockEntity(blockPos.below());
	if (belBe != null) {
		belBe.getCapability(ForgeCapabilities.ITEM_HANDLER, 'up').ifPresent(items => {
			remainder = items.insertItem(remainder, false);
		});
	}
	if (!remainder.empty) {
		let abvBe = level.getBlockEntity(blockPos.above());
		if (abvBe != null) {
			abvBe.getCapability(ForgeCapabilities.ITEM_HANDLER, 'down').ifPresent(items => {
				remainder = items.insertItem(remainder, false);
			});
		}
	}

	if (!remainder.empty) {
		remainder = be.inventory.insertItem(remainder, false);
	}

	if (!remainder.empty) {
		BlockClass.popResourceFromFace(level, blockPos, 'up', remainder);
	}
}

/**
 * This absolutely will not work in 1.21 due to stacks being limited to 99
 * @param {Internal.InventoryKJS} inventory
 */
function organizeContainer(inventory) {
	let { allItems } = inventory;
	let items = {};
	allItems.forEach(stack => {
		let old = items[stack.item];
		if (old != null && old != undefined) {
			old.grow(stack.count);
			items[old.item] = old;
		} else {
			items[stack.item] = stack;
		}
	});
	inventory.clear();
	for (let ref in items) {
		inventory.insertItem(items[ref], false);
	}
}
