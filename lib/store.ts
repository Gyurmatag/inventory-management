import { create } from 'zustand'

export interface InventoryItem {
    id: number
    name: string
    description: string
    price: number
    quantity: number
}

interface InventoryStore {
    inventory: InventoryItem[]
    addItem: (item: Omit<InventoryItem, 'id'>) => void
    updateItem: (id: number, item: Omit<InventoryItem, 'id'>) => void
    deleteItem: (id: number) => void
}

let nextId = 4

export const useInventoryStore = create<InventoryStore>((set) => ({
    inventory: [
        { id: 1, name: "T-Shirt", description: "Cotton t-shirt", price: 19.99, quantity: 100 },
        { id: 2, name: "Jeans", description: "Blue denim jeans", price: 49.99, quantity: 50 },
        { id: 3, name: "Sneakers", description: "Running shoes", price: 79.99, quantity: 30 },
    ],
    addItem: (item) => set((state) => ({
        inventory: [...state.inventory, { ...item, id: nextId++ }]
    })),
    updateItem: (id, updatedItem) => set((state) => ({
        inventory: state.inventory.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
        )
    })),
    deleteItem: (id) => set((state) => ({
        inventory: state.inventory.filter((item) => item.id !== id)
    })),
}))

