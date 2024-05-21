
ClientEvents.highPriorityAssets(e => {

    // Blocks
    TFC.misc.rock.keySet().forEach(rock => {
        global.gradedOres.forEach(ore => {
            global.oreGrades.forEach(grade => {
                e.addModel('block', `kubejs:ore/${grade}_${ore}/${rock}`, m => {
                    m.parent('tfc:block/ore')
                    m.textures({
                        all: `tfc:block/rock/raw/${rock}`,
                        particle: `tfc:block/rock/raw/${rock}`,
                        overlay: `kubejs:block/ore/${grade}_${ore}`
                    })
                })
            })
        })
        global.ungradedOres.forEach(ore => {
            e.addModel('block', `kubejs:ore/${ore}/${rock}`, m => {
                m.parent('tfc:block/ore')
                m.textures({
                    all: `tfc:block/rock/raw/${rock}`,
                    particle: `tfc:block/rock/raw/${rock}`,
                    overlay: `kubejs:block/ore/${ore}`
                });
            });
        });
    });

    TFC.misc.wood.keySet().forEach(wood => {
        e.addModel('block', `kubejs:panel/${wood}`, m => {
            m.parent('kubejs:block/panel/base');
            m.texture('planks', `tfc:block/wood/planks/${wood}`);
            m.texture('particle', `tfc:block/wood/planks/${wood}`);
            m.texture('log', `tfc:block/wood/stripped_log/${wood}`);
            m.texture('log_top', `tfc:block/wood/stripped_log_top/${wood}`);
        });
    });

    e.addBlockState('kubejs:rocket_scaffolding', g => {
        g.simpleVariant('axis=y', 'kubejs:block/rocket_scaffolding');
        g.variant('axis=z', v => v.model('kubejs:block/rocket_scaffolding').x(90));
        g.variant('axis=x', v => v.model('kubejs:block/rocket_scaffolding').x(90).y(90));
    });

    e.addModel('block', 'kubejs:rocket_scaffolding', m => {
        m.parent('block/cube_column');
        m.textures({
            end: 'kubejs:block/rocket_scaffolding/end',
            side: 'kubejs:block/rocket_scaffolding/side',
            particle: 'kubejs:block/rocket_scaffolding/side'
        });
    });

    // TODO: Texture, is 32x32 with top left 16x16 being the textures for the mount, the bottom left 16x16 being the texture for the nozzle, and right 16x32 being unused
    e.add('kubejs:models/block/rocket_engine', {
        parent: 'block/block',
        ambientocclusion: false,
        loader: 'forge:obj',
        model: 'kubejs:models/block/rocket_engine.obj',
        textures: {
            tex: 'kubejs:block/rocket_engine',
            particle: 'tfc:block/metal/smooth/block_steel'
        }
    });

    // Sounds
    e.add('kubejs:sounds', {
        rocket: {
            subtitle: 'subtitle.kubejs.rocket',
            sounds: [
                'kubejs:rocket'
            ]
        }
    })

    // Particles
    e.add('kubejs:particles/rocket_plume', {
        textures: [
            'kubejs:rocket_plume/0',
            'kubejs:rocket_plume/1',
            'kubejs:rocket_plume/2',
            'kubejs:rocket_plume/3',
            'kubejs:rocket_plume/4'
        ]
    })
    e.add('kubejs:particles/rocket_plume_ejecta', {
        textures: [
            'kubejs:rocket_plume_ejecta/0',
            'kubejs:rocket_plume_ejecta/1',
            'kubejs:rocket_plume_ejecta/2'
        ]
    })
})

