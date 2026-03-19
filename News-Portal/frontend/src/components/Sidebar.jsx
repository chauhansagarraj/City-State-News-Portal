import { Link } from "react-router-dom"

const Sidebar = () => {

return (

<div className="w-64 bg-gray-900 text-white p-6">

<h2 className="text-xl font-bold mb-8">
Journalist Panel
</h2>

<div className="flex flex-col gap-4">

<Link
to="/journalist-dashboard"
className="hover:text-yellow-400"
>
Dashboard
</Link>

<Link
to="/articles/create"
className="hover:text-yellow-400"
>
Create Article
</Link>

<Link
to="/my-articles"
className="hover:text-yellow-400"
>
My Articles
</Link>
<Link
to="/"
className="hover:text-yellow-400"
>
Home
</Link>

</div>

</div>

)

}

export default Sidebar