// priority: 0

console.info('Hiding precious items')

onEvent('jei.hide.items', e => {
	e.hide('gunswithoutroses:hunger_bullet')
	e.hide('gunswithoutroses:blaze_bullet')
	e.hide('gunswithoutroses:iron_bullet')
	e.hide('gunswithoutroses:diamond_gatling')
	e.hide('gunswithoutroses:diamond_sniper')
	e.hide('diamond_shotgun')
})