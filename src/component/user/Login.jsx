import { useState } from "react"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../config/firebase.config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUsername } from "../../store/userSlice";

export default function Login() {
    const navigate = useNavigate()
    const disPatch = useDispatch()

    var [userData, setUserdata] = useState({})
    var [loginFail, setLoginfail] = useState(false)
    var [loading, setloading] = useState(false)

    const handleChange = e => {
        const { id, value } = e.target
        setUserdata({ ...userData, [id]: value })
    }

    const login = () => {
        setloading(true)
        signInWithEmailAndPassword(auth, userData.email, userData.pswd)
            .then((user) => {
                axios.post(`${import.meta.env.VITE_LOCAL_URL}api/user/user`, {
                    currentUser: user?.user?.uid
                }).then((response) => {
                    console.log(response);
                    disPatch(updateUsername(response.data))
                    navigate('/allproducts')
                })
                    .catch((err) => {
                        console.log("The error is :", err);
                    })
            })
            .catch((err) => {
                console.log(err)
                setLoginfail(true)
                setloading(false)
            })
    }


    return (
        <div className="w-full max-w-md mx-auto">
            <form className="mt-6">
                <p className="text-center font-bold text-slate-900 text-xl mb-6">EMCCart Login</p>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Your Email"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mt-6">
                    <label
                        htmlFor="pswd"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >Password
                    </label>
                    <input
                        type="password"
                        id="pswd"
                        placeholder="Enter Your Password"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-6 text-center">
                    {loginFail && <span className="text-center text-red-500 font-semibold ">Please Enter Valid Password and Mail.!</span>}
                </div>
                <div className="w-full">
                    <button
                        className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        onClick={login}
                        disabled={loading}
                    >
                        {
                            loading ? <p className="text-red-300">Loading...</p> : <p>Login</p>
                        }

                    </button>
                </div>
            </form>
        </div>
    )
}

