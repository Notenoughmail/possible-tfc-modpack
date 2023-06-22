settings.dataPackOutput = true

onEvent('server.datapack.first', e => {
	
	e.addTFCFoodItem('create:chocolate_glazed_berries', food => {
		food.hunger(4)
		food.saturation(5)
		food.water(2)
		food.decayModifier(0.4)
		food.fruit(0.75)
		food.dairy(2)
	})
	
	e.addTFCDrinkable(FluidIngredient.of('#forge:tea'), drink => {
		drink.consumeChance(1)
		drink.thirst(5)
		drink.effect('minecraft:haste', effect => {
			effect.duration(200)
		})
	})
	
	e.addTFCFuel('immersiveengineering:coal_coke', 2385, 1466)
	
	e.addTFCLampFuel('immersiveengineering:ethanol', '#tfc:lamps', 300)
	
	e.addTFCHeat(['create:framed_glass', 'create:framed_glass_pane', 'create:horizontal_framed_glass', 'create:horizontal_framed_glass_pane', 'create:tiled_glass', 'create:tiled_glass_pane', 'create:vertical_framed_glass', 'create:vertical_framed_glass_pane'], 0.3)
	e.addTFCHeat('immersiveengineering:ingot_hop_graphite', 8.6, 1544, 2059)
	e.addTFCHeat('create:brass_block', 7.145)
	e.addTFCHeat('immersiveengineering:storage_constantan', 3.08)
	e.addTFCHeat('#forge:double_ingots/constantan', 2.466, 760, 1012)
	e.addTFCHeat('#forge:ingots/constantan', 1.233, 760, 1012)
	e.addTFCHeat('#forge:rods/constantan', 0.616, 760, 1012)
	e.addTFCHeat('#forge:sheets/constantan', 2.166, 760, 1012)
	e.addTFCHeat([/minecraft:(?:waxed_)?(?:(?:exposed|weathered|oxidized)_)?(?:cut_)?copper$/, /minecraft:(?:waxed_)?copper_block/], 7.145)
	e.addTFCHeat('immersiveengineering:storage_electrum', 2.775)
	e.addTFCHeat('#forge:double_ingots/electrum', 2.219, 606, 808)
	e.addTFCHeat('#forge:ingots/electrum', 1.11, 606, 808)
	e.addTFCHeat('#forge:rods/electrum', 0.555, 606, 808)
	e.addTFCHeat('#forge:sheets/electrum', 2.219, 606, 808)
	e.addTFCHeat('minecraft:gold_block', 4.165)
	e.addTFCHeat('immersiveengineering:storage_lead', 4.225)
	e.addTFCHeat('#forge:double_ingots/lead', 3.379, 196, 261)
	e.addTFCHeat('#forge:ingots/lead', 1.69, 196, 261)
	e.addTFCHeat('#forge:rods/lead', 0.845, 196, 261)
	e.addTFCHeat('#forge:sheets/lead', 3.379, 196, 261)
	e.addTFCHeat('immersiveengineering:storage_nickel', 5.21)
	e.addTFCHeat('immersiveengineering:storage_silver', 5.21)
	e.addTFCHeat('immersiveengineering:storage_steel', 7.145)
	e.addTFCHeat('create:zinc_block', 11.905)
	e.addTFCHeat(/kubejs:ore\/.+_lead/, 0.34)
	e.addTFCHeat(/minecraft:(?:waxed_)?(?:(?:exposed|weathered|oxidized)_)?(?:cut_)?copper_slab/, 3.573)
	e.addTFCHeat(['createdeco:cast_iron_block', 'minecraft:iron_block'], 7.145)
	e.addTFCHeat('tfc:powder/coke', 7.31)
	
	e.addTFCItemSize('chunkloaders:advanced_chunk_loader', 's=large, w=heavy')
	e.addTFCItemSize('chunkloaders:basic_chunk_loader', 's=normal, w=medium')
	e.addTFCItemSize('toolbelt:belt', 's=very_large, w=heavy')
	e.addTFCItemSize('immersiveengineering:coal_coke', 's=small, w=medium')
	e.addTFCItemSize(/immersiveengineering:connector_hv(?:_relay)?/, 's=normal, w=heavy')
	e.addTFCItemSize(/immersiveengineering:connector_(?:[ml]v(?:_relay)?|redstone)/, 'w=medium')
	e.addTFCItemSize('create:crafting_blueprint', 's=large')
	e.addTFCItemSize('create:crushing_wheel', 's=large, w=heavy')
	e.addTFCItemSize('create:fluid_tank', 'w=medium')
	e.addTFCItemSize('create:flywheel', 's=large, w=medium')
	e.addTFCItemSize('immersiveengineering:glider', 's=normal, w=light')
	e.addTFCItemSize('create:goggles', 's=small')
	e.addTFCItemSize(/gunswithoutroses:(?:gold|iron)_gun/, 's=very_large, w=heavy')
	e.addTFCItemSize('immersiveengineering:hammer', 's=small, w=medium')
	e.addTFCItemSize('create:item_vault', 'w=medium')
	e.addTFCItemSize('create:mechanical_crafter', 'w=heavy')
	e.addTFCItemSize('create:minecart_contraption', 's=huge, w=very_heavy')
	e.addTFCItemSize('create:minecart_coupling', 's=small, w=medium')
	e.addTFCItemSize('create:peculiar_bell', 'w=heavy')
	e.addTFCItemSize('create:potato_cannon', 's=huge, w=medium')
	e.addTFCItemSize('toolbelt:pouch', 's=normal, w=light')
	e.addTFCItemSize('create:schematicannon', 's=large, w=medium')
	e.addTFCItemSize('immersiveengineering:screwdriver', 's=small, w=light')
	e.addTFCItemSize('create:steam_engine', 's=large, w=heavy')
	e.addTFCItemSize('create:sturdy_sheet', 's=large, w=medium')
	e.addTFCItemSize('chunkloaders:ultimate_chunk_loader', 's=very_large, w=very_heavy')
	e.addTFCItemSize('create:wand_of_symmetry', 's=huge, w=very_heavy')
	e.addTFCItemSize('create:water_wheel', 's=normal, w=medium')
	e.addTFCItemSize('immersiveengineering:watermill', 's=huge, w=very_heavy')
	e.addTFCItemSize('immersiveengineering:waterwheel_segment', 's=large, w=medium')
	e.addTFCItemSize('immersiveengineering:windmill', 's=huge, w=very_heavy')
	e.addTFCItemSize('immersiveengineering:windmill_blade', 's=large, w=medium')
	e.addTFCItemSize('immersiveengineering:wirecoil_redstone', 's=small, w=light')
	e.addTFCItemSize('immersiveengineering:wirecutter', 's=small, w=light')
	e.addTFCItemSize(/immersiveengineering:wirecoil_(?:copper|electrum|steel)(?:_ins)?/, 's=small, w=heavy')
	e.addTFCItemSize('create:wrench', 's=normal, w=light')
	e.addTFCItemSize('#create:toolboxes', 's=very_large, w=heavy')
	e.addTFCItemSize('immersiveengineering:heavy_engineering', 's=large, w=heavy')
	
	e.addTFCMetal('kubejs:constantan', 1266, 0.0037, '#forge:ingots/constantan', '#forge:sheets/constantan', 1)
	e.addTFCMetal('kubejs:electrum', 1010, 0.00333, '#forge:ingots/electrum', '#forge:sheets/electrum', 1)
	e.addTFCMetal('kubejs:graphite', 2574, 0.0218, 'immersiveengineering:ingot_hop_graphite', 'kubejs:sheet/graphite', 2) // Change the temperature once higher temp fuels added
	e.addTFCMetal('kubejs:lead', 327, 0.00507, '#forge:ingots/lead', '#forge:sheets/lead')
	e.addTFCMetal('kubejs:unrefined_graphite', 2135, 0.00728, 'tfc:powder/coke', 'kubejs:dummy')
	
	e.addTFCSupport('create:metal_girder', 2, 2, 6)
	
	e.buildTFCVein('vein/poor_lead', vein => {
		vein.rarity(75)
		vein.minY(20)
		vein.maxY(70)
		vein.size(14)
		vein.density(0.27)
		vein.replacementMap(map => {
			map.replace('tfc:rock/raw/granite').with('100 kubejs:ore/poor_lead/granite', '25 kubejs:ore/normal_lead/granite', '5 kubejs:ore/rich_lead/granite')
			map.replace('tfc:rock/raw/quartzite').with('100 kubejs:ore/poor_lead/quartzite', '25 kubejs:ore/normal_lead/quartzite', '5 kubejs:ore/rich_lead/quartzite')
			map.replace('tfc:rock/raw/slate').with('100 kubejs:ore/poor_lead/slate', '25 kubejs:ore/normal_lead/slate', '5 kubejs:ore/rich_lead/slate')
			map.replace('tfc:rock/raw/phyllite').with('100 kubejs:ore/poor_lead/phyllite', '25 kubejs:ore/normal_lead/phyllite', '5 kubejs:ore/rich_lead/phyllite')
			map.replace('tfc:rock/raw/schist').with('100 kubejs:ore/poor_lead/schist', '25 kubejs:ore/normal_lead/schist', '5 kubejs:ore/rich_lead/schist')
			map.replace('tfc:rock/raw/gneiss').with('100 kubejs:ore/poor_lead/gneiss', '25 kubejs:ore/normal_lead/gneiss', '5 kubejs:ore/rich_lead/gneiss')
			map.replace('tfc:rock/raw/marble').with('100 kubejs:ore/poor_lead/marble', '25 kubejs:ore/normal_lead/marble', '5 kubejs:ore/rich_lead/marble')
		})
		vein.indicator(indicator => {
			indicator.rarity(12)
			indicator.indicators('kubejs:ore/small_lead')
		})
	})
	e.buildTFCVein('vein/normal_lead', vein => {
		vein.rarity(75)
		vein.minY(-16)
		vein.maxY(60)
		vein.size(16)
		vein.density(0.5)
		vein.replacementMap(map => {
			map.replace('tfc:rock/raw/granite').with('30 kubejs:ore/poor_lead/granite', '80 kubejs:ore/normal_lead/granite', '15 kubejs:ore/rich_lead/granite')
			map.replace('tfc:rock/raw/quartzite').with('30 kubejs:ore/poor_lead/quartzite', '80 kubejs:ore/normal_lead/quartzite', '15 kubejs:ore/rich_lead/quartzite')
			map.replace('tfc:rock/raw/slate').with('30 kubejs:ore/poor_lead/slate', '80 kubejs:ore/normal_lead/slate', '15 kubejs:ore/rich_lead/slate')
			map.replace('tfc:rock/raw/phyllite').with('30 kubejs:ore/poor_lead/phyllite', '80 kubejs:ore/normal_lead/phyllite', '15 kubejs:ore/rich_lead/phyllite')
			map.replace('tfc:rock/raw/schist').with('30 kubejs:ore/poor_lead/schist', '80 kubejs:ore/normal_lead/schist', '15 kubejs:ore/rich_lead/schist')
			map.replace('tfc:rock/raw/gneiss').with('30 kubejs:ore/poor_lead/gneiss', '80 kubejs:ore/normal_lead/gneiss', '15 kubejs:ore/rich_lead/gneiss')
			map.replace('tfc:rock/raw/marble').with('30 kubejs:ore/poor_lead/marble', '80 kubejs:ore/normal_lead/marble', '15 kubejs:ore/rich_lead/marble')
		})
		vein.indicator(indicator => {
			indicator.rarity(10)
			indicator.indicators('kubejs:ore/small_lead')
		})
	})
	e.buildTFCVein('vein/deep_lead', vein => {
		vein.rarity(120)
		vein.minY(-60)
		vein.maxY(5)
		vein.size(12)
		vein.density(0.76)
		vein.replacementMap(map => {
			map.replace('tfc:rock/raw/granite').with('10 kubejs:ore/poor_lead/granite', '35 kubejs:ore/normal_lead/granite', '65 kubejs:ore/rich_lead/granite')
			map.replace('tfc:rock/raw/quartzite').with('10 kubejs:ore/poor_lead/quartzite', '35 kubejs:ore/normal_lead/quartzite', '65 kubejs:ore/rich_lead/quartzite')
			map.replace('tfc:rock/raw/slate').with('10 kubejs:ore/poor_lead/slate', '35 kubejs:ore/normal_lead/slate', '65 kubejs:ore/rich_lead/slate')
			map.replace('tfc:rock/raw/phyllite').with('10 kubejs:ore/poor_lead/phyllite', '35 kubejs:ore/normal_lead/phyllite', '65 kubejs:ore/rich_lead/phyllite')
			map.replace('tfc:rock/raw/schist').with('10 kubejs:ore/poor_lead/schist', '35 kubejs:ore/normal_lead/schist', '65 kubejs:ore/rich_lead/schist')
			map.replace('tfc:rock/raw/gneiss').with('10 kubejs:ore/poor_lead/gneiss', '35 kubejs:ore/normal_lead/gneiss', '65 kubejs:ore/rich_lead/gneiss')
			map.replace('tfc:rock/raw/marble').with('10 kubejs:ore/poor_lead/marble', '35 kubejs:ore/normal_lead/marble', '65 kubejs:ore/rich_lead/marble')
		})
		vein.indicator(indicator => {
			indicator.rarity(15)
			indicator.indicators('kubejs:ore/small_lead')
		})
	})
})