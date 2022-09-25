//priority 10

console.info('Loading removal scripts')

let outputs = ['immersiveposts:postbase', 'immersiveposts:fence_iron', 'immersiveposts:fence_gold', 'immersiveposts:fence_copper', 'immersiveposts:fence_silver', 'immersiveposts:fence_nickel', 'immersiveposts:fence_constantan', 'immersiveposts:fence_electrum', 'immersiveposts:stick_gold', 'immersiveposts:stick_silver', 'immersiveposts:stick_nickel', 'immersiveposts:stick_copper', 'immersiveengineering:component_iron', 'immersiveengineering:component_steel', 'immersiveengineering:dynamo', 'immersiveengineering:windmill', 'immersiveengineering:watermill', 'immersiveengineering:thermoelectric_generator', 'immersiveengineering:wirecutter', 'immersiveengineering:hammer',  'immersiveengineering:screwdriver', 'immersiveengineering:manual', 'immersiveengineering:fertilizer', 'create_crystal_clear:steel_tinted_glass_casing', 'immersiveengineering:electric_lantern', 'immersiveengineering:stick_steel', 'immersiveengineering:wire_lead', 'immersiveengineering:wire_steel', 'immersiveengineering:wire_aluminum', 'immersiveengineering:wire_electrum', 'immersiveengineering:wire_copper', 'create:andesite_alloy', 'create:andesite_casing', 'create:brass_casing', 'create:copper_casing', 'create:encased_chain_drive', 'create:mechanical_press', 'create:weighted_ejector', 'create:chute', 'create:smart_chute', 'create:metal_bracket', 'create:metal_girder', 'create:brass_ladder', 'create:copper_ladder', 'create:fluid_pipe', 'create:smart_fluid_pipe', 'create:fluid_valve', 'create:copper_valve_handle', 'create:fluid_tank', 'create:hose_pulley', 'create:spout', 'create:steam_engine', 'create:steam_whistle', 'create:rope_pulley', 'create:mechanical_drill', 'create:mechanical_saw', 'create:redstone_contact', 'create:mechanical_harvester', 'create:andesite_funnel', 'create:andesite_tunnel', 'create:brass_funnel', 'create:brass_tunnel', 'create:display_link', 'create:pulse_extender', 'create:pulse_repeater', 'create:attribute_filter', 'create:filter', 'create:belt_connector', 'create:crafter_slot_cover', 'create:mechanical_plough', 'create:mechanical_arm', 'create:item_vault', 'create:placard', 'create:rose_quartz', 'create:propeller', 'create:whisk', 'create:brass_hand', 'create:electron_tube', 'create:goggles', 'create:super_glue', 'create:minecart_coupling', 'create:train_door', 'create:train_trapdoor', 'create:diving_helmet', 'create:copper_backtank', 'create:diving_boots', 'create:peculiar_bell', 'create:wrench', 'create:potato_cannon', 'create:schematicannon', 'create:schematic_table', 'create:sturdy_sheet', 'create:track', 'create:precision_mechanism', 'create:brown_toolbox', 'create:controller_rail', 'create:empty_blaze_burner', 'create:brass_ingot', 'create:chocolate_glazed_berries', 'create:sand_paper', 'create:red_sand_paper', 'create:mechanical_pump', 'usclb:clipboardfolder', 'usclb:clipboard', 'toolbelt:pouch', 'toolbelt:belt', 'immersiveengineering:glider', 'create:sticker', 'create:sticky_mechanical_piston', 'immersiveengineering:light_bulb']

let ids = ['uppers:upper', 'immersiveengineering:alloysmelter/brass', 'immersiveengineering:alloysmelter/constantan', 'immersiveengineering:alloysmelter/electrum', 'immersiveengineering:crafting/blueprint_molds', 'immersiveengineering:crafting/blueprint_components', 'immersiveengineering:crafting/blueprint_bullets', 'immersiveengineering:crafting/blueprint_bannerpatterns', 'immersiveengineering:alloysmelter/bronze', 'immersiveengineering:alloysmelter/rose_gold', 'immersiveengineering:blueprint/mold_plate', 'immersiveengineering:blueprint/mold_gear', 'immersiveengineering:blueprint/mold_rod', 'immersiveengineering:blueprint/mold_bullet_casing', 'immersiveengineering:blueprint/mold_wire', 'immersiveengineering:blueprint/mold_packing_4', 'immersiveengineering:blueprint/mold_packing_9', 'immersiveengineering:blueprint/mold_unpacking']

onEvent('recipes', e => {
	outputs.forEach(output => {
		e.remove({output: output})
	})
	ids.forEach(id => {
		e.remove({id: id})
	})
	e.remove({mod: 'gunswithoutroses'});
	e.remove({mod: 'chunkloaders'});
	e.remove({input: 'minecraft:charcoal', type: 'create:milling'});
	e.remove({input: '#forge:sandstone', output: 'immersiveengineering:cokebrick'});
	e.remove({input: 'minecraft:magma_block', output: 'immersiveengineering:blastbrick'});
	e.remove({input: 'minecraft:brick', output: 'immersiveengineering:alloybrick'});
	e.remove({output: 'immersiveengineering:ingot_electrum'});
	e.remove({input: 'immersiveengineering:ingot_electrum'});
	e.remove({output: 'immersiveengineering:ingot_constantan'});
	e.remove({input: 'immersiveengineering:ingot_constantan'});
	e.remove({output: 'immersiveengineering:ingot_lead'});
	e.remove({input: 'immersiveengineering:ingot_lead'});
	e.remove({output: 'immersiveengineering:graphite_electrode', type: 'immersiveengineering:blueprint'});
})