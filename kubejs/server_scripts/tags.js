// priority: 0

console.info('Loading tag scripts')

onEvent('tags.blocks', e => {
	e.add('tfc:support_beam', 'create:metal_girder')
	e.add('create:passive_boiler_heaters', 'tfc:firepit')
	e.add('create:passive_boiler_heaters', 'immersiveengineering:storage_uranium')
	e.add('firmalife:all_copper_greenhouse', 'create:encased_fluid_pipe')
	e.add('firmalife:greenhouse', 'create:encased_fluid_pipe')
	e.add('firmalife:copper_greenhouse', 'create:encased_fluid_pipe')
	e.add('firmalife:all_iron_greenhouse', 'create:ornate_iron_window')
	e.add('firmalife:greenhouse', 'create:ornate_iron_window')
	e.add('firmalife:iron_greenhouse', 'create:ornate_iron_window')
	e.add('tfc:forge_invisible_whitelist', 'create:fluid_tank')
});

let berries = ['wintergreen_berry', 'strawberry', 'snowberry', 'raspberry', 'gooseberry', 'elderberry', 'cranberry', 'cloudberry', 'bunchberry', 'blueberry', 'blackberry']

let tfc_metals = ['bismuth', 'bismuth_bronze', 'black_bronze', 'bronze', 'brass', 'copper', 'gold', 'nickel', 'rose_gold', 'silver', 'tin', 'zinc', 'sterling_silver', 'wrought_iron', 'cast_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel']

let tool_rack = ['create:wrench', 'create:goggles', 'immersiveengineering:hammer', 'immersiveengineering:wirecutter', 'immersiveengineering:screwdriver', 'immersiveengineering:voltmeter', 'immersiveengineering:drill', 'immersiveengineering:buzzsaw', 'immersiveengineering:revolver', 'immersiveengineering:chemthrower', 'immersiveengineering:railgun', 'immersiveengineering:skyhook', 'gunswithoutroses:iron_gun', 'gunswithoutroses:gold_gun', 'firmalife:watering_can']

let no_color_sheetmetal = ['copper', 'aluminum', 'lead', 'silver', 'nickel', 'uranium', 'constantan', 'electrum', 'steel', 'iron', 'gold']

let tag_molds = ['kubejs:mold/ingot', 'immersiveengineering:mold_plate', 'immersiveengineering:mold_gear', 'immersiveengineering:mold_rod', 'immersiveengineering:mold_bullet_casing', 'immersiveengineering:mold_wire', 'immersiveengineering:mold_packing_4', 'immersiveengineering:mold_packing_9', 'immersiveengineering:mold_unpacking']

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
	e.add('tfc:rocks/loose', '#tfc:rock_knapping')
	e.add('tfc:kelp', 'tfc:plant/winged_kelp')
	e.add('tfc:kelp', 'tfc:plant/leafy_kelp')
	e.add('tfc:kelp', 'tfc:plant/giant_kelp_flower')
	e.remove('forge:cobblestone/normal', /tfc:rock.*mossy_cobble.*/)
	e.add('forge:cobblestone', /tfc:rock.*mossy_cobble.*/)
	e.add('forge:cobblestone/mossy', /tfc:rock.*mossy_cobble.*/)
	e.removeAllTagsFrom('immersiveengineering:dust_coke')
	e.add('forge:dusts/coal_coke', 'tfc:powder/coke')//IE loves tags too much
	e.removeAllTagsFrom('create:copper_nugget')
	e.removeAll('create:sleepers')
	e.add('tfc:blast_furnace_fuel', 'immersiveengineering:coal_coke')
	e.add('forge:ladders/metal', 'create:andesite_ladder')
	e.add('forge:ladders/metal', 'create:brass_ladder')
	e.add('forge:ladders/metal', 'create:copper_ladder')
	e.add('forge:ladders/metal', 'createdeco:gold_ladder')
	e.add('forge:ladders/metal', 'createdeco:netherite_ladder')
	e.add('forge:ladders/metal', 'createdeco:cast_iron_ladder')
	e.add('forge:ladders/metal', 'createdeco:iron_ladder')
	e.add('forge:ladders/metal', 'createdeco:zinc_ladder')
	e.add('tfc:igneous_rock', '#tfc:igneous_intrusive_rock')
	e.add('tfc:igneous_rock', '#tfc:igneous_extrusive_rock')
	
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
	e.add('tfc:metal_item/constantan', 'immersiveposts:stick_constantan')
	e.add('tfc:metal_item/electrum', 'immersiveengineering:plate_electrum')
	e.add('tfc:metal_item/electrum', 'immersiveengineering:ingot_electrum')
	e.add('tfc:metal_item/electrum', 'immersiveposts:stick_electrum')
	e.add('tfc:metal_item/lead', 'immersiveengineering:plate_lead')
	e.add('tfc:metal_item/lead', 'immersiveengineering:ingot_lead')
	e.add('tfc:metal_item/lead', 'immersiveposts:stick_lead')
	e.add('tfc:metal_item/graphite', 'immersiveengineering:ingot_hop_graphite')
	e.add('tfc:metal_item/graphite', 'immersiveengineering:dust_hop_graphite')
	e.add('tfc:pileable_sheets', 'immersiveengineering:plate_constantan')
	e.add('tfc:pileable_sheets', 'immersiveengineering:plate_electrum')
	e.add('tfc:pileable_sheets', 'immersiveengineering:plate_lead')
	e.add('tfc:pileable_ingots', 'immersiveengineering:ingot_constantan')
	e.add('tfc:pileable_ingots', 'immersiveengineering:ingot_electrum')
	e.add('tfc:pileable_ingots', 'immersiveengineering:ingot_lead')
	e.add('tfc:pileable_ingots', 'immersiveengineering:ingot_hop_graphite')

	//weight and szie
	e.add('tfc:minecarts', 'immersiveengineering:minecart_woodencrate')
	e.add('tfc:minecarts', 'immersiveengineering:minecart_reinforcedcrate')
	e.add('tfc:minecarts', 'immersiveengineering:minecart_woodenbarrel')
	e.add('tfc:minecarts', 'immersiveengineering:minecart_metalbarrel')
	e.add('tfc:minecarts', 'minecraft:minecart')
	e.add('tfc:minecarts', 'minecraft:furnace_minecart')
	e.add('tfc:minecarts', 'minecraft:tnt_minecart')
	e.add('tfc:minecarts', 'minecraft:hopper_minecart')
	e.add('tfc:minecarts', 'railways:benchcart')
	e.add('tfc:minecarts', 'railways:jukeboxcart')
})

onEvent('tags.fluids', e => {
	e.add('tfc:molten_metals', 'firmalife:metal/stainless_steel')
	e.add('tfc:molten_metals', 'firmalife:metal/chromium')
	e.add('forge:true_water', 'minecraft:water')/*IE why do you require fluid tags for your inputs*/
	e.add('forge:true_water', 'minecraft:flowing_water')/*a normal fluid would be fine*/
	e.add('immersiveengineering:concrete', 'immersiveengineering:concrete')
	e.add('immersiveengineering:concrete', 'immersiveengineering:concrete_flowing')
	e.add('kubejs:jutecrete', 'kubejs:jutecrete')
	e.add('kubejs:jutecrete', 'kubejs:flowing_jutecrete')
	e.add('tfc:usable_in_jug', '#forge:tea')
})