export const Card = ({ title, value=null, subText, items, icon, color, color_value="#E5E7EB" }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center border-l-4 hover:shadow-lg" style={{ borderColor: color }}>
            <div className={`flex items-center text-primary ${value ? 'mb-5' : 'mb-2'}`}>
                {icon}
                <h2 className="text-lg font-semibold ml-2">{title}</h2>
            </div>

            {/**Muestrar el valor principal si existe */}
            {value && <p className="text-3xl font-bold mt-2" style={{ color: color_value }}>{value}</p>}

            {/**Muestrar los items si existen */}
            {items ? <ul className="flex flex-col justify-between">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-8 justify-between">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="text-gray-900 font-semibold">{item.value}</span>
                    </li>
                ))}
            </ul> : null}
            {subText && <p className={`text-sm text-gray-400 ${value ? 'mt-5' : 'mt-2'}`}>{subText}</p>}

        </div>
    );
};