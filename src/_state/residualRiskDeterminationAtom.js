import { atom } from 'recoil';

const residualRiskDeterminationAtom = atom({
    key: 'residualRiskDeterminationAtom',
    default: [
        {priority:1,  inherent:"Critical",  control:"Excelent",   score:"Medium" },
        {priority:2,  inherent:"Critical",  control:"Good",       score:"High" },
        {priority:3,  inherent:"Critical",  control:"Fair",       score:"Critical" },
        {priority:4,  inherent:"Critical",  control:"Absent",     score:"Critical" },
        {priority:5,  inherent:"High",      control:"Excelent",   score:"Low" },
        {priority:6,  inherent:"High",      control:"Good",       score:"Low" },
        {priority:7,  inherent:"High",      control:"Fair",       score:"High" },
        {priority:8,  inherent:"High",      control:"Absent",     score:"High" },
        {priority:9,  inherent:"Medium",    control:"Excelent",   score:"Low" },
        {priority:10, inherent:"Medium",    control:"Good",       score:"Low" },
        {priority:11, inherent:"Medium",    control:"Fair",       score:"Medium" },
        {priority:12, inherent:"Medium",    control:"Absent",     score:"High" },
        {priority:13, inherent:"Low",       control:"Excelent",   score:"Low" },
        {priority:14, inherent:"Low",       control:"Good",       score:"Low" },
        {priority:15, inherent:"Low",       control:"Fair",       score:"Low" },
        {priority:16, inherent:"Low",       control:"Absent",     score:"Medium" },
       
    ]
});

export { residualRiskDeterminationAtom };