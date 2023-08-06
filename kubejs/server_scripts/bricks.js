let brick_colors = ['red', 'worn', 'dusk', 'scarlet', 'blue', 'pearl', 'dean']

let crack_or_not = ['', 'cracked_', 'mossy_']

onEvent('recipes', e => {
    brick_colors.forEach(color => {
        crack_or_not.forEach(cracked => {
            e.shaped('4x createdeco:' + cracked + color + '_brick_stair', [
                'S  ',
                'SS ',
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_bricks'
            }).id('createdeco:crafting/' + cracked + color + '_brick_stair');
            e.recipes.tfcChisel('createdeco:' + cracked + color + '_brick_stair', 'createdeco:' + cracked + color + '_bricks', 'stair').id('createdeco:chisel/stair/' + cracked + color + '_brick');
            e.shaped('4x createdeco:' + cracked + color + '_brick_tiles_stair', [
                'S  ',
                'SS ',
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_brick_tiles'
            }).id('createdeco:crafting/' + cracked + color + '_brick_tiles_stair');
            e.recipes.tfcChisel('createdeco:' + cracked + color + '_brick_tiles_stair', 'createdeco:' + cracked + color + '_brick_tiles', 'stair').id('createdeco:chisel/stair/' + cracked + color + '_brick_tile');
            e.shaped('4x createdeco:' + cracked + color + '_long_brick_stair', [
                'S  ',
                'SS ',
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_long_bricks'
            }).id('createdeco:crafting/' + cracked + color + '_long_bricks');
            e.recipes.tfcChisel('createdeco:' + cracked + color + '_long_brick_stair', 'createdeco:' + cracked + color + '_long_bricks', 'stair').id('createdeco:chisel/stair/' + cracked + color + '_long_brick');
            e.shaped('4x createdeco:' + cracked + color + '_short_brick_stair', [
                'S  ',
                'SS ',
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_short_bricks'
            }).id('createdeco:crafting/' + cracked + color + '_short_bricks');
            e.recipes.tfcChisel('createdeco:' + cracked + color + '_short_brick_stair', 'createdeco:' + cracked + color + '_short_bricks', 'stair').id('kuebjs:chisel/stair/' + cracked + color + '_short_brick');
            e.shaped('6x createdeco:' + cracked + color + '_brick_slab', [
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_bricks'
            }).id('createdeco:crafting/' + cracked + color + '_brick_slab');
            e.recipes.tfcChisel('createdeco:' + cracked + color + '_brick_slab', 'createdeco:' + cracked + color + '_bricks', 'slab').extraDrop('createdeco:' + cracked + color + '_brick_slab').id('createdeco:chisel/slab/' + cracked + color + '_brick');
            e.shaped('1x createdeco:' + cracked + color + '_bricks', [
                'S',
                'S'
            ], {
                S: 'createdeco:' + cracked + color + '_brick_slab'
            }).id('createdeco:crafting/' + cracked + color + '_brick_slab_to_block');
            e.shaped('6x createdeco:' + cracked + color + '_brick_tiles_slab', [
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_brick_tiles'
            }).id('createdeco:crafting/' + cracked + color + '_brick_tiles_slab');
            e.recipes.tfcChisel('createdeco:' + cracked + color + '_brick_tiles_slab', 'createdeco:' + cracked + color + '_brick_tiles', 'slab').extraDrop('createdeco:' + cracked + color + '_brick_tiles_slab').id('createdeco:chisel/slab/' + cracked + color + '_brick_tile');
            e.shaped('1x createdeco:' + cracked + color + '_brick_tiles', [
                'S',
                'S'
            ], {
                S: 'createdeco:' + cracked + color + '_brick_tiles_slab'
            }).id('createdeco:crafting/' + cracked + color + '_brick_tiles_slab_to_block');
            e.shaped('6x createdeco:' + cracked + color + '_long_brick_slab', [
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_long_bricks'
            }).id('createdeco:crafting/' + cracked + color + '_long_brick_slab');
            e.recipes.tfcChisel('createdeco:' + cracked + color + '_long_brick_slab', 'createdeco:' + cracked + color + '_long_bricks', 'slab').extraDrop('createdeco:' + cracked + color + '_long_brick_slab').id('createdeco:chisel/slab/' + cracked + color + '_long_brick');
            e.shaped('1x createdeco:' + cracked + color + '_long_bricks', [
                'S',
                'S'
            ], {
                S: 'createdeco:' + cracked + color + '_long_brick_slab'
            }).id('createdeco:crafting/' + cracked + color + '_long_brick_slab_to_block');
            e.shaped('6x createdeco:' + cracked + color + '_short_brick_slab', [
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_short_bricks'
            }).id('createdeco:crafting/' + cracked + color + '_short_brick_slab');
            e.recipes.tfcChisel('createdeco:' + cracked + color + '_short_brick_slab', 'createdeco:' + cracked + color + '_short_bricks', 'slab').extraDrop('createdeco:' + cracked + color + '_short_brick_slab').id('createdeco:chisel/slab/' + cracked + color + '_short_brick');
            e.shaped('1x createdeco:' + cracked + color + '_short_bricks', [
                'S',
                'S'
            ], {
                S: 'createdeco:' + cracked + color + '_short_brick_slab'
            }).id('createdeco:crafting/' + cracked + color + '_short_brick_slab_to_block');
            e.shaped('6x createdeco:' + cracked + color + '_brick_wall', [
                'SSS',
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_bricks'
            }).id('createdeco:crafting/' + cracked + color + 'brick_wall');
            e.shaped('6x createdeco:' + cracked + color + '_brick_tiles_wall', [
                'SSS',
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_brick_tiles'
            }).id('createdeco:crafting/' + cracked + color + '_brick_tiles_wall');
            e.shaped('6x createdeco:' + cracked + color + '_long_brick_wall', [
                'SSS',
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_long_bricks'
            }).id('createdeco:crafting/' + cracked + color + '_long_brick_wall');
            e.shaped('6x createdeco:' + cracked + color + '_short_brick_wall', [
                'SSS',
                'SSS'
            ], {
                S: 'createdeco:' + cracked + color + '_short_bricks'
            }).id('createdeco:crafting/' + cracked + color + '_short_brick_wall');
            e.stonecutting('createdeco:' + cracked + color + '_brick_tiles', 'createdeco:' + cracked + color + '_bricks').id('createdeco:cutting/' + cracked + color + '_brick_tiles');
            e.stonecutting('createdeco:' + cracked + color + '_long_bricks', 'createdeco:' + cracked + color + '_bricks').id('createdeco:cutting/' + cracked + color + '_long_bricks');
            e.stonecutting('createdeco:' + cracked + color + '_short_bricks', 'createdeco:' + cracked + color + '_bricks').id('createdeco:cutting/' + cracked + color + '_shor_bricks');
        })
    })

    e.shaped('2x createdeco:red_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'minecraft:brick',
        A: 'tfc:mortar'
    }).id('createdeco:crafting/red_bricks');
    e.shaped('2x createdeco:worn_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:worn_brick',
        A: 'tfc:mortar'
    }).id('createdeco:crafting/worn_bricks');
    e.shaped('2x createdeco:dusk_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:dusk_brick',
        A: 'tfc:mortar'
    }).id('createdeco:crafting/dusk_bricks');
    e.shaped('2x createdeco:scarlet_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:scarlet_brick',
        A: 'tfc:mortar'
    }).id('createdeco:crafting/scarlet_bricks');
    e.shaped('2x createdeco:blue_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:blue_brick',
        A: 'tfc:mortar'
    }).id('createdeco:crafting/blue_bricks');
    e.shaped('2x createdeco:pearl_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:pearl_brick',
        A: 'tfc:mortar'
    }).id('createdeco:crafting/pearl_bricks');
    e.shaped('2x createdeco:dean_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:dean_brick',
        A: 'tfc:mortar'
    }).id('createdeco:crafting/dean_bricks');
})