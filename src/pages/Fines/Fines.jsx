import { Table } from "../../components/table/Table";
import {getFines, getFineById, updateFine, getColors, getBrands, getTypes, getClasificationLicenses, getArticles} from "../../api/fines";
import { useEffect, useReducer, useState } from "react";
import { CustomPage } from "../../components/CustomPage";
import { FormFine } from "./FormFine";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { Modal } from "../../components/Modal";


// lógica mejorada evitando "useState"
const initialState = {
    finesData: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    pageSize: 20,
    totalCount: 0,
    searchQuery: '',
    filterQuery: 'all'
}

const mapFinesData = (data) => {
    return data.map(item => ({
        fine_id: item.fine_id,
        ticket_number: item.ticket_number,
        date_and_time: item.date_and_time_of_the_violation,
        //article: item.InfringementArticle?.article_number,
        vehicle_plate: item.Vehicle?.vehicle_plate_number,
        driver: item.Driver?.first_name ? `${item.Driver?.first_name}} ${item.Driver?.last_name}` : 'N/A',           
        total: item.total,
        agent: item.Agent?.first_name ? `${item.Agent.first_name} ${item.Agent.first_last_name} ${item.Agent.plate_number}` : 'N/A',
        fine_status: item.status.toUpperCase(),
    }))
}


const finesReducer = (state, action) => {
        switch(action.type){
            case "FETCH_START": 
                return {...state, isLoading: true, error: null};
            case "FETCH_SUCCESS":
                return {
                    ...state, 
                    finesData: mapFinesData(action.payload.rows), 
                    totalCount: action.payload.count, 
                    isLoading: false,
                    error: null    
                };
            case "SET_PAGE":
                return {...state, currentPage: action.payload};
            case "SET_SEARCH_QUERY":
                return {...state, searchQuery: action.payload, currentPage: 1};
            case "SET_FILTER_QUERY":
                return {...state, filterQuery: action.payload, currentPage: 1};
            default:
                return state;
        }
}


