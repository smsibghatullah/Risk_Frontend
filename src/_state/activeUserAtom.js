import { atom } from 'recoil';

const activeUserAtom = atom({
    key: 'activeUserAtom',
    default: {
        token: '',
        groups:[]
    }
});

export { activeUserAtom };