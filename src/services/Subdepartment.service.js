import { useRecoilValue } from "recoil";
import apiClient from "src/helpers/apiClient";
import { sub_functionAtom } from "src/_state/sub_functionAtom";


class SubdepartmentService{
    getAllSubdepartment = (search) => search ? apiClient().get("subdepartment/?name="+search) : apiClient().get("subdepartment/");
    deleteSubdepartment = (id) => apiClient().delete("subdepartment/"+id+"/");
    static getsub_function(rowData){ 
        const sub_functions = useRecoilValue(sub_functionAtom);
        let filtered = sub_functions.filter(i => i.id == rowData.sub_functions);
        return filtered.length ?  filtered[0]['name'] : "";
}
}

export default SubdepartmentService;