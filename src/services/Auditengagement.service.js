import apiClient from "src/helpers/apiClient";

class AuditengagementService{
    getAllAuditEngagement = (search) => search ? apiClient().get("auditengagement/search/?q="+search) : apiClient().get("auditengagement/");
    deleteAuditEngagement = (id) => apiClient().delete("auditengagement/"+id+"/");

    patchAuditEngagement = (id, formData) => apiClient().patch("auditengagement/"+id+"/", formData);

    postFiles = (data) => apiClient().post("auditengagement_attachment/", data);
}

export default AuditengagementService;