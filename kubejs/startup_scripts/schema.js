// Requires KJS build 118 or higher

const RecipeSchema = Java.loadClass('dev.latvian.mods.kubejs.recipe.schema.RecipeSchema');
const Integer = Java.loadClass('java.lang.Integer');
const ServerConsole = Java.loadClass('dev.latvian.mods.kubejs.util.ConsoleJS').SERVER;
const RecipeComponentBuilder = Java.loadClass('dev.latvian.mods.kubejs.recipe.component.RecipeComponentBuilder');

/**
 * @param {any} object 
 * @param {string} type 
 */
function electrodynamicsObj2Obj(object, type) {
    if (global.serverConfig.debug.enabled.get()) {
        ServerConsole.error(`Object ${type}: ${object}`);
    }

    if (type == 'fluid byproduct') {
        return object;
    }

    let json = JsonIO.of(object);
    if (json) {
        if (json.jsonArray) {
            return json;
        } else if (json.jsonObject) {
            let obj = json.asJsonObject;
            let array = [];
            if (obj.has('count')) {
                let count = obj.get('count').asInt;
                for (let i = 0 ; i < count ; i++) {
                    array.push(obj.get(Integer.toString(i))); // I do not trust Rhino
                }
            }
            return array;
        } else {
            return json;
        }
    }

    return object;

}

/**
 * @param {Internal.JsonElement} json 
 * @param {string} type 
 */
function electrodynamicsJson2Json(json, type) {
    if (global.serverConfig.debug.enabled.get()) {
        ServerConsole.error(`Json ${type}: ${json}`);
    }

    let count = json.size();
    let obj = JsonIO.of({"count":count}).asJsonObject;
    for (let i = 0 ; i < count ; i++) {
        obj.add(Integer.toString(i), json.get(i));
    }

    return obj;
}

/**
 * @param {Internal.JsonElement} json
 * @param {string} type 
 */
function byproductsJson2Json(json, type) {
    if (global.serverConfig.debug.enabled.get()) {
        ServerConsole.error(`Json ${type} byproducts: ${json}`);
    }

    let count = json.size();
    let obj = JsonIO.of({"count":count}).asJsonObject;
    for (let i = 0 ; i < count ; i++) {
        let item = json.get(i);
        if (!item.has('chance')) {
            item.addProperty('chance', 1); // This is required :(
        }
        obj.add(Integer.toString(i), item);
    }

    return obj;
}

function fluidByproductsObj2obj(object) {
    if (global.serverConfig.debug.enabled.get()) {
        ServerConsole.error(`Object fluid byproduct: ${object}`);
    }
    return object; // I don't know, it doesn't error so good enough
}

