import { atom } from 'recoil';

const auditAtom = atom({
    key: 'auditAtom',
    default: []
});

export { auditAtom };