//priority: 0

console.info('Loading loot table scripts')

onEvent('block.loot_tables', e => {
	e.addSimpleBlock('create:blaze_burner', 'create:empty_blaze_burner')
	stones.forEach(rock => {
		ore_grades.forEach(type => {
			e.addSimpleBlock('kubejs:ore/' + type + '_lead/' + rock, 'kubejs:ore/' + type + '_lead')
		})
	})
})