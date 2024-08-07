---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
  title: Electronics Assembler
  icon: jumbofurnace:jumbo_furnace
  position: 010
categories:
- machines
item_ids:
- jumbofurnace:jumbo_furnace
- jumbofurnace:jumbo_furnace_jei
---

# Electronics Assembler

<GameScene zoom="4" background="transparent">
	<ImportStructure src="../assets/assemblies/elec_assemb.nbt" />
	<IsometricCamera yaw="195" pitch="30" />
</GameScene>

The <ItemLink id="jumbofurnace:jumbo_furnace" /> is an automated means of crafting electronic compontents made in the <ItemLink id="thoriumreactors:thorium_crafting_table" />.

## Energy

This machine is powered by RF and consumes 1 RF/t per recipe being performed and has an internal storage of 1000 RF.
In addition to the active power drain during recipes the <ItemLink id="jumbofurnace:jumbo_furnace" /> has a passive power drain of 1 RF/t.
To help with this, the <ItemLink id="jumbofurnace:jumbo_furnace" /> will only accept energy when it has a recipe it can process.

Be wary, the <ItemLink id="jumbofurnace:jumbo_furnace" /> will essentially void energy if the incoming energy is less than that its using.

## Items

Items can be inserted into the assembler's ingredient buffer from the top and completed compontents can be extracted from the bottom.

## Construction

The <ItemLink id="jumbofurnace:jumbo_furnace" /> is constructed in world from 16 <ItemLink id="firmalife:metal/block/stainless_steel" />s, 4 <ItemLink id="crafting_unit" />s, 4 <ItemLink id="tfc:metal/block/wrought_iron" />,
1 <ItemLink id="interface" />, 1 <ItemLink id="inscriber" />, 1 <ItemLink id="energy_acceptor" />, and 1 <ItemLink id="thoriumreactors:redstone_processor" />.

The <ItemLink id="firmalife:metal/block/stainless_steel" />s are arranged in rings on the top and bottom layer of the assembler with the <ItemLink id="interface" /> filling in the gap in the bottom layer and the
<ItemLink id="energy_acceptor" /> filling the gap in the top layer. The <ItemLink id="inscriber" /> is placed in the center of the middle layer with the <ItemLink id="crafting_unit" />s placed in the center of each side
and the <ItemLink id="tfc:metal/block/wrought_iron" />s filling the corners. Once built, click any of the <ItemLink id="crafting_unit" />s with the <ItemLink id="thoriumreactors:redstone_processor" /> to complete the structure.

<GameScene zoom="4" background="transparent" interactive={true}>
	<ImportStructure src="../assets/assemblies/elec_assemb_struct.nbt" />
	<IsometricCamera yaw="195" pitch="30" />
</GameScene>

What a fully built <ItemLink id="jumbofurnace:jumbo_furnace" /> looks like before completion.

<GameScene zoom="4" background="transparent" interactive={true}>
	<ImportStructure src="../assets/assemblies/elec_assemb_struct_exp.nbt" />
	<IsometricCamera yaw="195" pitch="30" />
</GameScene>

An exploded view of a fully built <ItemLink id="jumbofurnace:jumbo_furnace" /> before completion.
