import React, { useState } from "react";
import { data, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { updateProfile } from "../api/login.api";
import flecha from "../images/flecha.png"
import toast from "react-hot-toast";

const EditarPerfil = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const [preview, setPreview] = useState('')

    const navigate = useNavigate()


    const prepareFormData = (data) => {
      const formData = new FormData();
      
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      
      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }
      
      return formData;
    };

    const onSubmit = handleSubmit(async (data) => {
      try {
        const formData = prepareFormData(data);
        console.log(formData)
        const res = await updateProfile(formData);
        
        if (res) {
          toast.success("Perfil editado correctamente", {
            position: "bottom-right",
            style : {
                background: "#101010",
                color: "#fff",
                fontSize: "15px"
            }
        })
          navigate("/login/perfil");
        }
      } catch (error) {
        toast.error("Error en la edición del perfil", {
        position: "bottom-right",
        style: {
            background: "#101010",
            color: "#fff",
            fontSize: "15px"
        }
    });
        console.error('Error al actualizar:', error);
      }
    });

    const handleImageChange = (e) => {
    const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
    <div className="xs:w-full mt-[55px] p-2 peque:max-w-[520px] peque:max-h-[340px] pt-0">
      <div className="relative xs:w-full xs:text:lg diminuto:text-xl text-black pt-2 pb-8 diminuto:pb-10 justify-center font-semibold text-lg"><div className="absolute w-full flex items-center cursor-pointer z-10"><img onClick={() => navigate(-1)} src={flecha} alt="back" className="relative xs:w-7 xs:h-7 flex items-center justify-center" ></img></div><div className="absolute xs:w-full flex justify-center items-center z-0 ">Editar perfil</div></div>
      
      <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700 diminuto:text-lg">Imagen de perfil</label>
          <div className="mt-2 flex items-center">
            {preview && (
              <img 
                src={preview} 
                alt="Preview" 
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              name="image"
              {...register("image", FileList[0], {required: true})}
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          {errors.image && <span>This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 diminuto:text-base">Nombre</label>
          <input
            type="text"
            placeholder="First name"
            name="first_name"
            {...register("first_name", {required: true})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm diminuto:text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {errors.first_name && <span>This field is required</span>}

        <div>
          <label className="block text-sm font-medium text-gray-700 diminuto:text-base">Apellido</label>
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            {...register("last_name", {required: true})}
            className="mt-1 block w-full px-3 py-4 border border-gray-300 diminuto:text-base rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {errors.last_name && <span>This field is required</span>}

        <button
          type="submit"
          className="w-full flex justify-center p-2 px-4 mt-6 border border-transparent rounded-lg shadow-sm 
          text-sm diminuto:text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
    
export default EditarPerfil