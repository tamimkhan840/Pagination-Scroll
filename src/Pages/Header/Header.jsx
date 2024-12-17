import { CiLight } from "react-icons/ci";
import logo from "../../assets/logo-02.png";
import { FaCartShopping } from "react-icons/fa6";

function Header() {
  return (

    <div className="container bg-slate-400">
        <header className=" flex justify-between items-center sticky top-0 z-50  p-3">
            <div className="">
                <img className="w-20" src={logo} alt="logo" />
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li className="hover:text-red-500"><a href="/">Home</a></li>
                    <li className="hover:text-red-500"><a href="/about">About</a></li>
                    <li className="hover:text-red-500"><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <div className="space-x-4 ">
                <button className="text-2xl">
                   <CiLight />
                </button>
                <button className="text-2xl relative">
                    <span className="w-5 h-5 absolute top-2 bg-red-500 rounded-full text-xs items-center">0</span>
                 <FaCartShopping />
                </button>
            </div>
        </header>
    </div>


  )
}

export default Header
