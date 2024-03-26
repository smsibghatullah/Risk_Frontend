import { atom } from 'recoil';

const impactAtom = atom({
    key: 'impactAtom',
    default: [
        { priority:4, name:"Low"  },
        { priority:3, name:"Medium" },
        { priority:2, name:"Major" },
        { priority:1, name:"Severe" },
    ]
});

export { impactAtom };