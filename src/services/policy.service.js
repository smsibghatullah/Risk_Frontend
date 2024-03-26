import { useRecoilValue } from "recoil";
import { getSecrets } from "src/config";
import apiClient from "src/helpers/apiClient";
import { policyAtom } from "src/_state/policyAtoms";

class PolicyService{
    getAllPolicy = (search) => search ? apiClient().get("policy/search/?q="+search) : apiClient().get("policy/");
    deletePolicy = (id) => apiClient().delete(`policy/${id}/`);
    static getpolicy(rowData) {
        const policy = useRecoilValue(policyAtom);
        const policyIds = Array.isArray(rowData.policy) ? rowData.policy : [];
        const filteredPolicies = policy.filter(item => policyIds.includes(item.id));
        const policyNames = filteredPolicies.map(item => item.name).join("<br><hr>");
        return <div dangerouslySetInnerHTML={{ __html: policyNames }} />;
      }
      
}

export default PolicyService;