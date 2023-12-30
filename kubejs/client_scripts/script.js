// priority: 0

const IPParticleTypes = java("flaxbeard.immersivepetroleum.client.particle.IPParticleTypes");
const ClientTFCConfig = java("net.dries007.tfc.config.TFCConfig").CLIENT;
const HeatStyle = java("net.dries007.tfc.config.HeatTooltipStyle");

console.info('Hiding precious items')

let thermometerScaleMap = {
	C: HeatStyle['CELSIUS'],
	K: HeatStyle['KELVIN'],
	F: HeatStyle['FAHRENHEIT'],
	R: HeatStyle['RANKINE'],
	RGB: HeatStyle['COLOR']
}

onEvent('jei.hide.items', e => {
	e.hide('immersiveengineering:pickaxe_steel')
	e.hide('immersiveengineering:shovel_steel')
	e.hide('immersiveengineering:axe_steel')
	e.hide('immersiveengineering:hoe_steel')
	e.hide('immersiveengineering:sword_steel')
	e.hide('createaddition:copper_wire')
	e.hide('createaddition:iron_wire')
	e.hide('createaddition:gold_wire')
	e.hide('createaddition:copper_spool')
	e.hide('createaddition:gold_spool')
	e.hide('minecraft:chest_minecart')
	e.hide('minecraft:enchanting_table')
	e.hide('%brewing')
	e.hide('%combat')
	e.hide('%tools')
	e.hide('%food')
	e.hide(/minecraft:.*_spawn_egg/)
	e.hide(/tfc:spawn_egg.*/)
	e.hide(/minecraft:.*candle/)
	e.hide('minecraft:elytra')
	e.hide(/minecraft:.*_boat/)
	e.hide('minecraft:furnace_minecart')
	e.hide('createaddition:redstone_relay')
	e.hide('createaddition:connector')
	e.hide(/createaddition:.*cake.*/)
	e.hide('createaddition:zinc_sheet')
	e.hide('createaddition:accumulator')
	e.hide(/createaddition:.*_rod/)
	e.hide(/immersiveengineering:armor_steel_.*/)
	e.hide(/create:.*_sheet/)
	e.hide(/minecraft:raw_.*/)
	e.hide(/minecraft:.*copper_ore/)
	e.hide(/minecraft:.*_ingot/)
	e.hide(/minecraft:.*shulker_box/)
	e.hide('minecraft:composter')
	e.hide('minecraft:barrel')
	e.hide(/minecraft:.*campfire/)
	e.hide(/minecraft:.*lantern/)
	e.hide('immersiveengineering:gunpowder_barrel')
	e.hide('immersiveengineering:hemp_fiber')
	e.hide('immersiveengineering:seed')
	e.hide(/create:crushed_.*/)
	e.hide('immersiveengineering:fluid_pump')
	e.hide('minecraft:chorus_plant')
	e.hide('immersiveengineering:blastbrick')
	e.hide('immersiveengineering:slab_blastbrick')
	e.hide('immersiveengineering:blast_furnace')
	e.hide('immersiveposts:stick_gold')
	e.hide('immersiveposts:stick_copper')
	e.hide('immersiveposts:stick_silver')
	e.hide('immersiveposts:stick_nickel')
	e.hide(/minecraft:.*_ore/)
	e.hide('minecraft:stonecutter')
	e.hide('kubejs:dummy')
	e.hide('createaddition:capacitor')
	e.hide('createaddition:diamond_grit')
	e.hide('create:red_sand_paper')
	e.hide('immersiveengineering:stick_steel')
	e.hide('immersiveengineering:stick_iron')
	e.hide('immersiveengineering:ingot_silver')
	e.hide('immersiveengineering:ingot_nickel')
	e.hide('immersiveengineering:ingot_steel')
	e.hide('create:brass_ingot')
	e.hide('zinc_ingot')
	e.hide('create:schematicannon')
	e.hide('create:haunted_bell')
	e.hide('#forge:nuggets')
	e.hide('#forge:plates')
	e.hide(/(?:minecraft|create):.*(?:diorite|granite|dripstone|limestone|deespslate).*/)
	e.hide('createaddition:festive_spool')
	e.hide(/minecraft:infested_.+/)
	// e.hide(/minecraft:(?:polished_)?andesite(?:_(?:stairs|slab|wall))?$/)
	// e.hide(/create:(?:(?:cut|polished|small)_){0,2}andesite(?:_brick)?(?:_(?:stairs|slab|wall))?$/)
	e.hide('firmalife:embedded_pipe')
	e.hide('firmalife:squirting_moisture_transducer')
	e.hide('immersiveengineering:dust_hop_graphite')
	e.hide('immersiveengineering:metal_ladder_none')
	e.hide('tfc:pan/filled')
	e.hide('tfc:snow_pile')
	e.hide('tfc:ice_pile')
	e.hide('minecraft:dirt_path')
	e.hide(Item.of('minecraft:enchanted_book').ignoreNBT())
	e.hide(/minecraft:brick.+/)
	e.hide('immersiveengineering:potion')
	e.hide('immersiveengineering:homing')
	e.hide('immersiveengineering:wolfpack')
	e.hide(/createdeco:.+_(?:nugget|sheet|ingot)/)
	e.hide(/minecraft:.*(?:log|wood|planks|stem|hyphae|purpur|nether|sapling|leaves|sign|fence|prismarine).*/)
	e.hide(/.*netherite.*/)
	e.hide(/tfc:wood\/boat\/.+/)
	e.hide(/.*slab_vert.*/)
	e.hide(/createdeco:.*(?:iron|copper|gold)_sheet.*/)
	e.hide(/immersiveengineering:shader_bag.+/)
	e.hide('immersiveengineering:coke_dust')
	e.hide('create:experience_block')
	e.hide('minecraft:smoker')
	e.hide('immersivepetroleum:speedboat')
	e.hide(/immersivepetroleum:upgrade.+/)
	e.hide('immersiveengineering:dust_sulfur')
	e.hide('minecraft:experience_bottle')
	e.hide('create:potato_cannon')
	e.hide(/(?:create|immersiveengineering):.*raw.*/)
	e.hide(/immersiveengineering:(?:slab_)?(?:sheetmetal|storage)_(?:aluminum|uranium)/)
	e.hide('createaddition:rolling_mill')
	e.hide(/immersiveengineering:.*ore.*/)
	e.hide('immersiveengineering:gunpowder_barrel')
	e.hide('immersiveposts:fence_uranium')
	e.hide('minecraft:kelp')
	e.hide('minecraft:dried_kelp_block')
	e.hide('createaddition:bioethanol_bucket')
	e.hide('create:builders_tea')
	e.hide(/minecraft:.*basalt/)
})

