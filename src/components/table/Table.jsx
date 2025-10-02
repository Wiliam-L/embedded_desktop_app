import { FaSpinner } from "react-icons/fa6";


export const Table = ({header, data, rowActions, currentPage, pageSize, totalCount, handlePageChange, isLoading, error}) => {
    const hiddenKeys = ['fine_id']; 
    
    return<>
    <div className="p-2 w-full flex flex-col h-[calc(100vh-200px)] bg-gray-50">
        {isLoading && (
            <div className="flex flex-col items-center justify-center align-center w-full h-full p-4 gap-4 text-center text-lg text-red-500">
                <FaSpinner size={24} className="text-primary animate-spin"/>
                <span className="text-primary  p-2 rounded opacity-[90%] animate-bounce  text-center">cargando...</span>
            </div>
        )}
        {error && (
            <div className="flex items-center justify-center align-center w-full h-full p-4 text-center text-lg text-red-500">
                <span className="text-white bg-[#e74c3c] p-2 rounded opacity-[80%]  animate-bounce text-center">Ocurrió un error al cargar los datos.</span>
            </div>
        )}
        {!isLoading && !error && (
            <div class="relative overflow-x-auto p-4">
            <table class="w-full text-sm text-center  text-gray-500 color-gray-900">
                {data.length > 0 && (
                    <thead class="text-xs text-gray-700 uppercase bg-white">
                    <tr>
                        {header.map((title, index) => (
                            <th key={index} scope="col" class="px-6 py-3" textAlign="center">
                                {title}
                            </th>
                        ))
                        }
                    </tr>
                </thead>
                )}
                <tbody>
                    {
                        
                    data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={row.fine_id || rowIndex} className="bg-white border-b  color-gray-900 border-gray-200 text-center hover:bg-[#FFF] hover:text-gray-900">

                                {Object.keys(row).map((key, cellIndex) => {
                                    if (hiddenKeys.includes(key)) {
                                        return null; 
                                    }
                                    
                                    const cell = row[key]; 

                                    let content;

                                    if (cell === "PAGADA" || cell === "Activo") {
                                        content = (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                                                {cell}
                                            </span>
                                        );
                                    } else if (cell === "PENDIENTE" || cell === "Inactivo") {
                                        content = (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                                                {cell}
                                            </span>
                                        );
                                    } else if (cell === "CANCELADA" || cell === "ANULADO") {
                                        content = (
                                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                                                {cell}
                                            </span>
                                        );
                                    } else {
                                        content = cell;
                                    }
                                    
                                    return (
                                        <td key={cellIndex} className="px-6 py-4 white-space-nowrap">
                                            {content}
                                        </td>
                                    );
                                })}

                               
                                {rowActions && (
                                    <td className="px-6 py-4 white-space-nowrap">
                                        {rowActions(row)}
                                    </td>
                                )}

                            </tr>
                        ))
                    ) : (
                        <tr>
                            {/* ¡IMPORTANTE! El colSpan debe ser igual al total de columnas del header */}
                            <td colSpan={header.length} className="h-10 px-6 text-center">
                                No hay datos disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        )}
        
    </div>
    {/**Páginación */}
    {!isLoading && !error && data.length > 0 && (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between  pr-4 pl-4 pt-4 bg-gray-50" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Mostrando <span className="font-semibold text-gray-900">{(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalCount)}</span> de <span className="font-semibold text-gray-900">{totalCount}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-10">
        <li>
            <button
            onClick={() => handlePageChange(currentPage -1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <span>Anterior</span>
        </button>
            </li>
            <li>
            <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(totalCount / pageSize)}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <span>Siguiente</span>
        </button>
            </li>
        </ul>
        
    </nav> 
        )}
    

    </>
}