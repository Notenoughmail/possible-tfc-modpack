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
			pool.survivesExplosion();
			pool.addItem('kubejs:rtg')
				.addFunction({
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
	e.addBlock('jumbofurnace:jumbo_furnace', lb => {
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('firmalife:metal/block/stainless_steel');
			pool.addCondition({
				condition: 'all_of',
				terms: [
					{
						condition: 'any_of',
						terms: [
							{
								condition: 'block_state_property',
								block: 'jumbofurnace:jumbo_furnace',
								properties: {
									y: '0'
								}
							},
							{
								condition: 'block_state_property',
								block: 'jumbofurnace:jumbo_furnace',
								properties: {
									y: '2'
								}
							}
						]
					},
					{
						condition: 'any_of',
						terms: [
							elecAssembNoY('0', { min: '0', max: '2' }),
							elecAssembNoY('2', { min: '0', max: '2' }),
							elecAssembNoY({ min: '0', max: '2' }, '0'),
							elecAssembNoY({ min: '0', max: '2' }, '2')
						]
					}
				]
			});
		});
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('ae2:interface');
			pool.addCondition(elecAssemb('1', '0', '1'));
		});
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('ae2:inscriber');
			pool.addCondition(elecAssemb('1', '1', '1'));
		});
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('thoriumreactors:redstone_processor');
			pool.addCondition(elecAssemb('1', '1', '1'));
		});
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('ae2:crafting_unit');
			pool.addCondition({
				condition: 'any_of',
				terms: [
					elecAssemb('0', '1', '1'),
					elecAssemb('2', '1', '1'),
					elecAssemb('1', '1', '0'),
					elecAssemb('1', '1', '2')
				]
			});
		});
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('tfc:metal/block/wrought_iron');
			pool.addCondition({
				condition: 'any_of',
				terms: [
					elecAssemb('0', '1', '0'),
					elecAssemb('0', '1', '2'),
					elecAssemb('2', '1', '0'),
					elecAssemb('2', '1', '2')
				]
			});
		});
		lb.addPool(pool => {
			pool.survivesExplosion();
			pool.addItem('ae2:energy_acceptor');
			pool.addCondition(elecAssemb('1', '2', '1'));
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

function elecAssemb(x, y, z) {
	return {
		condition: 'block_state_property',
		block: 'jumbofurnace:jumbo_furnace',
		properties: {
			'x': x,
			'y': y,
			'z': z
		}
	}
}

function elecAssembNoY(x, z) {
	return {
		condition: 'block_state_property',
		block: 'jumbofurnace:jumbo_furnace',
		properties: {
			'x': x,
			'z': z
		}
	}
}