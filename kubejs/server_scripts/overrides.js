
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
