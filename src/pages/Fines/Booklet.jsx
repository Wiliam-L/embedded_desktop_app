import { useEffect, useState } from "react"
import { Table } from "../../components/table/Table"
import { CustomPage } from "../../components/CustomPage";
import { getTicketBooklet } from "../../api/fines";
import { Modal } from "../../components/Modal";
import { FormTicket } from "./FormTicket";

export const Booklet = () => {
    const [ticketData, setTicketData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    let [searchQuery, setSearchQuery] = useState('');
    let [filterQuery, setFilterQuery] = useState('');

    // parametros para páginación
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    // parametros para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const statusModal = () => setIsModalOpen(!isModalOpen);

    const mapTicketData = (data) => {
        return data.map(item => ({
            current_ticket: item.current_ticked_number, 
            range: `${item.start_ticket_number} - ${item.end_ticket_number}`,
            agent: item.AssignedPersonnel?.first_name? `${item.AssignedPersonnel.first_name} ${item.AssignedPersonnel.first_last_name}` : 'N/A',
            status: item.is_active ? "Activo" : "Inactivo"
        }))
    }

    useEffect(() => {
        const getTicket = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const offset = (currentPage - 1) * pageSize;
                const response = await getTicketBooklet({
                    limit: pageSize, 
                    offset: offset,
                    search: searchQuery,
                    filter: filterQuery
                });
                console.log(response)
                setTicketData(mapTicketData(response.rows));
                setTotalCount(response.count);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos del talonario:", error);
                setError(error);
            }
        }
        getTicket();

    }, [currentPage, pageSize, searchQuery, filterQuery]) 

    const handlePageChange = (newPage) => {
        if(newPage > 0 && newPage <= Math.ceil(totalCount / pageSize)){
            setCurrentPage(newPage);
        }   
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    }

    const header_data = ["No. Boleta en uso", "Rango Talonario", "Agente Asignado", "Estado talonario"]
    
    const handleFilterChange = (e) => {
        // obtener el valor del filterchange?
        setFilterQuery(e.target.value);
        setCurrentPage(1);
    }
    return (
        <>
        <CustomPage
            title={"Talonarios"}
            placeholder={"Buscar por chapa o boleta"}
            filterQuery={filterQuery}
            data_filter={[{value: null, label: 'Todos'}, {value: true, label: 'Activos'}, {value: false, label: 'Inactivos'}]}
            handleFilterChange={handleFilterChange}
            handleSearchChange={handleSearchChange}
            table={
               <Table
                   header={header_data}
                   data={ticketData}
                   currentPage={currentPage}
                   pageSize={pageSize}
                   totalCount={totalCount}
                   handlePageChange={handlePageChange}
                   isLoading={isLoading}
                   error={error}
               />
            }
            openModal={statusModal}
        />
       <FormTicket 
            isOpen={isModalOpen}
            onClose={statusModal}
       />
        
        </>
    )
}