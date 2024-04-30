// priority: 0

const IntTag = Java.loadClass('net.minecraft.nbt.IntTag');
const BannerPattern = Java.loadClass('net.minecraft.world.level.block.entity.BannerPattern');

StartupEvents.registry('item', e => {
	global.oreGrades.forEach(grade => {
		global.gradedOres.forEach(ore => {
			e.create(`ore/${grade}_${ore}`)
				.tag('tfc:ore_pieces')
		})
	})
	global.ungradedOres.forEach(ore => {
		e.create(`ore/${ore}`)
			.tag('tfc:ore_pieces')
	})
	e.create('leather_pouch')
	e.create('dummy')
	e.create('rod/lead')
		.tag('tfc:metal_item/lead')
		.tag('forge:rods')
		.tag('forge:rods/lead')
	e.create('double_ingot/lead')
		.tag('tfc:metal_item/lead')
		.tag('forge:double_ingots')
		.tag('forge:double_ingots/lead')
		.tag('tfc:pileable_double_ingots')
	e.create('rubber_sheet')
	e.create('rubber_bar')
	e.create('latex_clump')
	e.create('thermometer')
		.tag('curios:thermometer')
	e.create('iron_belt_clip')
	e.create('fulgurite')
		.fireResistant(true)
})

ItemEvents.modification(e => {
	e.modify('create:copper_diving_helmet', item => {
		item.maxDamage = 173
	})
	e.modify('create:copper_diving_boots', item => {
		item.maxDamage = 197
	})
	e.modify('create:netherite_diving_helmet', item => {
		item.maxDamage = 748
	})
	e.modify('minecraft:netherite_leggings', item => {
		item.maxDamage = 960
	})
	e.modify('create:netherite_diving_boots', item => {
		item.maxDamage = 860
	})
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
				.tagBlock(`tfc:ore/${ore}`)
				.renderType('cutout')
				.requiresTool();
		})
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
			.groundCoverModelShape(groundCovers[i % groundCovers.length])
	}
})

StartupEvents.registry('banner_pattern', e => {
	e.createCustom('test', () => new BannerPattern('test'))
		.tag('minecraft:no_item_required');
})

StartupEvents.registry('fluid', e => {
	e.create('diluted_milk')
		.thinTexture(0xc3ccdb)
		.displayName('Diluted Milk')
		.noBlock()
		.noBucket()
		.tag('tfc:usable_in_wooden_bucket')
		.tag('tfc:usable_in_barrel')
	e.create('alumina')
		.thinTexture(0xcbcfd6)
		.displayName('Alumina Solution')
		.noBlock()
		.noBucket()
	e.create('ethy_prop_rubber')
		.thickTexture(0x0c1413)
		.displayName('Ethylene-Propylene Rubber')
		.noBlock()
		.noBucket()
		.tag('kubejs:rubber')
	e.create('latex')
		.thinTexture(0xdee3d5)
		.displayName('Natural Latex')
		.noBlock()
		.noBucket()
		.tag('tfc:usable_in_wooden_bucket')
		.tag('kubejs:latex')
	e.create('unrefined_redstone')
		.noBlock()
		.noBucket()
		.thickTexture(0x9f0a2a)
	e.create('refined_redstone')
		.noBlock()
		.noBucket()
		.thinTexture(0x9f0a2a)
	e.create('redstone_alloy')
		.noBlock()
		.noBucket()
		.thinTexture(0x7c262e)
})

StartupEvents.registry('sound_event', e => {
	e.create('rocket')
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
	global.rocketPlumeSupplier = e.create('rocket_plume')
		.overrideLimiter(true)
	global.rocketPlumeEjectaSupplier = e.create('rocket_plume_ejecta')
		.overrideLimiter(true)
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