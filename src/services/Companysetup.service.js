import apiClient from "src/helpers/apiClient";


class CompanySetupService{
    getAllCompany = (search) => search ? apiClient().get("companysetup/?name="+search) : apiClient().get("companysetup/");
    deleteCompany = (id) => apiClient().delete("companysetup/"+id+"/");
}

export default CompanySetupService;