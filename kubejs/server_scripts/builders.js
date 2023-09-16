// Idea/concept taken from Relentless on kubecord

function BottlerRecipeBuilder() {
    this.results = []
    this.inputs = []
}
BottlerRecipeBuilder.prototype = {
    /**
     * Repeatable
     * @param {Internal.ItemStackJS} result 
     */
    addResult: function(result) {
        this.results.push(Item.of(result).toResultJson());
        return this;
    },
    /**
     * @param {Internal.IngredientJS} input 
     */
    addInput: function(input) {
        this.inputs.push(convertToIEMess(Ingredient.of(input)));
        return this;
    },
    /**
     * @param {string} tag The fluid tag
     * @param {number} amount The amount
     */
    setFluid: function(tag, amount) {
        this.fluid = {
            tag: tag,
            amount: amount
        }
        return this;
    },
    build: function() {
        return {
            type: 'immersiveengineering:bottling_machine',
            results: this.results,
            inputs: this.inputs,
            fluid: this.fluid
        }
    }
}

function MixerRecipeBuilder() {
    this.inputs = []
}
MixerRecipeBuilder.prototype = {
    /**
     * Repeatable
     * @param {Internal.IngredientJS} input 
     */
    addInput: function(input) {
        this.inputs.push(convertToIEMess(Ingredient.of(input)))
        return this;
    },
    /**
     * @param {Internal.FluidStackJS} result 
     */
    setResult: function(result) {
        this.result = Fluid.of(result).toJson()
        return this;
    },
    /**
     * @param {string} tag The fluid tag
     * @param {number} amount The amount
     */
    setInputFluid: function(tag, amount) {
        this.fluid = {
            tag: tag,
            amount: amount
        }
        return this;
    },
    /**
     * @param {number} energy 
     */
    setEnergy: function(energy) {
        this.energy = energy;
        return this;
    },
    build: function() {
        return {
            type: 'immersiveengineering:mixer',
            inputs: this.inputs,
            result: this.result,
            fluid: this.fluid,
            energy: this.energy
        }
    }
}

function BlueprintRecipeBuilder() {
    this.inputs = []
}
BlueprintRecipeBuilder.prototype = {
    /**
     * @param {string} category 
     */
    setCategory: function(category) {
        this.category = category;
        return this;
    },
    /**
     * @param {Internal.IngredientJS} input 
     */
    addInput: function(input) {
        this.inputs.push(convertToIEMess(Ingredient.of(input)));
        return this;
    },
    /**
     * @param {Internal.ItemStackJS} result 
     */
    setResult: function(result) {
        this.result = Item.of(result).toResultJson();
        return this;
    },
    build: function() {
        return {
            type: 'immersiveengineering:blueprint',
            inputs: this.inputs,
            category: this.category,
            result: this.result
        }
    }
}

function RefineryRecipeBuilder() {
    this.inputFluids = []
}
RefineryRecipeBuilder.prototype = {
    /**
     * @param {Internal.IngredientJS} catalyst 
     */
    setCatalyst: function(catalyst) {
        this.catalyst = Ingredient.of(catalyst).toJson();
        return this;
    },
    /**
     * @param {number} energy 
     */
    setEnergy: function(energy) {
        this.energy = energy;
        return this;
    },
    /**
     * @param {string} tag The fluid tag
     * @param {number} amount The amount
     */
    addInput: function(tag, amount) {
        this.inputFluids.push({
            amount: amount,
            tag: tag
        });
        return this;
    },
    /**
     * @param {Internal.FluidStackJS} result 
     */
    setResult: function(result) {
        this.result = Fluid.of(result).toJson();
        return this;
    },
    build: function() {
        let intermediary = {
            type: 'immersiveengineering:refinery',
            energy: this.energy,
            result: this.result,
            input0: this.inputFluids[0]
        }
        if (this.inputFluids.length > 1) {
            intermediary['input1'] = this.inputFluids[1];
        }
        if (this.catalyst) {
            intermediary['catalyst'] = this.catalyst;
        }
        return intermediary;
    }
}

