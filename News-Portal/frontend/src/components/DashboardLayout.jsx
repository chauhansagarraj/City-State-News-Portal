import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {

return (

<div className="flex min-h-screen">

<Sidebar/>

<div className="ml-64 w-[calc(100%-16rem)] min-h-screen bg-gray-100">
<Outlet/>

</div>

</div>

)

}

export default DashboardLayout