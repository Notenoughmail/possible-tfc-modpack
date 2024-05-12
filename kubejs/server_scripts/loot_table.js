//priority: 0

ServerEvents.blockLootTables(e => {
	TFC.misc.rock.keySet().forEach(rock => {
		global.oreGrades.forEach(grade => {
			global.gradedOres.forEach(ore => {
				e.addSimpleBlock(`kubejs:ore/${grade}_${ore}/${rock}`, `kubejs:ore/${grade}_${ore}`);
			});
		});
		global.ungradedOres.forEach(ore => {
			e.addSimpleBlock(`kubejs:ore/${ore}/${rock}`, `kubejs:ore/${ore}`);
		});
	});

	e.addBlock(['kubejs:lithium_salt', 'kubejs:lithium_slat_grass'], lb => {
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('kubejs:lithium_salt_clump', 1, [1, 3]);
		});
	});
})