function FermenterRecipeBuilder() {
}
FermenterRecipeBuilder.prototype = {
    /**
     * @param {Internal.FluidStackJS} fluid 
     */
    setFluid: function(fluid) {
        this.fluid = Fluid.of(fluid).toJson();
        return this;
    },
    /**
     * @param {Internal.IngredientJS} input 
     */
    setInput: function(input) {
        this.input = convertToIEMess(Ingredient.of(input));
        return this;
    },
    /**
     * @param {number} energy 
     */
    setEnergy: function(energy) {
        this.energy = energy;
        return this;
    },
    build: function() {
        return {
            type: 'immersiveengineering:fermenter',
            fluid: this.fluid,
            input: this.input,
            energy: this.energy
        }
    }
}

function CokerRecipeBuilder() {
}
CokerRecipeBuilder.prototype = {
    /**
     * @param {Internal.ItemStackJS} result 
     */
    setResult: function(result) {
        this.result = Item.of(result).toResultJson();
        return this;
    },
    /**
     * @param {string} tag The fluid tag
     * @param {number} amount The amount
     */
    setFluidResult: function(tag, amount) {
        this.fluidResult = {
            tag: tag,
            amount: amount
        }
        return this;
    },
    /**
     * @param {Internal.IngredientJS} input 
     */
    setInput: function(input) {
        this.input = convertToIEMess(Ingredient.of(input));
        return this;
    },
    /**
     * @param {string} tag The fluid tag
     * @param {number} amount The amount
     */
    setFluidInput: function(tag, amount) {
        this.fluidInput = {
            tag: tag,
            amount: amount
        }
        return this;
    },
    /**
     * @param {number} time 
     */
    setTime: function(time) {
        this.time = time;
        return this;
    },
    /**
     * @param {number} energy 
     */
    setEnergy: function(energy) {
        this.energy = energy;
        return this;
    },
    build: function() {
        return {
            type: 'immersivepetroleum:coker',
            result: this.result,
            resultfluid: this.fluidResult,
            input: this.input,
            inputfluid: this.fluidInput,
            time: this.time,
            energy: this.energy
        }
    }
}

function HydrotreaterRecipeBuilder() {
    this.inputs = []
}
HydrotreaterRecipeBuilder.prototype = {
    /**
     * @param {number} time 
     */
    setTime: function(time) {
        this.time = time;
        return this;
    },
    /**
     * @param {number} energy 
     */
    setEnergy: function(energy) {
        this.energy = energy;
        return this;
    },
    /**
     * @param {string} tag The fluid tag
     * @param {number} amount The amount
     */
    addInput: function(tag, amount) {
        this.inputs.push({
            tag: tag,
            amount: amount
        });
        return this;
    },
    /**
     * @param {Internal.FluidStackJS} result 
     */
    setFluidResult: function(result) {
        this.fluidResult = Fluid.of(result).toJson();
        return this;
    },
    /**
     * @param {Internal.ItemStackJS} result 
     */
    setItemResult: function(result) {
        this.itemResult = Item.of(result).toResultJson();
        return this;
    },
    build: function() {
        let intermediary = {
            type: 'immersivepetroleum:hydrotreater',
            time: this.time,
            energy: this.energy,
            result: this.fluidResult,
            input: this.inputs[0],
            secondary_input: this.inputs[1],
        }
        if (this.itemResult) {
            intermediary['secondary_result'] = this.itemResult
        }
        return intermediary;
    }
}

/**
 * @param {Internal.IngredientJS} ingredient 
 */
function convertToIEMess(ingredient) {
    if (ingredient.count < 2) {
        return ingredient.toJson()
    } else {
        return {
            count: ingredient.count,
            base_ingredient: ingredient.x(1).toJson()
        }
    }
}