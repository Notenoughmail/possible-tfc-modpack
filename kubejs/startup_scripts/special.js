// priority: 0

// There's no method to check/get the living enity so had to resort to this
const LivingEntity = java("net.minecraft.world.entity.LivingEntity");
const CharcoalForge = java("net.dries007.tfc.common.blockentities.CharcoalForgeBlockEntity");
const FirePit = java("net.dries007.tfc.common.blockentities.AbstractFirepitBlockEntity");
const CharcoalForgeBlock = java("net.dries007.tfc.common.blocks.devices.CharcoalForgeBlock");
const FirePitBlock = java("net.dries007.tfc.common.blocks.devices.FirepitBlock");

onEvent('create.pipe.fluid_effect', e => {
	e.addFluidHandler(Fluid.of('tfc:spring_water'), (pipe, fluid) => {
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

onEvent('create.boiler.heater', e => {
	e.registerHeater('kubejs:uranium_block', (block) => {
		return 0;
	})
	e.registerHeater('tfc:firepit', (block) => {
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
	e.registerHeater('tfc:pot', (block) => {
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
	e.registerHeater('tfc:grill', (block) => {
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
	e.registerHeater('tfc:charcoal_forge', (block) => {
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

// And they say you can't have nbt based textures!
onEvent('item.model_properties', e => {
	e.register('immersiveengineering:blueprint', 'kubejs:blueprint', (stackJS, levelJS, entityJS, idInt) => {
		let NBT = stackJS.nbt;
		if (NBT.contains('blueprint')) {
			let value = NBT.get('blueprint').asString;
			if (value.localeCompare('molds') === 0) {
				return 0.1;
			}
			if (value.localeCompare('components') === 0) {
				return 0.2;
			}
			if (value.localeCompare('bullet') === 0) {
				return 0.3;
			}
			if (value.localeCompare('bannerpatterns') === 0) {
				return 0.4;
			}
			if (value.localeCompare('specialBullet') === 0) {
				return 0.5;
			}
			if (value.localeCompare('electrode') === 0) {
				return 0.6;
			}
		}
		return 0;
	})
})

onEvent('morejs.potion_brewing.register', e => {
	e.removeByPotion(null, null, null)
})

onEvent('tfc.start_fire', e => {
	let { level, block } = e;
	let below = block.down;
	if (block.id === 'create:fluid_tank' && CharcoalForgeBlock.isValid(level.minecraftLevel, below.pos) && e.isStrong()) {
		let be = below.entity;
		if (be instanceof CharcoalForge && be.light(below.blockState)) {
			e.cancel();
		}
	}
})