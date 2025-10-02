export const GroupBox = ({title, children, width="80%", height="auto"}) => {
    return <> 
        <fieldset className="flex flex-col border p-4  border-[#E0E0E0] rounded-lg"
            style={{ width: width, height: height }}
        >
            <legend className="text-[#2e4454] text-[18px]">{title}</legend>
            {children}
        </fieldset>
    </>
}