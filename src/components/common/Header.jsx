// crear y portar header y recive el title según la sección


const Header = ({title}) => (
    <div className="p-2 bg-header w-full flex justify-center">    
        <header className="mb-2 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white text-center">{title}</h1>
        </header>
    </div>
)

export default Header;
