const DeferredRegister = java("dev.architectury.registry.registries.DeferredRegister");
const CoreRegistry = java("net.minecraft.core.Registry");
const BlockItem = java("net.minecraft.world.item.BlockItem");
const ItemProperties = java("net.minecraft.world.item.Item$Properties");
const defaultItemProperties = new ItemProperties().tab(Item.findGroup('kubejs.kubejs'));

// Adapter
const BlockEntityType = java("net.minecraft.world.level.block.entity.BlockEntityType");
const KineticBlockEntity = java("com.simibubi.create.content.kinetics.base.KineticBlockEntity");
const DeviceBlock = java("net.dries007.tfc.common.blocks.devices.DeviceBlock");
const ExtendedProperties = java("net.dries007.tfc.common.blocks.ExtendedProperties");
const StressDefaults = java("com.simibubi.create.content.kinetics.BlockStressDefaults");
const IRotate = java("com.simibubi.create.content.kinetics.base.IRotate");
const FakeDeployerPlayer = java("com.simibubi.create.content.kinetics.deployer.DeployerFakePlayer");
const Capabilities = java('net.dries007.tfc.common.capabilities.Capabilities');
const TooltipModifier = java("com.simibubi.create.foundation.item.TooltipModifier");
const ItemDescriptionModifier = java("com.simibubi.create.foundation.item.ItemDescription$Modifier");
const Palette = java("com.simibubi.create.foundation.item.TooltipHelper$Palette");
const KineticStats = java("com.simibubi.create.foundation.item.KineticStats");

// Track
const Trackmaterial = java("com.simibubi.create.content.trains.track.TrackMaterial");
const TrackMaterialFactory = java("com.simibubi.create.content.trains.track.TrackMaterialFactory");
const TrackBlockItem = java("com.simibubi.create.content.trains.track.TrackBlockItem");
const RenderTypeRegistry = java("dev.architectury.registry.client.rendering.RenderTypeRegistry");
const RenderType = java("net.minecraft.client.renderer.RenderType");
 // Can I just say how much I hate registrate, this has no reason to exist, yet it does, @Nullable and @Nonnull annotations on parameters exist; Forge has this *builtin* even
const NonNullSupplier = java("com.tterrag.registrate.util.nullness.NonNullSupplier");

// Absoluetly awful, but it makes it work, so deal with it
let registratePain = NonNullSupplier.lazy(() => NonNullSupplier.of(Utils['lazy(java.util.function.Supplier)'](() => STAINED_TRACK_BLOCK.get())));

const STAINED_WOOD_TRACK_MATERIAL = TrackMaterialFactory.make('kubejs:stained_wood').lang('Stained Wood').block(registratePain).particle('immersiveengineering:block/wooden_decoration/treated_wood_horizontal').standardModels().build();

const BLOCKS = DeferredRegister.create('kubejs', CoreRegistry.BLOCK_REGISTRY);
const BLOCK_ENTITIES = DeferredRegister.create('kubejs', CoreRegistry.BLOCK_ENTITY_TYPE_REGISTRY);
const ITEMS = DeferredRegister.create('kubejs', CoreRegistry.ITEM_REGISTRY);

const ADAPTER_BLOCK = BLOCKS['register(java.lang.String,java.util.function.Supplier)']('kinetic_adapter', () => new DeviceBlock(ExtendedProperties.of(Block.material['metal'].minecraftMaterial).blockEntity(ADAPTER_BE).ticks((level, pos, state) => adapterTick(level, pos, state)).sound(Block.material['metal'].sound).strength(4, 60), null));
const ADAPTER_BE = BLOCK_ENTITIES['register(java.lang.String,java.util.function.Supplier)']('kinetic_adapter', () => BlockEntityType.Builder.of((pos, state) => new KineticBlockEntity(ADAPTER_BE.get(), pos, state), [ADAPTER_BLOCK.get()]).build(null));
const ADAPTER_ITEM = ITEMS['register(java.lang.String,java.util.function.Supplier)']('kinetic_adapter', () => new BlockItem(ADAPTER_BLOCK.get(), defaultItemProperties));

// I *will* re-implement your mod through KubeJS reflection
const STAINED_TRACK_BLOCK = BLOCKS['register(java.lang.String,java.util.function.Supplier)']('stained_wood_track', () => STAINED_WOOD_TRACK_MATERIAL.createBlock(ExtendedProperties.of(Block.material['wood'].minecraftMaterial).strength(0.8, 2).sound(Block.material['wood'].sound).noOcclusion().properties()));
const STAINED_TRACK_ITEM = ITEMS['register(java.lang.String,java.util.function.Supplier)']('stained_wood_track', () => new TrackBlockItem(STAINED_TRACK_BLOCK.get(), defaultItemProperties));

onEvent('init', e => {
    BLOCKS.register();
    BLOCK_ENTITIES.register();
    ITEMS.register();
    StressDefaults.setDefaultImpact('kubejs:kinetic_adapter', 4);
    TooltipModifier.REGISTRY['registerDeferred(net.minecraft.resources.ResourceLocation,java.util.function.Function)']('kubejs:kinetic_adapter', item => {
        return new ItemDescriptionModifier(item, Palette.STANDARD_CREATE).andThen(TooltipModifier.mapNull(new KineticStats(Block.getBlock('kubejs:kinetic_adapter'))));
    });
})

