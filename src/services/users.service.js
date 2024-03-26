import { useRecoilValue } from "recoil";

import apiClient from "src/helpers/apiClient";
import { activeUserAtom } from "src/_state/activeUserAtom";


class UsersService{
    createUser   = (data)    => apiClient().post(`api/register/`, data);
    updateUser   = (data)    => apiClient().patch(`user/update/${data.id}`, data);
    deleteUser   = (user_id) => apiClient().delete(`user/${user_id}`);
    getAllUsers  = (search)  => apiClient().get(`user/${search}`);
    getAllGroups = (search)  => apiClient().get(`group/?search=${search}`);

    fetchUserDetails = (user_id, token='') =>  apiClient().get("user/"+user_id, { headers: { 'Authorization': `Token ${token}`, }  });
        
    static hasPermission = (permission)=>useRecoilValue(activeUserAtom).groups.filter( f => f.name == permission).length > 0;              
    static getGroupsNames = (user)=>   user.groups.map(i => {
      let  str = i.name.replaceAll("_", " ")
        return str.charAt(0).toUpperCase() + str.slice(1);
    }).join();
    
   
          
}

export default UsersService;