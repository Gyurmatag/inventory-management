import InventoryList from './components/InventoryList'
import AddItemForm from './components/AddItemForm'
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Webshop Inventory Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Current Inventory</h2>
            <InventoryList />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Add New Item</h2>
            <AddItemForm />
          </div>
        </div>
        <Toaster />
      </main>
  )
}

