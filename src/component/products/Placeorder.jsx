import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Placeorder() {

    // var [totalAmd, setTotalamd] = useState(0)
    const userList = useSelector((state) => {
        return state?.user?.alldata?.cardIds
    })

    const productlist = useSelector((state) => {
        return (state.product.products)
    })

    const cartProducts = productlist.filter((product) => {
        return userList.includes(product.id)
    })
    var totalAmd = 0
    cartProducts.filter((price) => {
        totalAmd = totalAmd + Number(price.price)
    })


    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold'>Checkout</h1>
            <div className='grid gap-2 lg:grid-cols-3 md:grid-cols-2 mt-4'>
                {cartProducts.map((product, index) => {
                    return (
                        <div key={index} className='border p-6 rounded-md'>
                            <h1 className='text-2xl font-bold'>{product.title}</h1>
                            <p>${product.price}</p>
                        </div>
                    )
                })}
            </div>
            <hr className='mt-6' />
            <h1 className='text-2xl font-bold mt-5'>Order Summary</h1>
            <p> ${totalAmd}</p>

            <button
                className='bg-blue-500 hover:bg-blue-700 rounded-md border p-2 text-slate-50 mt-6 text-[16px] font-bold'>
                Place Order
            </button>
        </div>
    )
}
