//priority 0

console.info('I have no idea what I am doing, but it somehow works')

onEvent('block.right_click', e => {
	if (e.block.id === 'kubejs:ore/small_lead') {
		e.player.give('kubejs:ore/small_lead')
		e.server.runCommandSilent(`execute in ${e.block.level.dimension} positioned ${e.block.x} ${e.block.y} ${e.block.z} run fill ~ ~ ~ ~ ~ ~ air replace`)
		e.player.swingArm(e.hand)//stealing this bit of knowledge from Pluto on the TFC Discord
	}//this technically runs twice, but the player only gets one item as the block is destroyed before the offhand click event is called. It still deviates from normal TFC small ores in that it 1) gives the item to creative players, 2) and does not prevent another block replacing it
});

onEvent('server.load', e => {
	e.server.runCommandSilent(`scoreboard objectives add confusion trigger`)
});

onEvent('server.load', function (e) {
	e.server.schedule(5 * SECOND, e.server, function (callback) {
		let confusion = e.server.runCommandSilent(`scoreboard players get @p confusion`)
		if (confusion > 0) {
			callback.server.runCommandSilent(`give @p immersiveengineering:manual`)
			callback.server.runCommandSilent(`scoreboard players set @p confusion 0`)
		}
		callback.reschedule()
	})
});

onEvent('player.logged_in', e => {
	e.server.runCommandSilent(`scoreboard players set @p confusion 0`)
	e.server.runCommandSilent(`scoreboard players enable @p confusion`)
});

/*onEvent('player.tick', e => {
	let val = e.server.runCommand(`scoreboard players get @p confusion`)
	if (val > 0) {
		e.player.give('immersiveengineering:manual')
		e.server.runCommandSilent(`scoreboard players set @p confusion 0`)
	}//this is actually vile
});*/