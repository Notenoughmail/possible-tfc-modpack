

const Entity = Java.loadClass('net.minecraft.world.entity.Entity');
const Level = Java.loadClass('net.minecraft.world.level.Level');
const setLevelMethod = Entity.__javaObject__.getDeclaredMethod('m_284535_', Level);
setLevelMethod.setAccessible(true);
const properEntityOrientation = new Quaternionf().rotationZ(KMath.PI);
const OverlayTexture = Java.loadClass('net.minecraft.client.renderer.texture.OverlayTexture');
const blockOrientation = new Quaternionf().rotationXYZ(KMath.PI / 6, KMath.PI / 4, KMath.PI);

JEIAddedEvents.registerCategories(e => {
	e.custom('kubejs:entity', category => {
		let { jeiHelpers } = category;
		let { guiHelper } = jeiHelpers;

		global.entityRecipeType = category
			.title(Text.translatable('category.kubejs.entity'))
			.background(guiHelper.createBlankDrawable(100, 100))
			.icon(guiHelper.createDrawableItemStack('tfc:kaolin_clay')) // TODO: Change this
			.isRecipeHandled(r => global.verifyEntityRecipe(jeiHelpers, r))
			.handleLookup((builder, r, focuses) => global.handleEntityLookup(jeiHelpers, builder, r, focuses))
			.setDrawHandler((r, recipeSlotsView, guiGraphics, mouseX, mouseY) => global.renderEntityRecipe(jeiHelpers, r, recipeSlotsView, guiGraphics, mouseX, mouseY))
			.recipeType;
	});
    e.custom('kubejs:ores', category => {
        let { jeiHelpers } = category;
        let { guiHelper } = jeiHelpers;

		let staticArrow = guiHelper.createDrawable('tfc:textures/gui/jei/icons.png', 0, 14, 22, 16);
		let animatedArrow = guiHelper.createAnimatedDrawable(guiHelper.createDrawable('tfc:textures/gui/jei/icons.png', 22, 14, 22, 16), 80, 'left', false);
		let slot = guiHelper.slotDrawable;

        global.oreRecipeType = category
            .title(Text.translatable('category.kubejs.ores'))
            .background(guiHelper.createBlankDrawable(140, 100))
            .icon(guiHelper.createDrawableItemStack('tfc:ore/rich_malachite'))
            .isRecipeHandled(r => global.verifyOreRecipe(jeiHelpers, r))
            .handleLookup((builder, r, focuses) => global.handleOreLookup(jeiHelpers, builder, r, focuses, slot))
            .setDrawHandler((r, recipeSlotsView, guiGraphics, mouseX, mouseY) => global.renderOreRecipe(jeiHelpers, r, recipeSlotsView, guiGraphics, mouseX, mouseY, staticArrow, animatedArrow))
            .recipeType;
    });
	e.custom('kubejs:electronics_assembler', category => {
		let { jeiHelpers } = category;
		let { guiHelper } = jeiHelpers;

		let arrow = guiHelper.createDrawable('tfc:textures/gui/jei/icons.png', 0, 14, 22, 16);
		let slot = guiHelper.slotDrawable;

		global.electronicsRecipeType = category
			.title(Text.translatable('category.kubejs.electronics_assembler'))
			.background(guiHelper.createBlankDrawable(98, 54))
			.icon(guiHelper.createDrawableItemStack('kubejs:electronics_assembler'))
			.isRecipeHandled(r => global.verifyElectronicsRecipe(jeiHelpers, r))
			.handleLookup((builder, r, focuses) => global.handleElectronicsLookup(jeiHelpers, builder, r, focuses, slot))
			.setDrawHandler((r, recipeSlotsView, guiGraphics, mouseX, mouseY) => global.renderElectronicsRecipe(jeiHelpers, r, recipeSlotsView, guiGraphics, mouseX, mouseY, arrow))
			.recipeType;
	});
})

