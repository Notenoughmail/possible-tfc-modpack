//priority 0

console.info('I have no idea what I am doing, but it somehow works')

onEvent('block.right_click', e => {
	if (e.block.id.startsWith('kubejs') && e.block.id.endsWith('small_lead')) {
		e.player.give('kubejs:ore/small_lead')
		e.server.runCommandSilent(`execute in ${e.block.level.dimension} positioned ${e.block.x} ${e.block.y} ${e.block.z} run fill ~ ~ ~ ~ ~ ~ air replace`)
	}//this technically runs twice, but the player only gets one item as the block is destroyed before the offhand click event is called. It still deviates from normal TFC small ores in that it 1) gives the item to creative players, 2) does not make the hand swing, and 3) does not prevent another block replacing it
});