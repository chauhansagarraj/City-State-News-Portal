import { useState , useEffect  } from "react";
import { useDispatch , useSelector } from "react-redux";
import { createArticle , clearArticleState } from "../store/slices/articleSlice";
import { statesAndCities } from "../assets/indiaLocation";
import { newsCategories } from "../assets/newsCategories";

const CreateArticle = () => {

const dispatch = useDispatch();

const [form,setForm] = useState({
title:"",
content:"",
category:"",
state:"",
city:""
});

const { message , error } = useSelector(state => state.articles)


const [images,setImages] = useState([]);

const handleChange = (e) => {

 const { name, value } = e.target

 if(name === "state"){
   setForm({
     ...form,
     state: value,
     city: ""   // reset city
   })
 }else{
   setForm({
     ...form,
     [name]: value
   })
 }

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

dispatch(createArticle(data))

useEffect(() => {

dispatch(clearArticleState())   }, [dispatch])
}

// useEffect(() => {
//   if (message || error) {
//     const timer = setTimeout(() => {
//       setMessage("")
//       setError("")
//     }, 3000)

//     return () => clearTimeout(timer)
//   }
// }, [message, error])

return (

<div className="max-w-3xl mx-auto p-6">

<h2 className="text-2xl font-bold mb-6">Create Article</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
name="title"
placeholder="Title"
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<textarea
name="content"
placeholder="Article Content"
rows="6"
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<select
name="category"
value={form.category}
onChange={handleChange}
className="w-full border p-3 rounded"
>

<option value="">Select Category</option>

{newsCategories.map((cat)=>(
  <option key={cat} value={cat}>
    {cat}
  </option>
))}

</select>

<select
name="state"
value={form.state}
onChange={handleChange}
className="border p-3 rounded w-full"
>

<option value="">Select State</option>

{Object.keys(statesAndCities).map((state)=>(
  <option key={state} value={state}>
    {state}
  </option>
))}

</select>

<select
name="city"
value={form.city}
onChange={handleChange}
className="border p-3 rounded w-full"
disabled={!form.state}
>

<option value="">Select City</option>

{form.state &&
 statesAndCities[form.state].map((city)=>(
   <option key={city} value={city}>
     {city}
   </option>
 ))}

</select>

<input type="file" multiple onChange={handleImages} />

<button className="bg-blue-500 text-white px-6 py-2 rounded">
Create Draft
</button>

{message && (
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

export default CreateArticle