const Fines = () => {
    // const [finesData, setFinesData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [filterQuery, setFilterQuery] = useState('all');
    // const [selectedFine, setSelectedFine] = useState(null);

    // nueva lógica
    const [state, dispatch] = useReducer(finesReducer, initialState);


    const [masterData, setMasterData] = useState({
        colors: [],
        brands: [],
        types: [],
        licenses: [],
        articles: []
    })

    // open modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const statusModal = () => setIsModalOpen(!isModalOpen);

    // Lógica para el Modal
    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: 'create',
        fineId: null,
        fineData: null
    })

    

    const closeModal = () => {
        setModalState({
            isOpen: false,
            mode: "create",
            fineId: null,
            fineData: null
        })
    }

    useEffect(() => {
        const getData = async () => {
            dispatch({type: "FETCH_START"});
            try {

                const offset = (state.currentPage -1 ) * state.pageSize;
                const response = await getFines({limit: state.pageSize, offset: offset, search: state.searchQuery, filter: state.filterQuery});
                
                dispatch({type: "FETCH_SUCCESS", payload: response})
                
            } catch (error) {
                console.log("Error al obtener los datos de las multas: ", error);
                dispatch({type: "FETCH_ERROR", payload: error.message || "Error desconocido al cargar multas."})
            }
        }
        getData();
    }, [state.currentPage, state.pageSize, state.searchQuery, state.filterQuery])


    // Obtener los datos iniciales para el formulario de multas
    useEffect(() => {
        const loadDataForm = async () => {
            try {
                const [colorsResponse, brandsResponse, typesResponse, licensesResponse, articlesResponse] = await Promise.all([
                    getColors(),
                    getBrands(),
                    getTypes(),
                    getClasificationLicenses(),
                    getArticles(),
                    getArticles()
                ]);
                
                setMasterData({
                    colors: colorsResponse || [], 
                    brands: brandsResponse || [], 
                    types: typesResponse || [],
                    licenses: licensesResponse || [],
                    articles: articlesResponse || []
                });

            } catch (error) {
                console.error("Error al cargar los datos iniciales", error);
            } 
        }
        loadDataForm();
    }, [])

    const handlePageChange = (newPage) => {
        if(newPage > 0 && newPage <= Math.ceil(totalCount / pageSize)){
            dispatch({type: "CHANGE_PAGE", payload: newPage})
        }   
    }

    const handleSearchChange = () => {
        
    }

    const handleFilterChange = () => {
    }

    const handleView = async(id) => {
        console.log("Ver multa con ID (GET): ", id);
        console.log("data initial form: ", masterData)
        try {
            const response = await getFineById(id);
            if(response){
                setModalState({
                    isOpen: true,
                    mode: 'view',
                    fineId: id,
                    fineData: response
                })
            }
            console.log(response);
        } catch (error) {
            console.error("Error al obtener los datos de la multa:", error);
            setError("Error al obtener los datos de la multa." || error.error);
        }
    }

    const handleEdit = async(id) => {
        console.log("Editanto multa: ", id)
        // Verificar si ya se tiene datos cargados para el mismo ID
        if(modalState.fineId === id && modalState.fineData){
            console.log(`Multa ID ${id} ya cargada. Abriendo modal en modo 'edit' sin API call.`);
            setModalState({
                isOpen: true,
                mode: 'edit',
                fineId: id,
                fineData: modalState.fineData
            })
            return;
        }
        
        // Si no hay datos cargados, obtenerlos usando el endpoint
        try {
            const response = await getFineById(id);
            if(response){
                setModalState({
                    isOpen: true,
                    mode: 'edit',
                    fineId: id,
                    fineData: response
                })
            }
        } catch (error) {
            
        }
    }

    const header = ["No. Boleta", "Fecha y hora", "Placa", "Conductor", "Total", "Agente", "Estado de la multa", "Acciones"];
    return(
        <>
            <CustomPage
                title={"Talonarios"}
                placeholder={"Buscar por chapa o boleta"}
                filterQuery={state.filterQuery}
                data_filter={[{value: null, label: 'Todos'}, {value: true, label: 'Activos'}, {value: false, label: 'Inactivos'}]}
                handleFilterChange={handleFilterChange}
                handleSearchChange={handleSearchChange}
                table={
                <Table
                    header={header}
                    data={state.finesData}
                    rowActions={(item) => (
                        // El 'item' ahora incluye item.fine_id
                        <div className="flex gap-2 justify-center">
                            <div className="cursor-pointer"
                                onClick={() => handleView(item.fine_id)}
                                title="Ver"
                            >
                                <GrView/>
                            </div>
                            <div className="cursor-pointer"
                                onClick={() => handleEdit(item.fine_id)}
                                title="Editar"
                            >
                                <AiOutlineEdit/>
                            </div>
                            <div className="cursor-pointer"
                                onClick={() => handleView(item.fine_id)}
                                title="Eliminar"
                            >
                                <MdDeleteOutline/>
                            </div>
                            
                        </div>
                    )}
                    currentPage={state.currentPage}
                    pageSize={state.pageSize}
                    totalCount={state.totalCount}
                    handlePageChange={handlePageChange}
                    isLoading={state.isLoading}
                    error={state.error}
                />
                }
                openModal={statusModal}
            />
            <FormFine
                isOpen={isModalOpen}
                onClose={statusModal}
                data_master={masterData}
            />
            {(modalState.mode === "edit") && (
                <FormFine
                    isOpen={modalState.isOpen}
                    onClose={closeModal}
                    title="Editando multa"
                    data={modalState.fineData}
                    data_master={masterData}
                    create_mode={false}
                />
            )}
            {(modalState.mode === "view") && (
                <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={"Ver multa"}
                children={
                    <form>
                        <div>
                            <label htmlFor="ticket_number">No. Boleta</label>
                            <input type="text" id="ticket_number"  readOnly/>
                        </div>
                        <div>
                            <label htmlFor="ticket_number">No. Boleta</label>
                            <input type="text" id="ticket_number"  readOnly/>
                        </div>
                    </form>
                }
            />
            )}                
        </>
    )
}

export default Fines;