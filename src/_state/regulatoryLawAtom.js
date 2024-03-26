import { atom } from 'recoil';

const regulatoryLawAtom = atom({
    key: 'regulatoryLawAtom',
    default: []
});

export { regulatoryLawAtom };