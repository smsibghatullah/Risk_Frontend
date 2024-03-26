import { atom } from 'recoil';

const controlAtom = atom({
    key: 'controlAtom',
    default: [
        { name:"Strong",   priority:3 },
        { name:"Limited",  priority:2 },
        { name:"Weak",     priority:1 },
    ]
});

export { controlAtom };