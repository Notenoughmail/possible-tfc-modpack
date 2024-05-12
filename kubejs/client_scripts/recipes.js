

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
        Utils.parseBlockState('ae2:damaged_budding_quartz')
    ]);

	let kaoliniteStates= Utils.newList();
	kaoliniteStates.addAll([
		Utils.parseBlockState('tfc:white_kaolin_clay'),
		Utils.parseBlockState('tfc:pink_kaolin_clay'),
		Utils.parseBlockState('tfc:red_kaolin_clay'),
		Utils.parseBlockState('tfc:kaolin_clay_grass'),
		Utils.parseBlockState('tfc:plant/blood_lily')
	])

	let recipes = [
		{
			states: quartzStates,
			items: Ingredient.of('#kubejs:ore/certus_quartz'),
			description: Text.translatable('jei.description.ores.certus_quartz'),
			single: false,
			scale: 40,
			rocks: Ingredient.of('#kubejs:rock/certus_quartz_bearing')
		},
		{
			states: kaoliniteStates,
			items: Ingredient.of('#kubejs:ore/kaolin'),
			description: Text.translatable('jei.description.ores.kaolinite'),
			single: false,
			scale: 40,
			rocks: Ingredient.of('#kubejs:rock/kaolin_bearing')
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
		recipes.push({
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
		recipes.push({
			state: Utils.parseBlockState(`tfc:ore/${ore}/dacite`),
			items: Ingredient.of(`#kubejs:ore/${ore}`),
			description: Text.translatable(`jei.description.ores.${ore}`),
			single: true,
			rocks: Ingredient.of(`#kubejs:rock/${ore}_bearing`)
		})
	});

	recipes.push({
		state: Utils.parseBlockState('firmalife:ore/normal_chromite/dacite'),
		items: Ingredient.of('#kubejs:ore/chromite'),
		description: Text.translatable('jei.description.ores.chromite'),
		single: true,
		rocks: Ingredient.of('#kubejs:rock/chromite_bearing')
	})

    e.custom('kubejs:ores')
        .addAll(recipes);
})

JEIAddedEvents.registerRecipeCatalysts(e => {
	let { data } = e;
	// data.addRecipeCatalyst('kubejs:double_ingot/lead', global.entityRecipeType);
})

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.CustomJSRecipe} r 
 */
global.verifyEntityRecipe = (jeiHelpers, r) => {
	return  r.data != undefined &&
			r.data.entity != undefined &&
			r.data.description != undefined &&
			r.data.offset != undefined &&
			r.data.renderScale != undefined;
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.CustomJSRecipe} r 
 */
global.verifyOreRecipe = (jeiHelpers, r) => {
    return  r.data != undefined &&
			r.data.single != undefined &&
            ((r.data.states != undefined && r.data.single == false && r.data.scale != undefined) || (r.data.state != undefined && r.data.single == true)) &&
            r.data.items != undefined &&
            r.data.description != undefined &&
			r.data.rocks != undefined;
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
