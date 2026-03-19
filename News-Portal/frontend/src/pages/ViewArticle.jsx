// import { useEffect } from "react"
// import { useDispatch,useSelector } from "react-redux"
// import { viewArticle } from "../store/slices/articleSlice"
// import { useParams } from "react-router-dom"

// const ViewArticle = ()=>{

// const {id}=useParams()

// const dispatch=useDispatch()

// const {article}=useSelector(state=>state.articles)

// useEffect(()=>{
// dispatch(viewArticle(id))
// },[dispatch,id])

// if(!article) return <p>Loading...</p>

// return(

// <div className="max-w-3xl mx-auto p-6">

// <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

// <p className="text-gray-600 mb-4">
// {article.category} • {article.city}, {article.state}
// </p>

// <p>{article.content}</p>

// </div>

// )
// }

// export default ViewArticle