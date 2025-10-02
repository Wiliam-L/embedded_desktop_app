import { useEffect, useState } from "react"
import {toast, Toaster} from "react-hot-toast"
import { Button } from "../../components/Button"
import { GroupBox } from "../../components/GroupBox"
import { Input } from "../../components/Input"
import { Modal } from "../../components/Modal"
import { Select } from "../../components/Select"

import { FineSchema } from "../../schema/schema"
import { createFine } from "../../api/fines"



// Definición de la estructura inicial del estado
const INITIAL_STATE = {
    // Inicializar con objetos vacíos para evitar 'Cannot read properties of undefined'
    fine: {},
    vehicle: {},
    driver: {}
};



export const FormFine = ({ isOpen, onClose, title = "Nueva multa", data = null, data_master = { colors: [], brands: [], types: [], licenses: [], articles: [] }, create_mode = true }) => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState(null);

    // Función de utilidad para convertir a número o cadena vacía si es un ID numérico
    const parseValue = (id, value) => {
        const numericIds = [
            "infringement_article_id", "vehicle_color_id", "vehicle_brand_id",
            "vehicle_type_id", "driver_license_classification_id", "ticket_number"
        ];
        
        if(id=="total"){
            return value === "" ? "" : parseFloat(value, 2);
        }

        // 'total' y 'ticket_number' son de tipo="number" y se pueden manejar como string o usar Number()
        if (numericIds.includes(id)) {
            return value === "" ? "" : parseInt(value, 10);
        }
        return value;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        let subObjectKey = "fine";
        
        if (id.startsWith("driver_")) {
            subObjectKey = "driver";
        } else if (id.startsWith("vehicle_") || id === "circulation_card_number") {
            subObjectKey = "vehicle";
        }
        
        const newValue = parseValue(id, value);

        setFormData(prevData => ({
            ...prevData,
            [subObjectKey]: {
                ...prevData[subObjectKey], 
                [id]: newValue  
            }
        }));

        // Limpiar error solo del campo que cambio su estado
        setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[`${subObjectKey}.${id}`];
            delete newErrors[id];
            return newErrors;
        })

    }

    useEffect(() => {
        if (create_mode) {
            console.log("formulario modo creación");
            setFormData(INITIAL_STATE); 
        } else if (data) {
            console.log("cargando datos para edición: ", data);
            
            setFormData({
                // fine
                "fine": {
                    ticket_number: data.ticket_number || "",
                    place_of_infringement: data.place_of_infringement || "",
                    date_and_time_of_the_violation: data.date_and_time_of_the_violation ? data.date_and_time_of_the_violation.replace(/\.000Z/g, '') : "",
                    infringement_article_id: data.infringement_article_id || "", // Usar ""
                    total: data.total || "", 
                    fine_image_url: data.fine_image_url || "",
                    status: data.status || "",
                    plate_number: data['Agent.plate_number'] || ""
                },
                // vehicle
                "vehicle": {
                    vehicle_plate_number: data['Vehicle.vehicle_plate_number'] || "",
                    circulation_card_number: data['Vehicle.circulation_card_number'] || "",
                    vehicle_color_id: data['Vehicle.VehicleColor.vehicle_color_id'] || "", // Usar ""
                    vehicle_brand_id: data['Vehicle.VehicleBrand.vehicle_brand_id'] || "", // Usar ""
                    vehicle_type_id: data['Vehicle.VehicleType.vehicle_type_id'] || "",  // Usar ""
                },
                // driver
                "driver": {
                    driver_first_name: data['Driver.first_name'] || "",
                    driver_last_name: data['Driver.last_name'] || "",
                    driver_home_address: data['Driver.home_address'] || "",
                    driver_license_number: data['Driver.license_number'] || "",
                    driver_license_classification_id: data['Driver.license_classification_id'] || "", // Usar ""
                }
            });
        }
        
    }, [create_mode, data]); 

    // Obtener los datos del formulario 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true)
        
        // Validar el formData con el esquema 
        try {
            const validateSchema = await FineSchema.validate(formData, { abortEarly: false });
            setErrors({});
            console.log("Formulario válido");
            if(validateSchema){
                const fineResponse = await createFine(formData);
                toast.success(fineResponse["message"] || "Multa creada correctamente");
                onClose();
            }

            
        } catch (error) {
            if(error.inner){
                const formErrors = {};
                error.inner.forEach((e) => {
                    formErrors[e.path] = e.message;
                });
                setErrors(formErrors);
                console.log("Errores: ", formErrors);
            }else{
                toast.error(error["error"]  || "Ocurrio un error inesperado, Intenta nuevamente.")
            }
        }
        
    }

    return<>
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white w-full gap-4 pr-6 pl-6 overflow-y-auto">
            
            <GroupBox title="Del Vehículo">
                <div className="flex flex-col md:flex-row w-full gap-2">
                    <div className="flex flex-col w-full md:w-[20%]"> 
                        <Select 
                            title="Color" 
                            options={data_master.colors} 
                            valueProp="vehicle_color_id"
                            selectedId={formData.vehicle.vehicle_color_id || ""}
                            onChange={handleChange}
                            key_name={["vehicle_color_name"]}
                            error={errors["vehicle.vehicle_color_id"]}
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-[20%]">
                        <Select
                            title="Marca" 
                            options={data_master.brands} 
                            onChange={handleChange}
                            key_name={["vehicle_brand_name"]}  
                            valueProp="vehicle_brand_id"
                            selectedId={formData.vehicle.vehicle_brand_id || ""}
                            error={errors["vehicle.vehicle_brand_id"]}
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-[20%]">
                        <Select
                            title="Tipo" 
                            options={data_master.types} 
                            onChange={handleChange}
                            key_name={["vehicle_type_name"]}  
                            valueProp="vehicle_type_id"
                            selectedId={formData.vehicle.vehicle_type_id || ""}
                            error={errors["vehicle.vehicle_type_id"]}
                        />
                    </div>

                    
                    <Input
                        title="No. de Placa" 
                        type="text" 
                        id="vehicle_plate_number" 
                        value={formData.vehicle.vehicle_plate_number || ""}
                        onChange={handleChange}
                        error={errors["vehicle.vehicle_plate_number"]}
                    />

                    
                    <Input
                        title="Tarjeta de Circulación" 
                        type="text" 
                        id="circulation_card_number" 
                        value={formData.vehicle.circulation_card_number || ""}
                        onChange={handleChange}
                        error={errors["vehicle.circulation_card_number"]}
                    />
                    
                </div>
            </GroupBox>
            <GroupBox title="Del Infractor"> 
                <div className="flex flex-col gap-2">
                <Input 
                    title="Nombres" 
                    type="text" 
                    id="driver_first_name" 
                    value={formData.driver.driver_first_name || ""}
                    onChange={handleChange}  
                    width="w-full"                  
                />
                <Input 
                    title="Apellidos" 
                    type="text" 
                    id="driver_last_name" 
                    value={formData.driver.driver_last_name || ""}
                    onChange={handleChange}
                    width="w-full"                  
                />
                <Input 
                    title="Dirección domiciliar" 
                    type="text" 
                    id="driver_home_address" 
                    value={formData.driver.driver_home_address || ""}
                    onChange={handleChange}
                    width="w-full"                  
                />
                    
                    <div className="flex flex-col md:flex-row w-full gap-2">
                        <div className="flex flex-col w-full md:w-[50%] gap-2">
                            <Input 
                                title="No. Licencia de Conducir" 
                                type="text" 
                                id="driver_license_number" 
                                value={formData.driver.driver_license_number || ""}
                                onChange={handleChange}
                                width="w-full"                  
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-[50%] gap-2">
                            <Select
                                title="Clasificación de la licencia" 
                                options={data_master.licenses} 
                                onChange={handleChange}
                                key_name={["classification_name", "description"]}  
                                valueProp="classification_id"
                                idName="driver_license_classification_id"
                                selectedId={formData.driver.driver_license_classification_id || ""}
                                width="w-full"                  
                            />
                        </div>
                    </div>
                </div>
            </GroupBox>
            {/**De la infracción */}
            <GroupBox title="De la Infracción">
                <div className="flex flex-col w-full gap-2">
                    <Input 
                        title="Número de la boleta" 
                        type="number" 
                        id="ticket_number"
                        value={formData.fine.ticket_number || ""}
                        min={1} 
                        double={false} 
                        onChange={handleChange}
                        error={errors["fine.ticket_number"]}
                        width="w-full"                  
                    />
                    <Input 
                        title="Fecha de la infracción" 
                        type="datetime-local" 
                        id="date_and_time_of_the_violation"
                        value={formData.fine.date_and_time_of_the_violation || ""}
                        onChange={handleChange}
                        error={errors["fine.date_and_time_of_the_violation"]}
                        width="w-full"                  
                    />
                    <Input
                        title="Lugar de la infracción"
                        type="text"
                        id="place_of_infringement"
                        value={formData.fine.place_of_infringement || ""}
                        onChange={handleChange}
                        error={errors["fine.place_of_infringement"]}
                        width="w-full"                  
                    />
                    
                    <Select
                        title="Artículo sancionador" 
                        options={data_master.articles} 
                        onChange={handleChange}
                        valueProp="article_id"
                        idName="infringement_article_id"
                        key_name={["article_number", "article_description", "default_fine_amount"]} 
                        selectedId={formData.fine.infringement_article_id || ""}
                        error={errors["fine.infringement_article_id"]}
                    />
                    <Input 
                        title="Total" 
                        type="number" 
                        inputMode="decimal" 
                        id="total"
                        value={formData.fine.total || ""}
                        min={100} 
                        double={true} 
                        onChange={handleChange}
                        error={errors["fine.total"]}
                        width="w-full"                  
                    />
                    <Input 
                        title="Chapa del Agente" 
                        type="text" 
                        id="plate_number"
                        value={formData.fine.plate_number || ""}
                        onChange={handleChange}
                        width="w-full"                  
                    />
                    </div>
            </GroupBox>
            <GroupBox title="Estado de la multa">
                <div className="flex flex-col w-full gap-2">
                    <Select
                        title="Confirmar estado" 
                        // Corregida la estructura de options
                        options={[{status: "Pendiente"}, {status: "Activo"}, {status: "Inactivo"}]} 
                        onChange={handleChange}
                        valueProp="status"
                        selectedId={formData.fine.status || ""}
                        key_name={["status"]}  
                        error={errors["fine.status"]}
                    />
                </div>
            </GroupBox>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center pb-4">  
                <Button variant="success" type="submit" width="w-[30%]" label="Guardar"/>
                <Button variant="danger" type="button" onClick={onClose} width="w-[30%]" label="Cancelar"/>
            </div>
            </form>
        </Modal>
        <Toaster position="top-center" />
    </>
}