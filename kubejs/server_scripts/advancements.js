// priority: 0

onEvent('server.datapack.first', e => {
    e.addJson('kubejs:advancements/root', {
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
})

/**
 * @param {String} icon 
 * @param {String} name 
 * @param {String} frame 'task', 'goal', or 'challenge'
 * @param {boolean} toast 
 * @param {boolean} announce 
 * @param {boolean} hidden 
 */
function display(icon, name, frame, toast, announce, hidden) {
    return {
        icon: {
            item: icon
        },
        title: {
            translate: 'kubejs.advancement.' + name + '.title'
        },
        description: {
            translate: 'kubejs.advancement.' + name + '.description'
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
function inv_change_crit_item(item) {
    return {
        trigger: 'minecraft:inventory_changed',
        conditions: {
            items: [
                {
                    item: item
                }
            ]
        }
    }
}

/**
 * @param {String} tag 
 */
function inv_change_crit_tag(tag) {
    return {
        trigger: 'minecraft:inventory_changed',
        conditions: {
            items: [
                {
                    tag: tag
                }
            ]
        }
    }
}