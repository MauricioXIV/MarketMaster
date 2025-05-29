import React from "react";
import UsersTable from "../components/UsersTable"
import logo from "../images/carrote.jpg"

const UsersPage = () => {
    return( 
        <div className="flex flex-wrap justify-center w-full sm:h-screen sm:items-center 
        sm:mr-4 sm:justify-between">
        <div className="xs:w-full border border-b-2 text-2xl flex flex-wrap items-center justify-center text-center border-gray-300 shadow-lg xs:py-2 
        xs:px-3 xs:justify-center lg:justify-between sm:hidden">
        <div className="font-mono xs:w-full lg:w-[27%] md:w-[35%] sm:w-[40%]">Tu tienda online de <b>confianza</b></div>
        <img src={logo} className="h-32 w-32 mr-28 xs:w-full xs:mr-0 max-w-[200px] lg:mr-12 xs:hidden"/>
        </div>
        <UsersTable />
        </div>
    )
}

export default UsersPage