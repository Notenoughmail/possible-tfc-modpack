global.clientConfig = {};
global.clientConfig.customization = {};
global.clientConfig.debug = {};

global.serverConfig = {};
global.serverConfig.debug = {};

global.commonConfig = {};

// There's no method to check/get the living entity so had to resort to this
const LivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity");
const CharcoalForge = Java.loadClass("net.dries007.tfc.common.blockentities.CharcoalForgeBlockEntity");
const FirePit = Java.loadClass("net.dries007.tfc.common.blockentities.AbstractFirepitBlockEntity");
const CharcoalForgeBlock = Java.loadClass("net.dries007.tfc.common.blocks.devices.CharcoalForgeBlock");
const FirePitBlock = Java.loadClass("net.dries007.tfc.common.blocks.devices.FirepitBlock");
const MCF = Java.loadClass("net.minecraftforge.common.MinecraftForge");
const Class = Java.loadClass("java.lang.Class");
const ChunkData = Java.loadClass("net.dries007.tfc.world.chunkdata.ChunkData");

ConfigsEvent.client(e => {
	e.setName('possible-tfc-pack-client');
	e.push('customization');
	e.comment('Determines the TFC temperature scale to be used when wearing a thermometer, forces COLOR if not wearing a thermometer');
	global.clientConfig.customization.thermometerScale = e.enumValue('thermometerTemperatureScale', 'Celsius', ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine']);
	e.pop();
	e.push('debug');
	global.clientConfig.debug.enabled = e.booleanValue('enabled', false);
})

ConfigsEvent.server(e => {
	e.setName('possible-tfc-pack-server');
	e.push('debug');
	e.comment('Enables server debug mode');
	global.serverConfig.debug.enabled = e.booleanValue('enabled', false)
	e.comment('Adds debug recipes')
	global.serverConfig.debug.debugRecipes = e.booleanValue('debugRecipes', true);
})

/*
CreateEvents.pipeFluidEffect(e => {
	e.add(Fluid.of('tfc:spring_water'), (pipe, fluid) => {
		let level = pipe.getWorld();
		let entities = level.getEntities(null, pipe.getAOE());
		if (level.random.nextInt(10) == 0) {
			entities.forEach(entity => {
				if (entity instanceof LivingEntity) {
					entity.heal(0.08);
				}
			})
		}
	})
})

CreateEvents.boilerHeatHandler(e => {
	e.add('kubejs:uranium_block', block => {
		return 0;
	})
	e.add('tfc:firepit', block => {
		if (!block.blockState.getValue(FirePitBlock.LIT)) {
			return -1;
		}
		let pit = block.getEntity();
		if (pit instanceof FirePit) {
			if (pit.getTemperature() < 100) {
				return -1;
			}
			return (pit.getTemperature() / 500);
		}
		return -1;
	})
	e.add('tfc:pot', block => {
		if (!block.blockState.getValue(FirePitBlock.LIT)) {
			return -1;
		}
		let pot = block.getEntity();
		if (pot instanceof FirePit) {
			if (pot.getTemperature() < 100) {
				return -1;
			}
			return (pot.getTemperature() / 500);
		}
		return -1;
	})
	e.add('tfc:grill', block => {
		if (!block.blockState.getValue(FirePitBlock.LIT)) {
			return -1;
		}
		let grill = block.getEntity();
		if (grill instanceof FirePit) {
			if (grill.getTemperature() < 100) {
				return -1;
			}
			return (grill.getTemperature() / 500);
		}
		return -1;
	})
	e.add('tfc:charcoal_forge', block => {
		if (block.blockState.getValue(CharcoalForgeBlock.HEAT) < 2) {
			return -1;
		}
		let forge = block.getEntity();
		if (forge instanceof CharcoalForge) {
			return (forge.getTemperature() / 500);
		}
		return -1;
	})
})
*/

// And they say you can't have nbt based textures!
ItemEvents.modelProperties(e => {
	// Yes, this is the event this must be called in, despite it being a startup event, when internally its a *client* event
	// if (Platform.isClientEnvironment()) {
	// 	let RenderTypeRegistry = Java.loadClass("dev.architectury.registry.client.rendering.RenderTypeRegistry");
	// 	let RenderType = Java.loadClass("net.minecraft.client.renderer.RenderType");
	// 	RenderTypeRegistry['register(net.minecraft.client.renderer.RenderType,net.minecraft.world.level.block.Block[])'](RenderType.cutoutMipped(), [STAINED_TRACK_BLOCK.get()]);
	// }
})

MoreJSEvents.registerPotionBrewing(e => {
	e.removeByPotion(null, null, null)
})

StartupEvents.init(e => {
	// MCF.EVENT_BUS['addListener(net.minecraftforge.eventbus.api.EventPriority,boolean,java.lang.Class,java.util.function.Consumer)'](
	// 	'lowest',
	// 	false,
	// 	Class.forName('com.simibubi.create.api.event.PipeCollisionEvent$Flow'),
	// 	/**
	// 	 * @param {Internal.PipeCollisionEvent$Flow} event 
	// 	 */
	// 	event => handlePipeCollision(event, event.firstFluid.arch$registryName(), event.secondFluid.arch$registryName())
	// );
	// MCF.EVENT_BUS['addListener(net.minecraftforge.eventbus.api.EventPriority,boolean,java.lang.Class,java.util.function.Consumer)'](
	// 	'lowest',
	// 	false,
	// 	Class.forName('com.simibubi.create.api.event.PipeCollisionEvent$Spill'),
	// 	/**
	// 	 * @param {Internal.PipeCollisionEvent$Spill} event 
	// 	 */
	// 	event => handlePipeCollision(event, event.worldFluid.arch$registryName(), event.pipeFluid.arch$registryName())
	// );
})

/**
 * @param {Internal.PipeCollisionEvent_} event 
 * @param {ResourceLocation} f0 
 * @param {ResourceLocation} f1 
 */
function handlePipeCollision(event, f0, f1) {
	event.setState(null);
	if (((f0 == 'minecraft:water' || f0 == 'minecraft:flowing_water') && (f1 == 'minecraft:lava' || f1 == 'minecraft:flowing_lava')) || ((f0 == 'minecraft:lava' || f0 == 'minecraft:flowing_lava') && (f1 == 'minecraft:water' || f1 == 'minecraft:flowing_water'))) {
		event.setState(waterLavaInteractionAtPosition(event.level, event.pos));
	}
}

/**
 * @param {Internal.PipeCollisionEvent_} event 
 * @param {ResourceLocation} block 
 */
function setEventState(event, block) {
	event.setState(Block.getBlock(block).defaultBlockState());
}

/**
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @returns 
 */
function waterLavaInteractionAtPosition(level, pos) {
	let chunkData = ChunkData.get(level, pos);
	let status = chunkData.status;
	if (status === status["FULL"]) {
		return chunkData.rockData.getRock(pos).hardened().defaultBlockState();
	} else {
		return Block.getBlock('tfc:rock/hardened/rhyolite').defaultBlockState();
	}
}