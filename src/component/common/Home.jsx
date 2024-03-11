
import React, { useEffect, useState } from 'react'
import ProductCard from '../products/ProductCard';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {

    const productlist = useSelector((state) => {
        return state.product.products
    })

    return (<>

        <div className="flex justify-center flex-wrap gap-y-6 gap-x-6 mt-2">
            {productlist.map((product) => (
                <div key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    </>);
}
