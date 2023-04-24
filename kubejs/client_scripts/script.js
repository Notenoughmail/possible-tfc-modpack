// priority: 0

console.info('Hiding precious items')

onEvent('jei.hide.items', e => {
	e.hide('gunswithoutroses:hunger_bullet')
	e.hide('gunswithoutroses:blaze_bullet')
	e.hide('gunswithoutroses:iron_bullet')
	e.hide('gunswithoutroses:diamond_gatling')
	e.hide('gunswithoutroses:diamond_sniper')
	e.hide('gunswithoutroses:diamond_shotgun')
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
	e.hide('immersiveengineering:manual')
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
	e.hide(/railways:track_.*/)
	e.hide(/(?:minecraft|create):.*(?:diorite|granite|dripstone|limestone|deespslate).*/)
	e.hide('createaddition:festive_spool')
	e.hide(/minecraft:infested_.+/)
	// e.hide(/minecraft:(?:polished_)?andesite(?:_(?:stairs|slab|wall))?$/)
	// e.hide(/create:(?:(?:cut|polished|small)_){0,2}andesite(?:_brick)?(?:_(?:stairs|slab|wall))?$/)
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
	e.add('railways:track_coupler')
	e.add('railways:track_dark_oak')
	e.add('railways:track_monorail')
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