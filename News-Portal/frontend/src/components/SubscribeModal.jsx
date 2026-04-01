// import axios from "axios"
// import loadRazorpay from "../services/loadRazorpay"

// const SubscribeModal = ({ onClose }) => {

//   const handlePayment = async () => {
//     const loaded = await loadRazorpay()

//     if (!loaded) {
//       alert("Failed to load Razorpay")
//       return
//     }

//     const { data: order } = await axios.post("/api/payment/create-order")

//     const options = {
//       key: "YOUR_KEY_ID",
//       amount: order.amount,
//       currency: "INR",
//       name: "News Portal",
//       description: "Monthly Subscription",
//       order_id: order.id,

//       handler: async (response) => {
//         await axios.post("/api/payment/verify-payment", response)
//         alert("Payment successful 🎉")
//         onClose()
//       }
//     }

//     const paymentObject = new window.Razorpay(options)
//     paymentObject.open()
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-xl text-center w-80">
//         <h2 className="text-xl font-bold mb-2">
//           Subscribe ₹99/month
//         </h2>

//         <p className="mb-4">
//           Unlimited access to all articles
//         </p>

//         <button
//           onClick={handlePayment}
//           className="bg-red-600 text-white px-4 py-2 rounded-lg w-full"
//         >
//           Subscribe Now
//         </button>

//         <button onClick={onClose} className="mt-3 text-gray-500">
//           Cancel
//         </button>
//       </div>
//     </div>
//   )
// }

// export default SubscribeModal