JEIAddedEvents.registerRecipes(e => {
	let rocketEntity = Client.level.createEntity('kubejs:rocket');
	rocketEntity.noCulling = true;
	let rocketWidth = rocketEntity.bbWidth;
	let rocketHeight = rocketEntity.bbHeight;
	let rocketSize = JavaMath.max(0.8, JavaMath.max(rocketHeight, rocketWidth));

	e.custom('kubejs:entity')
		.addAll([
			{
				entity: (level) => {
					if (rocketEntity.level != level) {
						setLevelMethod.invoke(rocketEntity, level);
					}
					return rocketEntity;
				},
				description: Text.translatable('jei.description.rocket'),
				offset: JavaMath.max(rocketHeight, rocketSize) * 0.5,
				renderScale: 100 / rocketSize * 0.8,
				rot: new Quaternionf().rotationXYZ(KMath.PI / 10, KMath.PI / 4, KMath.PI)
			}
		]);

    // Done this way because something bad happens when using a raw js array and its transferred between the various methods
    let quartzStates = Utils.newList();
    quartzStates.addAll([
        Utils.parseBlockState('ae2:flawless_budding_quartz'),
        Utils.parseBlockState('ae2:flawed_budding_quartz'),
        Utils.parseBlockState('ae2:chipped_budding_quartz'),
        Utils.parseBlockState('ae2:damaged_budding_quartz'),
		Utils.parseBlockState('ae2:quartz_block')
    ]);

	let kaoliniteStates = Utils.newList();
	kaoliniteStates.addAll([
		Utils.parseBlockState('tfc:white_kaolin_clay'),
		Utils.parseBlockState('tfc:pink_kaolin_clay'),
		Utils.parseBlockState('tfc:red_kaolin_clay'),
		Utils.parseBlockState('tfc:kaolin_clay_grass'),
		Utils.parseBlockState('tfc:plant/blood_lily')
	]);

	let lithiumStates = Utils.newList();
	lithiumStates.addAll([
		Utils.parseBlockState('kubejs:lithium_salt'),
		Utils.parseBlockState('kubejs:lithium_salt_grass')
	]);

	let oreRecipes = [
		{
			states: quartzStates,
			items: Ingredient.of('#kubejs:ore/certus_quartz'),
			description: Text.translatable('jei.description.ores.certus_quartz'),
			single: false,
			scale: 80,
			rocks: Ingredient.of('#kubejs:rock/certus_quartz_bearing')
		},
		{
			states: kaoliniteStates,
			items: Ingredient.of('#kubejs:ore/kaolin'),
			description: Text.translatable('jei.description.ores.kaolinite'),
			single: false,
			scale: 100,
			rocks: Ingredient.of('#kubejs:rock/kaolin_bearing')
		},
		{
			state: Utils.parseBlockState('firmalife:ore/normal_chromite/dacite'),
			items: Ingredient.of('#kubejs:ore/chromite'),
			description: Text.translatable('jei.description.ores.chromite'),
			single: true,
			rocks: Ingredient.of('#kubejs:rock/chromite_bearing')
		},
		{
			states: lithiumStates,
			items: Ingredient.of('#kubejs:ore/lithium'),
			description: Text.translatable('jei.description.ores.lithium'),
			single: false,
			scale: 40,
			rocks: Ingredient.of('#kubejs:rock/lithium_bearing')
		}
	];

	[
		'native_copper',
		'native_gold',
		'native_silver',
		'tetrahedrite',
		'malachite',
		'cassiterite',
		'bismuthinite',
		'garnierite',
		'hematite',
		'magnetite',
		'limonite',
		'sphalerite',
	].forEach(ore => {
		oreRecipes.push({
			state: Utils.parseBlockState(`tfc:ore/rich_${ore}/dacite`),
			items: Ingredient.of(`#kubejs:ore/${ore}`),
			description: Text.translatable(`jei.description.ores.${ore}`),
			single: true,
			rocks: Ingredient.of(`#kubejs:rock/${ore}_bearing`)
		})
	});

	[
		'lignite',
		'bituminous_coal',
		'graphite',
		'cinnabar',
		'cryolite',
		'saltpeter',
		'sulfur',
		'sylvite',
		'borax',
		'gypsum',
		'halite',
		'emerald',
		'diamond',
		'lapis_lazuli',
		'amethyst',
		'opal'
	].forEach(ore => {
		oreRecipes.push({
			state: Utils.parseBlockState(`tfc:ore/${ore}/dacite`),
			items: Ingredient.of(`#kubejs:ore/${ore}`),
			description: Text.translatable(`jei.description.ores.${ore}`),
			single: true,
			rocks: Ingredient.of(`#kubejs:rock/${ore}_bearing`)
		});
	});

    e.custom('kubejs:ores')
        .addAll(oreRecipes);
	
	e.custom('kubejs:electronics_assembler')
		.addAll([
			{
				ingredients: [
					{
						ingredient: 'ae2:certus_quartz_dust',
						count: 1
					}, {
						ingredient: '#forge:glass',
						count: 1,
						tag: true
					}
				],
				output: '8x ae2:quartz_fiber'
			}, {
				ingredients: [
					{
						ingredient: 'morered:bundled_network_cable',
						count: 1
					}, {
						ingredient: 'ae2:quartz_fiber',
						count: 1
					}, {
						ingredient: 'ae2:fluix_dust',
						count: 1
					}
				],
				output: '12x ae2:fluix_glass_cable'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:certus_quartz_crystal',
						count: 2
					}, {
						ingredient: 'ae2:logic_processor',
						count: 2
					}, redWire(3)
				],
				output: 'ae2:cell_component_1k'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:cell_component_1k',
						count: 3
					},
					calculation(2),
					redWire(3)
				],
				output: 'ae2:cell_component_4k'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:cell_component_4k',
						count: 3
					},
					calculation(2),
					redWire(3)
				],
				output: 'ae2:cell_component_16k'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:cell_component_16k',
						count: 3
					},
					calculation(2),
					redWire(3)
				],
				output: 'ae2:cell_component_64k'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:cell_component_64k',
						count: 3
					},
					engineering(2),
					redWire(3)
				],
				output: 'ae2:cell_component_256k'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:cell_component_256k',
						count: 3
					},
					engineering(2),
					redWire(3)
				],
				output: 'megacells:cell_component_1m'
			}, {
				ingredients: [
					{
						ingredient: 'megacells:cell_component_1m',
						count: 3
					},
					engineering(2),
					bundle(3)
				],
				output: 'megacells:cell_component_4m'
			}, {
				ingredients: [
					{
						ingredient: 'megacells:cell_component_4m',
						count: 3
					},
					accumulation(2),
					bundle(3)
				],
				output: 'megacells:cell_component_16m'
			}, {
				ingredients: [
					{
						ingredient: 'megacells:cell_component_16m',
						count: 3
					},
					accumulation(2),
					bundle(3)
				],
				output: 'megacells:cell_component_64m'
			}, {
				ingredients: [
					{
						ingredient: 'megacells:cell_component_64m',
						count: 3
					},
					accumulation(2),
					bundle(3)
				],
				output: 'megacells:cell_component_256m'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:quartz_glass',
						count: 1
					},
					{
						ingredient: 'ae2:fluix_crystal',
						count: 5
					},
					accumulation(2),
					bundle(10)
				],
				output: 'ae2:spatial_cell_component_2'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:spatial_cell_component_2',
						count: 6
					},
					accumulation(2),
					bundle(1)
				],
				output: 'ae2:spatial_cell_component_16'
			}, {
				ingredients: [
					{
						ingredient: 'ae2:spatial_cell_component_16',
						count: 6
					},
					accumulation(2),
					bundle(1)
				],
				output: 'ae2:spatial_cell_component_128'
			}, {
				ingredients: [
					rod('copper'),
					bundle(1),
					{
						ingredient: 'tfc:metal/sheet/gold',
						count: 1
					}, {
						ingredient: 'minecraft:comparator',
						count: 2
					}
				],
				output: '6x thoriumreactors:redstone_processor'
			}, {
				ingredients: [
					steelSheet(),
					rod('copper'),
					bundle(2),
					rsProcessor(),
					{
						ingredient: 'kubejs:lithium_plate',
						count: 1
					}, {
						ingredient: 'kubejs:graphite_plate',
						count: 1
					}
				],
				output: 'thoriumreactors:module_energy'
			}, {
				ingredients: [
					steelSheet(),
					rod('steel'),
					bundle(2),
					rsProcessor(),
					{
						ingredient: '#tfc:barrels',
						count: 1,
						tag: true
					}
				],
				output: 'thoriumreactors:module_tank'
			}, {
				ingredients: [
					steelSheet(),
					rod('gold'),
					bundle(2),
					rsProcessor(),
					redWire(4)
				],
				output: 'thoriumreactors:module_io'
			}, {
				ingredients: [
					steelSheet(),
					rod('nickel'),
					bundle(2),
					rsProcessor(),
					{
						ingredient: 'minecraft:daylight_detector',
						count: 1
					}, {
						ingredient: '#minecraft:stone_pressure_plates',
						count: 1,
						tag: true
					}
				],
				output: 'thoriumreactors:module_sensor'
			}, {
				ingredients: [
					steelSheet(),
					rod('brass'),
					bundle(2),
					rsProcessor(),
					calculation(2)
				],
				output: 'thoriumreactors:module_processing'
			}, {
				ingredients: [
					steelSheet(),
					rod('zinc'),
					bundle(2),
					rsProcessor(),
					{
						ingredient: '#forge:chests/wooden',
						count: 1,
						tag: true
					}
				],
				output: 'thoriumreactors:module_storage'
			}
		]);
})

