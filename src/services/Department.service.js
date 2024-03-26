import { useRecoilValue } from "recoil";
import { getSecrets } from "src/config";
import apiClient from "src/helpers/apiClient";
import { departmentAtom } from "src/_state/departmentAtom";

class DepartmentService{    

    getAllDepartment = (search) => search ? apiClient().get("department/?search="+search) : apiClient().get(`department/`);
    deleteDepartment = (id) => apiClient().delete(`department/${id}/`);
    static getNameFromIds(rowData = null) {
      const department = useRecoilValue(departmentAtom);
      let names = "";
      if (rowData != null && rowData.departments != null) {
        rowData.departments.forEach((element, index) => {
          const departmentName = department.find(item => item.id === element)?.name || "";
          names += departmentName;
    
          // Add a line break if it's not the last department
          if (index !== rowData.departments.length - 1) {
            names += "<br><hr>";
          }
        });
      }
      return <div dangerouslySetInnerHTML={{ __html: names }} />;
    }
    static getName(rowData){ 
       const department = useRecoilValue(departmentAtom);
       let filtered = department.filter(i => i.id == rowData.department_id);
       return filtered.length ?  filtered[0]['name'] : "";
     
    }
   
    static getsubfunctions(rowData){ 
      const department = useRecoilValue(departmentAtom);
     
      let filtered = department.filter(i => i.id == rowData.department);
      return filtered.length ?  filtered[0]['name'] : "";
    
   }
}

export default DepartmentService;