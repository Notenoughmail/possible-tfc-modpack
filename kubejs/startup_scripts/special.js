
global.commonConfig = {};

Platform.setModName("configjs", "Possible TFC Pack");

const GameEvent = Java.loadClass('net.minecraft.world.level.gameevent.GameEvent');
const ItemEntity = Java.loadClass('net.minecraft.world.entity.item.ItemEntity');
const FarmlandBlock = Java.loadClass('net.dries007.tfc.common.blocks.soil.FarmlandBlock');

ConfigsEvent.client(e => {
	global.clientConfig = {};
	e.setName('possible-tfc-pack-client');
	e.push('customization');
	global.clientConfig.customization = {};
	e.comment('Determines the TFC temperature scale to be used when wearing a thermometer, forces COLOR if not wearing a thermometer');
	global.clientConfig.customization.thermometerScale = e.enumValue('thermometerTemperatureScale', 'Celsius', ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine']);
	e.pop();
	e.push('debug');
	global.clientConfig.debug = {};
	global.clientConfig.debug.enabled = e.booleanValue('enabled', false);
})

ConfigsEvent.server(e => {
	global.serverConfig = {};
	e.setName('possible-tfc-pack-server');
	e.push('debug');
	global.serverConfig.debug = {};
	e.comment('Enables server debug mode');
	global.serverConfig.debug.enabled = e.booleanValue('enabled', false)
	e.comment('Adds debug recipes')
	global.serverConfig.debug.debugRecipes = e.booleanValue('debugRecipes', false);
})

MoreJSEvents.registerPotionBrewing(e => {
	e.removeByPotion(null, null, null)
})

EntityJSEvents.attributes(event => {
	event.modify('kubejs:rocket', attributes => {
		attributes.add('forge:entity_gravity', 0);
		attributes.add('minecraft:generic.max_health', 1);
		attributes.add('minecraft:generic.knockback_resistance', 1);
	});
})

TFCEvents.prospectRepresentative(e => {
	global.gradedOres.forEach(ore => {
		let ores = [];
		TFC.misc.rock.keySet().forEach(rock => {
			global.oreGrades.forEach(grade => {
				ores.push(`kubejs:ore/${grade}_${ore}/${rock}`);
			});
		});
		e.registerRepresentative(`kubejs:ore/normal_${ore}/dacite`, ores);
	})
	global.ungradedOres.forEach(ore => {
		let ores = [];
		TFC.misc.rock.keySet().forEach(rock => {
			ores.push(`kubejs:ore/${ore}/${rock}`);
		});
		e.registerRepresentative(`kubejs:ore/${ore}/dacite`, ores);
	});
	e.registerRepresentative('ae2:flawless_budding_quartz', 'ae2:flawed_budding_quartz', 'ae2:chipped_budding_quartz', 'ae2:damaged_budding_quartz');
})

ForgeEvents.onEvent('top.theillusivec4.curios.api.event.CurioEquipEvent', e => global.curioEquipEvent(e));
ForgeEvents.onEvent('top.theillusivec4.curios.api.event.CurioUnequipEvent', e => global.curioUnequipEvent(e));
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerDestroyItemEvent', e => global.playerDestroyItem(e));

/**
 * @param {Internal.CurioEquipEvent} event
 */
global.curioEquipEvent = (event) => {
	let { slotContext, stack, entity, result } = event;
	if (entity.level.clientSide && entity.player && result.name() != 'DENY' && stack.id == 'kubejs:thermometer') {
		entity.persistentData.putBoolean('hasThermometer', true);
	}
}

/**
 * @param {Internal.CurioUnequipEvent} event
 */
global.curioUnequipEvent = (event) => {
	let { slotContext, stack, entity, result } = event;
	if (entity.level.clientSide && entity.player && result.name() != 'DENY' && stack.id == 'kubejs:thermometer') {
		entity.persistentData.putBoolean('hasThermometer', false);
	}
}

/**
 * @param {Internal.PlayerDestroyItemEvent} event 
 */
global.playerDestroyItem = (event) => {
	let { original, hand } = event;
	/**
	 * @type {Internal.Player} player
	 */
	let player = event.entity;
	if (hand != null) {
		let { inventory } = player;
		let slotIndex = inventory.find(original.item);
		if (slotIndex != -1) {
			let replacement = inventory.extractItem(slotIndex, 1, false);
			if (!replacement.empty) {
				player.setHeldItem(hand, replacement);
			}
		}
	}
}

if (Platform.isClientEnvironment()) {
	let AnimatedParticle = Java.loadClass('net.dries007.tfc.client.particle.AnimatedParticle');
	let frictionField = Java.loadClass('net.minecraft.client.particle.Particle').__javaObject__.getDeclaredField('f_172258_'); // protected float friction
	frictionField.setAccessible(true);
	/**
	 * @param {Internal.RegisterParticleProvidersEvent} event 
	 */
	global.registerParticleProvider = (event) => {
		event.registerSpriteSet(global.rocketPlumeSupplier.get(), set => {
			return (particleOptions, clientLevel, x, y, z, xSpeed, ySpeed, zSpeed) => {
				let plume = new AnimatedParticle(clientLevel, x, y, z, set);
				plume.setParticleSpeed(xSpeed, ySpeed, zSpeed);
				plume.scale(5);
				plume.setLifetime(65);
				frictionField.setFloat(plume, 1);
				return plume;
			}
		})
		event.registerSpriteSet(global.rocketPlumeEjectaSupplier.get(), set => {
			return (particleOptions, clientLevel, x, y, z, xSpeed, ySpeed, zSpeed) => {
				let ejecta = new AnimatedParticle(clientLevel, x, y, z, set);
				ejecta.setParticleSpeed(xSpeed, ySpeed, zSpeed);
				ejecta.scale(3);
				ejecta.setLifetime(50);
				frictionField.setFloat(ejecta, 1);
				return ejecta;
			}
		})
	}

	ForgeModEvents.onEvent('net.minecraftforge.client.event.RegisterParticleProvidersEvent', e => global.registerParticleProvider(e));
}