
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
	global.clientConfig.customization.thermometerScale = e
		.comment(' ', 'Determines the TFC temperature scale to be used when wearing a thermometer, forces COLOR if not wearing a thermometer')
		.enumValue('thermometerTemperatureScale', 'Celsius', ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine']);
	global.clientConfig.customization.enableEntityAutoThirdPerson = e
		.comment(' ', 'Determines if the view should automatically be put into 3rd person when riding certain entities')
		.booleanValue('enableEntityAutoThirdPerson', true);
	global.clientConfig.customization.forwardThirdPersonEntities = e
		.comment(' ', 'The entities that will automatically put the view into forward third person when mounted')
		.stringListValue('forwardThirdPersonEntities', [
			'tfc:horse',
			'tfc:donkey',
			'tfc:mule',
			'minecraft:minecart',
			'firmaciv:dugout_canoe/acacia',
			'firmaciv:dugout_canoe/ash',
			'firmaciv:dugout_canoe/aspen',
			'firmaciv:dugout_canoe/birch',
			'firmaciv:dugout_canoe/blackwood',
			'firmaciv:dugout_canoe/chestnut',
			'firmaciv:dugout_canoe/douglas_fir',
			'firmaciv:dugout_canoe/hickory',
			'firmaciv:dugout_canoe/kapok',
			'firmaciv:dugout_canoe/mangrove',
			'firmaciv:dugout_canoe/maple',
			'firmaciv:dugout_canoe/oak',
			'firmaciv:dugout_canoe/palm',
			'firmaciv:dugout_canoe/pine',
			'firmaciv:dugout_canoe/rosewood',
			'firmaciv:dugout_canoe/sequoia',
			'firmaciv:dugout_canoe/spruce',
			'firmaciv:dugout_canoe/sycamore',
			'firmaciv:dugout_canoe/white_cedar',
			'firmaciv:dugout_canoe/willow',
			'firmaciv:kayak',
			'firmaciv:sloop/acacia',
			'firmaciv:sloop/ash',
			'firmaciv:sloop/aspen',
			'firmaciv:sloop/birch',
			'firmaciv:sloop/blackwood',
			'firmaciv:sloop/chestnut',
			'firmaciv:sloop/douglas_fir',
			'firmaciv:sloop/hickory',
			'firmaciv:sloop/kapok',
			'firmaciv:sloop/mangrove',
			'firmaciv:sloop/maple',
			'firmaciv:sloop/oak',
			'firmaciv:sloop/palm',
			'firmaciv:sloop/pine',
			'firmaciv:sloop/rosewood',
			'firmaciv:sloop/sequoia',
			'firmaciv:sloop/spruce',
			'firmaciv:sloop/sycamore',
			'firmaciv:sloop/white_cedar',
			'firmaciv:sloop/willow'
		], s => ResourceLocation.isValidResourceLocation(s));
	global.clientConfig.customization.reverseThirdPersonEntities = e
		.comment(' ', 'The entities that will automatically put the view into reverse third person when mounted')
		.stringListValue('reverseThirdPersonEntities', [
			'firmaciv:rowboat/acacia',
			'firmaciv:rowboat/ash',
			'firmaciv:rowboat/aspen',
			'firmaciv:rowboat/birch',
			'firmaciv:rowboat/blackwood',
			'firmaciv:rowboat/chestnut',
			'firmaciv:rowboat/douglas_fir',
			'firmaciv:rowboat/hickory',
			'firmaciv:rowboat/kapok',
			'firmaciv:rowboat/mangrove',
			'firmaciv:rowboat/maple',
			'firmaciv:rowboat/oak',
			'firmaciv:rowboat/palm',
			'firmaciv:rowboat/pine',
			'firmaciv:rowboat/rosewood',
			'firmaciv:rowboat/sequoia',
			'firmaciv:rowboat/spruce',
			'firmaciv:rowboat/sycamore',
			'firmaciv:rowboat/white_cedar',
			'firmaciv:rowboat/willow'
		], s => ResourceLocation.isValidResourceLocation(s));
	e.swap('debug');
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

ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityMountEvent', e => global.entityMountEvent(e));

/**
 * @param {Internal.EntityMountEvent} e 
 */
global.entityMountEvent = (e) => {
	console.warn('Oh dear');
	let { mounting, entityMounting, entityBeingMounted } = e;
	if (entityMounting.player) {
		entityMounting.sendData('mount', {
			'mounting': mounting,
			type: getType(entityBeingMounted)
		});
	}
}

/**
 * @param {Internal.Entity} entity 
 */
function getType(entity) {
	console.warn(entity.type);
	let { type } = entity;
	if (proxyEntities.indexOf(type) != -1) {
		return getType(entity.getVehicle());
	}
	return type;
}

// Entities which aren't really there and a proxy for another mob
const proxyEntities = [
	'alekiships:compartment_empty',
	'alekiships:vehicle_part_boat'
]

ForgeEvents.onEvent('net.minecraftforge.event.furnace.FurnaceFuelBurnTimeEvent', e => e.setBurnTime(0));

CapabilityEvents.blockEntity(e => {
	e.attach(
		'jumbofurnace:jumbo_furnace_exterior',
		CapabilityBuilder.ENERGY.customBlockEntity()
			.withCapacity(1000)
			.availableOn((be, dir) => true)
			.canExtract(be => false)
			.extractEnergy((be, amount, simulate) => 0)
			.canReceive(be => {
				let { coreTile } = be;
				if (coreTile) {
					return coreTile.cachedRecipes.recipeCount > 0 && coreTile.burnTimeRemaining < 5000;
				}
				return false;
			})
			.receiveEnergy((be, amount, simulate) => {
				let { coreTile } = be;
				if (coreTile) {
					if (coreTile.cachedRecipes.recipeCount < 1) {
						return 0;
					}
					let { burnTimeRemaining } = coreTile;
					if (burnTimeRemaining >= 1000) {
						return 0;
					}
			
					let afterAdd = burnTimeRemaining + amount;
					if (afterAdd > 1000) {
						if (!simulate) {
							coreTile.burnTimeRemaining = 1000;
							coreTile.setChanged();
						}
						return 1000 - burnTimeRemaining;
					} else {
						if (!simulate) {
							coreTile.burnTimeRemaining = afterAdd;
							coreTile.setChanged();
						}
						return amount;
					}
				}
				return 0;
			})
			.getMaxEnergyStored(be => 1000)
			.getEnergyStored(be => {
				let { coreTile } = be;
				if (coreTile) {
					return Math.max(coreTile.burnTimeRemaining, 0);
				}
				return 0;
			})
	);
})

TFCEvents.registerItemStackModifier(e => {
	e.withInput('kubejs:copy_nbt', (output, input) => {
		let { nbt } = input;
		if (nbt) {
			output.orCreateTag.merge(nbt);
		}
		return output;
	});
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerContainerEvent$Open', e => {
    try {
        let { container } = e;
        let { type } = container; // This throws instead of returning null
        e.entity.sendData('sort_init', {
            type: Utils.getRegistry('minecraft:menu').getId(type).toString() // Hopefully this arrives after the screen init event
        });
    } catch (ignored) {}
})
