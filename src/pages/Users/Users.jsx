import { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import { getPersonnel } from "../../api/users";
import { CustomPage } from "../../components/CustomPage";


const User = () => {
    const [personnelData, setPersonnelData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('all');

    // Estados de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const mapPersonnelData = (data) => {
        return data.map(item => ({
            personnel_code: item.personnel_code || 'N/A',
            plate_number: item.plate_number || 'N/A',
            first_name: `${item.first_name} ${item.first_last_name}`,
            email: item.email,
            cellphone: item.cellphone || 'N/A',
            identification_number: item.identification_number || 'N/A',
            rol_name: item.User?.Rol?.rol_name || 'N/A',
            status: item.User?.status ? 'Activo' : 'Inactivo',
        }));
    };

        useEffect(() => {
            const fetchAllData = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const offset = (currentPage - 1)* pageSize;
                    const response = await getPersonnel({limit: pageSize, offset: offset});
                    setPersonnelData(mapPersonnelData(response.rows));
                    setTotalCount(response.count);

                } catch (err) {
                    setError("Error al cargar los datos del personal.");
                    console.error("Failed to fetch data:", err);
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchAllData();
        }, [currentPage, pageSize]);
    
        const handlePageChange = (newPage) => {
            if(newPage > 0 && newPage <= Math.ceil(totalCount / pageSize)){
                setCurrentPage(newPage);
            }
        }

        const header = ["Código", "No. Chapa", "Nombre", "Correo", "Telefono", "No. Identificación", "Rol", "Estado"]

        const handleSearchChange = (event) => {
            setSearchQuery(event.target.value);
            const searchDelay = 500; // milisegundos
            const searchTimeoutId = setTimeout(() => {
                setSearchQuery(event.target.value);
                clearTimeout(searchTimeoutId);
            }, searchDelay);
            
        }
        const handleFilterChange = (event) => {
            setFilterQuery(event.target.value);
        }
    return <>
        <CustomPage
            title={"Talonarios"}
            placeholder={"Buscar por chapa o boleta"}
            filterQuery={filterQuery}
            data_filter={[{value: null, label: 'Todos'}, {value: true, label: 'Activos'}, {value: false, label: 'Inactivos'}]}
            handleFilterChange={handleFilterChange}
            handleSearchChange={handleSearchChange}
            table={
                <Table 
                    header={header} 
                    data={personnelData} 
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    handlePageChange={handlePageChange}
                    isLoading={isLoading}
                    error={error}
                />
            }
        />
    </>
}

export default User;