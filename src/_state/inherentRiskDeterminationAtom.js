import { atom } from 'recoil';

const inherentRiskDeterminationAtom = atom({
    key: 'inherentRiskDeterminationAtom',
    default: [
        {priority:1 ,likehood:"Almost Certain", impact:"Severe",  score:"Critical" },
        {priority:2 ,likehood:"Almost Certain", impact:"Major",   score:"High" },
        {priority:3 ,likehood:"Almost Certain", impact:"Medium",  score:"High" },
        {priority:4 ,likehood:"Almost Certain", impact:"Low",     score:"Medium" },
        {priority:5 ,likehood:"Likely",         impact:"Severe",  score:"High" },
        {priority:6 ,likehood:"Likely",         impact:"Major",   score:"High" },
        {priority:7 ,likehood:"Likely",         impact:"Medium",  score:"Medium" },
        {priority:8 ,likehood:"Likely",         impact:"Low",     score:"Low" },
        {priority:9 ,likehood:"Possible",       impact:"Severe",  score:"High" },
        {priority:10 ,likehood:"Possible",      impact:"Major",   score:"Medium" },
        {priority:11 ,likehood:"Possible",      impact:"Medium",  score:"Medium" },
        {priority:12 ,likehood:"Possible",      impact:"Low",     score:"Low" },
        {priority:13 ,likehood:"Rare",          impact:"Severe",  score:"Medium" },
        {priority:14 ,likehood:"Rare",          impact:"Major",   score:"Medium" },
        {priority:15 ,likehood:"Rare",          impact:"Medium",  score:"Low" },
        {priority:16 ,likehood:"Rare",          impact:"Low",     score:"Low" },
       
    ]
});

export { inherentRiskDeterminationAtom };