/**
 * @param {number} c 
 */
function redWire(c) {
	return {
		ingredient: 'morered:red_alloy_wire',
		count: c
	}
}

/**
 * @param {number} c 
 */
function engineering(c) {
	return {
		ingredient: 'ae2:engineering_processor',
		count: c
	}
}

/**
 * @param {number} c 
 */
function calculation(c) {
	return {
		ingredient: 'ae2:calculation_processor',
		count: c
	}
}

/**
 * @param {number} c 
 */
function accumulation(c) {
	return {
		ingredient: 'megacells:accumulation_processor',
		count: c
	}
}

/**
 * @param {number} c 
 */
function bundle(c) {
	return {
		ingredient: 'morered:bundled_network_cable',
		count: c
	}
}

function steelSheet() {
	return {
		ingredient: 'tfc:metal/sheet/steel',
		count: 1
	}
}

/**
 * @param {string} type 
 */
function rod(type) {
	return {
		ingredient: `tfc:metal/rod/${type}`,
		count: 1
	}
}

function rsProcessor() {
	return {
		ingredient: 'thoriumreactors:redstone_processor',
		count: 1
	}
}

JEIAddedEvents.registerRecipeCatalysts(e => {
	let { data } = e;

	data.addRecipeCatalyst(
		Item.of('ae2:certus_quartz_cutting_knife')
			.withLore(Text.translatable('kubejs.jei.lore.in_offhand').green()),
		data.jeiHelpers.getRecipeType('tfc:steel_sheet_carving_knapping').get()
	);

	data.addRecipeCatalyst(
		'kubejs:electronics_assembler',
		global.electronicsRecipeType
	)
})

