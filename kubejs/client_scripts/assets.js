let types = ['normal', 'poor', 'rich']

let stones = ['granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt', 'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble']

let cube = 'minecraft:block/cube'

let gened = 'minecraft:item/generated'

let trackTypes = ['ascending', 'cross_d1_xo', 'cross_d1_zo', 'cross_d2_xo', 'cross_d2_zo', 'cross_diag', 'diag_2', 'diag']

let specialTrackTypes = ['teleport', 'cross_ortho', 'x_ortho', 'z_ortho']

let additionalTrackTypes = ['segment_left', 'segment_right', 'tie']

let blueprintTypes = ['bannerpatterns', 'bullet', 'components', 'electrode', 'molds', 'specialbullet']

onEvent('client.generate_assets', e => {
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
    e.addModel('block', 'kubejs:frame/capacitor_mv', m => {
        m.parent(cube)
        m.textures({
            up: 'kubejs:block/frame/capacitor_mv_top',
            down: 'immersiveengineering:block/metal_device/capacitor_mv_down_none',
            south: 'immersiveengineering:block/metal_device/capacitor_mv_side_none',
            north: '#south',
            east: '#south',
            west: '#south',
            particle: '#down'
        })
    })
    e.addModel('block', 'kubejs:frame/capacitor_hv', m => {
        m.parent(cube)
        m.textures({
            up: 'kubejs:block/frame/capacitor_hv_top',
            down: 'immersiveengineering:block/metal_device/capacitor_hv_down_none',
            south: 'immersiveengineering:block/metal_device/capacitor_hv_side_none',
            north: '#south',
            east: '#south',
            west: '#south',
            particle: '#down'
        })
    })
    e.addModel('block', 'kubejs:kinetic_adapter', m => {
        m.parent(cube)
        m.textures({
            up: 'kubejs:block/kinetic_adapter/top',
            down: 'kubejs:block/kinetic_adapter/bottom',
            north: 'kubejs:block/kinetic_adapter/side',
            south: '#north',
            east: '#north',
            west: '#north',
            particle: '#north'
        })
    })
    e.addModel('block', 'kubejs:stained-track/ascending', m => {
        m.parent('create:block/track/ascending')
        m.textures({
            particle: 'immersiveengineering:block/wooden_decoration/treated_wood_horizontal',
            '0': 'kubejs:block/stained_track/track',
            '1': 'kubejs:block/stained_track/track_mip'
        })
    })
    trackTypes.forEach(type => {
        e.addModel('block', `kubejs:stained_track/${type}`, m => {
            m.parent(`create:block/track/${type}`)
            m.textures({
                particle: 'immersiveengineering:block/wooden_decoration/treated_wood_horizontal',
                '0': 'kubejs:block/stained_track/track',
                '1': 'kubejs:block/stained_track/track_mip',
                '2': 'kubejs:block/stained_track/crossing'
            })
        })
    })
    specialTrackTypes.forEach(type => [
        e.addModel('block', `kubejs:stained_track/${type}`, m => {
            m.parent(`create:block/track/${type}`)
            m.textures({
                particle: 'immersiveengineering:block/wooden_decoration/treated_wood_horizontal',
                '1': 'kubejs:block/stained_track/track',
                '2': 'kubejs:block/stained_track/track_mip',
                '3': 'kubejs:block/stained_track/crossing'
            })
        })
    ])
    additionalTrackTypes.forEach(type => {
        e.addModel('block', `kubejs:track/stained_wood/${type}`, m => {
            m.parent(`create:block/track/${type}`)
            m.textures({
                particle: 'immersiveengineering:block/wooden_decoration/treated_wood_horizontal',
                '0': 'kubejs:block/stained_track/track',
                '1': 'kubejs:block/stained_track/track_mip'
            })
        })
    })
    e.addBlockState('kubejs:kinetic_adapter', vbsg => {
        vbsg.variant('', 'kubejs:block/kinetic_adapter')
    })
    e.addBlockState('kubejs:stained_wood_track', vbsg => {
        ['true', 'false'].forEach(water => {
            ['true', 'false'].forEach(turn => {
                // Yes, the explicit method declarations are required, Rhino sucks
                vbsg.variant(`shape=none,turn=${turn},waterlogged=${water}`, 'minecraft:block/air')
                vbsg.variant(`shape=zo,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/z_ortho')
                vbsg.variant(`shape=xo,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/x_ortho')
                vbsg.variant(`shape=pd,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/diag')
                vbsg.variant(`shape=nd,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/diag_2')
                vbsg['variant(java.lang.String,java.util.function.Consumer)'](`shape=an,turn=${turn},waterlogged=${water}`, v => v.model('kubejs:block/stained_track/ascending').y(180))
                vbsg.variant(`shape=as,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/ascending')
                vbsg['variant(java.lang.String,java.util.function.Consumer)'](`shape=ae,turn=${turn},waterlogged=${water}`, v => v.model('kubejs:block/stained_track/ascending').y(270))
                vbsg['variant(java.lang.String,java.util.function.Consumer)'](`shape=aw,turn=${turn},waterlogged=${water}`, v => v.model('kubejs:block/stained_track/ascending').y(90))
                vbsg['variant(java.lang.String,java.util.function.Consumer)'](`shape=tn,turn=${turn},waterlogged=${water}`, v => v.model('kubejs:block/stained_track/teleport').y(180))
                vbsg.variant(`shape=ts,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/teleport')
                vbsg['variant(java.lang.String,java.util.function.Consumer)'](`shape=te,turn=${turn},waterlogged=${water}`, v => v.model('kubejs:block/stained_track/teleport').y(270))
                vbsg['variant(java.lang.String,java.util.function.Consumer)'](`shape=tw,turn=${turn},waterlogged=${water}`, v => v.model('kubejs:block/stained_track/teleport').y(90))
                vbsg.variant(`shape=cr_o,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/cross_ortho')
                vbsg.variant(`shape=cr_d,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/cross_diag')
                vbsg.variant(`shape=cr_pdx,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/cross_d1_xo')
                vbsg.variant(`shape=cr_pdz,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/cross_d1_zo')
                vbsg.variant(`shape=cr_ndx,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/cross_d2_xo')
                vbsg.variant(`shape=cr_ndz,turn=${turn},waterlogged=${water}`, 'kubejs:block/stained_track/cross_d2_zo')
            })
        })
    })

    // Item
    e.addModel('item', 'kubejs:kinetic_adapter', m => {
        m.parent('kubejs:block/kinetic_adapter')
    })
    e.addModel('item', 'kubejs:stained_wood_track', m => {
        m.parent(gened)
        m.texture('layer0', 'kubejs:item/stained_wood_track')
    })
    blueprintTypes.forEach(type => {
        e.addModel('item', `kubejs:blueprint/${type}`, m => {
            m.parent(gened)
            m.texture('layer0', `kubejs:item/blueprint/${type}`)
        })
    })
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