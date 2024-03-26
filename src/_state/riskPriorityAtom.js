import { atom } from 'recoil';

const riskPriorityAtom = atom({
    key: 'riskPriorityAtom',
    default: [
        {score_start:11, score_end:16,  rating:"Critical",  priority:4, color:"#A52A2A" },
        {score_start:7,  score_end:10,  rating:"High",      priority:3, color:"#ff0000" },
        {score_start:4,  score_end:8,   rating:"Medium",    priority:2, color:"#ffc000" },
        {score_start:1,  score_end:3,   rating:"Low",       priority:1, color:"#008000" },
    ]
});

export { riskPriorityAtom };