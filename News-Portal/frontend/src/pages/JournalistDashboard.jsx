import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getDashboard } from "../store/slices/dashboardSlice"

const JournalistDashboard = ()=>{

const dispatch = useDispatch()

const {stats,articles} = useSelector(state=>state.dashboard)

useEffect(()=>{
dispatch(getDashboard())
},[dispatch])

return(

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">
Journalist Dashboard
</h1>

{/* stats */}

<div className="grid grid-cols-3 gap-4 mb-8">

<div className="bg-white shadow p-4">
Total Articles: {stats?.totalArticles}
</div>

<div className="bg-white shadow p-4">
Drafts: {stats?.drafts}
</div>

<div className="bg-white shadow p-4">
Published: {stats?.published}
</div>

</div>

{/* latest articles */}

<h2 className="text-xl font-bold mb-4">
Recent Articles
</h2>

{articles?.slice(0,5).map(article=>(

<div key={article._id} className="border p-4 mb-3">

<h3>{article.title}</h3>

<p>Status: {article.status}</p>

</div>

))}

</div>

)

}

export default JournalistDashboard