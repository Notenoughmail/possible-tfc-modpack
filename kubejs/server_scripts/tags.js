// priority: 0

console.info('Loading tag scripts')

onEvent('tags.blocks', e => {
	e.add('tfc:support_beam', 'create:metal_girder')
	e.add('create:passive_boiler_heaters', 'tfc:firepit')
});

let berries = ['cherry', 'wintergreen_berry', 'strawberry', 'snowberry', 'raspberry', 'gooseberry', 'elderberry', 'cranberry', 'cloudberry', 'bunchberry', 'blueberry', 'blackberry']

let tfc_metals = ['bismuth', 'bismuth_bronze', 'black_bronze', 'bronze', 'brass', 'copper', 'gold', 'nickel', 'rose_gold', 'silver', 'tin', 'zinc', 'sterling_silver', 'wrought_iron', 'cast_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel']

let tool_rack = ['create:wrench', 'create:goggles', 'immersiveengineering:hammer', 'immersiveengineering:wirecutter', 'immersiveengineering:screwdriver', 'immersiveengineering:voltmeter', 'immersiveengineering:drill', 'immersiveengineering:buzzsaw', 'immersiveengineering:revolver', 'immersiveengineering:chemthrower', 'immersiveengineering:railgun', 'immersiveengineering:skyhook', 'gunswithoutroses:iron_gun', 'gunswithoutroses:gold_gun', 'firmalife:watering_can']

let no_color_sheetmetal = ['copper', 'aluminum', 'lead', 'silver', 'nickel', 'uranium', 'constantan', 'electrum', 'steel', 'iron', 'gold']

let tag_molds = ['kubejs:mold/ingot', 'kubejs:mold/double_ingot', 'kubejs:mold/double_sheet', 'immersiveengineering:mold_plate', 'immersiveengineering:mold_gear', 'immersiveengineering:mold_rod', 'immersiveengineering:mold_bullet_casing', 'immersiveengineering:mold_wire', 'immersiveengineering:mold_packing_4', 'immersiveengineering:mold_packing_9', 'immersiveengineering:mold_unpacking']

