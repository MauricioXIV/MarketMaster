import { useEffect, useState } from 'react';
import { getUser } from '../api/login.api';
import { useNavigate } from 'react-router-dom'
import avatar from "../images/avatar.jpg"
import flecha from "../images/flecha.png"

const PerfilPage = () => {
  
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    async function solicitarPerfil() {
      const res = await getUser()
      console.log(res.data)
      setUserData(res.data)
    }
    solicitarPerfil()
  }, [])

  return (
    <div className="xs:w-full mt-[55px] font-sans flex flex-wrap p-2 pt-0 diminuto:max-w-[520px] max-h-[340px]">
      <div className="relative xs:w-full xs:text:lg diminuto:text-xl text-black my-2 diminuto:mb-6 justify-center font-semibold text-lg"><div className="absolute w-full flex items-center cursor-pointer z-10"><img onClick={() => navigate(-1)} src={flecha} alt="back" className="relative xs:w-7 xs:h-7 flex items-center justify-center" ></img></div><div className="absolute xs:w-full flex justify-center items-center z-0">Mi Perfil</div></div>
      <div className="flex items-center my-6">
        <img 
          src={`http://backend-mm-production.up.railway.app/${userData.image}`} 
          alt="User avatar" 
          className="xs:w-16 xs:h-16 diminuto:w-24 diminuto:h-24 rounded-full object-cover border-[3px] border-gray-100"
        />
        <h2 className="xs:text-xl diminuto:text-2xl font-semibold text-gray-800 pl-2">
          {userData.first_name} {userData.last_name}
        </h2>
      </div>
      
      <div className='xs:w-full'>
        <div className=" pb-4 border-b border-gray-200">
          <span className="font-bold text-gray-600 mr-2 diminuto:text-lg">Email:</span>
          <span className="text-gray-800 diminuto:text-lg">{userData.email}</span>
        </div>
        
        <div className="py-4 border-b border-gray-200">
          <span className="font-bold text-gray-600 mr-2 diminuto:text-lg">MM Coins:</span>
          <span className="text-amber-600 font-bold diminuto:text-lg">{userData.coins}</span>
        </div>
        <button
          onClick={() => navigate('/login/perfil/editar')}
          className="w-full bg-blue-600 text-white mt-6 p-2 px-4 rounded-lg diminuto:min-h-[45.6px] hover:bg-blue-700 transition xs:text-sm diminuto:text-lg"
          >
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default PerfilPage;