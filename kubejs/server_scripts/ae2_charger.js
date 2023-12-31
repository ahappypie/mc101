// priority: 10

const tesla = (input, energy, output) => {
    return {
        type: 'createaddition:charging',
        input: {
            item: input,
            count: 1
        },
        energy: energy,
        result: {
            item: output,
            count: 1
        }
    }
}

const charger = (e) => {
    e.remove( { id: 'ae2:network/blocks/crystal_processing_charger' });

    e.shapeless(AE('charger'), ['createaddition:tesla_coil', AE('fluix_crystal')]);

    e.remove( { id: 'createaddition:compat/ae2/charged_certus_quartz' });

    e.custom(tesla(MC('book'), 3200, AE('guide'))).id('kubejs:teslacoil/ae2/guide');
    e.custom(tesla(MC('compass'), 3200, AE('meteorite_compass'))).id('kubejs:teslacoil/ae2/meteorite_compass');
    e.custom(tesla(AE('certus_quartz_crystal'), 3200, AE('charged_certus_quartz_crystal'))).id('kubejs:teslacoil/ae2/charged_certus_quartz');
}

ServerEvents.recipes(event => {
    charger(event);
})