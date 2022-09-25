//priority: 0

console.info('Loading loot table scripts')

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let types = ['normal', 'poor', 'rich']

onEvent('block.loot_tables', e => {
	e.addSimpleBlock('create:blaze_burner', 'create:empty_blaze_burner')
	stones.forEach(rock => {
		types.forEach(type => {
			e.addSimpleBlock('kubejs:ore/' + type + '_lead/' + rock, 'kubejs:ore/' + type + '_lead')
		})
	})
})