import React from "react";

const Users = ({ user }) => {

    return (
    <div key={user.email} className="text-white border-4 w-full mb-4 rounded-xl">
        <div><h1 className="text-3xl">{user.first_name} {user.last_name}</h1></div>
        <div>{user.email}</div>
        {
            user.is_staff == true ? <div className="text-lime-400">Hola staff</div> :
            <div className="text-lime-400">Hola usuario normal</div>
        }
    </div>
    )
}

export default Users