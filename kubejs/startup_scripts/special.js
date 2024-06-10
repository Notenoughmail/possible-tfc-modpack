
const KnappingType = Java.loadClass('net.dries007.tfc.util.KnappingType');
const ItemStackContainerProvider = Java.loadClass('net.dries007.tfc.common.container.ItemStackContainerProvider');
const KnappingContainer = Java.loadClass('net.dries007.tfc.common.container.KnappingContainer');
const ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer');
const BlockEntityJS = Java.loadClass('dev.latvian.mods.kubejs.block.entity.BlockEntityJS');

global.commonConfig = {};

Platform.setModName("configjs", "Possible TFC Pack");

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
	e.registerRepresentative('ae2:quartz_block', 'ae2:flawless_budding_quartz', 'ae2:flawed_budding_quartz', 'ae2:chipped_budding_quartz', 'ae2:damaged_budding_quartz');
})

ForgeEvents.onEvent('top.theillusivec4.curios.api.event.CurioEquipEvent', e => global.curioEquipEvent(e));
ForgeEvents.onEvent('top.theillusivec4.curios.api.event.CurioUnequipEvent', e => global.curioUnequipEvent(e));
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerDestroyItemEvent', e => global.playerDestroyItem(e));

/**
 * @param {Internal.CurioEquipEvent} event
 */
global.curioEquipEvent = (event) => {
	let { slotContext, stack, entity, result } = event;
	if (!entity.level.clientSide && entity.player && result.name() != 'DENY' && stack.id == 'kubejs:thermometer') {
		entity.sendData('curios', {
			hasThermometer: true
		});
	}
}

/**
 * @param {Internal.CurioUnequipEvent} event
 */
global.curioUnequipEvent = (event) => {
	let { slotContext, stack, entity, result } = event;
	if (!entity.level.clientSide && entity.player && result.name() != 'DENY' && stack.id == 'kubejs:thermometer') {
		entity.sendData('curios', {
			hasThermometer: false
		});
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
	if (hand != null && original.hasTag('kubejs:tool_auto_replace')) {
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

TFCEvents.registerInteractions(e => {
	e.interaction('tfc:metal/sheet/steel', false, true, (stack, ctx) => global.steelCarvingInteraction(stack, ctx));
});

/**
 * @param {Internal.ItemStack} stack 
 * @param {Internal.UseOnContext} ctx 
 * @returns {Internal.InteractionResult}
 */
global.steelCarvingInteraction = (stack, ctx) => {
	let { player, clickedPos, hand } = ctx;
	let { offHandItem } = player;
	
	if (player != null && clickedPos.equals(BlockPos.ZERO) && offHandItem.is('ae2:certus_quartz_cutting_knife')) {
		let type = KnappingType.get(player);
		if (type != null && player instanceof ServerPlayer) {
			let provider = new ItemStackContainerProvider((stack1, hand, slot, playerInventory, windowId) => KnappingContainer.create(stack1, type, hand, slot, playerInventory, windowId), Text.translatable('tfc.screen.knapping'));
			provider.openScreen(player, hand, buffer => buffer.writeResourceLocation(type.id));
			offHandItem.hurtAndBreak(1, player, e => e.broadcastBreakEvent('off_hand'));
		}
		return 'success';
	}

	return 'pass';
}

ForgeEvents.onEvent('net.minecraftforge.client.event.RenderNameTagEvent', e => {
	if (e.entity.entityType == global.rocketTypeSupplier.get()) {
		e.setResult('deny');
	}
})
