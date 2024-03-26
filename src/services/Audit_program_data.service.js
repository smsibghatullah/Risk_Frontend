import apiClient from "src/helpers/apiClient";

class Audit_Program_List_Service{
    getAllAuditrepoList = (search) => search ? apiClient().get("audit_program/search/?q="+search) : apiClient().get("audit_program/");
    deleteAuditrepoList = (id) => apiClient().delete("audit_program/"+id+"/");
    editAuditProgram = (id, data) => apiClient().patch("audit_program/"+id+"/", data);
}

export default Audit_Program_List_Service;