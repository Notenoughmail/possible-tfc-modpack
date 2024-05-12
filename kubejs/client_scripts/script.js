// TODO: Test, and fix, port to 1.20 syntax

const ClientTFCConfig = Java.loadClass("net.dries007.tfc.config.TFCConfig").CLIENT;
const TemperatureStyle = Java.loadClass("net.dries007.tfc.config.TemperatureDisplayStyle");

const JadeConfig = Java.loadClass("snownee.jade.impl.config.PluginConfig").INSTANCE;

let configThermo = [
	null, // Skip index 0
	ConfigJS.getOtherValueFromEnumConfig(global.clientConfig.customization.thermometerScale, 'Celsius'),
	ConfigJS.getOtherValueFromEnumConfig(global.clientConfig.customization.thermometerScale, 'Kelvin'),
	ConfigJS.getOtherValueFromEnumConfig(global.clientConfig.customization.thermometerScale, 'Fahrenheit'),
	ConfigJS.getOtherValueFromEnumConfig(global.clientConfig.customization.thermometerScale, 'Rankine')
]

let tfcThermo = [
	TemperatureStyle['COLOR'],
	TemperatureStyle['CELSIUS'],
	TemperatureStyle['KELVIN'],
	TemperatureStyle['FAHRENHEIT'],
	TemperatureStyle['RANKINE']
]

JEIEvents.hideItems(e => {
	e.hide('minecraft:chest_minecart');
	e.hide('minecraft:enchanting_table');
	e.hide('%brewing');
	e.hide('%combat');
	e.hide('%tools');
	e.hide('%food');
	e.hide(/minecraft:.*_spawn_egg/);
	e.hide(/tfc:spawn_egg.*/);
	e.hide(/minecraft:.*candle/);
	e.hide('minecraft:elytra');
	e.hide(/minecraft:.*_boat/);
	e.hide('minecraft:furnace_minecart');
	e.hide(/minecraft:raw_.*/);
	e.hide(/minecraft:.*copper_ore/);
	e.hide(/minecraft:.*_ingot/);
	e.hide(/minecraft:.*shulker_box/);
	e.hide('minecraft:composter');
	e.hide('minecraft:barrel');
	e.hide(/minecraft:.*campfire/);
	e.hide(/minecraft:.*lantern/);
	e.hide('minecraft:chorus_plant');
	e.hide(/minecraft:.*_ore/);
	e.hide('minecraft:stonecutter');
	e.hide('#forge:nuggets');
	e.hide('#forge:plates');
	e.hide(/minecraft:.*(?:diorite|granite|dripstone|limestone|deespslate).*/);
	e.hide(/minecraft:infested_.+/);
	e.hide('firmalife:embedded_pipe');
	e.hide('firmalife:squirting_moisture_transducer');
	e.hide('tfc:pan/filled');
	e.hide('tfc:snow_pile');
	e.hide('tfc:ice_pile');
	e.hide('minecraft:dirt_path');
	e.hide('minecraft:enchanted_book');
	e.hide(/minecraft:brick.+/);
	e.hide(/minecraft:.*(?:log|wood|planks|stem|hyphae|purpur|nether|sapling|leaves|sign|fence|prismarine|mud|sandstone|sculk|coral|end_stone|deepslate|blackstone|quartz|copper|(?:oak|spruce|birch|jungle|acacia|dark_oak|mangrove|cherry|crimson|warped)_(?:stairs|slab|door|button|trapdoor|pressure_plate)|basalt).*/);
	e.hide(/.*netherite.*/);
	e.hide(/tfc:wood\/boat\/.+/);
	e.hide('minecraft:smoker');
	e.hide('minecraft:experience_bottle');
	e.hide('minecraft:kelp');
	e.hide('minecraft:dried_kelp_block');
	e.hide(/thoriumreactors:.*(?:chest|ore).*/);
	e.hide(/minecraft:(?:.*_amethyst.*|amethyst_(?:shard|cluster))/);
	e.hide(/tfc:bucket\/.*/);
	e.hide(/(?:minecraft|thoriumreactors):.*bucket.*/);
	e.hide('dysonsphere:bucket_steam');
	e.hide(/minecraft:.*bee.*/);
	e.hide(/minecraft:(?:gold|iron|diamond|emerald|lapis|)_block/);
	e.hide('minecraft:bamboo_raft');
	e.hide('minecraft:bamboo_chest_raft');
	e.hide(/minecraft:(?:blaze|end)_rod/);
	e.hide('minecraft:iron_bars');
	e.hide('minecraft:coal_block');
	e.hide(/minecraft:(?:(?:mossy_)?(?:cobble|cracked|chiseled)?)?stone(?:_(?:stairs|slab|pressure_plate|button|wall|bricks|brick_stairs|brick_slab|brick_wall))?/);
})

JEIEvents.addItems(e => {
	e.add('minecraft:cauldron');
	e.add('minecraft:rabbit_foot');
	e.add('minecraft:fermented_spider_eye');
	e.add('minecraft:bow');
	e.add('minecraft:arrow');
	e.add('minecraft:crossbow');
	e.add('minecraft:lead');
	e.add('minecraft:name_tag');
	e.add(Item.of('toolbelt:belt', '{Size:5}'));
	e.add('toolbelt:pouch');
	e.add('minecraft:flint_and_steel');
	e.add('minecraft:clock');
	e.add('minecraft:spyglass');
	e.add('minecraft:compass');
	e.add('minecraft:fishing_rod');
	e.add('minecraft:pumpkin_pie');
	e.add('minecraft:spider_eye');
	e.add('minecraft:rotten_flesh');
	e.add('minecraft:melon_slice');
	e.add('minecraft:snowball');
})

JEIEvents.removeCategories(e => {
	//console.log(e.getCategoryIds())
	e.remove([
		'minecraft:anvil',
		'minecraft:blasting',
		'minecraft:brewing',
		'minecraft:campfire',
		'minecraft:compostable',
		'minecraft:fuel',
		'minecraft:furnace',
		'minecraft:smithing',
		'minecraft:smoking',
		'minecraft:stonecutting'
	])
})

ClientEvents.tick(e => {
	let { level, player } = e;
	if (level.time % 20 == 0) {
		let { persistentData } = player;
		let { hasThermometer } = persistentData;

		let currentHeatIndex = tfcThermo.indexOf(ClientTFCConfig.heatTooltipStyle.get());

		if (hasThermometer) {
			let index = configThermo.indexOf(global.clientConfig.customization.thermometerScale.get());
			if (currentHeatIndex != index) {
				ClientTFCConfig.heatTooltipStyle.set(tfcThermo[index]);
			}
		} else {
			if (currentHeatIndex) {
				ClientTFCConfig.heatTooltipStyle.set(tfcThermo[0]);
			}
		}
	}
})

NetworkEvents.dataReceived('rocket_explosion', e => {
	Client.soundManager.stop('kubejs:rocket', null);
})

NetworkEvents.dataReceived('swing', e => {
	e.player.swing();
})
