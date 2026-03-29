import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDashboard } from "../store/slices/dashboardSlice"
import { submitArticle , clearArticleState } from "../store/slices/articleSlice"
import { Link } from "react-router-dom"
import StatusBadge from "../components/StatusBadge"
import { showToast } from "../store/slices/uiMessageSlice"
const MyArticles = () => {

const dispatch = useDispatch()

const { articles } = useSelector(state => state.dashboard)
const { message, error } = useSelector(state => state.articles)

useEffect(()=>{
 dispatch(getDashboard())

},[dispatch])

 useEffect(() => {
    if (message) {
      dispatch(
        showToast({
          message: message,
          type: "success",
        })
      );
      dispatch(getDashboard()); 
      dispatch(clearArticleState());
    }

    if (error) {
      dispatch(
        showToast({
          message: error,
          type: "error",
        })
      );
      dispatch(clearArticleState());
    }
  }, [message, error, dispatch]);

return(
<>

<div className="p-6">

<h2 className="text-3xl font-bold mb-6">
My Articles
</h2>

<div className="overflow-x-auto bg-white shadow rounded-lg">

<table className="min-w-full">

<thead className="bg-gray-100 text-left">

<tr>

<th className="p-3">Title</th>
<th className="p-3">Category</th>
<th className="p-3">Status</th>
<th className="p-3">Views</th>
<th className="p-3">Likes</th>
<th className="p-3">Date</th>
<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{articles?.map(article => (

<tr key={article._id} className="border-t hover:bg-gray-50">

<td className="p-3 font-medium">
{article.title}
</td>

<td className="p-3">
{article.category}
</td>

<td className="p-3">
<StatusBadge status={article.status}/>
</td>

<td className="p-3">
{article.views || 0}
</td>

<td className="p-3">
{article.likes?.length || 0}
</td>

<td className="p-3">
{new Date(article.createdAt).toLocaleDateString()}
</td>

<td className="p-3 flex gap-2">

 {(article.status === "draft" || article.status === "pending") && (
    <Link
      to={`/journalist/articles/edit/${article._id}`}
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
    >
      Edit
    </Link>
  )}
 {(article.status === "published") && (
    <Link
      to={`/article/${article._id}`}
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
    >
      View Article
    </Link>
  )}

  

{article.status === "draft" && (

<button
onClick={()=>dispatch(submitArticle(article._id))             
}
className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
>
Submit
</button>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>
</>

)

}

export default MyArticles