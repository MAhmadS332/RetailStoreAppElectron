import { useEffect, useState } from 'react'
import SearchBox from '../components/shared/SearchBox'
import RegisterList from '../components/register-components/RegisterList'
import AddRegisterRecordModal from '../components/register-components/AddRegisterRecordModal'
import { useDispatch, useSelector } from 'react-redux'
import { addRecord, editRecord, deleteRecord } from '../slices/registerSlice'

const Register = () => {
  const records = useSelector((state) => state.register.value)
  const dispach = useDispatch()
  const [searchRecords, setSearchRecords] = useState([])
  const [search, setSearch] = useState('')
  const [showAddRegisterRecordModal, setShowAddRegisterRecordModal] = useState(false)

  const searchHandler = (searchText) => {
    setSearch(searchText)
    const filteredRecords = records.filter((record) =>
      record.customer_name.toLowerCase().includes(searchText.toLowerCase())
    )
    setSearchRecords(filteredRecords)
  }

  useEffect(() => {
    setSearchRecords(records)
  }, [records])

  const addRecordItem = (record) => {
    if (records.some((r) => r.id === record.id)) return
    console.log(record)

    dispach(addRecord(record))
  }

  const editRecordItem = (record) => {
    const existingRecord = records.find((r) => r.id === record.id)
    if (existingRecord) {
      dispach(editRecord(record))
    }
  }

  const deleteRecordItem = (id) => {
    const existingRecord = records.find((r) => r.id === id)
    if (existingRecord) {
      dispach(deleteRecord(id))
    }
  }

  return (
    <div>
      <div className="text-2xl px-5 py-1.5 sticky top-0 text-center bg-primary text-header-text shadow-sm shadow-gray-400 border-b border-background">
        Register
      </div>

      {/*Add New Customer Button*/}
      <button
        className="fixed bottom-5 right-5 bg-primary p-2 rounded-lg shadow-sm shadow-gray-500"
        onClick={() => setShowAddRegisterRecordModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 -960 960 960"
          width="36px"
          className="fill-header-text"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>

      {/*Search Box*/}
      <div className="flex justify-center items-center m-3 drop-shadow-md">
        <SearchBox search={search} searchHandler={searchHandler} placeholder="Search Customer" />
      </div>

      {/*Add New Customer Modal*/}
      {showAddRegisterRecordModal && (
        <AddRegisterRecordModal
          onClose={() => setShowAddRegisterRecordModal(false)}
          addRecordItem={addRecordItem}
        />
      )}

      {/*Customer List*/}
      <RegisterList
        records={searchRecords}
        editRecordItem={editRecordItem}
        deleteRecordItem={deleteRecordItem}
      />
    </div>
  )
}

export default Register
