import  { useState } from 'react'
import EditRegisterRecordModal from './EditRegisterRecordModal'
import DeleteRegisterRecordModal from './DeleteRegisterRecordModal'

const RegisterList = (props) => {
  const [showEditRegisterRecordModal, setShowEditRegisterRecordModal] = useState(false)
  const [showDeleteRegisterRecordModal, setShowDeleteRegisterRecordModal] = useState(false)
  const [record, setRecord] = useState({})

  const handleEdit = (record) => {
    setRecord(record)
    setShowEditRegisterRecordModal(true)
  }
  const handleDelete = (record) => {
    setRecord(record)
    setShowDeleteRegisterRecordModal(true)
  }

  return (
    <>
      {showEditRegisterRecordModal && (
        <EditRegisterRecordModal
          previousData={record}
          onClose={() => setShowEditRegisterRecordModal(false)}
          editRecordItem={props.editRecordItem}
        />
      )}
      {showDeleteRegisterRecordModal && (
        <DeleteRegisterRecordModal
          previousData={record.id}
          onClose={() => setShowDeleteRegisterRecordModal(false)}
          deleteRecordItem={props.deleteRecordItem}
        />
      )}
      <ul className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden border-t-4 border-accent">
        {props.records.length > 0 &&
          props.records.map((record) => (
            <li
              className="hover:bg-accent px-5 py-2 text-lg font-bUbuntu border-b border-accent"
              key={record.id}
            >
              <div>{record.customer_name}</div>
              <div className="flex justify-between records-center">
                <div className="text-base text-text">
                  Loan Amount:{' '}
                  <span className="text-lg px-1 text-green-600">{record.loan_amount}</span>
                </div>
                <div className="text-base text-text">
                  Debt Amount:{' '}
                  <span className="text-lg px-1 text-red-600">{record.debt_amount}</span>
                </div>
                <div className="text-base text-text">Last Update: {record.last_update}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 -960 960 960"
                      width="17px"
                      fill="background"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(record)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 -960 960 960"
                      width="17px"
                      fill="background"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        {props.records.length <= 0 && (
          <li className="flex justify-center records-center">
            <div className="text-base text-text">No Records Found</div>
          </li>
        )}
      </ul>
    </>
  )
}

export default RegisterList
