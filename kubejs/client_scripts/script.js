// TODO: Test, and fix, port to 1.20 syntax

const ClientTFCConfig = Java.loadClass("net.dries007.tfc.config.TFCConfig").CLIENT;
const TemperatureStyle = Java.loadClass("net.dries007.tfc.config.TemperatureDisplayStyle");

const C = ConfigJS.getOtherValueFromEnumConfig(global.clientConfig.customization.thermometerScale, 'Celsius')
const K = ConfigJS.getOtherValueFromEnumConfig(global.clientConfig.customization.thermometerScale, 'Kelvin')
const F = ConfigJS.getOtherValueFromEnumConfig(global.clientConfig.customization.thermometerScale, 'Fahrenheit')
const R = ConfigJS.getOtherValueFromEnumConfig(global.clientConfig.customization.thermometerScale, 'Rankine')

let thermometerScaleMap = {
	C: TemperatureStyle['CELSIUS'],
	K: TemperatureStyle['KELVIN'],
	F: TemperatureStyle['FAHRENHEIT'],
	R: TemperatureStyle['RANKINE']
}

JEIEvents.hideItems(e => {
	e.hide('minecraft:chest_minecart')
	e.hide('minecraft:enchanting_table')
	e.hide('%brewing')
	e.hide('%combat')
	e.hide('%tools')
	e.hide('%food')
	e.hide(/minecraft:.*_spawn_egg/)
	e.hide(/tfc:spawn_egg.*/)
	e.hide(/minecraft:.*candle/)
	e.hide('minecraft:elytra')
	e.hide(/minecraft:.*_boat/)
	e.hide('minecraft:furnace_minecart')
	e.hide(/minecraft:raw_.*/)
	e.hide(/minecraft:.*copper_ore/)
	e.hide(/minecraft:.*_ingot/)
	e.hide(/minecraft:.*shulker_box/)
	e.hide('minecraft:composter')
	e.hide('minecraft:barrel')
	e.hide(/minecraft:.*campfire/)
	e.hide(/minecraft:.*lantern/)
	e.hide('minecraft:chorus_plant')
	e.hide(/minecraft:.*_ore/)
	e.hide('minecraft:stonecutter')
	e.hide('kubejs:dummy')
	e.hide('zinc_ingot')
	e.hide('#forge:nuggets')
	e.hide('#forge:plates')
	e.hide(/minecraft:.*(?:diorite|granite|dripstone|limestone|deespslate).*/)
	e.hide(/minecraft:infested_.+/)
	// e.hide(/minecraft:(?:polished_)?andesite(?:_(?:stairs|slab|wall))?$/)
	e.hide('firmalife:embedded_pipe')
	e.hide('firmalife:squirting_moisture_transducer')
	e.hide('tfc:pan/filled')
	e.hide('tfc:snow_pile')
	e.hide('tfc:ice_pile')
	e.hide('minecraft:dirt_path')
	e.hide(Item.of('minecraft:enchanted_book').ignoreNBT())
	e.hide(/minecraft:brick.+/)
	e.hide(/minecraft:.*(?:log|wood|planks|stem|hyphae|purpur|nether|sapling|leaves|sign|fence|prismarine).*/)
	e.hide(/.*netherite.*/)
	e.hide(/tfc:wood\/boat\/.+/)
	e.hide(/.*slab_vert.*/)
	e.hide('minecraft:smoker')
	e.hide('minecraft:experience_bottle')
	e.hide('minecraft:kelp')
	e.hide('minecraft:dried_kelp_block')
	e.hide(/minecraft:.*basalt/)
})

JEIEvents.addItems(e => {
	e.add('minecraft:cauldron')
	e.add('minecraft:rabbit_foot')
	e.add('minecraft:fermented_spider_eye')
	e.add('minecraft:bow')
	e.add('minecraft:arrow')
	e.add('minecraft:crossbow')
	e.add('minecraft:lead')
	e.add('minecraft:name_tag')
	e.add(Item.of('toolbelt:belt', '{Size:5}'))
	e.add('toolbelt:pouch')
	e.add('minecraft:flint_and_steel')
	e.add('minecraft:clock')
	e.add('minecraft:spyglass')
	e.add('minecraft:compass')
	e.add('minecraft:fishing_rod')
	e.add('minecraft:pumpkin_pie')
	e.add('minecraft:spider_eye')
	e.add('minecraft:rotten_flesh')
	e.add('minecraft:melon_slice')
})

JEIEvents.removeCategories(e => {
	//console.log(e.getCategoryIds())
	e.remove('minecraft:anvil')
	e.remove('minecraft:blasting')
	e.remove('minecraft:brewing')
	e.remove('minecraft:campfire')
	e.remove('minecraft:compostable')
	e.remove('minecraft:fuel')
	e.remove('minecraft:furnace')
	e.remove('minecraft:smithing')
	e.remove('minecraft:smoking')
	e.remove('minecraft:stonecutting')
})
let rocketList = null;

ClientEvents.tick(e => {
	/*
	let levelJS = e.level;
	if (rocketList == null || levelJS.time % 20 < 1) {
		rocketList = levelJS.entities.filter(entity => {
			return entity.type == "kubejs:rocket";
		});
	}
	if (rocketList != null) {
		rocketList.forEach(rocket => {
			levelJS.minecraftLevel.addParticle(IPParticleTypes.FLARE_FIRE, true, rocket.x, rocket.y, rocket.z, 0, -0.3, 0);
		});
	}
	*/
})

NetworkEvents.dataReceived('thermometer', e => {
	let {data} = e;
	let scale = TemperatureStyle['COLOR'];
	if (data.hasThermometer) {
		scale = thermometerScaleMap[global.clientConfig.customization.thermometerScale.get()];
	}
	if (ClientTFCConfig.heatTooltipStyle.get() != scale) {
		ClientTFCConfig.heatTooltipStyle.set(scale);
	}
	if (ClientTFCConfig.climateTooltipStyle.get() != scale) {
		ClientTFCConfig.climateTooltipStyle.set(scale);
	}
})