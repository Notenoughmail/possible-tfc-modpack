
PlayerEvents.loggedIn(e => {
	let data = e.player.persistentData;
	if (data.contains('rocketIds')) {
		data.remove('rocketIds');
	}
})