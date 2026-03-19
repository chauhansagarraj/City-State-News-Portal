import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {

return (

<div className="flex min-h-screen">

<Sidebar/>

<div className="flex-1 bg-gray-100 p-6">

<Outlet/>

</div>

</div>

)

}

export default DashboardLayout