//priority: 0

ServerEvents.blockLootTables(e => {
	stones.forEach(rock => {
		ore_grades.forEach(type => {
			e.addSimpleBlock('kubejs:ore/' + type + '_lead/' + rock, 'kubejs:ore/' + type + '_lead')
		})
	})
})