onEvent('jei.add.items', e => {
	e.add('minecraft:cauldron')
	e.add('minecraft:rabbit_foot')
	e.add('minecraft:fermented_spider_eye')
	e.add('minecraft:bow')
	e.add('minecraft:arrow')
	e.add('minecraft:crossbow')
	e.add('minecraft:lead')
	e.add('minecraft:name_tag')
	e.add(Item.of('toolbelt:belt', '{Size:5}'))
	e.add('toolbelt:pouch')
	e.add('minecraft:flint_and_steel')
	e.add('minecraft:clock')
	e.add('minecraft:spyglass')
	e.add('minecraft:compass')
	e.add('minecraft:fishing_rod')
	e.add('minecraft:pumpkin_pie')
	e.add('minecraft:spider_eye')
	e.add('minecraft:rotten_flesh')
	e.add('minecraft:melon_slice')
	e.add('minecraft:leather_boots')
	e.add('minecraft:leather_chestplate')
	e.add('minecraft:leather_helmet')
	e.add('minecraft:leather_leggings')
	e.add('immersiveengineering:nugget_lead')
	e.add('immersiveengineering:nugget_steel')
	e.add('immersiveengineering:nugget_silver')
	e.add('immersiveengineering:nugget_constantan')
	e.add('create:netherite_diving_helmet')
	e.add('create:netherite_diving_boots')
	e.add('create:netherite_backtank')
	e.add('minecraft:netherite_leggings')
	e.add('immersiveengineering:raw_uranium')
	e.add('immersiveengineering:raw_aluminum')
	e.add('create:sturdy_sheet')
})

onEvent('jei.add.fluids', e => {
	e.add('create:tea')
})

onEvent('jei.remove.categories', e => {
	//console.log(e.getCategoryIds())
	e.remove('minecraft:anvil')
	e.remove('minecraft:blasting')
	e.remove('minecraft:brewing')
	e.remove('minecraft:campfire')
	e.remove('minecraft:compostable')
	e.remove('minecraft:fuel')
	e.remove('minecraft:furnace')
	e.remove('minecraft:smithing')
	e.remove('minecraft:smoking')
	e.remove('create:automatic_brewing')
	e.remove('create:fan_haunting')
	e.remove('create:mystery_conversion')
	e.remove('immersiveengineering:arcfurnace_recycling')
	e.remove('cobblegenrandomizer:basalt_gen')
	e.remove('cobblegenrandomizer:cobble_gen')
	e.remove('cobblegenrandomizer:stone_gen')
	e.remove('jeresources:dungeon')
	e.remove('jeresources:enchantment')
	e.remove('jeresources:villager')
	e.remove('minecraft:stonecutting')
	e.remove('jeresources:worldgen')
	e.remove('jeresources:plant')
})

let rocketList = null;

onEvent('client.tick', e => {
	let levelJS = e.level;
	if (rocketList == null || levelJS.time % 20 < 1) {
		rocketList = levelJS.entities.filter(entity => {
			return entity.type == "kubejs:rocket";
		});
	}
	if (rocketList != null) {
		rocketList.forEach(rocket => {
			levelJS.minecraftLevel.addParticle(IPParticleTypes.FLARE_FIRE, true, rocket.x, rocket.y, rocket.z, 0, -0.3, 0);
		});
	}
})

onEvent('player.data_from_server.thermometer', e => {
	let {data} = e;
	let scale = thermometerScaleMap['RGB'];
	if (data.hasThermometer) {
		scale = thermometerScaleMap[thermometerTemperatureScale];
	}
	if (ClientTFCConfig.heatTooltipStyle.get() != scale) {
		ClientTFCConfig.heatTooltipStyle.set(scale);
	}
})