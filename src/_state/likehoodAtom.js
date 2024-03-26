import { atom } from 'recoil';

const likehoodAtom = atom({
    key: 'likehoodAtom',
    default: [
        { priority:4,  name:"Almost Certain" },
        { priority:3,  name:"Likely"   },
        { priority:2,  name:"Possible"  },
        { priority:1,  name:"Rare" },
    ]
});

export { likehoodAtom };