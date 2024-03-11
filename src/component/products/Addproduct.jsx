import React, { useState } from 'react'
import { uploadFileOnFirebase } from '../../service/firebase-service';

import axios from "axios"

export default function Addproduct() {

  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormdata] = useState({});

  const handleChange = (e) => {
    var { id, value } = e.target
    setFormdata({ ...formData, [id]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  // const saveProduct = async () => {

  //   const imagePath = await uploadFileOnFirebase(productImage)
  //   // formData.imagePath = imagePath?.metadata?.fullPath

  //   setFormdata({ ...formData, "imagePath": imagePath?.metadata?.fullPath })

  //   const response = await axios.post(`${import.meta.env.VITE_LOCAL_URL}api/products/saveproduct`, formData)
  //   console.log(formData);
  //   return response

  // }

  const saveProduct = async () => {
    if (!productImage) {
      console.log("Please select an image");
      return;
    }

    try {
      const imagePath = await uploadFileOnFirebase(productImage);
      const updatedFormData = { ...formData, imagePath: imagePath.metadata.fullPath };
      setFormdata(updatedFormData);

      const response = await axios.post(`${import.meta.env.VITE_LOCAL_URL}api/products/saveproduct`, updatedFormData)
      console.log(response)
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="modal-container bg-white w-96 mx-auto mt-24 p-4 rounded shadow mb-6">
      <h3 className="text-lg text-gray-800 font-bold text-center mb-3">Product Upload</h3>
      <form>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />

        <label htmlFor="description" className="block mt-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        ></textarea>

        <label htmlFor="price" className="block mt-2 text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />

        <label htmlFor="image" className="block mt-2 text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 p-2 w-full border rounded-md"
        />

        {previewImage && (
          <div>
            <label htmlFor="imagePreview" className="block mt-2 text-sm font-medium text-gray-700">
              Preview
            </label>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full h-auto mb-4 rounded"
            />
          </div>
        )}

        <div className="flex items-center justify-center">
          <button
            type="button"
            className="mt-4 bg-blue-500 text-white p-2 rounded-md text-center w-full"
            onClick={saveProduct}
          >
            Upload
          </button>
        </div>
      </form>

    </div>
  );
}
