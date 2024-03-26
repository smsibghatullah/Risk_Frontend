import { useRecoilValue } from "recoil";
import { getSecrets } from "src/config";
import apiClient from "src/helpers/apiClient";
import { regulatoryLawAtom } from "src/_state/regulatoryLawAtom";

class RegulatorylawService{
    getAllregulatorylaw = (search) => search ? apiClient().get("regulatory_law/search/?q="+search) : apiClient().get("regulatory_law/");
    deleteregulatorylaw = (id) => apiClient().delete(`regulatory_law/${id}/`);
    static getlaw(rowData) {
        const law = useRecoilValue(regulatoryLawAtom);
        const lawIds = Array.isArray(rowData.regulatory_laws) ? rowData.regulatory_laws : [];
        const filteredLaws = law.filter(item => lawIds.includes(item.id));
        const lawNames = filteredLaws.map(item => item.name).join("<br><hr>");
        return <div dangerouslySetInnerHTML={{ __html: lawNames }} />;
      }
      

}

export default RegulatorylawService;