const KNIFE_IN_OFFHAND = Utils.lazy(() => {
	let list = Utils.newList();
	list.add(Text.translatable('kubejs.jei.tooltip.in_offhand', Item.of('ae2:certus_quartz_cutting_knife').displayName.copy().gold()).gray())
	return list;
});

JEIAddedEvents.registerAdvanced(e => {
	let { data } = e;
	data.addRecipeCategoryDecorator(
		data.jeiHelpers.getRecipeType('tfc:steel_sheet_carving_knapping').get(),
		e.categoryDecorator((recipe, category, slotView, guiGraphics, mouseX, mouseY) => {}, (tooltips, recipe, category, slotView, mouseX, mouseY) => {
			if (mouseX > 100 || mouseX < 20) {
				return KNIFE_IN_OFFHAND.get()
			}
			return tooltips;
		})
	);
})

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.CustomJSRecipe} r 
 */
global.verifyEntityRecipe = (jeiHelpers, r) => {
	let { data } = r;
	return  data != undefined &&
			data != null &&
			data.entity != undefined &&
			data.description != undefined &&
			data.offset != undefined &&
			data.renderScale != undefined;
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.CustomJSRecipe} r 
 */
global.verifyOreRecipe = (jeiHelpers, r) => {
	let { data } = r;
    return  data != undefined &&
			data != null &&
			data.single != undefined &&
            ((data.states != undefined && data.single == false && data.scale != undefined) || (data.state != undefined && data.single == true)) &&
            data.items != undefined &&
            data.description != undefined &&
			data.rocks != undefined;
}

/**
 * 
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.CustomJSRecipe} r 
 */
global.verifyElectronicsRecipe = (jeiHelpers, r) => {
	let { data } = r;
	return  data != undefined &&
			data != null &&
			data.output != undefined &&
			data.ingredients != undefined &&
			data.ingredients.length < 9
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.IRecipeLayoutBuilder} builder 
 * @param {Internal.CustomJSRecipe} r 
 * @param {Internal.IFocusGroup} focuses 
 */
global.handleEntityLookup = (jeiHelpers, builder, r, focuses) => {
	builder.addSlot('render_only', 35, 20);
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.IRecipeLayoutBuilder} builder 
 * @param {Internal.CustomJSRecipe} r 
 * @param {Internal.IFocusGroup} focuses 
 * @param {Internal.IDrawableStatic} slot
 */
global.handleOreLookup = (jeiHelpers, builder, r, focuses, slot) => {
	builder.addSlot('input', 4, 80).addIngredients(r.data.rocks).setBackground(slot, -1, -1);
    builder.addSlot('output', 48, 80).addIngredients(r.data.items).setBackground(slot, -1, -1);
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.IRecipeLayoutBuilder} builder 
 * @param {Internal.CustomJSRecipe} r 
 * @param {Internal.IFocusGroup} focuses 
 * @param {Internal.IDrawableStatic} slot
 */
