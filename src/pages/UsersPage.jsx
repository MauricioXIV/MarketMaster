import React from "react";
import UsersTable from "../components/UsersTable"
import logo from "../images/carrote.jpg"

const UsersPage = () => {
    return( 
        <div className="flex flex-wrap justify-center w-full ">
        <div className="w-full border border-b-4 text-2xl flex flex-wrap items-center border-e-gray-300  shadow-xl justify-between xs:justify-center lg:justify-between">
        <p className="pl-6 font-mono lg:w-[27%] md:w-[35%] sm:w-[40%] xs:w-full">Bienvenido a Market Master. Tu tienda online de <b>confianza</b></p>
        <img src={logo} className="h-32 w-32 mr-28 xs:w-full xs:mr-0 max-w-[200px] lg:mr-12"/>
        </div>
        <UsersTable />
        </div>
    )
}

export default UsersPage