import { atom } from 'recoil';

const controlDeterminationAtom = atom({
    key: 'controlDeterminationAtom',
    default: [
        { design:'Strong',  effectiveness:'Strong',   overall_rating:"Excelent",  priority:1 },
        { design:'Strong',  effectiveness:'Limited',  overall_rating:"Good",      priority:2 },
        { design:'Strong',  effectiveness:'Weak',     overall_rating:"Fair",      priority:3 },
        { design:'Limited', effectiveness:'Strong',   overall_rating:"Good",      priority:4 },
        { design:'Limited', effectiveness:'Limited',  overall_rating:"Absent",    priority:5 },
        { design:'Limited', effectiveness:'Weak',     overall_rating:"Absent",    priority:6 },
        { design:'Weak',    effectiveness:'Strong',   overall_rating:"Fair",      priority:7 },
        { design:'Weak',    effectiveness:'Limited',  overall_rating:"Absent",    priority:8 },
        { design:'Weak',    effectiveness:'Weak',     overall_rating:"Absent",    priority:9 },
    ]
});

export { controlDeterminationAtom };