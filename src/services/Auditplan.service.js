import apiClient from "src/helpers/apiClient";
import { getSecrets } from "src/config";
const token = getSecrets.token
var config = {
    headers: { 
      'Authorization': token, 
    }
  };


class AuditplanService{
    getAllAuditplan = (search) => search ? apiClient().get("annualplan/search/?q="+search) : apiClient().get("annualplan/");
    deleteAuditplan = (id) => apiClient().delete("annualplan/"+id+"/");
   
}

export default AuditplanService;