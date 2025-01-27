import { IoIosArrowForward } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom"

function Layout() {
  const location = useLocation();
  const navigate = useNavigate()

  return (<div className="flex flex-col h-[100vh]">
    <div className="flex bg-blue-700 p-2 text-white">
      <div className="capitalize text-2xl font-bold tracking-wide">
        {location.pathname.split("-")[0].replace("/", "")}
        &nbsp;
        {location.pathname.split("-")[1]}
      </div>
      <a className="cursor-pointer text-lg align hover:underline ml-auto px-6"
        onClick={() =>{
          location.pathname.includes("1")
          ? navigate("/test-2")  
          : navigate("/test-1") 
        }}>
        {location.pathname.includes("1") ? "Ir a test 2" : "Ir a test 1"}
        <IoIosArrowForward className="size-4" />
      </a>
    </div>
    <div className="p-2 h-full">
      <Outlet />
    </div>
  </div>)
}

export default Layout