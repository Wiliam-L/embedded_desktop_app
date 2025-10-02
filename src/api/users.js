import { api } from "./api";

// Obtener el resumen general del dashboard para cards
export const getPersonnel = async ({limit=20, offset=0, status=null, search=null, role=null}) => {
    try {
        const url = `/personnel?limit=${limit}&offset=${offset}`
        if(status){
            url += `&status=${status.toUpperCase()}`
        }
        if(search){
            url += `&search=${search}`
        }
        if(role){
            url += `&role${role}`
        }

        const response = await api.get(url);
        console.log("data personnel -> ", response)
        return response.data;
    } catch (error) {
        console.error('Error al obtener el personal:', error.error);
        throw error;
    }
};
