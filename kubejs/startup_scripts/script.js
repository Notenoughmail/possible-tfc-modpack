// priority: 0

let types = ['normal', 'poor', 'rich']

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let sample_ores = ['bituminous_coal', 'lignite', 'kaolinite', 'graphite', 'gypsum', 'sulfur', 'cinnabar', 'cryolite', 'saltpeter', 'sylvite', 'borax', 'halite', 'kimberlite', 'emerald', 'lapis', 'copper', 'gold', 'hematite', 'silver', 'cassiterite', 'bismuthinite', 'garnierite', 'malachite', 'magnetite', 'limonite', 'sphalerite', 'tetrahedrite', 'lead', 'uranium', 'bauxite']

StartupEvents.registry('item', e => {
	types.forEach(type => {
		e.create('ore/' + type +'_lead')
			.tag('tfc:ore_pieces')
	})
	e.create('leather_pouch')
	e.create('dummy')
	e.create('mold/ingot')
	e.create('rod/lead')
		.tag('tfc:metal_item/lead')
		.tag('forge:rods')
		.tag('forge:rods/lead')
	e.create('double_ingot/lead')
		.tag('tfc:metal_item/lead')
		.tag('forge:double_ingots')
		.tag('forge:double_ingots/lead')
	e.create('rubber_sheet')
	e.create('rubber_bar')
	e.create('latex_clump')
	e.create('thermometer')
		.tag('curios:clip')
	e.create('iron_belt_clip')
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
	stones.forEach(rock => {
		types.forEach(type => {
			e.create('ore/' + type + '_lead/' + rock)
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
				.tagBlock('forge:ores/lead')
				.tagBlock('tfc:ore/lead/' + type)
				.renderType('cutout')
		})
	})
	sample_ores.forEach(ore => {
		e.create('sample_ore/' + ore)
			.noItem()
			.displayName('For render purposes')
	})
	e.create('ore/small_lead', 'tfc:ground_cover')
		.ore()
		.hardness(0.1)
		.tagBlock('tfc:can_be_snow_piled')
		.stoneSoundType()
		.mapColor('stone')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('tfc:breaks_when_isolated')
		.tagItem('tfc:small_ore_pieces')
		.tagItem('tfc:nuggets')
	e.create('frame/capacitor_mv') // Done this way to let the name be different in the lang file, as KubeJS's generated default overrides it
	e.create('frame/capacitor_hv') // + expandability for future frames if that's something that happens
	e.create('uranium_block')
		.randomTick(callback => { // In the future move this to block modification of 
			let pos = callback.block.pos;
			let entities = callback.level.getEntitiesWithin(AABB.ofBlocks(pos.offset(-7, -7, -7), pos.offset(7, 7, 7)));
			entities.forEach(entity => {
				let dist = entity.getDistance(pos);
				if (dist > 0) {
					let damage = 0;
					for (let i = 0 ; i < 2 ; i++) {
						if (callback.random.nextFloat() > 0.3 * (i + 1)) {
							damage += 0.8 / dist;
						}
					}
					entity.attack('wither', damage);
				}
			})
		})
		// .material('metal')
		.requiresTool(true)
		.resistance(8)
		.hardness(3.2)
		.displayName('Block of Uranium')
		.tagBlock('minecraft:mineable/pickaxe')
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
})

StartupEvents.registry('sound_event', e => {
	e.create('rocket')
})