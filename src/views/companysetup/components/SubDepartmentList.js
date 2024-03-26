import { useRef, useState } from "react";
import { TieredMenu } from 'primereact/tieredmenu';
import axios from 'axios';
import { Toast } from 'primereact/toast';


import { getSecrets } from "src/config";
const API_URL = getSecrets.API_URL
const token = getSecrets.token();


const SubDepartmentList = (prop)=>{

    let delete_subdepartment = (id) => {
        axios.delete(API_URL + `/subdepartment/${id}/`).then((res) => {
          toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Deleted Successfully' });
          setTimeout(()=>{ prop.setVisible(false)}, 2000)
        }).catch((err) => {
          toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Failed to delete record' });
        })
      }
      const toast = useRef(null);

    const menuSub = useRef(null);
    const [ItemSubData, setItemSubData] = useState({});

    const itemsSub =  [        
        {
            label: 'Delete',
            // icon: 'pi pi-fw pi-power-off',
            command:(e)=>{ 
              delete_subdepartment(ItemSubData.id)
            }
        }       
    ];

    return (
      <>
                <Toast ref={toast} />

                    <table>
                        <tr>
                          <th>Name</th>
                         <td></td>

                        </tr>

                        {prop.sud_departments.filter(i=>i.department == prop.department_id).map(i =>
                          <>
                            <tr >

                              <td> {i.name} </td >
                               

                              <td>
                               
                              <TieredMenu model={itemsSub} popup ref={menuSub} breakpoint="767px" />

                                <i className="custom-target-icon pi pi-ellipsis-v p-text-secondary p-overlay-badge"

                                onClick={(e) => {setItemSubData(i); menuSub.current.toggle(e)}}
                                // onClick={() => { setSelectedDepartment(s.id); setSelectedDepartment(s.id); setSelectSubDepartmentEdit(true) }}
                                style={{ fontSize: '1rem', fontWeight: 'bold', color: "#64748B", backgroundColor: "white", padding: 10, cursor: 'pointer', borderRadius: 50 }}>
                                </i>
                            </td>
                             
                            </tr>
                           
                          </>
                         )} 
                       
                      </table>
                  
      </>
    )

}

export default SubDepartmentList