'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInventoryStore } from '@/lib/store'
import { useToast } from "@/hooks/use-toast"

export default function AddItemForm() {
    const addItem = useInventoryStore((state) => state.addItem)
    const { toast } = useToast()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addItem({
            name,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10)
        })
        toast({
            title: "Item added",
            description: "The new item has been successfully added to the inventory.",
        })
        setName('')
        setDescription('')
        setPrice('')
        setQuantity('')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit">Add Item</Button>
        </form>
    )
}

