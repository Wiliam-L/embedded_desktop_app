import { Button } from "../../components/Button"
import { GroupBox } from "../../components/GroupBox"
import { Input } from "../../components/Input"
import { Modal } from "../../components/Modal"
import { Select } from "../../components/Select"

export const FormTicket = ({isOpen, onClose }) => {
    const handleSelecChange = (e) => {
        console.log(e.target.value);
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Talonario">
            <GroupBox title="Del Talonario">
                <div className="flex gap-4 w-full pb-4">
                    <div className="flex flex-col w-[50%]">
                        <Input title="Inicio" type="number" placeholder={"1"} min={1} max={1000000} double={false} onChange={handleSelecChange}/>
                    </div>
                    <div className="flex flex-col w-[50%]">
                        <Input title="Fin" type="number" placeholder={"2"} min={2} max={1000000} double={false} onChange={handleSelecChange}/>
                    </div>
                </div>
                <Select title="Asignar agente" options={[{"agent": "wlopez - 1"}]} onChange={handleSelecChange}/>
                <Select 
                    title="Estado" 
                    options={[{"status": "Activo", "status": "Inactivo"}]} 
                    onChange={handleSelecChange}
                    key_name="status"    
                />
            </GroupBox>
            <div className="flex gap-4 justify-center w-[50%] pt-4">    
                <Button title="Guardar" onClick={onClose} width="50%" color="#2e4454" hoverColor="#68BA6C"/>
                <Button title="Cancelar" onClick={onClose} width="50%" color="#3d3d3d" hoverColor="#68BA6C"/>
            </div>
        </Modal>
    )
}