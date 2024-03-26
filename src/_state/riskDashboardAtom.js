import { atom } from 'recoil';

const riskDashboardAtom = atom({
    key: 'riskDashboardAtom',
    default: {
        activeIndex: 0,
        riskTypes : ['inherent_risk_rating_rating', 'residual_risk_scoring_score']
    }
});

export { riskDashboardAtom };