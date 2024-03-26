import { atom } from 'recoil';

const riskAtom = atom({
    key: 'riskAtom',
    default: []
});

export { riskAtom };