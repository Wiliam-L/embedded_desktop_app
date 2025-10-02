import { api } from "./api";

// Crear nuevo registro de multa
const createFine = async(fineData) => {
    console.log("DATOS A ENVIAR: ", fineData)
    try {
        const response = await api.post("/fine", fineData);
        return response.data;
    } catch (error) {
        console.log("Error al crear la multa")
        throw error;
    }
}

// Obtener las multas registradas
const getFines = async({limit=20, offset=0, search=null, filter=null}) => {
    try {
        let url = `/fine?limit=${limit}&offset=${offset}`;
        if (search) url += `&search=${search}`;
        if (filter) url += `&filter=${filter}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos de las multas:", error);
        throw error;
    }
}

export const getFineById = async(id) => {
    try {
        const response = await api.get(`/fine/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos de la multa:", error);
        throw error;
    }
}


const updateFine = async(id, data) => {
    try {
        const response = await api.post(`/fine/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la multa", error);
        throw error;
    }
}

const getTicketBooklet =  async({limit=20, offset=0, search=null, filter=null}) => {
    try {
        let url = `/booklet?limit=${limit}&offset=${offset}`;
        if (search) url += `&search=${search}`;
        if (filter) url += `&status=${filter}`;
        const response = await api.get(url);

        console.log("url: ", url)
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos del talonario:", error);
        throw error;
    }
}

// Obtener el listado de colores
const getColors = async() => {
    try {
        const response = await api.get(`/vehicle/colors`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos de los colores:", error);
        throw error;
    }
}

// Obtener el listado de marcas
const getBrands = async() => {
    try {
        const response = await api.get(`/vehicle/brands`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos de las marcas:", error);
        throw error;
    }
}

// Obtener el listado de tipos
const getTypes = async() => {
    try {
        const response = await api.get(`/vehicle/types`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos de los tipos:", error);
        throw error;
    }
}

// Obtener el listado de licencias
const getClasificationLicenses = async () => {
    try {
        const response = await api.get("/driver/license");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos de las licencias:", error);
        throw error;
    }
}

// Obtener artículos sancionadores
const getArticles = async () => {
    try {
        const response = await api.get("/articles");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos de los artículos:", error);
        throw error;
    }
}

export {
    createFine,
    getFines,
    getTicketBooklet,
    updateFine,
    getColors,
    getBrands,
    getTypes,
    getClasificationLicenses,
    getArticles
}