onEvent('tags.items', e => {
	berries.forEach(berry => {
		e.add('tfc:foods/berries', 'tfc:food/' + berry)
	})
	tfc_metals.forEach(metal => {
		e.add('forge:rods/all_metal', 'tfc:metal/rod/' + metal)
	})
	tool_rack.forEach(tool => {
		e.add('tfc:usable_on_tool_rack', tool)
	})
	no_color_sheetmetal.forEach(material => {
		e.add('forge:sheetmetal/colorless', 'immersiveengineering:sheetmetal_' + material)
	})
	tag_molds.forEach(mold => {
		e.add('forge:molds/metal', mold)
	})
	
	//general
	e.add('create:sleepers', '#forge:smooth_stone_slab')
	e.add('tfc:rocks/loose', '#tfc:rock_knapping')
	e.add('tfc:kelp', 'tfc:plant/winged_kelp')
	e.add('tfc:kelp', 'tfc:plant/leafy_kelp')
	e.add('tfc:kelp', 'tfc:plant/giant_kelp_flower')
	e.remove('forge:cobblestone/normal', /tfc:rock.*mossy_cobble.*/)
	e.add('forge:cobblestone', /tfc:rock.*mossy_cobble.*/)
	e.add('forge:cobblestone/mossy', /tfc:rock.*mossy_cobble.*/)
	e.add('tfc:pileable_ingots', /tfc:brick.*/)
	e.add('tfc:pileable_ingots', 'minecraft:brick')
	e.removeAllTagsFrom('immersiveengineering:dust_coke')
	e.add('forge:dusts/coal_coke', 'tfc:powder/coke')//IE loves tags too much
	e.add('tfc:ore_pieces', 'kubejs:ore/poor_lead')
	e.add('tfc:ore_pieces', 'kubejs:ore/normal_lead')
	e.add('tfc:ore_pieces', 'kubejs:ore/rich_lead')
	e.removeAllTagsFrom('create:copper_nugget')
	
	//metal reorganization
	e.removeAllTagsFrom('immersiveengineering:plate_constantan')
	e.removeAllTagsFrom('immersiveengineering:plate_electrum')
	e.removeAllTagsFrom('immersiveengineering:plate_lead')
	e.add('forge:sheets', 'immersiveengineering:plate_constantan')
	e.add('forge:sheets', 'immersiveengineering:plate_electrum')
	e.add('forge:sheets', 'immersiveengineering:plate_lead')
	e.add('forge:sheets/constantan', 'immersiveengineering:plate_constantan')
	e.add('forge:sheets/electrum', 'immersiveengineering:plate_electrum')
	e.add('forge:sheets/lead', 'immersiveengineering:plate_lead')
	e.add('tfc:metal_item/constantan', 'immersiveengineering:plate_constantan')
	e.add('tfc:metal_item/constantan', 'immersiveengineering:ingot_constantan')
	e.add('tfc:metal_item/constantan', 'kubejs:metal/double_ingot/constantan')
	e.add('tfc:metal_item/constantan', 'immersiveposts:stick_constantan')
	e.add('tfc:metal_item/electrum', 'immersiveengineering:plate_electrum')
	e.add('tfc:metal_item/electrum', 'immersiveengineering:ingot_electrum')
	e.add('tfc:metal_item/electrum', 'kubejs:metal/double_ingot/electrum')
	e.add('tfc:metal_item/electrum', 'immersiveposts:stick_electrum')
	e.add('tfc:metal_item/lead', 'immersiveengineering:plate_lead')
	e.add('tfc:metal_item/lead', 'immersiveengineering:ingot_lead')
	e.add('tfc:metal_item/lead', 'kubejs:metal/double_ingot/lead')
	e.add('tfc:metal_item/lead', 'immersiveposts:stick_lead')
	e.add('tfc:metal_item/graphite', 'immersiveengineering:ingot_hop_graphite')
	e.add('tfc:metal_item/graphite', 'immersiveengineering:dust_hop_graphite')
	e.add('tfc:pileable_sheets', 'immersiveengineering:plate_constantan')
	e.add('tfc:pileable_sheets', 'immersiveengineering:plate_electrum')
	e.add('tfc:pileable_sheets', 'immersiveengineering:plate_lead')
	e.add('tfc:pileable_ingots', 'immersiveengineering:ingot_constantan')
	e.add('tfc:pileable_ingots', 'immersiveengineering:ingot_electrum')
	e.add('tfc:pileable_ingots', 'immersiveengineering:ingot_lead')
	e.add('forge:double_ingots', 'kubejs:metal/double_ingot/constantan')
	e.add('forge:double_ingots', 'kubejs:metal/double_ingot/electrum')
	e.add('forge:double_ingots', 'kubejs:metal/double_ingot/lead')
	e.add('forge:double_ingots/constantan', 'kubejs:metal/double_ingot/constantan')
	e.add('forge:double_ingots/electrum', 'kubejs:metal/double_ingot/electrum')
	e.add('forge:double_ingots/lead', 'kubejs:metal/double_ingot/lead')

	//weight and szie
	e.add('kubejs:medium_wire_connectors', 'immersiveengineering:connector_lv')
	e.add('kubejs:medium_wire_connectors', 'immersiveengineering:connector_lv_relay')
	e.add('kubejs:medium_wire_connectors', 'immersiveengineering:connector_mv')
	e.add('kubejs:medium_wire_connectors', 'immersiveengineering:connector_mv_relay')
	e.add('kubejs:power_wire_coils', 'immersiveengineering:wirecoil_copper')
	e.add('kubejs:power_wire_coils', 'immersiveengineering:wirecoil_copper_ins')
	e.add('kubejs:power_wire_coils', 'immersiveengineering:wirecoil_electrum')
	e.add('kubejs:power_wire_coils', 'immersiveengineering:wirecoil_electrum_ins')
	e.add('kubejs:power_wire_coils', 'immersiveengineering:wirecoil_steel')
	e.add('tfc:minecarts', 'immersiveengineering:minecart_woodencrate')
	e.add('tfc:minecarts', 'immersiveengineering:minecart_reinforcedcrate')
	e.add('tfc:minecarts', 'immersiveengineering:minecart_woodenbarrel')
	e.add('tfc:minecarts', 'immersiveengineering:minecart_metalbarrel')
	e.add('tfc:minecarts', 'minecraft:minecart')
	e.add('tfc:minecarts', 'minecraft:furnace_minecart')
	e.add('tfc:minecarts', 'minecraft:tnt_minecart')
	e.add('tfc:minecarts', 'minecraft:hopper_minecart')
})

onEvent('tags.fluids', e => {
	e.add('tfc:molten_metals', 'kubejs:electrum')
	e.add('tfc:molten_metals', 'kubejs:constantan')
	e.add('tfc:molten_metals', 'kubejs:lead')
	e.add('tfc:molten_metals', 'firmalife:metal/stainless_steel')
	e.add('tfc:molten_metals', 'firmalife:metal/chromium')
	e.add('tfc:molten_metals', 'kubejs:graphite')
	e.add('tfc:electrum', 'kubejs:electrum')
	e.add('tfc:electrum', 'kubejs:flowing_electrum')
	e.add('tfc:constantan', 'kubejs:constantan')
	e.add('tfc:constantan', 'kubejs:flowing_constantan')
	e.add('tfc:lead', 'kubejs:lead')
	e.add('tfc:lead', 'kubejs:flowing_lead')
	e.add('tfc:graphite', 'kubejs:graphite')
	e.add('tfc:graphite', 'kubejs:flowing_graphite')
	e.add('forge:true_water', 'minecraft:water')/*IE why do you require fluid tags for your inputs*/
	e.add('forge:true_water', 'minecraft:flowing_water')/*a normal fluid would be fine*/
	e.add('immersiveengineering:concrete', 'immersiveengineering:concrete')
	e.add('immersiveengineering:concrete', 'immersiveengineering:concrete_flowing')
	e.add('kubejs:jutecrete', 'kubejs:jutecrete')
	e.add('kubejs:jutecrete', 'kubejs:flowing_jutecrete')
})