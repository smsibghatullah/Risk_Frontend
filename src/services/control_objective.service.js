import { useRecoilValue } from "recoil";
import { getSecrets } from "src/config";
import apiClient from "src/helpers/apiClient";
import { controlobjectiveAtom } from "src/_state/Control_objectiveAtom";


class ControlObjectiveService{
    getAllControlobjective = (search) => search ? apiClient().get("controlobjective/search/?q="+search) : apiClient().get("/controlobjective/");
    deleteControlobjective = (id) => apiClient().delete(`controlobjective/${id}/`);
    static getcontrol(rowData) {
        const objective = useRecoilValue(controlobjectiveAtom);
        const controlIds = Array.isArray(rowData.control_objective) ? rowData.control_objective : [];
        const filteredControls = objective.filter(item => controlIds.includes(item.id));
        const controlDescriptions = filteredControls.map(item => item.description).join("<br><hr>");
        return <div dangerouslySetInnerHTML={{ __html: controlDescriptions }} />;
      }
      
}

export default ControlObjectiveService;