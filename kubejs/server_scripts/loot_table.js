//priority: 0

ServerEvents.blockLootTables(e => {

	e.addBlock(['kubejs:lithium_salt', 'kubejs:lithium_slat_grass'], lb => {
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('kubejs:lithium_salt_clump', 1, {min: 1, max: 3});
		});
	});

	e.addBlock('ae2:flawed_budding_quartz', lb => {
		lb.addPool(pool => {
			pool.addEntry({
				type: 'minecraft:alternatives',
				children: [
					needsItems(['tfc:gem_saw'], 'ae2:flawed_budding_quartz'),
					survivesExplosion('ae2:chipped_budding_quartz')
				]
			});
		});
	});
	e.addBlock('ae2:chipped_budding_quartz', lb => {
		lb.addPool(pool => {
			pool.addEntry({
				type: 'minecraft:alternatives',
				children: [
					needsItems(['tfc:gem_saw'], 'ae2:chipped_budding_quartz'),
					survivesExplosion('ae2:damaged_budding_quartz')
				]
			});
		});
	});
	e.addBlock('ae2:damaged_budding_quartz', lb => {
		lb.addPool(pool => {
			pool.addEntry({
				type: 'minecraft:alternatives',
				children: [
					needsItems(['tfc:gem_saw'], 'ae2:damaged_budding_quartz'),
					survivesExplosion('ae2:quartz_block')
				]
			});
		});
	});
	e.addBlock('kubejs:rtg', lb => {
		lb.addPool(pool => {
			pool.survivesExplosion()
			pool.addItem('kubejs:rtg').addFunction({
				function: 'minecraft:copy_nbt',
				source: 'block_entity',
				ops: [
					{
						source: '',
						target: 'BlockEntityTag',
						op: 'replace'
					}
				]
			});
		});
	});
})

/**
 * @param {string} name 
 */
function survivesExplosion(value) {
	return JsonIO.of({
		type: 'minecraft:item',
		conditions: [
			{
				condition: 'minecraft:survives_explosion'
			}
		],
		name: value
	});
}

/**
 * @param {string[]} needs Yes, this must be an array
 * @param {string} value 
 */
function needsItems(needs, value) {
	return JsonIO.of({
		type: 'minecraft:item',
		conditions: [
			{
				condition: 'minecraft:match_tool',
				predicate: {
					items: needs
				}
			}
		],
		name: value
	});
}