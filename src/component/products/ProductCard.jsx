import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../../store/userSlice';

export default function ProductCard({ product }) {
    const [isLoading, setIsLoading] = useState(true);

    const disPatch = useDispatch()

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const userName = useSelector((state) => {
        return state?.user?.alldata?.uid
    })

    const addCart = (product) => {
        axios.post(`${import.meta.env.VITE_LOCAL_URL}api/user/updateCart`, {
            product_id: product.id,
            userId: userName
        }).then((response) => { disPatch(updateUsername(response.data)) })
    }

    const removeCart = (product) => {
        axios.post(`${import.meta.env.VITE_LOCAL_URL}api/user/removeCart`, {
            product_id: product.id,
            userId: userName
        }).then((response) => { disPatch(updateUsername(response.data)) })
    }
    const cartProducts = useSelector((state) => {
        return (state?.user?.alldata?.cardIds).includes(product.id)
    })


    return (
        <div className="relative max-w-xs rounded overflow-hidden shadow-lg">
            <img className="w-80 h-60" src={product.imageUrl} alt="Product" onLoad={handleImageLoad} style={{ display: isLoading ? 'none' : 'block' }} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <p className="text-gray-700 text-base">
                    {product.description}
                </p>
            </div>
            <div className="flex items-center justify-between px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ${product.price}
                </span>
                {
                    cartProducts ?
                        <button
                            className={"text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-600"}
                            onClick={() => removeCart(product)}
                        >
                            Remove
                        </button>
                        :
                        <button
                            className={"text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"}
                            onClick={() => addCart(product)}
                        >Add to Cart
                        </button>
                }
            </div>
        </div >
    );
}
