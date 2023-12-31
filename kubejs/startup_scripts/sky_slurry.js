// priority: 0

console.info('loading sky slurry startup script');

const $Gas = Java.loadClass('mekanism.api.chemical.gas.Gas');
const $GasBuilder = Java.loadClass('mekanism.api.chemical.gas.GasBuilder');

StartupEvents.registry('mekanism:gas', event => {
    event.createCustom('sky_slurry', () => $Gas($GasBuilder.builder().tint(0x47FEFF)));
});