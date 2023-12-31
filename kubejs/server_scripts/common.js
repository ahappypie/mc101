// priority: 0

const MOD = (m, i, n) => {
    let num = n ? `${n}x ` : '';
    return `${num}${m}:${i}`;
}

const CR = (i, n) => MOD('create', i, n);
const MC = (i, n) => MOD('minecraft', i, n);
const MK = (i, n) => MOD('mekanism', i,  n);
const AE = (i, n) => MOD('ae2', i, n);