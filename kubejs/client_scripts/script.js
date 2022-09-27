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
})

onEvent('jei.add.items', e => {
	e.add('minecraft:cauldron')
	e.add('minecraft:rabbit_foot')
	e.add('minecraft:fermented_spider_eye')
})