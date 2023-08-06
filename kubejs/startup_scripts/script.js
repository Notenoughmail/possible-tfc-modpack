// priority: 0

let types = ['normal', 'poor', 'rich']

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let sample_ores = ['bituminous_coal', 'lignite', 'kaolinite', 'graphite', 'gypsum', 'sulfur', 'cinnabar', 'cryolite', 'saltpeter', 'sylvite', 'borax', 'halite', 'kimberlite', 'emerald', 'lapis', 'copper', 'gold', 'hematite', 'silver', 'cassiterite', 'bismuthinite', 'garnierite', 'malachite', 'magnetite', 'limonite', 'sphalerite', 'tetrahedrite', 'lead', 'uranium', 'bauxite']

onEvent('item.registry', e => {
	types.forEach(type => {
		e.create('ore/' + type +'_lead')
			.tag('tfc:ore_pieces')
	})
	e.create('leather_pouch')
	e.create('dummy')
	e.create('mold/ingot')
	e.create('metal/double_ingot/constantan')
		.tag('tfc:metal_item/constantan')
		.tag('forge:double_ingots')
		.tag('forge:double_ingots/constantan')
	e.create('metal/double_ingot/electrum')
		.tag('tfc:metal_item/electrum')
		.tag('forge:double_ingots')
		.tag('forge:double_ingots/electrum')
	e.create('metal/double_ingot/lead')
		.tag('tfc:metal_item/lead')
		.tag('forge:double_ingots')
		.tag('forge:double_ingots/lead')
	e.create('sheet/graphite')
		.tag('forge:sheets')
		.tag('tfc:metal_item/graphite')
		.tag('tfc:pileable_sheets')
	e.create('composite_catalyst')
	e.create('sequence/light_component', 'create:sequenced_assembly')
	e.create('sequence/heavy_component', 'create:sequenced_assembly')
	e.create('sequence/heavy_engineering', 'create:sequenced_assembly').parentModel('immersiveengineering:item/light_engineering')
	e.create('sequence/coke_brick', 'create:sequenced_assembly').parentModel('tfc:item/fire_bricks')
	e.create('sequence/mv_capacitor', 'create:sequenced_assembly').parentModel('kubejs:item/frame/capacitor_mv')
	e.create('sequence/hv_capacitor', 'create:sequenced_assembly').parentModel('kubejs:item/frame/capacitor_hv')
})

onEvent('item.modification', e => {
	e.modify('immersiveengineering:glider', item => {
		item.maxDamage = 500
	})
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

onEvent('block.registry', e => {
	stones.forEach(rock => {
		types.forEach(type => {
			e.create('ore/' + type + '_lead/' + rock)
				.material('stone')
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
	e.create('ore/small_lead', 'tfc:groundcover')
		.ore()
		.model("kubejs:block/ore/small_lead")
		.hardness(0.1)
		.tagBlock('tfc:can_be_snow_piled')
		.material('stone')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('immersiveengineering:mineable/drill')
		.tagBlock('tfc:breaks_when_isolated')
		.tagItem('tfc:small_ore_pieces')
		.tagItem('tfc:nuggets')
	e.create('frame/capacitor_mv')//done this way to let the name be different in the lang file, as KubeJS's generated default overrides it
	e.create('frame/capacitor_hv')//+ expandability for future frames if that's something that happens
	e.create('uranium_block')
		.model('immersiveengineering:block/storage_uranium')
		.randomTick(callback => {
			let pos = callback.block.pos;
			let entities = callback.level.getEntitiesWithin(AABB.ofBlocks(pos.offset(-5, -5, -5), pos.offset(5, 5, 5)));
			entities.forEach(entity => {
				if (callback.random.nextFloat() < 0.7) {
					entity.attack('wither', 0.3);
				}
			})
		})
		.material('metal')
		.requiresTool(true)
		.resistance(8)
		.hardness(3.2)
		.displayName('Block of Uranium')
		.tagBlock('minecraft:mineable/pickaxe')
})

onEvent('fluid.registry', e => {
	e.create('constantan')
		.thickTexture(0xfc8d6f)
		.bucketColor(0xfc8d6f)
		.displayName('Molten Constantan')
		.tag('tfc:molten_metals')
		.tag('tfc:constantan')
	e.create('electrum')
		.thickTexture(0xf4e388)
		.bucketColor(0xf4e388)
		.displayName('Molten Electrum')
		.tag('tfc:molten_metals')
		.tag('tfc:electrum')
	e.create('lead')
		.thickTexture(0x4c5163)
		.bucketColor(0x4c5163)
		.displayName('Molten Lead')
		.tag('tfc:molten_metals')
		.tag('tfc:lead')
	e.create('jutecrete')
		.thinTexture(0x34342f)
		.bucketColor(0x34342f)
		.displayName('Liquid Jutecrete')
		.noBlock()
		.noBucket()
	e.create('graphite')
		.thickTexture(0x101010)
		.bucketColor(0x101010)
		.displayName('Molten Graphite')
		.noBlock()
		.noBucket()
		.tag('tfc:molten_metals')
		.tag('tfc:graphite')
	e.create('unrefined_graphite')
		.thickTexture(0x080a08)
		.bucketColor(0x080a08)
		.displayName('Unrefined Molten Graphite')
		.noBlock()
		.noBucket()
		.tag('tfc:molten_metals')
		.tag('tfc:unrefined_graphite')
	e.create('diluted_milk')
		.thinTexture(0xc3ccdb)
		.bucketColor(0xc3ccdb)
		.displayName('Diluted Milk')
		.noBlock()
		.noBucket()
		.tag('tfc:usable_in_wooden_bucket')
		.tag('tfc:usable_in_barrel')
	e.create('alumina')
		.thinTexture(0xcbcfd6)
		.bucketColor(0xcbcfd6)
		.displayName('Alumina Solution')
		.noBlock()
		.noBucket()
	e.create('asphalt')
		.thinTexture(0x1f1919)
		.bucketColor(0x1f1919)
		.displayName('Molten Asphalt')
		.noBlock()
		.noBucket()
		.tag('kubejs:asphalt')
})