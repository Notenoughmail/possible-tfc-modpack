
PlayerEvents.loggedIn(e => {
	let data = e.player.persistentData;
	if (data.contains('rocketIds')) {
		data.remove('rocketIds');
	}
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