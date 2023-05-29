// priority: 0

// There's no method to check/get the living enity so had to resort to this
const LivingEntity = java("net.minecraft.world.entity.LivingEntity")
// Class filter needs to be disabled
const CharcoalForge = java("net.dries007.tfc.common.blockentities.CharcoalForgeBlockEntity");
const FirePit = java("net.dries007.tfc.common.blockentities.AbstractFirepitBlockEntity");

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
	e.registerHeater('immersiveengineering:storage_uranium', (block) => {
		return 0;
	})
	e.registerHeater('tfc:firepit', (block) => {
		let pit = block.getEntity();
		if (pit instanceof FirePit) {
			return (pit.getTemperature() / 500) - 1;
		}
		return -1;
	})
	e.registerHeater('tfc:pot', (block) => {
		let pot = block.getEntity();
		if (pot instanceof FirePit) {
			return (pot.getTemperature() / 500) -1;
		}
		return -1;
	})
	e.registerHeater('tfc:grill', (block) => {
		let grill = block.getEntity();
		if (grill instanceof FirePit) {
			return (grill.getTemperature() / 500) - 1;
		}
		return -1;
	})
	e.registerHeater('tfc:charcoal_forge', (block) => {
		let forge = block.getEntity();
		if (forge instanceof CharcoalForge) {
			return (forge.getTemperature() / 500) - 1;
		}
		return -1;
	})
})