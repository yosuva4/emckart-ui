import { Link } from "react-router-dom";
import { auth } from "../../config/firebase.config";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { clearUsername } from "../../store/userSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
    const disPatch = useDispatch()

    const navigate = useNavigate()

    const logout = async () => {
        await signOut(auth)
        disPatch(clearUsername())
        navigate('/login')
    }

    const userName = useSelector((state) => {
        return state.user.userName
    })

    const isAdmin = useSelector((state) => {
        return state?.user?.alldata?.isAdmin
    })

    const cartProducts = useSelector((state) => {
        return state?.user?.alldata?.cardIds?.length
    })

    return (
        <div>
            <nav className='bg-gray-800 p-4'>
                <ul className='flex justify-between text-slate-50'>
                    <li className='font-bold cursor-pointer'>
                        <Link to={'/allproducts'}>EMCCART</Link>
                    </li>
                    <li className='flex gap-1 '>
                        {
                            userName == 'fail' ?
                                <>
                                    <Link to={'/login'} className='hover:bg-slate-500 p-1 rounded-sm cursor-pointer font-medium'>Login</Link>
                                    <Link to={'/sign-up'} className='hover:bg-slate-500 p-1 rounded-sm cursor-pointer font-medium'>Signup</Link>
                                </>
                                :
                                <>
                                    {isAdmin && <button className='bg-blue-600 hover:bg-blue-700 p-1 px-2 rounded-md cursor-pointer font-medium' onClick={() => navigate('/add-product')}>Add Product</button>}
                                    <h1 className="cursor-pointer font-medium mt-1">Welcome {userName} !</h1>
                                    <button className='hover:bg-slate-500 p-1 px-4 rounded-sm cursor-pointer font-medium' onClick={logout}>Log Out</button>
                                    <Badge size="small" count={cartProducts}>
                                        <ShoppingCartOutlined
                                            style={{ fontSize: '24px', color: '#08c', marginLeft: '5px' }}
                                            className="cursor-pointer mt-1"
                                            onClick={() => navigate('/placeorder')}
                                        />
                                    </Badge>
                                </>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}