StartupEvents.recipeSchemaRegistry(e => {
    const Component = e.components.get.bind(e.components);

    let UsagePerTickKey = Component('doubleNumber')().key('usagepertick');
    let TicksKey = Component('intNumber')().key('ticks');
    let ExperienceKey = Component('doubleNumber')().key('experience').preferred('xp').optional(0).exclude();

    let ItemOutputKey = Component('outputItem')().key('output');
    let FluidOutputKey = Component('outputFluid')().key('output');

    let FluidOrTagComponent = new RecipeComponentBuilder(3)
        .add(Component('fluidTag')().key('tag').defaultOptional().allowEmpty())
        .add(Component('nonEmptyString')().key('fluid').defaultOptional().allowEmpty())
        .add(Component('intNumber')().key('amount').optional(1000).alwaysWrite());
    let FluidOrTagArrayComponent = FluidOrTagComponent.asArray();

    let GasOrTagComponent = new RecipeComponentBuilder(6)
        .add(Component('nonEmptyString')().key('gas').defaultOptional().allowEmpty())
        .add(Component('nonEmptyString')().key('tag').defaultOptional().allowEmpty())
        .add(Component('intNumber')().key('pressure'))
        .add(Component('doubleNumber')().key('amount'))
        .add(Component('doubleNumber')().key('temp'))
        .add(Component('doubleNumber')().key('chance').optional(1));
    let GasOrTagArrayComponent = GasOrTagComponent.asArray();

    let InputItemArrayComponent = Component('inputItemArray')();
    let OutputItemArrayComponent = Component('outputItemArray')();

    let OutputFluidArrayComponent = Component('outputFluidArray')();

    let ItemInputsKey = InputItemArrayComponent.map(object => electrodynamicsObj2Obj(object, 'item input'), json => electrodynamicsJson2Json(json, 'item input')).key('iteminputs');
    let ItemByproductsKey = OutputItemArrayComponent.map(object => electrodynamicsObj2Obj(object, 'item byproduct'), json => byproductsJson2Json(json, 'item')).key('itembi').defaultOptional().preferred('itemByproducts').exclude();
    let FluidInputsKey = FluidOrTagArrayComponent.map(object => electrodynamicsObj2Obj(object, 'fluid input'), json => electrodynamicsJson2Json(json, 'input fluid')).key('fluidinputs');
    let FluidByproductsKey = OutputFluidArrayComponent.map(object => fluidByproductsObj2obj(object, 'fluid byproduct'), json => byproductsJson2Json(json, 'fluid')).key('fluidbi').defaultOptional().preferred('fluidByproducts').exclude();
    let GasInputsKey = GasOrTagArrayComponent.map(object => electrodynamicsObj2Obj(object, 'gas input'), json => electrodynamicsJson2Json(json, 'gas input')).key('gasinputs');
    let GasByproductsKey = GasOrTagArrayComponent.map(object => electrodynamicsObj2Obj(object, 'gas byproduct'), json => byproductsJson2Json(json, 'gas')).key('gasbi').defaultOptional().preferred('gasByproducts').exclude();


    let Fluid2FluidSchema = new RecipeSchema(FluidOutputKey, FluidInputsKey, TicksKey, UsagePerTickKey, ItemByproductsKey, FluidByproductsKey, GasByproductsKey, ExperienceKey);
    let Fluid2GasSchema = new RecipeSchema(GasOrTagComponent.key('output'), FluidInputsKey, TicksKey, UsagePerTickKey, ItemByproductsKey, FluidByproductsKey, GasByproductsKey, ExperienceKey);
    let Fluid2ItemSchema = new RecipeSchema(ItemOutputKey, FluidInputsKey, TicksKey, UsagePerTickKey, ItemByproductsKey, FluidByproductsKey, GasByproductsKey, ExperienceKey);
    let FluidItem2FluidSchema = new RecipeSchema(FluidOutputKey, ItemInputsKey, FluidInputsKey, TicksKey, UsagePerTickKey, ItemByproductsKey, FluidByproductsKey, GasByproductsKey, ExperienceKey);
    let FluidItem2GasSchema = new RecipeSchema(GasOrTagComponent.key('output'), ItemInputsKey, FluidInputsKey, TicksKey, UsagePerTickKey, ItemByproductsKey, FluidByproductsKey, GasByproductsKey, ExperienceKey);
    let FluidItem2Item = new RecipeSchema(ItemOutputKey, ItemInputsKey, FluidInputsKey, TicksKey, UsagePerTickKey, ItemByproductsKey, FluidByproductsKey, GasByproductsKey, ExperienceKey);
    let Item2FluidSchema = new RecipeSchema(FluidOutputKey, ItemInputsKey, TicksKey, UsagePerTickKey, ItemByproductsKey, FluidByproductsKey, GasByproductsKey, ExperienceKey);
    let Item2ItemSchema = new RecipeSchema(ItemOutputKey, ItemInputsKey, TicksKey, UsagePerTickKey, ItemByproductsKey, FluidByproductsKey, GasByproductsKey, ExperienceKey);

    e.namespace('exposure')
        .register('film_developing', new RecipeSchema(Component('outputItem')().key('result'), Component('inputItem')().key('film'), Component('inputItemArray')().key('ingredients')));

    e.namespace('electrodynamics')
        // Fluid2Fluid

        // Fluid2Gas
        .register('electrolytic_separator_recipe', Fluid2GasSchema)

        // Fluid2Item
        .register('chemical_crystallizer_recipe', Fluid2ItemSchema)

        // FluidItem2Fluid
        .register('chemical_mixer_recipe', FluidItem2FluidSchema)
        .register('fermentation_plant_recipe', FluidItem2FluidSchema)
        .register('mineral_washer_recipe', FluidItem2FluidSchema)

        // FluidItem2Gas

        // FluidItem2Item

        // Item2Fluid

        // Item2Item
        .register('lathe_recipe', Item2ItemSchema)
        .register('energized_alloyer_recipe', Item2ItemSchema)
        .register('mineral_crusher_recipe', Item2ItemSchema)
        .register('mineral_grinder_recipe', Item2ItemSchema)
        .register('oxidation_furnace_recipe', Item2ItemSchema)
        .register('reinforced_alloyer_recipe', Item2ItemSchema)
        .register('wire_mill_recipe', Item2ItemSchema)
        ;
})