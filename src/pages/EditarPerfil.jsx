import React, { useState } from "react";
import { data, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { updateProfile } from "../api/login.api";

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
          navigate("/login/perfil");
          alert('Perfil actualizado correctamente');
        }
      } catch (error) {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar el perfil');
      }
    });

    const handleImageChange = (e) => {
    const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h2>
      
      <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700">Imagen de perfil</label>
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
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            placeholder="First name"
            name="first_name"
            {...register("first_name", {required: true})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {errors.first_name && <span>This field is required</span>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            {...register("last_name", {required: true})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {errors.last_name && <span>This field is required</span>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
    
export default EditarPerfil