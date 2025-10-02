export const Select = ({title, options=[], onChange, selectedId = "", valueProp="id", idName, key_name=[], error}) => {
    return <div className="flex flex-col w-full">
        <label className="text-gray-600 text-[16px]">{title}</label>
        <select
            onChange={onChange}
            value={selectedId}
            id={idName || valueProp}
            className={`p-2 border ${error ? "border-red-500" : "border-gray-300"} w-full  rounded-md p-2 text-gray-700`}
        >   
           <option value="" disabled>
                --- seleccionar---
            </option> 
            {options.map((option, index) => {
                const optionValue = option[valueProp];
                const optionLabel = key_name.map((name) => option[name]).join(" ");
                
                return (<option 
                    key={optionValue} 
                    value={optionValue}>
                        {optionLabel}
                    </option>)
            })}
        </select>

    </div>
}