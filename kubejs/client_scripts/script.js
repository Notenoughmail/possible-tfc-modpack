// priority: 0

console.info('Loading client scripts')

onEvent('jei.hide.items', e => {
	e.hide('gunswithoutroses:hunger_bullet')
})