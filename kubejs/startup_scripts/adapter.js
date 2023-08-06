const DeferredRegister = java("dev.architectury.registry.registries.DeferredRegister");
const CoreRegistry = java("net.minecraft.core.Registry");
const BlockEntityType = java("net.minecraft.world.level.block.entity.BlockEntityType");
const KineticBlockEntity = java("com.simibubi.create.content.kinetics.base.KineticBlockEntity");
const DeviceBlock = java("net.dries007.tfc.common.blocks.devices.DeviceBlock");
const ExtendedProperties = java("net.dries007.tfc.common.blocks.ExtendedProperties");
const BlockItem = java("net.minecraft.world.item.BlockItem");
const ItemProperties = java("net.minecraft.world.item.Item$Properties");
const StressDefaults = java("com.simibubi.create.content.kinetics.BlockStressDefaults");
const IRotate = java("com.simibubi.create.content.kinetics.base.IRotate");
const FakeDeployerPlayer = java("com.simibubi.create.content.kinetics.deployer.DeployerFakePlayer");
const Capabilities = java('net.dries007.tfc.common.capabilities.Capabilities');

const BLOCKS = DeferredRegister.create('kubejs', CoreRegistry.BLOCK_REGISTRY);
const BLOCK_ENTITIES = DeferredRegister.create('kubejs', CoreRegistry.BLOCK_ENTITY_TYPE_REGISTRY);
const ITEMS = DeferredRegister.create('kubejs', CoreRegistry.ITEM_REGISTRY);

const ADAPTER_BLOCK = BLOCKS['register(java.lang.String,java.util.function.Supplier)']('kinetic_adapter', () => new DeviceBlock(ExtendedProperties.of(Block.material['metal'].minecraftMaterial).blockEntity(ADAPTER_BE).ticks((level, pos, state) => adapterTick(level, pos, state)).sound(Block.material['metal'].sound).strength(4, 60), null));
const ADAPTER_BE = BLOCK_ENTITIES['register(java.lang.String,java.util.function.Supplier)']('kinetic_adapter', () => BlockEntityType.Builder.of((pos, state) => new KineticBlockEntity(ADAPTER_BE.get(), pos, state), [Block.getBlock('kubejs:kinetic_adapter')]).build(null));
const ADAPTER_ITEM = ITEMS['register(java.lang.String,java.util.function.Supplier)']('kinetic_adapter', () => new BlockItem(ADAPTER_BLOCK.get(), new ItemProperties().tab(Item.findGroup('kubejs.kubejs'))));

onEvent('init', e => {
    BLOCKS.register();
    BLOCK_ENTITIES.register();
    ITEMS.register();
    StressDefaults.setDefaultImpact('kubejs:kinetic_adapter', 4)
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
        kbe.tick();
        if (levelJS.time % 20 === 0) {
            let aboveJS = blockJS.up;
            let belowJS = blockJS.down;
            let belowEntity = belowJS.entity;
            let belowState = belowJS.blockState;
            let belowBlock = belowState.block;
            if (belowEntity instanceof KineticBlockEntity && belowBlock instanceof IRotate && belowBlock.hasShaftTowards(level, belowJS.pos, belowState, Direction.UP)) {
                kbe.setSpeed(belowEntity.getSpeed());
                kbe.setSource(belowJS.pos); 
                let network = belowEntity.orCreateNetwork;
                if (network != null && network.initialized) {
                    kbe.initialize();
                    network.updateNetwork();
                }
            } else {
                kbe.setSpeed(0);
                kbe.setNetwork(null);
            }
            
            if (JavaMath.abs(kbe.getSpeed()) >= 16) {
                if (aboveJS.id === 'tfc:quern' && aboveJS.properties['has_handstone'] === 'true') {
                    let quernBE = aboveJS.entity;
                    if (!quernBE.grinding) {
                        if (quernBE.startGrinding()) {
                            levelJS.minecraftLevel.playSound(null, aboveJS.pos, 'tfc:block.quern.drag', 'blocks', 1.0, 1.0);
                        }
                    }
                } else if (aboveJS.id === 'tfc:bellows') {
                    let bellowsBE = aboveJS.entity;
                    if (bellowsBE.ticksSincePushed > (20 * 90)) {
                        bellowsBE.onRightClick();
                    }
                } else if (levelJS.server != null) { // Done this way to guarantee a ServerLevel, probably not side safe
                    let fakePlayer = new FakeDeployerPlayer(levelJS.server.getLevel(levelJS.dimension).minecraftLevel, null);
                    if (aboveJS.hasTag('tfc:looms')) {
                        let loomBE = aboveJS.entity;
                        loomBE.getCapability(Capabilities.ITEM, null).ifPresent(slotHandler => {
                            if (slotHandler.getStackInSlot(1).isEmpty()) {
                                loomBE.onRightClick(fakePlayer);
                            }
                        })
                    } else if (aboveJS.hasTag('tfc:anvils')) {
                        let anvilBE = aboveJS.entity;
                        anvilBE.getCapability(Capabilities.ITEM, null).ifPresent(slotHandler => {
                            if (slotHandler.getStackInSlot(anvilBE.SLOT_HAMMER).asKJS().hasTag('tfc:hammers')) {
                                if (anvilBE.weld(fakePlayer).consumesAction()) {
                                    levelJS.minecraftLevel.playSound(null, aboveJS.pos, 'tfc:block.anvil.hit', 'players', 1.0, 1.0);
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
                    fakePlayer.remove('discarded');
                }
            }
        }
    }
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