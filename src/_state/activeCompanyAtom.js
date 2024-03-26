import { atom } from 'recoil';

const activeCompanyAtom = atom({
    key: 'activeCompanyAtom',
    default: { }
});

export { activeCompanyAtom };