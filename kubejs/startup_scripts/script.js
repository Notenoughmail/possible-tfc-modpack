// priority: 0

const IntTag = Java.loadClass('net.minecraft.nbt.IntTag');
const HarvestToolProvider = Java.loadClass('snownee.jade.addon.harvest.HarvestToolProvider');
const SimpleToolHandler = Java.loadClass('snownee.jade.addon.harvest.SimpleToolHandler');
const TFCBlockTags = Java.loadClass('net.dries007.tfc.common.TFCTags$Blocks');
const TFCMultiBlock = Java.loadClass('net.dries007.tfc.util.MultiBlock');

StartupEvents.registry('item', e => {
	global.oreGrades.forEach(grade => {
		global.gradedOres.forEach(ore => {
			e.create(`ore/${grade}_${ore}`)
				.tag('tfc:ore_pieces');
		})
	})
	global.ungradedOres.forEach(ore => {
		e.create(`ore/${ore}`)
			.tag('tfc:ore_pieces');
	})
	e.create('leather_pouch');
	e.create('thermometer')
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
	TFC.misc.rock.keySet().forEach(rock => {
		global.gradedOres.forEach(ore => {
			global.oreGrades.forEach(grade => {
				e.create(`ore/${grade}_${ore}/${rock}`)
					.stoneSoundType()
					.mapColor('stone')
					.hardness(3)
					.tagBlock('minecraft:mineable/pickaxe')
					.tagBlock('tfc:prospectable')
					.tagBlock('tfc:can_trigger_collapse')
					.tagBlock('tfc:rock/ores')
					.tagBlock('tfc:can_collapse')
					.tagBlock('tfc:can_start_collapse')
					.tagBlock('minecraft:needs_stone_tool')
					.tagBlock(`forge:ores/${ore}`)
					.tagBlock('forge:ores')
					.tagBlock(`tfc:ore/${ore}/${grade}`)
					.renderType('cutout')
					.requiresTool();
			})
		})
		global.ungradedOres.forEach(ore => {
			e.create(`ore/${ore}/${rock}`)
				.stoneSoundType()
				.mapColor('stone')
				.hardness(3)
				.tagBlock('minecraft:mineable/pickaxe')
				.tagBlock('tfc:prospectable')
				.tagBlock('tfc:can_trigger_collapse')
				.tagBlock('tfc:rock/ores')
				.tagBlock('tfc:can_collapse')
				.tagBlock('tfc:can_start_collapse')
				.tagBlock('minecraft:needs_stone_tool')
				.tagBlock(`forge:ores/${ore}`)
				.tagBlock('forge:ores')
				.tagBlock(`tfc:ore/${ore}`)
				.renderType('cutout')
				.requiresTool();
		})
	})

	e.create('lithium_salt', 'tfc:dirt')
		.grass(grass => {
;			grass.hardness(0.9);
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
		.soundType('metal');

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
	})

	let groundCovers = ['malachite', 'native_copper', 'sphalerite'];

	for (let i = 0 ; i < global.allOres ; i++) {
		e.create(`ore/small_${global.allOres[i]}`, 'tfc:ground_cover')
			.ore()
			.hardness(0.1)
			.tagBlock('tfc:can_be_snow_piled')
			.stoneSoundType()
			.mapColor('stone')
			.tagBlock('minecraft:mineable/pickaxe')
			.tagBlock('tfc:breaks_when_isolated')
			.tagItem('tfc:small_ore_pieces')
			.tagItem('tfc:nuggets')
			.groundCoverModelShape(groundCovers[i % groundCovers.length]);
	}
})

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
})

StartupEvents.registry('sound_event', e => {
	e.create('rocket');
})

StartupEvents.registry('entity_type', e => {
	e.create('rocket', 'entityjs:living')
		.sized(1.5, 5)
		.tick(rocket => global.rocketTick(rocket))
		.onInteract(ctx => global.rocketInteract(ctx))
		.isPushable(false)
		.isInvulnerableTo(ctx => true)
		.render(ctx => true)
})

StartupEvents.registry('particle_type', e => {
	global.rocketPlumeSupplier = e.create('rocket_plume');
	global.rocketPlumeEjectaSupplier = e.create('rocket_plume_ejecta');
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
);

let rocketPosOffsets = [
	[0, 0, 0],
	[0, 1, 0]
]

/**
 * @param {Internal.BlockRightClickedEventJS} e 
 */
global.clickRocketEngine = (e) => {
	let { player, block, item, hand } = e;
	let { level, pos } = block;
	
	if (item.empty && hand.name() == 'MAIN_HAND' && ROCKET_STRUCTURE.get().test(level, pos)) {

		// Clear blocks
		rocketPosOffsets.forEach(offset => {
			level.destroyBlock(pos.offset(offset[0], offset[1], offset[2]), false, player);
		});

		// Summon rocket
		let rocket = level.createEntity('kubejs:rocket');
		rocket.setPos(pos.x + 0.5, pos.y, pos.z + 0.5);
		level.addFreshEntity(rocket);
	}
}