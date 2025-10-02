export const Input = ({title, type, placeholder, min, max, double, inputMode, value=null, id=null, onChange, error, width = "w-[20%]"}) => {
    return <div className={`flex flex-col w-full md:${width}`}>
        <label className="text-gray-600 text-[16px]">{title}</label>
        <input className="bg-white p-2 rounded-lg border focus:border-[#3d3d3d] text-gray-600 "
            placeholder={placeholder}
            type={type}
            min={min}
            max={max}
            double={double}
            inputMode={inputMode}
            value={value}
            id={id}
            onChange={onChange}
        />    {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
}