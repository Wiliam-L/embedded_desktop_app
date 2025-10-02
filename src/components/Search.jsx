
export const Search = ({placeholder, value, onChange}) => {
    return(
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{width: '350px'}}
            className="border border-gray-300 rounded-lg p-2 focus:border-primary focus:outline-none"
        />
    );
}