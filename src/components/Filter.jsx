export const Filter = ({data, onChange}) => {
    return(
        // Retornar un combobox for html
        <select onChange={onChange} className="p-2 border border-gray-300 rounded">
            {
                data.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))
            }
            
        </select>
    );
}