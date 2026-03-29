import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { viewArticle } from "../store/slices/articleSlice"
import { editArticle , getArticleById , clearArticleState } from "../store/slices/articleSlice"
import { useParams } from "react-router-dom"
import { statesAndCities } from "../assets/indiaLocation"

const EditArticle = () => {

const { id } = useParams()
const dispatch = useDispatch()

const { article, loading , message , error } = useSelector(state => state.articles)

// console.log("message" , message);
// console.log("error" , error);


const [form,setForm] = useState({
title:"",
content:"",
category:"",
state:"",
city:""
})

const [images,setImages] = useState([])

useEffect(()=>{
 if(id){
   dispatch(getArticleById(id));
 }
},[dispatch,id])

useEffect(()=>{

 if(article){
  setForm({
   title:article.title || "",
   content:article.content || "",
   category:article.category || "",
   state:article.state || "",
   city:article.city || ""
  })
 }

},[article])

useEffect(() => {

  dispatch(clearArticleState())

}, [dispatch])

const handleChange = (e)=>{
 setForm({...form,[e.target.name]:e.target.value})
}

const handleImages = (e)=>{
 setImages(e.target.files)
}

const handleSubmit = (e)=>{
 e.preventDefault()

 const data = new FormData()

 Object.keys(form).forEach(key=>{
  data.append(key,form[key])
 })

 for(let i=0;i<images.length;i++){
  data.append("images",images[i])
 }

 dispatch(editArticle({id,formData:data}))
}

if(loading) return <p className="p-6">Loading...</p>

return(

<div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">

<h2 className="text-3xl font-bold mb-6">
Edit Article
</h2>

<form onSubmit={handleSubmit} className="space-y-5">

<input
name="title"
value={form.title}
onChange={handleChange}
placeholder="Article title"
className="w-full border p-3 rounded"
/>

<textarea
name="content"
rows="8"
value={form.content}
onChange={handleChange}
placeholder="Write your article..."
className="w-full border p-3 rounded"
/>

<div className="grid grid-cols-2 gap-4">

<input
name="category"
value={form.category}
onChange={handleChange}
placeholder="Category"
className="border p-3 rounded"
/>

<select
name="state"
value={form.state}
onChange={handleChange}
className="border p-3 rounded w-full"
>

<option value="">Select State</option>

{statesAndCities &&
  Object.keys(statesAndCities).map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
))}

</select>

</div>

<select
name="city"
value={form.city}
onChange={handleChange}
className="border p-3 rounded w-full"
disabled={!form.state}
>

<option value="">Select City</option>

{form.state &&
 statesAndCities?.[form.state]?.map((city) => (
   <option key={city} value={city}>
     {city}
   </option>
 ))}

</select>

<input
type="file"
multiple
onChange={handleImages}
className="border p-2"
/>

<button
className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
>
Update Article
</button>

{message  && (
  <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
    {message}
  </div>
)}
{error && (
  <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
    {error}
  </div>
)}


</form>

</div>

)

}

export default EditArticle