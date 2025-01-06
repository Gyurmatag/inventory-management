'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInventoryStore } from '@/lib/store'
import { useToast } from "@/hooks/use-toast"
import { InventoryItem } from '@/lib/store'

interface EditItemFormProps {
    item: InventoryItem
    onClose: () => void
}

export default function EditItemForm({ item, onClose }: EditItemFormProps) {
    const updateItem = useInventoryStore((state) => state.updateItem)
    const { toast } = useToast()
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [price, setPrice] = useState(item.price.toString())
    const [quantity, setQuantity] = useState(item.quantity.toString())

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateItem(item.id, {
            name,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10)
        })
        toast({
            title: "Item updated",
            description: "The item has been successfully updated in the inventory.",
        })
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item Name"
                required
            />
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                step="0.01"
                required
            />
            <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                required
            />
            <Button type="submit" className="mr-2">Update Item</Button>
            <Button type="button" onClick={onClose} variant="outline">Cancel</Button>
        </form>
    )
}

