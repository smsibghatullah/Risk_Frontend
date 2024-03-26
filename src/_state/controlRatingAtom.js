import { atom } from 'recoil';

const controlRatingAtom = atom({
    key: 'controlRatingAtom',
    default: [
        { name:"Excelent",   priority:1 },
        { name:"Good",       priority:2 },
        { name:"Fair",       priority:3 },
        { name:"Absent",     priority:4 },
    ]
});

export { controlRatingAtom };