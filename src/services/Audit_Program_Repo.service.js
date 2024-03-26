import apiClient from "src/helpers/apiClient";


class Audit_Program_Repo_Service{
    getAllAuditrepo = (search) => search ? apiClient().get("audit_program_repo/search/?q="+search) : apiClient().get("audit_program_repo/");
    deleteAuditrepo = (id) => apiClient().delete("audit_program_repo/"+id+"/");
}

export default Audit_Program_Repo_Service;