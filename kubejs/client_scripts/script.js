
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
	e.hide([
		'minecraft:chest_minecart',
		'minecraft:enchanting_table',
		/minecraft:.*candle/,
		'minecraft:elytra',
		/minecraft:.*_boat/,
		'minecraft:furnace_minecart',
		/minecraft:raw_.*/,
		/minecraft:.*_ingot/,
		/minecraft:.*shulker_box/,
		'minecraft:composter',
		'minecraft:barrel',
		/minecraft:.*campfire/,
		/minecraft:.*lantern/,
		'minecraft:chorus_plant',
		/minecraft:.*_ore/,
		'minecraft:stonecutter',
		'#forge:nuggets',
		'#forge:plates',
		/minecraft:.*(?:diorite|granite|dripstone|limestone|deespslate|glowstone|andesite).*/,
		/minecraft:infested_.+/,
		'firmalife:embedded_pipe',
		'firmalife:squirting_moisture_transducer',
		'tfc:pan/filled',
		'tfc:snow_pile',
		'tfc:ice_pile',
		'minecraft:dirt_path',
		'minecraft:enchanted_book',
		/minecraft:brick.+/,
		/minecraft:.*(?:log|wood|planks|stem|hyphae|purpur|nether|sapling|leaves|sign|fence|prismarine|mud|sandstone|sculk|coral|end_stone|deepslate|blackstone|quartz|copper|(?:oak|spruce|birch|jungle|acacia|dark_oak|mangrove|cherry|crimson|warped)_(?:stairs|slab|door|button|trapdoor|pressure_plate)|basalt).*/,
		/.*netherite.*/,
		/tfc:wood\/boat\/.+/,
		'minecraft:smoker',
		'minecraft:experience_bottle',
		'minecraft:kelp',
		'minecraft:dried_kelp_block',
		/thoriumreactors:.*(?:chest|ore).*/,
		/minecraft:(?:.*_amethyst.*|amethyst_(?:shard|cluster))/,
		/tfc:bucket\/.*/,
		/(?:minecraft|thoriumreactors):.*bucket.*/,
		'dysonsphere:bucket_steam',
		/minecraft:.*bee.*/,
		/minecraft:(?:gold|iron|diamond|emerald|lapis|)_block/,
		'minecraft:bamboo_raft',
		'minecraft:bamboo_chest_raft',
		/minecraft:(?:blaze|end)_rod/,
		'minecraft:iron_bars',
		'minecraft:coal_block',
		/minecraft:(?:(?:mossy_)?(?:(?:cobble|cracked|chiseled|smooth)_?)?)?stone(?:_(?:stairs|slab|pressure_plate|button|wall|bricks|brick_stairs|brick_slab|brick_wall))?/,
		'minecraft:lodestone',
		'minecraft:blast_furnace',
		/thoriumreactors:blasted.*/,
		'thoriumreactors:graphite_crystal',
		/minecraft:(?:dead|rose)_bush/,
		/minecraft:.*seed.*/,
		'ae2:silicon_press',
		/tfcastikorcarts:.*postilion.*/,
		/ae2:(?:(?:certus|nether)_quartz|fluix)_(?:sword|hoe|axe|shovel|pickaxe)/,
		/ae2:nether_quartz_(?:wrench|cutting_knife)/,
		/ae2:(?:printed_)?silicon/,
		IngredientHelper.creativeTab('food_and_drinks'),
		IngredientHelper.creativeTab('ae2:facades'),
		IngredientHelper.creativeTab('minecraft:spawn_eggs'),
		IngredientHelper.creativeTab('minecraft:op_blocks'),
		'minecraft:tipped_arrow',
		'minecraft:heart_of_the_sea',
		/minecraft:(?:tipped_arrow|heart_of_the_sea|shulker_shell|popped_chorus|emerald|lapis_lazuli|diamond|wheat|echo_shard|dragon_breath|blaze_powder|glistering_melon_slice|magma_cream|ghast_tear|phantom_membrane|recovery_compass|ender_pearl|carrot_on_a_stick|warped_fungus_on_a_stick|trident|shears|tnt(?:_minecraft)?|beacon|torch|honey_block|.*froglight|furnace|.*anvil|conduit|brewing_stand|end_crystal|ender_eye|end_portal|dragon_egg|bookshelf|(?:(?:ender|trapped)_)?chest|respawn_anchor|suspicous_(?:gravel|sand))/,
		/minecraft:(?:glass_bottle|fermented_spider_eye|nautilus_shell|spectral_arrow|totem_of_undying|melon_slice|honeycomb|fishing_rod|turtle_egg|frogspawm|chorus_flower|(?:red|brown)_mushroom(?:_block)?|ancient_debris|crying_obsidian|gravel|(?:red_)?sand|tuff|calcite|farmland|grass(?:_block)?|mycelium|(?:(?:coarse|rooted)_)?dirt|shroomlight|mangrove_roots|soul_(?:sand|soil|torch)|redstone_lamp|(?:iron|golden|chainmail)_(?:horse_armor|shovel|axe|hoe|sword|pickaxe|helmet|chestplate|leggings|boots)|(?:warped|crimson)_(?:nylium|roots))/,
		'ae2:fluix_upgrade_smithing_template',
		/ae2:.*sky_stone.*/,
		'ae2:sky_dust',
		/tfc:spawn_egg\/.*/,
		'thoriumreactors:module_empty',
		'thoriumreactors:creative_fluid_tank',
		'thoriumreactors:creative_energy_tank',
		'throiumreactors:water_source_block',
		'ae2:vibration_chamber',
		'ae2:crystal_resonance_generator',
		'ae2:ender_dust'
	]);
})

