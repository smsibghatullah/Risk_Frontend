import { atom } from 'recoil';

const categoriesAtom = atom({
    key: 'categoriesAtom',
    default: [
        { name:"Governance",   priority:1 },
        { name:"Operational",       priority:2 },
        // { name:"Financial",       priority:3 },
        { name:"Legal & Regulatory",     priority:3 },
        { name:"Strategic",     priority:4 },
        // { name:"Technology",     priority:6 },
        { name:"Commercial",     priority:5 },
    ]
});

export { categoriesAtom };