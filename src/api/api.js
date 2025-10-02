import axios from 'axios'
const API_BASE_URL = "http://localhost:3001/api";
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjI4NDkxMDQtYzI0Yi00ZWViLTkzZjAtYWRhZDE5MGRjZTliIiwicm9sIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTc1OTM3NTg1MCwiZXhwIjoxNzU5NDYyMjUwfQ.HJfDDyQTUCVtaGJrcBecZ3_DWXghEkej_Lio73uKTCs"

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        timeout: 10000,
        "Authorization": `Bearer ${access_token}`,
    },
});

// Obtener el resumen general del dashboard para cards
export const getSummary = async () => {
    try {
        const response = await api.get('/dashboard/summary');
        return response.data;
    } catch (error) {
        console.error('Error al obtener el resumen:', error.error);
        throw error;
    }
};

export const getTopFinesForAgent = async(filterRange=null) =>{
    try {
        const url = `/dashboard/top-agents${filterRange ? `?range=${filterRange}` : ''}`;
        const response = await api.get(url);
        console.log("top fines por agente: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener top fines por agente:', error);
        throw error;
        return [];
    }
}


/**
 * Obtiene las multas principales por ubicación.
 * @param {string} filterRange - El rango de tiempo para filtrar (opcional).
 * @returns {Promise<Array>} La lista de multas por ubicación.
 */
export const getTopFinesForUbications = async (filterRange = null) => {
    try {
        const url = `/dashboard/top-ubications${filterRange ? `?range=${filterRange}` : ''}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching top fines for ubications:", error);
        return [];
    }
};

/**
 * Obtiene el monto recaudado mensualmente.
 * @param {number} filterYear - El año para filtrar (opcional, por defecto el año actual).
 * @returns {Promise<Array>} La lista de montos recaudados mensualmente.
 */
export const getCollectedAmountMonthly = async (filterYear = null) => {
    try {
        const url = `/dashboard/collected-monthly${filterYear ? `?year=${filterYear}` : ''}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching collected amount monthly:", error);
        return [];
    }
};

/**
 * Obtiene las multas de hoy.
 * @returns {Promise<Array>} La lista de multas de hoy.
 */
export const getFinesToday = async () => {
    try {
        const response = await api.get('/dashboard/fines-today');
        return response.data;
    } catch (error) {
        console.error("Error fetching fines today:", error);
        return [];
    }
};

/**
 * Obtiene el progreso de pago mensual.
 * @param {string} rangeFilter - El rango para filtrar (opcional).
 * @returns {Promise<object>} El objeto de progreso de pago.
 */
export const getMonthlyPaymentProgress = async (rangeFilter = null) => {
    try {
        const url = `/dashboard/monthly-payment-progress${rangeFilter ? `?range=${rangeFilter}` : ''}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching monthly payment progress:", error);
        return {};
    }
};
