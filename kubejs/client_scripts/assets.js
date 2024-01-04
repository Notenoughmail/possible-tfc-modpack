let types = ['normal', 'poor', 'rich']

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let cube = 'minecraft:block/cube'

ClientEvents.highPriorityAssets(e => {
    // Block
	stones.forEach(rock => {
		types.forEach(type => {
			e.addModel('block', `kubejs:ore/${type}_lead/${rock}`, m => {
				m.parent('tfc:block/ore')
                m.textures({
                    all: `tfc:block/rock/raw/${rock}`,
                    particle: `tfc:block/rock/raw/${rock}`,
                    overlay: `kubejs:block/ore/${type}_lead`
                })
			})
		})
	})

    // Item
    e.addModel('item', 'kubejs:ore/small_lead', m => {
        m.parent(gened)
        m.texture('layer0', 'kubejs:item/ore/small_lead')
    })

    // Sound
    e.add('kubejs:sounds', {
        rocket: {
            category: 'master',
            sounds: [
                'kubejs:rocket'
            ],
            subtitle: 'subtitle.kubejs.rocket'
        }
    })
})