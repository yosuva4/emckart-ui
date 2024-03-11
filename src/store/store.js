// import { useEffect, useState } from 'react';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from "./firebase-config"
// import { useDispatch, useSelector } from 'react-redux';
// import { onAuthStateChanged } from 'firebase/auth';
// import { updatePassword, updateUsername } from './userSlice';

// function App() {

//     const regEmail = useSelector((state) => {
//         console.log("fdfd" + state.user.username)
//         return state.user.username

//     })

//     const regPass = useSelector((state) => {
//         return state.user.password
//     })


//     // const [regEmail,setRegEmail] = useState("")
//     // const [regPass,setRegPass] = useState("")

//     const [loginEmail, setLoginEmail] = useState("")
//     const [loginPass, setLoginPass] = useState("")

//     const [user, setUser] = useState({})

//     const dispatch = useDispatch()

//     useEffect(() => {
//         onAuthStateChanged(auth, (currentuser) => {
//             setUser(currentuser)
//         })
//     }, [])


//     const register = () => {
//         createUserWithEmailAndPassword(auth, regEmail, regPass).
//             then((user) => {
//                 console.log(user)
//                 // window.localStorage.setItem("user",regEmail)
//             }).catch((err) => { console.log(err) })
//     }

//     const login = () => {
//         signInWithEmailAndPassword(auth, loginEmail, loginPass).
//             then((user) => {
//                 console.log(user)
//                 window.localStorage.setItem("user", regEmail)
//             }).catch((err) => { console.log(err) })
//     }

//     const logout = async () => {
//         await signOut(auth)
//     }

//     return (
//         <div className="App">
//             <div>
//                 <h1>Register User</h1>
//                 <input placeholder='username' value={regEmail} onChange={(e) => dispatch(updateUsername(e.target.value))}></input>
//                 <input placeholder='password' value={regPass} onChange={(e) => dispatch(updatePassword(e.target.value))}></input>
//                 <button onClick={register}>Register</button>
//             </div>

//             <div>
//                 <h1>Login User</h1>
//                 <input placeholder='username' onChange={(e) => setLoginEmail(e.target.value)}></input>
//                 <input placeholder='password' onChange={(e) => setLoginPass(e.target.value)}></input>
//                 <button onClick={login}>Login</button>
//             </div>

//             <h1>user Loggedin:{user?.email}</h1>
//             <button onClick={logout}>Sign Out</button>
//         </div>
//     );
// }

// // export default App;

// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";

// const store = configureStore({
//     reducer: {
//         user: userSlice.reducer
//     }
// })

// export default store

import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import productSlice from "./productSlice"

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
    }
})

export default store
