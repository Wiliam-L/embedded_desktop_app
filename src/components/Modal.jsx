import { IoMdClose } from "react-icons/io";


export const Modal = ({isOpen, onClose, children, title}) => {
    if(!isOpen) return null;

    return (
        <div className="flex relative inset-0 z-50" 
            onClick={onClose}
        >
            <div className="flex flex-col justify-center items-center fixed inset-0 bg-secondary bg-[rgba(0,0,0,0.5)]"
                                    onClick={(e) => e.stopPropagation()}

            >
            {/**Modal*/}
                <div className="flex justify-center items-center p-4 w-[85%] bg-header text-white rounded-t-lg"
                >
                    <div className="border rounded-full  hover:border-white-900 ">
                        <IoMdClose size={24} color="white" onClick={onClose} className="cursor-pointer" aria-placeholder="Cerrar" />
                        
                    </div>
                    <div className="flex-1 flex items-center justify-center text-white">
                        <h2 className="text-2xl font-bold">{title}</h2>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center relative bg-white  pt-4 w-[85%] h-[85vh] rounded-b-lg"
                >
                    {children}
                </div>
            </div>
        </div>
    )
}