ClientEvents.lang('en_us', e => {
    e.add('message.kubejs.begin_launch', 'Beginning launch');
    e.renameEntity('kubejs:rocket', 'Satellite Rocket');
    e.renameItem('kubejs:double_ingot/lead', 'Lead Double Ingot');
    e.add('subtitle.kubejs.rocket', 'Rocket launch begins');
    e.add('tooltip.kubejs.thermometer', 'Allows the wearer to see heat values in degrees instead of colors');
    e.add('curios.identifier.thermometer', 'Thermometer');
    global.gradedOres.forEach(ore => {
        e.renameBlock(`kubejs:ore/small_${ore}`, `Small ${Utils.toTitleCase(ore)}`);
        global.oreGrades.forEach(grade => {
            e.renameItem(`kubejs:ore/${grade}_${ore}`, `${Utils.toTitleCase(grade)} ${Utils.toTitleCase(ore)}`);
            TFC.misc.rock.keySet().forEach(rock => {
                e.renameBlock(`kubejs:ore/${grade}_${ore}/${rock}`, `${Utils.toTitleCase(grade)} ${Utils.toTitleCase(rock)} ${Utils.toTitleCase(ore)}`);
            })
        })
        e.add(`block.kubejs.ore.normal_${ore}.dacite.prospected`, Utils.toTitleCase(ore));
    })
    global.ungradedOres.forEach(ore => {
        e.renameItem(`kubejs:ore/${ore}`, `Small ${Utils.toTitleCase(ore)}`);
        TFC.misc.rock.keySet().forEach(rock => {
            e.renameBlock(`kubejs:ore/${ore}/${rock}`, `${Utils.toTitleCase(rock)} ${Utils.toTitleCase(ore)}`);
        })
        e.add(`block.kubejs.ore.${ore}.dacite.prospected`, Utils.toTitleCase(ore));
    })
    e.add('death.attack.wither', '%1$s discovered radiation');
    e.renameItem('morered:red_alloy_ingot', 'Redstone Alloy Ingot');
    e.add('metal.kubejs.redstone_alloy', 'Redstone Alloy');
    e.add('metal.kubejs.unrefined_redstone', 'Unrefined Redstone');
    e.add('metal.kubejs.refined_redstone', 'Refined Redstone');
    e.add('metal.kubejs.refined_graphite', 'Graphite');
    e.add('metal.kubejs.unrefined_graphite', 'Unrefined Graphite')
    e.renameItem('morered:red_alloy_wire', 'Redwire');
    e.add('category.kubejs.ores', 'Ores');
    e.add('category.kubejs.entity', 'Entities');

    e.add('jei.description.ores.certus_quartz', 'Certus Quartz buds can be found rarely throughout the world in claystone and phyllite rocks near lava');
    e.add('jei.description.ores.kaolinite', 'Kaolinite can be found in high altitudes in Plateaus, Old Mountains, and Highlands with temperature of at least 18°C and rainfall of at least 300mm. Blood Lilies grow on top of deposits');
    e.add('jei.description.ores.native_copper', 'Native Copper can be found in Igneous Extrusive rocks at elevations above y=40');
    e.add('jei.description.ores.native_gold', 'Native Gold can be found in Igneous rocks ar elevations below y=70');
    e.add('jei.description.ores.native_silver', 'Poor veins of Native Silver can be found in granite and diorite above y=90 and richer veins can be found in granite, diorite, schist, and gneiss rocks below y=20');
    e.add('jei.description.ores.tetrahedrite', 'Tetrahedrite can be found at any elevation in Metamorphic rocks');
    e.add('jei.description.ores.malachite', 'Malachite can be found at most elevations in Marble, Limestone, Chalk, and Dolomite');
    e.add('jei.description.ores.cassiterite', 'Cassiterite can be found in Igneous Intrusive rocks at elevations above y=80 in uplift regions or dikes');
    e.add('jei.description.ores.bismuthinite', 'Bismuthinite can be found in Sedimentary rocks near the surface or in larger veins in Igneous Intrusive rocks underground');
    e.add('jei.description.ores.garnierite', 'Garnierite can be found below y=0 in Gabbro, but rarely, smaller veins can be found in any Igneous Intrusive rocks');
    e.add('jei.description.ores.hematite', 'Hematite can be found in an Igneous Extrusive rocks near the surface');
    e.add('jei.description.ores.magnetite', 'Magnetite can be found in Sedimentary rocks near the surface');
    e.add('jei.description.ores.limonite', 'Limonite can be found in Sedimentary rocks new the surface');
    e.add('jei.description.ores.sphalerite', 'Sphalerite can be found in small, poor veins in Igneous Extrusive rocks near the surface with richer veins in Igneous Intrusive rocks deep underground');
    e.add('jei.description.ores.lignite', 'Lignite can be found in Sedimentary rocks near the surface');
    e.add('jei.description.ores.bituminous_coal', 'Bituminous Coal can be found in Sedimentary rocks near the surface');
    e.add('jei.description.ores.graphite', 'Graphite can be found in Gneiss, Marble, Quartzite, and Schist in elevations below y=60');
    e.add('jei.description.ores.cinnabar', 'Cinnabar can be found deep underground in QUartzite, Granite, Phyllite, and Schist');
    e.add('jei.description.ores.cryolite', 'Cryolite can be found deep underground in Granite and Diorite');
    e.add('jei.description.ores.saltpeter', 'Saltpeter can be found near the surface in Sedimentary rocks');
    e.add('jei.description.ores.sulfur', 'Sulfur can be found near lava deep underground in Metamorphic and Igneous Intrusive rocks');
    e.add('jei.description.ores.sylvite', 'Sylvite be found near the surface in Shale, Claystone, and Chert');
    e.add('jei.description.ores.borax', 'Borax can be found near the surface in Claystone, Limestone, and Shale');
    e.add('jei.description.ores.gypsum', 'Gypsum can be found near the surface in Sedimentary rocks');
    e.add('jei.description.ores.halite', 'Halite be found near the surface in Sedimentary rocks');
    e.add('jei.description.ores.emerald', 'Emeralds appear in thin vertical ore formations, which can be up to 100 blocks tall, in Igneous Intrusive rocks');
    e.add('jei.description.ores.diamond', 'Kimberlite appears in thin vertical formations, which can be up 100 blocks tall, in Gabbro');
    e.add('jei.description.ores.lapis_lazuli', 'Lapis Lazuli can be found in Limestone and Marble between y=20 and y=80');
    e.add('jei.description.ores.amethyst', 'Amethyst can be found in Sedimentary and Metamorphic rocks beneath rivers');
    e.add('jei.description.ores.opal', 'Opal can be found in Sedimentary and Igneous Intrusive rocks beneath rivers');
    e.add('jei.description.ores.chromite', 'Chromite can be found in Igneous Intrusive and Metamorphic rocks');

    e.add('jei.description.rocket', 'Wow! A "rocket"!');

    e.add('jade.tooltip.kubejs.supported', 'Supported');
    e.add('jade.tooltip.kubejs.unsupported', 'Unsupported');
    e.add('jade.tooltip.kubejs.may_trigger_collapse', 'May trigger a collapse...');
    e.add('jade.tooltip.kubejs.will_not_trigger_collapse', 'Will not trigger a collapse');
    e.add('jade.tooltip.kubejs.collapses_into', 'Collapses into: %s');

    e.add('jade.tooltip.kubejs.support', 'Supports:');
    e.add('jade.tooltip.kubejs.horizontal_support', 'Horizontal: %d');
    e.add('jade.tooltip.kubejs.up_support', 'Up: %d');
    e.add('jade.tooltip.kubejs.down_support', 'Down: %d');

    e.add('tooltip.kubejs.heats_to', 'When heated sufficiently:');
    e.add('tooltip.kubejs.heats_to_liquid', '%smB of %s');
    e.add('tooltip.kubejs.heats_to_item', '~%sx %s');
    e.add('tooltip.kubejs.alloys_to', 'Alloy produced: %s');
    e.add('tooltip.kubejs.total_fluid', 'Total fluid: %smB');

    e.add('tooltip.kubejs.grows_in', 'Will grow in:');
    e.add('tooltip.kubejs.grows_in.temp', '%s - %s °C');
    e.add('tooltip.kubejs.grows_in.hydration', '%s - %s%% hydration');

    e.add('message.kubejs.need_empty_hand', 'An empty hand is required to assemble a rocket!');
    e.add('message.kubejs.improper_rocket_structure', 'The rocket is not properly built, please review the building instructions!');
    e.add('message.kubejs.missing_scaffold', 'The rocket requires scaffolding to assemble');
    e.add('message.kubejs.assembly_successful', 'Successfully assembled rocket!');
    e.add('message.kubejs.improper_rocket_fuel_ratio', 'There is an improper ratio of fuel in the rocket!');

    e.renameBlock('ae2:sky_stone_tank', 'Rocket Fuel Tank');

    e.add('tfc.jei.steel_sheet_carving_knapping', 'Steel Carving');
    e.add('kubejs.jei.lore.in_offhand', 'In offhand');
    e.add('kubejs.jei.tooltip.in_offhand', 'With %s in offhand');
})