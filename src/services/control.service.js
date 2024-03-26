import { getSecrets } from "src/config";
import apiClient from "src/helpers/apiClient";

class ControlsService{
    getAllControl = (search) => search ? apiClient().get(`control/search/?q=`+search) : apiClient().get(`control/`);
    deleteControl = (id) => apiClient().delete(`control/${id}/`);
}

export default ControlsService;