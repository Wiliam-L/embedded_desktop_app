import { useState } from "react"
import Header from "./common/Header";
import { Search } from "./Search";
import { Filter } from "./Filter";
import { FaPlus } from "react-icons/fa";


export const CustomPage = ({title, placeholder, filterQuery, data_filter, handleFilterChange, handleSearchChange, table, openModal}) => {
    return (
        <>
            <Header title={title}/>
            <div className="pr-5 pl-5 p-4 flex justify-between w-full gap-4">
                <div className="flex gap-4">
                    <Search placeholder={placeholder} onChange={handleSearchChange}/>
                    <Filter data={data_filter} onChange={handleFilterChange}/>
                </div>
                <div className="flex items-center">                    
                    <button className="p-2  flex align-center justify-center bg-[#4CAF50] gap-2 rounded-full hover:bg-[#4CAF50]/80 transition-all duration-300 w-[75px]"
                        onClick={openModal}
                    >
                        <FaPlus size={24} className="text-white"/>
                    </button>
                </div>
            </div> 
            {table}
        </>
    )
}