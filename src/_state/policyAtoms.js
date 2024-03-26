import { atom } from 'recoil';

const policyAtom = atom({
    key: 'policyAtom',
    default: []
});

export { policyAtom };