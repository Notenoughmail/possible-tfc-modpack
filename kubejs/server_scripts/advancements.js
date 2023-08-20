// priority: 0

onEvent('server.datapack.first', e => {
    e.addJson(adv('root'), {
        criteria: {
            'tick': {
                trigger: 'minecraft:tick'
            }
        },
        display: display('kubejs:sheet/graphite', 'root', 'task', true, false, false),
        requirements: [
            [
                'tick'
            ]
        ]
    })
    e.addJson(adv('comp_material'), {
        parent: 'tfc:story/bloomery',
        criteria: {
            'item': invChangeCriteriaItem('create:andesite_alloy')
        },
        display: display('create:andesite_alloy', 'compmat', 'task', true, false, false),
        requirements: [
            [
                'item'
            ]
        ]
    })
    e.addJson(adv('comp_casing'), {
        parent: 'kubejs:comp_material',
        criteria: {
            'item': invChangeCriteriaItem('create:andesite_casing')
        },
        display: displayOverride('create:andesite_casing', advTransCreate('andesite_casing'), advTransCreate('andesite_casing.desc'), 'task', true, false, false),
        requirements: [
            [
                'item'
            ]
        ]
    })
    e.addJson(adv('adapter'), {
        parent: 'kubejs:comp_casing',
        criteria: {
            'item': invChangeCriteriaItem('kubejs:kinetic_adapter')
        },
        display: display('kubejs:kinetic_adapter', 'adapter', 'goal', true, true, false),
        requirements: [
            [
                'item'
            ]
        ]
    })
    e.addJson(adv('water_wheel'), {
        parent: 'kubejs:comp_material',
        criteria: {
            'wheel': {
                trigger: 'create:water_wheel_builtin',
                conditions: {}
            }
        },
        display: displayOverride('create:water_wheel', advTransCreate('water_wheel'), advTransCreate('water_wheel.desc'), 'task', true, false, false),
        requirements: [
            [
                'wheel'
            ]
        ]
    })
    e.addJson(adv('fan'), {
        parent: 'tfc:story/iron_age',
        criteria: {
            'fan': {
                trigger: 'create:encased_fan_builtin',
                conditions: {}
            }
        },
        display: displayOverride('create:encased_fan', advTransCreate('encased_fan'), advTransCreate('encased_fan.desc'), 'task', true, false, false),
        requirements: [
            [
                'fan'
            ]
        ]
    })
    e.addJson(adv('press'), {
        parent: 'tfc:story/iron_age',
        criteria: {
            'press': {
                trigger: 'create:compacting_builtin',
                conditions: {}
            }
        },
        display: displayOverride('create:mechanical_press', advTransCreate('compacting'), advTransCreate('compacting.desc'), 'task', true, false, false),
        requirements: [
            [
                'press'
            ]
        ]
    })
    e.addJson(adv('saw'), {
        parent: 'tfc:story/iron_age',
        criteria: {
            'saw': {
                trigger: 'create:saw_processing_builtin',
                conditions: {}
            }
        },
        display: displayOverride('create:mechanical_saw', advTransCreate('saw_processing'), advTransCreate('saw_processing.desc'), 'task', true, false, false),
        requirements: [
            [
                'saw'
            ]
        ]
    })
    e.addJson(adv('electric_saw'), {
        parent: 'kubejs:saw',
        criteria: {
            'form': multiblockFormCriteria('sawmill')
        },
        display: display('immersiveengineering:sawmill','sawmill', 'challenge', true, true, false),
        requirements: [
            [
                'form'
            ]
        ]
    })
    e.addJson(adv('mixer'), {
        parent: 'tfc:story/iron_age',
        criteria: {
            'mixer': {
                trigger: 'create:mechanical_mixer_builtin',
                conditions: {}
            }
        },
        display: displayOverride('create:mechanical_mixer', advTransCreate('mechanical_mixer'), advTransCreate('mechanical_mixer.desc'), 'task', true, false, false),
        requirements: [
            [
                'mixer'
            ]
        ]
    })
    e.addJson(adv('electric_mixer'), {
        parent: 'kubejs:mixer',
        criteria: {
            'form': multiblockFormCriteria('mixer')
        },
        display: displayOverride('immersiveengineering:mixer', 'kubejs.advancement.electric_mixer.title', advTransImmer('mb_mixer.desc'), 'challenge', true, true, false),
        requirements: [
            [
                'form'
            ]
        ]
    })
    e.addJson(adv('copper_pipe'), {
        parent: 'tfc:story/copper_age',
        criteria: {
            'item': invChangeCriteriaItem('create:fluid_pipe')
        },
        display: display('create:fluid_pipe', 'copper_pipe', 'goal', false, false, false),
        requirements: [
            [
                'item'
            ]
        ]
    })
    e.addJson(adv('pump'), {
        parent: 'kubejs:copper_pipe',
        criteria: {
            'pump': {
                trigger: 'create:mechanical_pump_0_builtin',
                conditions: {}
            }
        },
        display: displayOverride('create:mechanical_pump', advTransCreate('mechanical_pump_0'), advTransCreate('mechanical_pump_0.desc'), 'task', true, false, false),
        requirements: [
            [
                'pump'
            ]
        ]
    })
    e.addJson(adv('valve'), {
        parent: 'kubejs:copper_pipe',
        criteria: {
            'item': invChangeCriteriaItem('create:fluid_valve')
        },
        display: display('create:fluid_valve', 'valve', 'goal', true, false, false),
        requirements: [
            [
                'item'
            ]
        ]
    })
    e.addJson(adv('smart_pipe'), {
        parent: 'kubejs:copper_pipe',
        criteria: {
            'item': invChangeCriteriaItem('create:smart_fluid_pipe')
        },
        display: display('create:smart_fluid_pipe', 'smart_pipe', 'goal', true, false, false),
        requirements: [
            [
                'item'
            ]
        ]
    })
})

