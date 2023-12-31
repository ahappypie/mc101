// priority: 0

console.info('loading ore stone generator startup script');

const ore_stone_generator = {
  'minecraft:iron_block': 'create:crimsite',
  'minecraft:copper_block': 'create:veridium',
  'minecraft:gold_block': 'create:ochrum',
  'minecraft:quartz_block': 'minecraft:diorite',
  'create:zinc_block': 'create:asurine',
  //TODO: fix this ugly hack
  'minecraft:bone_block[axis=x]': 'minecraft:calcite',
  'minecraft:bone_block[axis=y]': 'minecraft:calcite',
  'minecraft:bone_block[axis=z]': 'minecraft:calcite',
  'mekanism:block_tin': 'minecraft:granite',
  'mekanism:block_fluorite': 'create:limestone'
}

ForgeEvents.onEvent('net.minecraftforge.event.level.BlockEvent$FluidPlaceBlockEvent', e => {
    const newState = e.getNewState();
    const newBlock = newState.getBlock();
    const newBlockPos = e.getPos();
    const downBlock = e.level.getBlock(newBlockPos.below())

    //see https://gitlab.com/HorribleNerd/cobblegenrandomizer/-/blob/master/src/main/java/com/horriblenerd/cobblegenrandomizer/ForgeEventHandlers.java?ref_type=heads
    if(newBlock == Blocks.COBBLESTONE) {
      console.log(downBlock);
      let id = ore_stone_generator[downBlock];
      let replacement = id ? Block.getBlock(id) : Blocks.AIR;
      console.log(replacement);

      if(replacement != Blocks.AIR) {
        e.setNewState(replacement.defaultBlockState());
      }
    }
});
