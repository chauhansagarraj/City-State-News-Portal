const StatusBadge = ({ status }) => {

const styles = {
draft: "bg-yellow-100 text-yellow-800",
pending: "bg-blue-100 text-blue-800",
published: "bg-green-100 text-green-800",
rejected: "bg-red-100 text-red-800"
}

return (

<span
className={`px-3 py-1 text-sm rounded-full font-medium ${styles[status]}`}
>
{status}
</span>

)

}

export default StatusBadge