JEIEvents.hideFluids(e => {
	e.hide('tfc:metal/wrought_iron');
})

JEIEvents.addItems(e => {
	e.add([
		'minecraft:cauldron',
		'minecraft:rabbit_foot',
		'minecraft:fermented_spider_eye',
		'minecraft:bow',
		'minecraft:arrow',
		'minecraft:crossbow',
		'minecraft:lead',
		'minecraft:name_tag',
		Item.of('toolbelt:belt', '{Size:5}'),
		'toolbelt:pouch',
		'minecraft:flint_and_steel',
		'minecraft:clock',
		'minecraft:spyglass',
		'minecraft:compass',
		'minecraft:fishing_rod',
		'minecraft:pumpkin_pie',
		'minecraft:spider_eye',
		'minecraft:rotten_flesh',
		'minecraft:melon_slice',
		'minecraft:snowball',
		'ae2:sky_stone_tank'
	]);
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
		'minecraft:stonecutting',
		'jumbofurnace:jumbo_furnace_upgrade',
		'jumbofurnace:jumbo_smelting',
		'ae2:certus_growth'
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

NetworkEvents.dataReceived('curios', e => {
	let { player, data } = e;
	player.persistentData.merge(data);
})

/*
ClientEvents.particleProviderRegistry(e => {
	e.register('kubejs:rocket_plume', (options, clientLevel, spriteSet, x, y, z, xSpeed, ySpeed, zSpeed) => {
		let particle = Client.customParticle(clientLevel, spriteSet, x, y, z);
		particle.setParticleSpeed(xSpeed, ySpeed, zSpeed);
		particle.scale(5);
		particle.lifetime = 65;
		particle.friction = 1;
		return particle
	});
	e.register('kubejs:rocket_plume_ejecta', (options, clientLevel, spriteSet, x, y, z, xSpeed, ySpeed, zSpeed) => {
		let particle = Client.customParticle(clientLevel, spriteSet, x, y, z);
		particle.setParticleSpeed(xSpeed, ySpeed, zSpeed);
		particle.scale(3);
		particle.lifetime = 50;
		particle.friction = 1;
		return particle;
	});
})
*/
