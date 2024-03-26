import { atom } from 'recoil';

const selectedPolicyAtom = atom({
    key: 'selectedPolicyAtom',
    default: { }
});

export { selectedPolicyAtom };