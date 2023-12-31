// priority: 10



const ore_stone_automation = (e) => {
  const create = e.recipes.create
  //crimsite -> iron + redstone is the default recipe from create

  //veridium -> copper + clay chance + osmium chance
  e.remove({ id: 'create:splashing/crushed_raw_copper' });
  create.splashing(
    [
      CR('copper_nugget', 9), 
      Item.of(MC('clay_ball')).withChance(0.5),
      Item.of(MK('nugget_osmium')).withChance(0.9)
    ], 
    CR('crushed_raw_copper')
  ).id('kubejs:ore_stone_automation/splashing/copper');

  //ochrum -> gold, no quartz
  e.remove({ id: 'create:splashing/crushed_raw_gold' });
  create.splashing(
    [
      MC('gold_nugget', 9)
    ], 
    CR('crushed_raw_gold')
  ).id('kubejs:ore_stone_automation/splashing/gold');

  //diorite -> quartz is the default create recipe

  //asurine -> zinc + gunpowder chance + lead chance
  e.remove({ id: 'create:splashing/crushed_raw_zinc' });
  create.splashing(
    [
      CR('zinc_nugget', 9), 
      Item.of(MC('gunpowder')).withChance(0.25),
      Item.of(MK('nugget_lead', 3)).withChance(0.5)
    ], 
    CR('crushed_raw_zinc')
  ).id('kubejs:ore_stone_automation/splashing/zinc');

  //granite -> crushed tin + uranium chance | no granite -> red sand crushing
  e.remove({ id: 'create:milling/granite'});
  create.milling(MC('red_sand'), MC('granite')).id('kubejs:milling/granite');
  create.crushing([
    Item.of(CR('crushed_raw_tin')).withChance(0.3),
    Item.of(MK('nugget_uranium')).withChance(0.05)
  ],
  MC('granite')).id('kubejs:ore_stone_automation/crushing/granite');

  //limestone -> fluorite chance
  e.remove({ id: 'createchromaticreturn:q_to_fluorite' });
  create.crushing([
    Item.of(MK('fluorite_gem')).withChance(0.125)
  ], CR('limestone')).id('kubejs:ore_stone_automation/crushing/limestone');

  //remove simple redstone conversion
  e.remove({ id: 'createchromaticreturn:cf_to_rs' });

  //sky stone
  e.remove({ output: AE('sky_dust') });
  create.crushing([
    Item.of(AE('sky_dust')).withChance(0.5), AE('sky_stone_block')
  ], AE('sky_stone_block')).id('kubejs:ore_stone_automation/crushing/sky_stone');

  //lapis
  e.recipes.ars_nouveau.enchanting_apparatus([
    MC('blue_dye')
  ],
  MC('amethyst_shard'),
  MC('lapis_lazuli'),
  500
  ).id('kubejs:ore_stone_automation/enchanting/lapis');


  //diamond
  e.custom({
    type: 'mekanism:dissolution',
    itemInput: { ingredient: { item: AE('sky_dust') }},
    gasInput: { gas: MK('sulfuric_acid'), amount: 1 },
    output: { gas: 'kubejs:sky_slurry', amount: 100, chemicalType: 'gas' }
  }).id('kubejs:ore_stone_automation/dissolution/sky_slurry');

  e.custom({
    type: 'mekanism:compressing',
    itemInput: { ingredient: { item: MK('enriched_carbon') }},
    chemicalInput: { gas: 'kubejs:sky_slurry', amount: 5 }, //amount is in multiples of 200 mb
    output: { item: MK('dust_diamond') }
  }).id('kubejs:ore_stone_automation/compressing/diamond');

  e.remove( { id: 'mekanism:processing/diamond/from_dust' } );
  create.compacting(MC('diamond'), [Fluid.water(100), MK('dust_diamond'), MK('enriched_carbon', 8)]).superheated();
}


ServerEvents.recipes(event => {
  ore_stone_automation(event);
});
