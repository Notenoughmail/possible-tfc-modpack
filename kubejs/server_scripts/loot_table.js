//priority: 0

onEvent('block.loot_tables', e => {
	stones.forEach(rock => {
		ore_grades.forEach(type => {
			e.addSimpleBlock('kubejs:ore/' + type + '_lead/' + rock, 'kubejs:ore/' + type + '_lead')
		})
	})
})