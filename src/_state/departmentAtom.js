import { atom } from 'recoil';

const departmentAtom = atom({
    key: 'departmentAtom',
    default: []
});

export { departmentAtom };