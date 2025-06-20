import ItemsTable from '../components/items-components/ItemsTable'

const Items = () => {
  return (
    <div className="bg-background text-header-text">
      <div className="text-2xl px-5 py-1.5 bg-primary text-center text-header-text shadow-sm shadow-gray-400 border-b border-background">
        Items
      </div>

      <ItemsTable />
    </div>
  )
}

export default Items
