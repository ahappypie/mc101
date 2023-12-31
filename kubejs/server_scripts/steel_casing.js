// priority: 10
const steel_mekanism = (e) => {
    e.remove({ id: 'create:sequenced_assembly/precision_mechanism' });
    //efficient recipe
    e.recipes.create.sequenced_assembly([
      Item.of(CR('precision_mechanism')).withCount(2)
    ],
    CR('brass_sheet'),
    [
      e.recipes.create.deploying(CR('incomplete_precision_mechanism'), [CR('incomplete_precision_mechanism'), CR('large_cogwheel')]),
      e.recipes.create.deploying(CR('incomplete_precision_mechanism'), [CR('incomplete_precision_mechanism'), CR('electron_tube')]),
      e.recipes.create.deploying(CR('incomplete_precision_mechanism'), [CR('incomplete_precision_mechanism'), CR('electron_tube')]),
      e.recipes.create.cutting(CR('incomplete_precision_mechanism'), CR('incomplete_precision_mechanism'))
    ]
    ).transitionalItem(CR('incomplete_precision_mechanism')).loops(1).id('kubejs:sequenced_assembly/create/precision_mechanism');
    //inefficient recipe
    e.shaped(CR('precision_mechanism'), [
      'LTC',
      'TST',
      'CTL'
    ], {
      L: CR('large_cogwheel'),
      T: CR('electron_tube'),
      C: CR('cogwheel'),
      S: CR('brass_sheet')
    }).id('kubejs:manual/create/precision_mechanism');
  
    e.replaceInput({ id: 'mekanism:metallurgic_infuser' }, MC('redstone'), CR('precision_mechanism'));
    
    e.remove({ id: 'mekanism:steel_casing' });
  
    e.recipes.create.sequenced_assembly([MK('steel_casing')], CR('precision_mechanism'), [
      e.recipes.create.deploying('kubejs:incomplete_steel_casing', ['kubejs:incomplete_steel_casing', '#forge:ingots/steel']),
      e.recipes.create.deploying('kubejs:incomplete_steel_casing', ['kubejs:incomplete_steel_casing', '#forge:ingots/osmium']),
      e.recipes.create.deploying('kubejs:incomplete_steel_casing', ['kubejs:incomplete_steel_casing', '#forge:ingots/steel']),
      e.recipes.create.pressing('kubejs:incomplete_steel_casing', 'kubejs:incomplete_steel_casing')
    ]).transitionalItem('kubejs:incomplete_steel_casing').loops(1).id('kubejs:sequenced_assembly/mekanism/steel_casing');
}

ServerEvents.recipes(event => {  
    steel_mekanism(event);
});
  