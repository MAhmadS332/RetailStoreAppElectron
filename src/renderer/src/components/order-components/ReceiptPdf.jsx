// import React from 'react'
// import { useSelector } from 'react-redux'

// const ReceiptPdf = ({ receiptItems, orderInfo }) => {
//   const orderDetails = useSelector((state) => state.currentOrder.value.details)

//   const rowStyle = 'align-middle'
//   const columnStyle = 'p-2 border-[0.5px] border-black text-sm break-all hyphens-auto'
//   const headerColumnStyle = 'p-2 border border-black font-bold text-sm break-words'
//   return (
//     <div className="font-arial flex flex-col justify-center items-center py-5">
//       <div className="font-bold text-lg">{orderInfo.storeName}</div>
//       <div className="text-sm">{orderInfo.storeAddress}</div>
//       <div className="text-sm mb-5">
//         {orderInfo.countryCode} {orderInfo.storePhone}
//       </div>
//       <div className="text-center font-bold text-md">Sales Invoice</div>
//       <div className=" text-sm">
//         <span className="font-bold">Date: </span>
//         {orderInfo.orderDate}
//       </div>
//       <table className="border-collapse border border-gray-400 mt-5 w-full text-xs">
//         <thead>
//           <tr className={rowStyle}>
//             <th className={headerColumnStyle}>Sr.</th>
//             <th className={headerColumnStyle}>Item Name</th>
//             <th className={headerColumnStyle}>Qty</th>
//             <th className={headerColumnStyle}>Rate ({orderInfo.currency})</th>
//             <th className={headerColumnStyle}>Amount ({orderInfo.currency})</th>
//           </tr>
//         </thead>
//         <tbody>
//           {receiptItems &&
//             receiptItems.length > 0 &&
//             receiptItems.map((item, index) => (
//               <tr className={rowStyle} key={item.item_id}>
//                 <td className={`${columnStyle} text-right`}>{index + 1}</td>
//                 <td className={`${columnStyle} text-left`}>{item.item_name}</td>
//                 <td className={`${columnStyle} text-right`}>{item.qty}</td>
//                 <td className={`${columnStyle} text-right`}>{item.item_price}</td>
//                 <td className={`${columnStyle} text-right`}>{item.item_price * item.qty}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//       <table className="border-collapse self-end text-sm m-2 px-2">
//         <tbody>
//           <tr>
//             <td className="font-bold px-2 py-0.5  text-right">Subtotal:</td>
//             <td className="px-2 py-0.5  text-right">
//               {(orderDetails.subTotal || 0).toLocaleString()}
//             </td>
//           </tr>
//           <tr>
//             <td className="font-bold px-2 py-0.5  text-right">Discount:</td>
//             <td className="px-2 py-0.5  text-right">
//               {(orderDetails.discount || 0).toLocaleString()}
//             </td>
//           </tr>
//           <tr className="!text-base">
//             <td className="font-bold px-2 py-0.5  text-right text-md">Total:</td>
//             <td className="px-2 py-0.5  text-right text-md">
//               {((orderDetails.subTotal || 0) - (orderDetails.discount || 0)).toLocaleString()}
//             </td>
//           </tr>
//           <tr>
//             <td className="font-bold px-2 py-0.5 text-right ">Payment In:</td>
//             <td className="px-2 py-0.5  text-right">
//               {(orderDetails.amountPaid || 0).toLocaleString()}
//             </td>
//           </tr>
//           <tr>
//             <td className="font-bold px-2 py-0.5 text-right">Change:</td>
//             <td className="px-2 py-0.5  text-right">
//               {(
//                 (orderDetails.amountPaid || 0) -
//                 (orderDetails.subTotal || 0 - orderDetails.discount || 0)
//               ).toLocaleString()}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div className="border-t text-center text-sm border-black my-5 w-full">
//         Thank You for Shopping with Us!
//       </div>
//     </div>
//   )
// }

// export default ReceiptPdf
