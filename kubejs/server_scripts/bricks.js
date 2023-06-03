let brick_colors = ['red', 'worn', 'dusk', 'scarlet', 'blue', 'pearl', 'dean']

let crack_or_not = ['', 'cracked_', 'mossy_']

onEvent('recipes', e => {
    brick_colors.forEach(color => {
        crack_or_not.forEach(cracked => {
            e.shaped('4x kubejs:' + cracked + color + '_brick_stair', [
                'S  ',
                'SS ',
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_bricks'
            }).id('kubejs:crafting/' + cracked + color + '_brick_stair');
            e.recipes.tfcChisel('kubejs:' + cracked + color + '_brick_stair', 'kubejs:' + cracked + color + '_bricks', 'stair').id('kubejs:chisel/stair/' + cracked + color + '_brick');
            e.shaped('4x kubejs:' + cracked + color + '_brick_tiles_stair', [
                'S  ',
                'SS ',
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_brick_tiles'
            }).id('kubejs:crafting/' + cracked + color + '_brick_tiles_stair');
            e.recipes.tfcChisel('kubejs:' + cracked + color + '_brick_tiles_stair', 'kubejs:' + cracked + color + '_brick_tiles', 'stair').id('kubejs:chisel/stair/' + cracked + color + '_brick_tile');
            e.shaped('4x kubejs:' + cracked + color + '_long_brick_stair', [
                'S  ',
                'SS ',
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_long_bricks'
            }).id('kubejs:crafting/' + cracked + color + '_long_bricks');
            e.recipes.tfcChisel('kubejs:' + cracked + color + '_long_brick_stair', 'kubejs:' + cracked + color + '_long_bricks', 'stair').id('kubejs:chisel/stair/' + cracked + color + '_long_brick');
            e.shaped('4x kubejs:' + cracked + color + '_short_brick_stair', [
                'S  ',
                'SS ',
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_short_bricks'
            }).id('kubejs:crafting/' + cracked + color + '_short_bricks');
            e.recipes.tfcChisel('kubejs:' + cracked + color + '_short_brick_stair', 'kubejs:' + cracked + color + '_short_bricks', 'stair').id('kuebjs:chisel/stair/' + cracked + color + '_short_brick');
            e.shaped('6x kubejs:' + cracked + color + '_brick_slab', [
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_bricks'
            }).id('kubejs:crafting/' + cracked + color + '_brick_slab');
            e.recipes.tfcChisel('kubejs:' + cracked + color + '_brick_slab', 'kubejs:' + cracked + color + '_bricks', 'slab').extraDrop('kubejs:' + cracked + color + '_brick_slab').id('kubejs:chisel/slab/' + cracked + color + '_brick');
            e.shaped('1x kubejs:' + cracked + color + '_bricks', [
                'S',
                'S'
            ], {
                S: 'kubejs:' + cracked + color + '_brick_slab'
            }).id('kubejs:crafting/' + cracked + color + '_brick_slab_to_block');
            e.shaped('6x kubejs:' + cracked + color + '_brick_tiles_slab', [
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_brick_tiles'
            }).id('kubejs:crafting/' + cracked + color + '_brick_tiles_slab');
            e.recipes.tfcChisel('kubejs:' + cracked + color + '_brick_tiles_slab', 'kubejs:' + cracked + color + '_brick_tiles', 'slab').extraDrop('kubejs:' + cracked + color + '_brick_tiles_slab').id('kubejs:chisel/slab/' + cracked + color + '_brick_tile');
            e.shaped('1x kubejs:' + cracked + color + '_brick_tiles', [
                'S',
                'S'
            ], {
                S: 'kubejs:' + cracked + color + '_brick_tiles_slab'
            }).id('kubejs:crafting/' + cracked + color + '_brick_tiles_slab_to_block');
            e.shaped('6x kubejs:' + cracked + color + '_long_brick_slab', [
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_long_bricks'
            }).id('kubejs:crafting/' + cracked + color + '_long_brick_slab');
            e.recipes.tfcChisel('kubejs:' + cracked + color + '_long_brick_slab', 'kubejs:' + cracked + color + '_long_bricks', 'slab').extraDrop('kubejs:' + cracked + color + '_long_brick_slab').id('kubejs:chisel/slab/' + cracked + color + '_long_brick');
            e.shaped('1x kubejs:' + cracked + color + '_long_bricks', [
                'S',
                'S'
            ], {
                S: 'kubejs:' + cracked + color + '_long_brick_slab'
            }).id('kubejs:crafting/' + cracked + color + '_long_brick_slab_to_block');
            e.shaped('6x kubejs:' + cracked + color + '_short_brick_slab', [
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_short_bricks'
            }).id('kubejs:crafting/' + cracked + color + '_short_brick_slab');
            e.recipes.tfcChisel('kubejs:' + cracked + color + '_short_brick_slab', 'kubejs:' + cracked + color + '_short_bricks', 'slab').extraDrop('kubejs:' + cracked + color + '_short_brick_slab').id('kubejs:chisel/slab/' + cracked + color + '_short_brick');
            e.shaped('1x kubejs:' + cracked + color + '_short_bricks', [
                'S',
                'S'
            ], {
                S: 'kubejs:' + cracked + color + '_short_brick_slab'
            }).id('kubejs:crafting/' + cracked + color + '_short_brick_slab_to_block');
            e.shaped('6x kubejs:' + cracked + color + '_brick_wall', [
                'SSS',
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_bricks'
            }).id('kubejs:crafting/' + cracked + color + 'brick_wall');
            e.shaped('6x kubejs:' + cracked + color + '_brick_tiles_wall', [
                'SSS',
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_brick_tiles'
            }).id('kubejs:crafting/' + cracked + color + '_brick_tiles_wall');
            e.shaped('6x kubejs:' + cracked + color + '_long_brick_wall', [
                'SSS',
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_long_bricks'
            }).id('kubejs:crafting/' + cracked + color + '_long_brick_wall');
            e.shaped('6x kubejs:' + cracked + color + '_short_brick_wall', [
                'SSS',
                'SSS'
            ], {
                S: 'kubejs:' + cracked + color + '_short_bricks'
            }).id('kubejs:crafting/' + cracked + color + '_short_brick_wall');
            e.stonecutting('kubejs:' + cracked + color + '_brick_tiles', 'kubejs:' + cracked + color + '_bricks').id('kubejs:cutting/' + cracked + color + '_brick_tiles');
            e.stonecutting('kubejs:' + cracked + color + '_long_bricks', 'kubejs:' + cracked + color + '_bricks').id('kubejs:cutting/' + cracked + color + '_long_bricks');
            e.stonecutting('kubejs:' + cracked + color + '_short_bricks', 'kubejs:' + cracked + color + '_bricks').id('kubejs:cutting/' + cracked + color + '_shor_bricks');
        })
    })

    e.shaped('2x kubejs:red_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'minecraft:brick',
        A: 'tfc:mortar'
    }).id('kubejs:crafting/red_bricks');
    e.shaped('2x kubejs:worn_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:worn_brick',
        A: 'tfc:mortar'
    }).id('kubejs:crafting/worn_bricks');
    e.shaped('2x kubejs:dusk_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:dusk_brick',
        A: 'tfc:mortar'
    }).id('kubejs:crafting/dusk_bricks');
    e.shaped('2x kubejs:scarlet_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:scarlet_brick',
        A: 'tfc:mortar'
    }).id('kubejs:crafting/scarlet_bricks');
    e.shaped('2x kubejs:blue_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:blue_brick',
        A: 'tfc:mortar'
    }).id('kubejs:crafting/blue_bricks');
    e.shaped('2x kubejs:pearl_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:pearl_brick',
        A: 'tfc:mortar'
    }).id('kubejs:crafting/pearl_bricks');
    e.shaped('2x kubejs:dean_bricks', [
        'SAS',
        'ASA',
        'SAS'
    ], {
        S: 'createdeco:dean_brick',
        A: 'tfc:mortar'
    }).id('kubejs:crafting/dean_bricks');
})