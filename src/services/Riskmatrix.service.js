import apiClient from "src/helpers/apiClient";


class RiskMatrixService{
    getAllRiskMatrix = (search) => search ? apiClient().get("risk_matrix/?likehood="+search) : apiClient().get(`risk_matrix/`);
    deleteRiskMatrix = (id) => apiClient().delete("risk_matrix/"+id+"/");
}

export default RiskMatrixService;