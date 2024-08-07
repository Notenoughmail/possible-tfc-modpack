
const RecipeSchema = Java.loadClass('dev.latvian.mods.kubejs.recipe.schema.RecipeSchema');
const RecipeComponentBuilderMap = Java.loadClass('dev.latvian.mods.kubejs.recipe.component.RecipeComponentBuilderMap');
const MapRecipeComponent = Java.loadClass('dev.latvian.mods.kubejs.recipe.component.MapRecipeComponent');
/**
 * @type {Internal.RecipeComponent} RecipeComponent
 */
const RecipeComponent = Java.loadClass('dev.latvian.mods.kubejs.recipe.component.RecipeComponent');

global.condemnation = "I love Rhino! It's a perfectly reasonable piece of software with absolutely no problems in any way and all of its error messages are very clear and describe in detail exactly what went wrong and why :)";

StartupEvents.recipeSchemaRegistry(e => {

    let fluidStateComponent = RecipeComponent.builder(
        e.components.get('registryObject')({registry: 'fluid'}).key('id'),
        new MapRecipeComponent(
            e.components.get('nonBlankString')(),
            e.components.get('nonBlankString')(),
            false
        ).key('properties').defaultOptional()
    );

    // Cleaned up version of Chief Arug's script: https://discord.com/channels/303440391124942858/1186645078610034768/1186645078610034768
    let ae2 = e.namespace('ae2');

    ae2.register('entropy', new RecipeSchema(
        RecipeComponent.builder(
            e.components.get('outputBlockState')().simpleMap({id: 'Name', properties: 'Properties'})
                .key('block').defaultOptional(),
            fluidStateComponent.key('fluid').defaultOptional(),
            e.components.get('outputItemArray')().key('drops').optional([])
        ).outputRole().key('output'),
        RecipeComponent.builder(
            e.components.get('inputBlockState')().simpleMap({
                id: 'Name', properties: 'Properties'
            }).key('block').defaultOptional(),
            fluidStateComponent.key('fluid').defaultOptional()
        ).inputRole().key('input'),
        e.components.get('enum')({
            class: 'appeng.recipes.entropy.EntropyMode'
        }).key('mode')
    ));

    ae2.register('charger', new RecipeSchema(
        e.components.get('outputItem')().key('result'),
        e.components.get('inputItem')().key('ingredient')
    ));

    let ic0, ic1, ic2, ic3, ic4, ic5;
    ae2.register('inscriber', new RecipeSchema(
        ic0 = e.components.get('outputItem')().key('result'),
        ic1 = RecipeComponent.builder(
            ic2 = e.components.get('inputItem')().key('top').optional('air'),
            ic3 = e.components.get('inputItem')().key('middle'),
            ic4 = e.components.get('inputItem')().key('bottom').optional('air')
        ).key('ingredients'),
        ic5 = e.components.get('enum')({
            class: 'appeng.recipes.handlers.InscriberProcessType'
        }).key('mode').optional('inscriber')
        ).addConstructor(
            (recipe, _st, _k, source) => {
                recipe.setValue(ic0, source.getValue(recipe, ic0));
                recipe.setValue(ic1, new RecipeComponentBuilderMap(ic1.component));
                recipe.getValue(ic1).put(ic3, source.getValue(recipe, ic3));
        }, ic0, ic3).addConstructor(
            (recipe, _st, _k, source) => {
                recipe.setValue(ic0, source.getValue(recipe, ic0));
                recipe.setValue(ic1, new RecipeComponentBuilderMap(ic1.component));
                recipe.getValue(ic1).put(ic2, source.getValue(recipe, ic2));
                recipe.getValue(ic1).put(ic3, source.getValue(recipe, ic3));
        }, ic0, ic2, ic3).addConstructor(
            (recipe, _st, _k, source) => {
                recipe.setValue(ic0, source.getValue(recipe, ic0));
                recipe.setValue(ic1, new RecipeComponentBuilderMap(ic1.component));
                recipe.getValue(ic1).put(ic2, source.getValue(recipe, ic2));
                recipe.getValue(ic1).put(ic3, source.getValue(recipe, ic3));
                recipe.getValue(ic1).put(ic4, source.getValue(recipe, ic4));
        }, ic0, ic2, ic3, ic4)
    );

     ae2.register('matter_cannon', new RecipeSchema(
        e.components.get('inputItem')().key('ammo'),
        e.components.get('floatNumber')().key('weight')
    ));

    ae2.register('transform', new RecipeSchema(
        e.components.get('outputItem')().key('result'),
        e.components.get('inputItemArray')().key('ingredients'),
        RecipeComponent.builder(
            e.components.get('filteredString')({
                error: 'Transform type must be one of explosion or fluid!',
                filter: s => s == 'fluid'
            }).key('type'),
            e.components.get('fluidTag')().key('tag')
        ).inputRole().or(RecipeComponent.builder(
            e.components.get('filteredString')({
                error: 'Transform type must be one of explosion or fluid!',
                filter: s => s == 'explosion'
            }).key('type')
        )).key('circumstance').optional({
            type: 'fluid',
            tag: 'forge:true_water'
        })
    ));

    let thoriumReactors = e.namespace('thoriumreactors');

    let blastingIn0, blastingIn1, blastingIn2, blastingChance, blastingOut0, blastingOut1, blastingOut2, blastingTicks, blastingTemp, blastingInDecoy;
    thoriumReactors.register('blasting', new RecipeSchema(
        blastingTicks = e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        blastingTemp = e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('temperature'),
        blastingIn0 = RecipeComponent.builder(
            blastingIn1 = e.components.get('inputItem')().key('slot-0').preferred('slot0'),
            blastingIn2 = e.components.get('inputItem')().key('slot-1').preferred('slot1').defaultOptional()
        ).inputRole().key('input'),
        blastingOut0 = RecipeComponent.builder(
            blastingOut1 = e.components.get('outputItem')().key('slot-0').preferred('slot0'),
            blastingOut2 = e.components.get('outputItem')().key('slot-1').preferred('slot1').defaultOptional(),
            blastingChance = e.components.get('intNumber')().key('chance').defaultOptional()
        ).outputRole().key('output'),
        blastingInDecoy = e.components.get('inputItemArray')().key('inputs').defaultOptional()
    ).addConstructor((recipe, _st, _k, values) => {
        recipe.setValue(blastingTicks, values.getValue(recipe, blastingTicks));
        recipe.setValue(blastingTemp, values.getValue(recipe, blastingTemp));

        let inputs = values.getValue(recipe, blastingInDecoy);
        recipe.setValue(blastingIn0, new RecipeComponentBuilderMap(blastingIn0.component));
        recipe.getValue(blastingIn0).put(blastingIn1, inputs[0]);
        let in2 = inputs[1]
        if (in2 != undefined && in2 != null) {
            recipe.getValue(blastingIn0).put(blastingIn2, in2);
        }

        recipe.setValue(blastingOut0, new RecipeComponentBuilderMap(blastingOut0.component));
        recipe.getValue(blastingOut0).put(blastingOut1, values.getValue(recipe, blastingOut1));
    }, blastingOut1, blastingInDecoy, blastingTicks, blastingTemp)
    .addConstructor((recipe, _st, _k, values) => {
        recipe.setValue(blastingTicks, values.getValue(recipe, blastingTicks));
        recipe.setValue(blastingTemp, values.getValue(recipe, blastingTemp));

        let inputs = values.getValue(recipe, blastingInDecoy);
        recipe.setValue(blastingIn0, new RecipeComponentBuilderMap(blastingIn0.component));
        recipe.getValue(blastingIn0).put(blastingIn1, inputs[0]);
        let in2 = inputs[1]
        if (in2 != undefined && in2 != null) {
            recipe.getValue(blastingIn0).put(blastingIn2, in2);
        }

        recipe.setValue(blastingOut0, new RecipeComponentBuilderMap(blastingOut0.component));
        recipe.getValue(blastingOut0).put(blastingOut1, values.getValue(recipe, blastingOut1));
        let out2 = values.getValue(recipe, blastingOut2);
        if (!out2.hasChance()) {
            out2 = out2.withChance(1);
        }
        recipe.getValue(blastingOut0).put(blastingOut2, out2);
        recipe.getValue(blastingOut0).put(blastingChance, Integer['valueOf(int)'](out2.chance * 100)); // Yes... this is required
    }, blastingOut1, blastingOut2, blastingInDecoy, blastingTicks, blastingTemp));

    thoriumReactors.register('centrifuging', new RecipeSchema(
        e.components.get('outputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('output'),
        e.components.get('inputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('input'),
        e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        e.components.get('intNumberRange')({
            min: 1,
            max: 1000
        }).key('operationAfterTicks')
    ));

    thoriumReactors.register('concentrating', new RecipeSchema(
        e.components.get('outputItem')().map(item => global.singleOutputItemParse(item), elm => global.singleItemJsonParse(elm)).key('output'),
        e.components.get('inputItem')().map(item => global.singleInputItemParse(item), elm => global.singleItemJsonParse(elm)).key('input'),
        e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks')
    ));

    thoriumReactors.register('crystallizing', new RecipeSchema(
        e.components.get('outputItem')().map(item => global.singleOutputItemParse(item), elm => global.singleItemJsonParse(elm)).key('output'),
        e.components.get('inputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('input'),
        e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        e.components.get('intNumberRange')({
            min: 1,
            max: 1000
        }).key('operationAfterTicks')
    ));

    let decomposingOutput, decomposingIn, decomposingInItem, decomposingInFluid, decomposingTicks, decomposingDelay;
    thoriumReactors.register('decomposing', new RecipeSchema(
        decomposingOutput = e.components.get('outputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('output'),
        decomposingIn = RecipeComponent.builder(
            decomposingInFluid = e.components.get('inputFluid')().simpleMap({
                "FluidName": "fluid",
                "Amount": "amount"
            }).key('tank-0').preferred('inputFluid'),
            decomposingInItem = e.components.get('inputItem')().key('slot-0').preferred('inputItem')
        ).inputRole().key('input'),
        decomposingTicks = e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        decomposingDelay = e.components.get('intNumberRange')({
            min: 1,
            max: 1000
        }).key('operationAfterTicks')
    ).addConstructor((recipe, _st, _k, values) => {
        recipe.setValue(decomposingTicks, values.getValue(recipe, decomposingTicks));
        recipe.setValue(decomposingDelay, values.getValue(recipe, decomposingDelay));
        recipe.setValue(decomposingOutput, values.getValue(recipe, decomposingOutput));

        recipe.setValue(decomposingIn, new RecipeComponentBuilderMap(decomposingIn.component));
        recipe.getValue(decomposingIn).put(decomposingInItem, values.getValue(recipe, decomposingInItem));
        recipe.getValue(decomposingIn).put(decomposingInFluid, values.getValue(recipe, decomposingInFluid));
    }, decomposingOutput, decomposingInItem, decomposingInFluid, decomposingTicks, decomposingDelay));

    let electrolysingOut, electrolysingOutItem, electrolysingOutFluid, electrolysingIn, electrolysingTicks, electrolysingDelay;
    thoriumReactors.register('electrolysing', new RecipeSchema(
        electrolysingTicks = e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        electrolysingDelay = e.components.get('intNumberRange')({
            min: 1,
            max: 1000
        }).key('operationAfterTicks'),
        electrolysingIn = e.components.get('inputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('input'),
        electrolysingOut = RecipeComponent.builder(
            electrolysingOutItem = e.components.get('outputItem')().key('slot-0').preferred('outputItem'),
            electrolysingOutFluid = e.components.get('outputFluid')().simpleMap({
                "FluidName": "fluid",
                "Amount": "amount"
            }).key('tank-0').preferred('outputFluid')
        ).outputRole().key('output')
    ).addConstructor((recipe, _st, _k, values) => {
        recipe.setValue(electrolysingTicks, values.getValue(recipe, electrolysingTicks));
        recipe.setValue(electrolysingDelay, values.getValue(recipe, electrolysingDelay));
        recipe.setValue(electrolysingIn, values.getValue(recipe, electrolysingIn));

        recipe.setValue(electrolysingOut, new RecipeComponentBuilderMap(electrolysingOut.component));
        recipe.getValue(electrolysingOut).put(electrolysingOutFluid, values.getValue(recipe, electrolysingOutFluid));
        recipe.getValue(electrolysingOut).put(electrolysingOutItem, values.getValue(recipe, electrolysingOutItem));
    }, electrolysingOutItem, electrolysingOutFluid, electrolysingIn, electrolysingTicks, electrolysingDelay));

    thoriumReactors.register('evaporating', new RecipeSchema(
        e.components.get('outputItem')().map(item => global.singleOutputItemParse(item), elm => global.singleItemJsonParse(elm)).key('output'),
        e.components.get('inputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('input'),
        e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        e.components.get('intNumberRange')({
            min: 1,
            max: 1000
        }).key('operationAfterTicks')
    ));

    let enrichingOut, enrichingIn, enrichingInItem, enrichingInFluid, enrichingTicks, enrichingDelay
    thoriumReactors.register('fluid_enriching', new RecipeSchema(
        enrichingTicks = e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        enrichingDelay = e.components.get('intNumberRange')({
            min: 1,
            max: 1000
        }).key('operationAfterTicks'),
        enrichingOut = e.components.get('outputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('output'),
        enrichingIn = RecipeComponent.builder(
            enrichingInItem = e.components.get('inputItem')().key('slot-0').preferred('inputItem'),
            enrichingInFluid = e.components.get('inputFluid')().simpleMap({
                "FluidName": "fluid",
                "Amount": "amount"
            }).key('tank-0').preferred('inputFluid')
        ).inputRole().key('input')
    ).addConstructor((recipe, _st, _k, values) => {
        recipe.setValue(enrichingTicks, values.getValue(recipe, enrichingTicks));
        recipe.setValue(enrichingDelay, values.getValue(recipe, enrichingDelay));
        recipe.setValue(enrichingOut, values.getValue(recipe, enrichingOut));

        recipe.setValue(enrichingIn, new RecipeComponentBuilderMap(enrichingIn.component));
        recipe.getValue(enrichingIn).put(enrichingInItem, values.getValue(recipe, enrichingInItem));
        recipe.getValue(enrichingIn).put(enrichingInFluid, values.getValue(recipe, enrichingInFluid));
    }, enrichingOut, enrichingInItem, enrichingInFluid, enrichingTicks, enrichingDelay));

    let oxidizingOut, oxidizingIn, oxidizingInItem, oxidizingInFluid, oxidizingTicks, oxidizingDelay
    thoriumReactors.register('oxidizing', new RecipeSchema(
        oxidizingTicks = e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        oxidizingDelay = e.components.get('intNumberRange')({
            min: 1,
            max: 1000
        }).key('operationAfterTicks'),
        oxidizingOut = e.components.get('outputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('output'),
        oxidizingIn = RecipeComponent.builder(
            oxidizingInItem = e.components.get('inputItem')().key('slot-0').preferred('inputItem'),
            oxidizingInFluid = e.components.get('inputFluid')().simpleMap({
                "FluidName": "fluid",
                "Amount": "amount"
            }).key('tank-0').preferred('inputFluid')
        ).inputRole().key('input')
    ).addConstructor((recipe, _st, _k, values) => {
        recipe.setValue(oxidizingTicks, values.getValue(recipe, oxidizingTicks));
        recipe.setValue(oxidizingDelay, values.getValue(recipe, oxidizingDelay));
        recipe.setValue(oxidizingOut, values.getValue(recipe, oxidizingOut));

        recipe.setValue(oxidizingIn, new RecipeComponentBuilderMap(oxidizingIn.component));
        recipe.getValue(oxidizingIn).put(oxidizingInItem, values.getValue(recipe, oxidizingInItem));
        recipe.getValue(oxidizingIn).put(oxidizingInFluid, values.getValue(recipe, oxidizingInFluid));
    }, oxidizingOut, oxidizingInItem, oxidizingInFluid, oxidizingTicks, oxidizingDelay));

    let saltOut, saltIn, saltIn0, saltIn1, saltIn2, saltTicks, saltTemp, saltDelay
    thoriumReactors.register('salt_smelting', new RecipeSchema(
        saltTicks = e.components.get('intNumberRange')({
            min: 1,
            max: 2500
        }).key('ticks'),
        saltTemp = e.components.get('intNumberRange')({
            min: 1,
            min: 2500
        }).key('temperature'),
        saltDelay = e.components.get('intNumberRange')({
            min: 1,
            max: 1000
        }).key('operationAfterTicks'),
        saltIn = RecipeComponent.builder(
            saltIn0 = e.components.get('inputItem')().key('slot-0'),
            saltIn1 = e.components.get('inputItem')().key('slot-1'),
            saltIn2 = e.components.get('inputItem')().key('slot-2')
        ).inputRole().key('input'),
        saltOut = e.components.get('outputFluid')().map(fluid => global.singleFluidParse(fluid), elm => global.singleJsonFluidParse(elm)).key('output')
    ).addConstructor((recipe, _st, _k, values) => {
        recipe.setValue(saltTicks, values.getValue(recipe, saltTicks));
        recipe.setValue(saltTemp, values.getValue(recipe, saltTemp));
        recipe.setValue(saltDelay, values.getValue(recipe, saltDelay));
        recipe.setValue(saltOut, values.getValue(recipe, saltOut));

        recipe.setValue(saltIn, new RecipeComponentBuilderMap(saltIn.component));
        recipe.getValue(saltIn).put(saltIn0, values.getValue(recipe, saltIn0));
        recipe.getValue(saltIn).put(saltIn1, values.getValue(recipe, saltIn1));
        recipe.getValue(saltIn).put(saltIn2, values.getValue(recipe, saltIn2));
    }, saltOut, saltIn0, saltIn1, saltIn2, saltTicks, saltTemp, saltDelay));

    thoriumReactors.shaped('thorium_crafting');

    let jumboOut = e.components.get('outputItem')().key('result');
    let jumboIn = e.components.get('inputItemArray')().mapOut(elm => global.jumboFurnaceMapOut(elm)).key('ingredients')
    let jumboExperience = e.components.get('floatNumber')().key('experience').optional(0).alwaysWrite()

    e.register(
        'jumbofurnace:jumbo_smelting',
        new RecipeSchema(jumboOut, jumboIn, jumboExperience)
    );
})

/**
 * I hate that this needs to exist, can't wait for 1.21 with native ingredient stacks
 * @param {Internal.JsonElement} elm 
 */
global.jumboFurnaceMapOut = (elm) => {
    elm = JsonIO.of(elm);
    elm.forEach(sub => {
        if (sub.has('count')) {
            if (sub.has('tag')) {
                sub.addProperty('type', 'jumbofurnace:tag_stack');
            } else if (sub.has('item')) {
                sub.addProperty('type', 'forge:nbt');
            }
        }
    })
    return elm;
}

/**
 * @param {(Internal.JsonObject|Internal.FluidStackJS|string)} fluid 
 */
global.singleFluidParse = (fluid) => {
    let fluid1;
    if (typeof fluid != 'object') {
        fluid1 = Fluid.of(fluid);
    } else if (fluid.class.name == 'com.google.gson.JsonObject') {
        let temp = fluid.get('tank-0').asJsonObject;
        fluid1 = Fluid.of(temp.get('FluidName'), temp.get('Amount'), null);
    } else {
        fluid1 = Fluid.of(fluid);
    }
    return fluid1;
}

/**
 * @param {Internal.JsonElement} elm 
 */
global.singleJsonFluidParse = (elm) => {
    let obj = elm.asJsonObject;
    if (!obj.has('tank-0')) {
        obj = JsonIO.of({
            "tank-0": {
                "FluidName": obj.get('fluid'),
                "Amount": obj.get('amount')
            }
        }).asJsonObject;
    }
    return obj;
}

/**
 * @param {(Internal.JsonObject|InputItem|string)} item
 */
global.singleInputItemParse = (item) => {
    let item1;
    if (typeof item != 'object') { // Found this the hard way
        item1 = OutputItem.of(item);
    } else if (item.class.name == 'com.google.gson.JsonObject') {
        item1 = InputItem.of(item.get('slot-0'));
    } else {
        item1 = InputItem.of(item);
    }
    return item1;
}

/**
 * @param {(Internal.JsonObject|OutputItem|string)} item
 */
global.singleOutputItemParse = (item) => {
    let item1;
    if (typeof item != 'object') {
        item1 = OutputItem.of(item)
    } else if (item.class.name == 'com.google.gson.JsonObject') {
        item1 = OutputItem.of(item.get('slot-0'));
    } else {
        item1 = OutputItem.of(item);
    }
    return item1;
}

/**
 * @param {Internal.JsonElement} elm
 */
global.singleItemJsonParse = (elm) => {
    let obj = elm.asJsonObject;
    if (!obj.has('slot-0')) {
        obj = JsonIO.of({
            "slot-0": elm
        }).asJsonObject;
    }
    return obj;
}