/**
 * The kinetic adapter's tick method, this is called on the client *and* server
 * There may or may not be sidedness issues here, I don't know yet
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @param {Internal.BlockState} state 
 */
function adapterTick(level, pos, state) {
    let levelJS = level.asKJS();
    let blockJS = levelJS.getBlock(pos);
    let kbe = blockJS.entity;
    if (kbe instanceof KineticBlockEntity) {
        let belowJS = blockJS.down;
        let belowEntity = belowJS.entity;
        let belowState = belowJS.blockState;
        let belowBlock = belowState.block;

        // Theoretically this should prevent the F3 screen from crashing when looking at this but it doesn't because reasons :(
        kbe.setSource(belowJS.pos); 
        kbe.tick();
        if (belowEntity instanceof KineticBlockEntity && belowBlock instanceof IRotate && belowBlock.hasShaftTowards(level, belowJS.pos, belowState, Direction.UP)) {
            kbe.setSpeed(belowEntity.getSpeed());
            let network = belowEntity.orCreateNetwork;
            if (network != null && network.initialized) {
                kbe.initialize();
                network.updateNetwork();
            }
        }

        if (levelJS.time % 20 === 0) {
            let aboveJS = blockJS.up;
            
            if (JavaMath.abs(kbe.getSpeed()) >= 16) {
                if (aboveJS.id === 'tfc:quern' && aboveJS.properties['has_handstone'] === 'true') {
                    let quernBE = aboveJS.entity;
                    if (!quernBE.grinding && quernBE.startGrinding()) {
                        levelJS.minecraftLevel.playSound(null, aboveJS.pos, 'tfc:block.quern.drag', 'blocks', 1.0, 1.0);
                    }
                } else if (aboveJS.id === 'tfc:bellows') {
                    let bellowsBE = aboveJS.entity;
                    if (bellowsBE.ticksSincePushed > (20 * 90)) {
                        bellowsBE.onRightClick();
                    }
                } else if (levelJS.server != null) {
                    let fakePlayer;
                    if (aboveJS.hasTag('tfc:looms')) {
                        fakePlayer = makeFakePlayer(levelJS);
                        let loomBE = aboveJS.entity;
                        loomBE.getCapability(Capabilities.ITEM, null).ifPresent(slotHandler => {
                            if (slotHandler.getStackInSlot(1).isEmpty()) {
                                // The model doesn't animate b/c lastPushed is not synced betweeen server and client
                                loomBE.onRightClick(fakePlayer);
                            }
                        })
                    } else if (aboveJS.hasTag('tfc:anvils')) {
                        fakePlayer = makeFakePlayer(levelJS);
                        let anvilBE = aboveJS.entity;
                        anvilBE.getCapability(Capabilities.ITEM, null).ifPresent(slotHandler => {
                            if (slotHandler.getStackInSlot(anvilBE.SLOT_HAMMER).asKJS().hasTag('tfc:hammers')) {
                                if (anvilBE.weld(fakePlayer).consumesAction()) {
                                    levelJS.minecraftLevel.playSound(null, aboveJS.pos, 'tfc:block.anvil.hit', 'blocks', 1.0, 1.0);
                                    if (!levelJS.minecraftLevel.clientSide) {
                                        let random = level.random;
                                        let x = aboveJS.pos.x + nextDouble(random, 0.2, 0.8);
                                        let y = aboveJS.pos.y + nextDouble(random, 0.8, 1.0);
                                        let z = aboveJS.pos.z + nextDouble(random, 0.2, 0.8);
                                        levelJS.minecraftLevel.sendParticles(Utils.getRegistry('particle_type').get('tfc:spark'), x, y, z, 5, uniform(random, -5, 5), 1.5 + random.nextFloat(), uniform(random, -5, 5), 0.3);
                                    }
                                };
                            }
                        })
                    }
                    if (fakePlayer != null && fakePlayer != undefined) {
                        fakePlayer.remove('discarded');
                    }
                }
            }
        }
    }
}

/**
 * Makes a fake player
 * @param {Internal.LevelJS} levelJS 
 */
function makeFakePlayer(levelJS) {
    return new FakeDeployerPlayer(levelJS.server.getLevel(levelJS.dimension).minecraftLevel, null);
}

/**
 * Reimplementation of Mth.nextDouble() without import
 * @param {Internal.Random} random 
 * @param {number} min 
 * @param {number} max 
 */
function nextDouble(random, min, max) {
    if (min >= max) {
        return min;
    } else {
        return random.nextDouble() * (max - min) + min;
    }
}

/**
 * Reimplementation of Helpers.uniform() without import
 * @param {Internal.Random} random 
 * @param {number} min 
 * @param {number} max 
 */
function uniform(random, min, max) {
    return random.nextFloat() * (max - min) + min;
}