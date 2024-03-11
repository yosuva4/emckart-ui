import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  var [userData, setUserdata] = useState({})

  var [loading, setLoading] = useState(true)
  var [msg, setMsg] = useState("")

  const navigate = useNavigate()

  const handleChange = e => {
    const { id, value } = e.target
    setUserdata({ ...userData, [id]: value })
  }

  const registerData = () => {
    setLoading(false)
    setMsg('')
    try {
      axios.post(`${import.meta.env.VITE_LOCAL_URL}api/user/register`, userData)
        .then((response) => {
          console.log(response);
          navigate("/login");
          setLoading(true)
        })
        .catch((err) => {
          console.log(err.response.data);
          setMsg(err.response.data.message)
          setLoading(true)
        })
    }
    catch {

    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="mt-6">
        <p className="text-center font-bold text-slate-900 text-xl mb-6">EMCCart SignUp</p>

        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >Name <span className="text-red-600 font-bold text-[20px]">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >Email <span className="text-red-600 font-bold text-[20px]">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >Phone Number <span className="text-red-600 font-bold text-[20px]">*</span>
          </label>
          <input
            type="number"
            id="phone"
            placeholder="Enter Your Phone Number"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="pswd"
            className="block text-gray-700 text-sm font-bold mb-2"
          >Password <span className="text-red-600 font-bold text-[20px]">*</span>
          </label>
          <input
            type="password"
            id="pswd"
            placeholder="Enter Your Password"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >Delivery Address
            <span className="text-red-600 font-bold text-[20px]">*</span>
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter Your Address"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-6 text-center">
          <span className="text-center text-red-500 font-semibold ">{msg}</span>
        </div>
        <div className=" w-full">
          <button
            className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={registerData}
            disabled={!loading}
          >{loading ? <span>Register</span> : <span>Loading...</span>}</button>
        </div>
      </form>
    </div>
  )
}
