
const TFCMultiBlock = Java.loadClass('net.dries007.tfc.util.MultiBlock');
const JumboFurnaceMultiBlock = Java.loadClass('commoble.jumbofurnace.jumbo_furnace.MultiBlockHelper');
const Inventory = Java.loadClass('net.minecraft.world.entity.player.Inventory');

PlayerEvents.loggedIn(e => {
	let { player } = e;
	let data = player.persistentData;
	
	if (data.contains('rocketIds')) {
		data.remove('rocketIds');
	}
	
	let thermoIndex = -1;
	player.getCapability(CuriosCapabilities.INVENTORY).ifPresent(curio => {
		thermoIndex = curio.equippedCurios.find('kubejs:thermometer');
	});
	player.sendData('curios', {
		hasThermometer: (thermoIndex != -1)
	});
})

PlayerEvents.respawned(e => {
	let { player } = e;

	let thermoIndex = -1;
	player.getCapability(CuriosCapabilities.INVENTORY).ifPresent(curio => {
		thermoIndex = curio.equippedCurios.find('kubejs:thermometer');
	});
	player.sendData('curios', {
		hasThermometer: (thermoIndex != -1)
	});
})

// Done here because the cardinal type does not implement the onPlace callback
TFC.misc.wood.keySet().forEach(wood => {
	BlockEvents.placed(`kubejs:panel/${wood}`, e => {
		let { player, block } = e;
		if (player.shiftKeyDown) {
			let { blockState, level, pos } = block;
			let dir = blockState.getValue(BlockProperties.HORIZONTAL_FACING);
			let rotated = blockState.setValue(BlockProperties.HORIZONTAL_FACING, dir.opposite);
			block.setBlockState(rotated, 3);
		}
	});
});

NetworkEvents.dataReceived('sort', e => {
    let { player, data } = e;
    if (allowedMenus[data.type] != -1) {
        let { containerMenu } = player;
        let containers = {}; // Usually will only be 1 container per menu, but can never be too careful
        containerMenu.slots.forEach(slot => {
            let { container } = slot;
            if (!(container instanceof Inventory)) {
                if (!containers[container]) {
                    containers[container] = {
                       list: Utils.newList(),
                       cont: container
                    }
                }
                let stack = slot.remove(64);
                if (!stack.empty) {
                    containers[container].list.add(stack);
                }
            }
        });
        for (let container in containers) {
            containers[container].list.sort((stack0, stack1) => stack0.item.idLocation.compareTo(stack1.item.idLocation));
            containers[container].list.forEach(stack => {
                containers[container].cont.insertItem(stack, false);
            });
        }
    }
})

const allowedMenus = [
    'minecraft:generic_3x3',
    'minecraft:generic_9x3',
    'minecraft:generic_9x6',
    'minecraft:shulker_box',
    'tfc:chest_9x2',
    'tfc:chest_9x4',
    'computercraft:turtle'
]

BlockEvents.rightClicked('ae2:crafting_unit', e => {
    let { level, block, player } = e;
    if (!level.clientSide && player.getItemInHand('main_hand').is('thoriumreactors:redstone_processor')) {
        let dirs = ['east', 'west', 'north', 'south'];
        for (let dir in dirs) {
            let relative = block.offset(dirs[dir]);
            if (relative.id == 'ae2:inscriber' && ELECTRONICS_ASSEMBLER_STRUCTURE.get().test(level, relative.pos)) {
                let { pos } = relative;
                let placementStates = JumboFurnaceMultiBlock.getStatesForPlacementIfPermitted(level.dimensionKey, level, pos, block.blockState, player);
                if (!placementStates.empty) {
                    placementStates.forEach(pair => level.setBlockAndUpdate(pair.first, pair.second));
                    if (player != null) {
                        if (!player.abilities.instabuild) {
                            player.getItemInHand('main_hand').shrink(1);
                        }
                        player.swing('main_hand');
                        player.sendData('swing');
                    }
                    break;
                }
            }
        }
    }
})

const ELECTRONICS_ASSEMBLER_STRUCTURE = Utils.lazy(() => new TFCMultiBlock()
    .match([0, 0, 0], BlockStatePredicate.fromString('ae2:inscriber'))
    .match([0, 1, 0], BlockStatePredicate.fromString('ae2:energy_acceptor'))
    .match([0, -1, 0], BlockStatePredicate.fromString('ae2:interface'))
    .match([-1, 0, -1], BlockStatePredicate.fromString('tfc:metal/block/wrought_iron'))
    .match([-1, 0, 0], BlockStatePredicate.fromString('ae2:crafting_unit'))
    .match([-1, 0, 1], BlockStatePredicate.fromString('tfc:metal/block/wrought_iron'))
    .match([0, 0, -1], BlockStatePredicate.fromString('ae2:crafting_unit'))
    .match([0, 0, 1], BlockStatePredicate.fromString('ae2:crafting_unit'))
    .match([1, 0, -1], BlockStatePredicate.fromString('tfc:metal/block/wrought_iron'))
    .match([1, 0, 0], BlockStatePredicate.fromString('ae2:crafting_unit'))
    .match([1, 0, 1], BlockStatePredicate.fromString('tfc:metal/block/wrought_iron'))
    .match([-1, -1, -1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([-1, -1, 0], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([-1, -1, 1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([1, -1, -1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([1, -1, 0], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([1, -1, 1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([0, -1, -1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([0, -1, 1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([-1, 1, -1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([-1, 1, 0], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([-1, 1, 1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([1, 1, -1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([1, 1, 0], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([1, 1, 1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([0, 1, -1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
    .match([0, 1, 1], BlockStatePredicate.fromString('firmalife:metal/block/stainless_steel'))
);