import apiClient from "src/helpers/apiClient";

class RiskAssessmentService{
    
    getAllRisks = (search) => search ? apiClient().get("risk_assessment/search/?q="+search) : apiClient().get("risk_assessment/");
    getDataDepartment =(department_id, search) => search ? apiClient().get("risk_assessment/departments/"+department_id+"?title="+search) : apiClient().get("risk_assessment/"+department_id);
    createRiskAssessment = (data) => apiClient().post("risk_assessment/", data);
    updateRiskAssessment = (id, data) => apiClient().patch(`risk_assessment/${id}/`, data);
    deleteRisks = (id) => apiClient().delete("risk_assessment/"+id+"/");

}

export default RiskAssessmentService;