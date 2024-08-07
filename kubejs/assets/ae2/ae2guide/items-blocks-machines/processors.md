---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
  title: Processors
  icon: logic_processor
  position: 010
categories:
- misc ingredients blocks
item_ids:
- ae2:logic_processor
- ae2:calculation_processor
- ae2:engineering_processor
- ae2:printed_logic_processor
- ae2:printed_calculation_processor
- ae2:printed_engineering_processor
- megacells:printed_accumulation_processor
- megacells:accumulation_processor
---

# Processors

<Row>
  <ItemImage id="logic_processor" scale="4" />

  <ItemImage id="calculation_processor" scale="4" />

  <ItemImage id="engineering_processor" scale="4" />
  
  <ItemImage id="megacells:accumulation_processor" scale="4" />
</Row>

Processors are one of the primary ingredients in AE2 [devices](../ae2-mechanics/devices.md) and machines. They are also one of your first
big automation challenges. There are four types of processor, made with gold, <ItemLink id="certus_quartz_dust" />,
diamond, opal, or sapphire powder, and black steel respectively. They are made using [presses](presses.md) in an <ItemLink id="inscriber" />, in a multi-step
process (usually achieved via a series of inscribers and filtered piping).

## Production Steps

<Column gap="2">
  1.  Gather/make the required ingredients

  <Row>
	<ItemImage id="tfc:powder/native_gold" scale="2" />
	
	<ItemImage id="certus_quartz_dust" scale="2" />
	
	<ItemImage id="tfc:powder/diamond" scale="2" />
	
	<ItemImage id="tfc:metal/sheet/black_steel" scale="2" />
  </Row>

  <br />

  2.  Press the prerequisite printed circuit components

  <Row>
    <RecipeFor id="printed_logic_processor" />
	
    <RecipeFor id="printed_calculation_processor" />
  </Row>

  <Row>
    <RecipeFor id="printed_engineering_processor" />
	
	<RecipeFor id="megacells:printed_accumulation_processor" />
  </Row>

  <br />

  3.  Final assembly

  <Row>
    <RecipeFor id="logic_processor" />

    <RecipeFor id="calculation_processor" />
  </Row>

  <Row>
    <RecipeFor id="engineering_processor" />
	
	<RecipeFor id="megacells:accumulation_processor" />
  </Row>
</Column>
