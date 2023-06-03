let brick_colors = ['red', 'worn', 'dusk', 'scarlet', 'blue', 'pearl', 'dean']

let crack_or_not = ['', 'cracked_']

// You want moss?
// I should add a way to make other blocks 'mossy'
// It would be fairly easy for moss growing blocks
// But moss spreading blocks...
onEvent('block.registry', e => {
    brick_colors.forEach(color => {
        // Not mossy
        crack_or_not.forEach(crack => {
            // Normal
            e.create(crack + color + '_bricks', 'tfc:moss_growing_block')
                .mossyBlock('kubejs:mossy_' + color + '_bricks')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_bricks')
            e.create(crack + color + '_brick_stair', 'tfc:moss_growing_stair')
                .mossyStair('kubejs:mossy_' + color + '_brick_stair')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_bricks')
            e.create(crack + color + '_brick_slab', 'tfc:moss_growing_slab')
                .mossySlab('kubejs:mossy_' + color + '_brick_slab')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_bricks')
            e.create(crack + color + '_brick_wall', 'tfc:moss_growing_wall')
                .mossyWall('kubejs:mossy_' + color + '_brick_wall')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_bricks')
            // Tiles
            e.create(crack + color + '_brick_tiles', 'tfc:moss_growing_block')
                .mossyBlock('kubejs:mossy_' + color + '_brick_tiles')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_brick_tiles')
            e.create(crack + color + '_brick_tiles_stair', 'tfc:moss_growing_stair')
                .mossyStair('kubejs:mossy_' + color + '_brick_tiles_stair')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_brick_tiles')
            e.create(crack + color + '_brick_tiles_slab', 'tfc:moss_growing_slab')
                .mossySlab('kubejs:mossy_' + color + '_brick_tiles_slab')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_brick_tiles')
            e.create(crack + color + '_brick_tiles_wall', 'tfc:moss_growing_wall')
                .mossyWall('kubejs:mossy_' + color + '_brick_tiles_wall')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_brick_tiles')
            // Long
            e.create(crack + color + '_long_bricks', 'tfc:moss_growing_block')
                .mossyBlock('kubejs:mossy_' + color + '_long_bricks')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_long_bricks')
            e.create(crack + color + '_long_brick_stair', 'tfc:moss_growing_stair')
                .mossyStair('kubejs:mossy_' + color + '_long_brick_stair')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_long_bricks')
            e.create(crack + color + '_long_brick_slab', 'tfc:moss_growing_slab')
                .mossySlab('kubejs:mossy_' + color + '_long_brick_slab')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_long_bricks')
            e.create(crack + color + '_long_brick_wall', 'tfc:moss_growing_wall')
                .mossyWall('kubejs:mossy_' + color + '_long_brick_wall')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_long_bricks')
            // Short
            e.create(crack + color + '_short_bricks', 'tfc:moss_growing_block')
                .mossyBlock('kubejs:mossy_' + color + '_short_bricks')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_short_bricks')
            e.create(crack + color + '_short_brick_stair', 'tfc:moss_growing_stair')
                .mossyStair('kubejs:mossy_' + color + '_short_brick_stair')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_short_bricks')
            e.create(crack + color + '_short_brick_slab', 'tfc:moss_growing_slab')
                .mossySlab('kubejs:mossy_' + color + '_short_brick_slab')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_short_bricks')
            e.create(crack + color + '_short_brick_wall', 'tfc:moss_growing_wall')
                .mossyWall('kubejs:mossy_' + color + '_short_brick_wall')
                .textureAll('createdeco:block/palettes/bricks/' + color + '/' + crack + color + '_short_bricks')
        })
        // Mossy
        // Normal
        e.create('mossy_' + color + '_bricks', 'tfc:moss_spreading_block')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_bricks')
        e.create('mossy_' + color + '_brick_stair', 'tfc:moss_spreading_stair')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_bricks')
        e.create('mossy_' + color + '_brick_slab', 'tfc:moss_spreading_slab')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_bricks')
        e.create('mossy_' + color + '_brick_wall', 'tfc:moss_spreading_wall')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_bricks')
        // Tiles
        e.create('mossy_' + color + '_brick_tiles', 'tfc:moss_spreading_block')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_brick_tiles')
        e.create('mossy_' + color + '_brick_tiles_stair', 'tfc:moss_spreading_stair')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_brick_tiles')
        e.create('mossy_' + color + '_brick_tiles_slab', 'tfc:moss_spreading_slab')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_brick_tiles')
        e.create('mossy_' + color + '_brick_tiles_wall', 'tfc:moss_spreading_wall')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_brick_tiles')
        // Long
        e.create('mossy_' + color + '_long_bricks', 'tfc:moss_spreading_block')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_long_bricks')
         e.create('mossy_' + color + '_long_brick_stair', 'tfc:moss_spreading_stair')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_long_bricks')
        e.create('mossy_' + color + '_long_brick_slab', 'tfc:moss_spreading_slab')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_long_bricks')
        e.create('mossy_' + color + '_long_brick_wall', 'tfc:moss_spreading_wall')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_long_bricks')
        // Short
        e.create('mossy_' + color + '_short_bricks', 'tfc:moss_spreading_block')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_short_bricks')
         e.create('mossy_' + color + '_short_brick_stair', 'tfc:moss_spreading_stair')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_short_bricks')
        e.create('mossy_' + color + '_short_brick_slab', 'tfc:moss_spreading_slab')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_short_bricks')
        e.create('mossy_' + color + '_short_brick_wall', 'tfc:moss_spreading_wall')
            .textureAll('createdeco:block/palettes/bricks/' + color + '/mossy_' + color + '_short_bricks')
    })
})