import apiClient from "src/helpers/apiClient";

class RiskrepositoryService{
    getAllRisks = (search) => search ? apiClient().get("risk_repo/search/?q="+search) : apiClient().get("risk_repo/");
    getDataDepartment =(department_id, search) => search ? apiClient().get("risk_repo/"+department_id+"?title="+search) : apiClient().get("risk_repo/"+department_id);
    deleteRisks = (id) => apiClient().delete("risk_repo/"+id+"/");

}

export default RiskrepositoryService;