global.handleElectronicsLookup = (jeiHelpers, builder, r, focuses, slot) => {
	let { data } = r;
	let { ingredients, output } = data;
	builder.addSlot('output', 81, 19).addItemStack(output).setBackground(slot, -1, -1);
	for (let i = 0 ; i < ingredients.length ; i++) {
		let ingredient = decomposeIngredient(i, ingredients[i].ingredient, ingredients[i].count, ingredients.length == 8);
		builder.addSlot('input', ingredient.x, ingredient.y).addItemStacks(ingredient.ingredients).setBackground(slot, -1, -1);
	}
}

/**
 * @param {number} index 
 * @param {Internal.Ingredient} ingredient 
 * @param {number} count 
 * @param {boolean} circle 
 * @returns 
 */
function decomposeIngredient(index, ingredient, count, circle) {
	let stacks = Utils.newList();
	Ingredient.of(ingredient).stacks.forEach(stack => {
		stacks.add(stack.copy().withCount(count));
	});
	return {
		ingredients: stacks,
		x: electronicsX(index, circle),
		y: electronicsY(index, circle)
	}
}

const electronicsX8 = [1,1,1,19,19,37,37,37];
const electronicsY8 = [1,19,37,1,37,1,19,37];
const electronicsXS = [1,1,1,19,19,19,37,37];
const electronicsYS = [1,19,37,1,19,37,1,19];

/**
 * @param {number} index 
 * @param {boolean} circle 
 */
function electronicsX(index, circle) {
	if (circle) {
		return electronicsX8[index];
	} else {
		return electronicsXS[index];
	}
}

/**
 * @param {number} index 
 * @param {boolean} circle 
 */
function electronicsY(index, circle) {
	if (circle) {
		return electronicsY8[index];
	} else {
		return electronicsYS[index];
	}
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.CustomJSRecipe} r 
 * @param {Internal.IRecipeSlotView} recipeSlotsView 
 * @param {Internal.GuiGraphics} guiGraphics 
 * @param {number} mouseX 
 * @param {number} mouseY 
 */
global.renderEntityRecipe = (jeiHelpers, r, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
	let { data } = r;

	guiGraphics.drawWordWrap(Client.font, data.description, 0, 0, 100, 0);

	let poseStack = guiGraphics.pose();
	poseStack.pushPose();
	let entity = data.entity(Client.level);

	poseStack.translate(58, 60, 50);
	let scale = data.renderScale;
	poseStack.scale(scale, scale, scale);
	poseStack.translate(0, data.offset, 0);

	if (data.rot != undefined) {
        // This isn't working correctly
		poseStack.mulPose(data.rot);
	} else {
		poseStack.mulPose(properEntityOrientation)
	}

	let entityRenderDispatcher = Client.entityRenderDispatcher;
	entityRenderDispatcher.setRenderShadow(false);
	entityRenderDispatcher.render(entity, 0, 0, 0, 0, 1, poseStack, guiGraphics.bufferSource(), 0xF000F0);
	entityRenderDispatcher.setRenderShadow(true);

	guiGraphics.bufferSource().endBatch();
	poseStack.popPose();
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.CustomJSRecipe} r 
 * @param {Internal.IRecipeSlotView} recipeSlotsView 
 * @param {Internal.GuiGraphics} guiGraphics 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {Internal.IDrawableStatic} arrow
 * @param {Internal.IDrawableAnimated} arrowAnim
 */
global.renderOreRecipe = (jeiHelpers, r, recipeSlotsView, guiGraphics, mouseX, mouseY, arrow, arrowAnim) => {
    let { data } = r;

    guiGraphics.drawWordWrap(Client.font, data.description, 0, 5, 140, 0);

	arrow.draw(guiGraphics, 23, 80);
	arrowAnim.draw(guiGraphics, 23, 80);

    let poseStack = guiGraphics.pose();
    poseStack.pushPose();

    poseStack.translate(120, 100, 60);
    poseStack.scale(25, 25, 25);
    poseStack.mulPose(blockOrientation);

	let state;
	if (data.single) {
		state = data.state;
	} else {
		let length = data.states.length;
		let scale = data.scale;
		state = data.states.get(((Client.level.time % scale) / scale * length));
	}

    Client.blockRenderer.renderSingleBlock(state, poseStack, guiGraphics.bufferSource(), 0xF000F0, OverlayTexture.NO_OVERLAY);

    poseStack.popPose();
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.CustomJSRecipe} r 
 * @param {Internal.IRecipeSlotView} recipeSlotsView 
 * @param {Internal.GuiGraphics} guiGraphics 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {Internal.IDrawableStatic} arrow
 */
global.renderElectronicsRecipe = (jeiHelpers, r, recipeSlotsView, guiGraphics, mouseX, mouseY, arrow) => {
	arrow.draw(guiGraphics, 56, 19);
}
