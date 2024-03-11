
import Navbar from './component/common/Navbar';
import Login from './component/user/Login';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from './component/user/Signup'
import Home from './component/common/Home'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './config/firebase.config'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsername, loginFail } from './store/userSlice'
import Addproduct from './component/products/Addproduct';
import { Spin } from "antd";
import axios from 'axios';
import Placeorder from './component/products/Placeorder';
import { getImageUrl } from './service/firebase-service';
import { updateProduct } from './store/productSlice';

function App() {
  const disPatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      axios.post(`${import.meta.env.VITE_LOCAL_URL}api/user/user`, {
        currentUser: currentUser?.uid
      })
        .then((response) => { disPatch(updateUsername(response.data)) })
        .catch((err) => {
          disPatch(loginFail())
        })

    })
  }, [])

  const userName = useSelector((state) => {
    return state?.user?.userName
  })

  function authentication(component) {
    return userName != "fail" ? component : <Navigate to={"/login"} />
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_LOCAL_URL}api/products/products`).then((response) => {
      updateProductListWithImages(response.data)
    })
  }, []);

  const updateProductListWithImages = async (productList) => {
    const updatedProductList = [];

    for (const product of productList) {
      try {
        await getImageUrl(product.image_path).then((imageUrl) => {
          const updatedProduct = { ...product, imageUrl };
          updatedProductList.push(updatedProduct);
        })
      } catch (error) {
        console.error('Error updating product with image URL:', error);
      }
    }
    disPatch(updateProduct(updatedProductList))
  };

  return (
    <div>
      {userName ? <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={authentication(<Home />)} />
          <Route path='/allproducts' element={authentication(<Home />)} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/add-product' element={authentication(<Addproduct />)} />
          <Route path='/placeorder' element={authentication(<Placeorder />)} />
        </Routes>
      </BrowserRouter> :
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <Spin size="large" />
        </div>
      }
    </div>
  )
}

export default App