/**
 * @param {String} path 
 */
function adv(path) {
    return 'kubejs:advancements/' + path;
}

/**
 * @param {String} path 
 */
function advTransCreate(path) {
    return 'advancement.create.' + path;
}

/**
 * @param {String} path 
 */
function advTransImmer(path) {
    return 'advancement.immersiveengineering.' + path;
}

/**
 * @param {String} icon 
 * @param {String} name 
 * @param {String} frame 'task', 'goal', or 'challenge'
 * @param {boolean} toast 
 * @param {boolean} announce 
 * @param {boolean} hidden 
 */
function display(icon, name, frame, toast, announce, hidden) {
    return displayOverride(icon, 'kubejs.advancement.' + name + '.title', 'kubejs.advancement.' + name + '.description', frame, toast, announce, hidden)
}

/**
 * @param {String} icon 
 * @param {String} title 
 * @param {String} desc 
 * @param {String} frame 'task', 'goal', or 'challenge'
 * @param {boolean} toast 
 * @param {boolean} announce 
 * @param {boolean} hidden 
 */
function displayOverride(icon, title, desc, frame, toast, announce, hidden) {
    return {
        icon: {
            item: icon
        },
        title: {
            translate: title
        },
        description: {
            translate: desc
        },
        frame: frame,
        show_toast: toast,
        announce_to_chat: announce,
        hidden: hidden,
        background: 'kubejs_tfc:textures/block/metal/full/kubejs_lead.png'
    }
}

/**
 * @param {String} item 
 */
function invChangeCriteriaItem(item) {
    return {
        trigger: 'minecraft:inventory_changed',
        conditions: {
            items: [
                {
                    items: [
                        item
                    ]
                }
            ]
        }
    }
}

/**
 * @param {String} tag 
 */
function invChangeCriteriaTag(tag) {
    return {
        trigger: 'minecraft:inventory_changed',
        conditions: {
            items: [
                {
                    // May be broken, like item was
                    tag: tag
                }
            ]
        }
    }
}

/**
 * @param {String} name 
 */
function multiblockFormCriteria(name) {
    return {
        conditions: {
            item: {
                items: [
                    'immersiveengineering:hammer'
                ]
            },
            multiblock: `immersiveengineering:multiblocks/${name}`
        },
        trigger: 'immersiveengineering:multiblock_formed'
    }
}