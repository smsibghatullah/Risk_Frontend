import apiClient from "src/helpers/apiClient";


class RiskRegisterService{
    
    getAllRisk = () => apiClient().get("all_risk/?parentonly=true");
    getAllChildRisk = () => apiClient().get("all_risk/");

    getChildRisk = (parent_id) => apiClient().get(`all_risk/${parent_id}`);
    getAllRiskRegister = (department_id, search) => search ? apiClient().get("risk_register/department_id/"+department_id+"?parentonly=true&search="+search) : apiClient().get("risk_register/department_id/"+department_id+"?parentonly=true");
    deleteRiskRegister = (id) => apiClient().delete("risk_register/"+id+"/");
    patchRiskRegister = (id, formData) => apiClient().patch("risk_register/"+id+"/", formData);
}

export default RiskRegisterService;