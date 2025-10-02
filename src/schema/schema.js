import * as yup from 'yup';

const PLATE_REGEX_GT = /^[A-Z0-9]{3}[-\s]?[A-Z0-9]{3}$/i;

const FineSchema = yup.object().shape({
    fine: yup.object().shape({
        ticket_number: yup.number()
            .required("El número de boleta es requerido.")
            .min(1, "Debe ser un número positivo.")
            .typeError("El número de boleta debe ser numérico."),
        place_of_infringement: yup.string().required("Lugar de la infracción es requerido.").max(255),
        date_and_time_of_the_violation: yup.date()
            .required("Fecha y hora es requerida.")
            .min(new Date("2016-01-01"), "La fecha y hora no puede ser menor a la fecha actual.")
            .max(new Date(), "La fecha y hora no puede ser mayor a la fecha actual.")
            .typeError("Formato de fecha y hora inválido."),
        infringement_article_id: yup.number()
            .required("Debe seleccionar un artículo.")
            .typeError("Artículo de infracción inválido."),
        total: yup.number()
            .required("El total es requerido.")
            .min(100, "El total mínimo es 100.")
            .typeError("El total debe ser numérico."),
        plate_number: yup.string().optional(),
        status: yup.string().required("El estado es requerido."),
    }),
    vehicle: yup.object().shape({
        vehicle_plate_number: yup.string().required("Placa del vehículo es requerida.").max(20),
        circulation_card_number: yup.string().max(50),
        vehicle_color_id: yup.number().required("El color es requerido.").typeError("Color inválido."),
        vehicle_brand_id: yup.number().required("La marca es requerida.").typeError("Marca inválida."),
        vehicle_type_id: yup.number().required("El tipo es requerido.").typeError("Tipo inválido."),
    }),
    driver: yup.object().shape({
        driver_first_name: yup.string().optional(),
        driver_last_name: yup.string().optional(),
        driver_home_address: yup.string().optional(),
        driver_license_number: yup.string().optional(),
        driver_license_classification_id: yup.number().optional(),
    }),
});


const personnelSchema = yup.object({
    
})


const TicketSchema = yup.object({
    
})

export {
    FineSchema,
    personnelSchema,
    TicketSchema
}