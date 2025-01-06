'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useInventoryStore } from '@/lib/store'
import { useToast } from "@/hooks/use-toast"
import EditItemForm from "@/app/components/EditeitemForm";

export default function InventoryList() {
    const { inventory, deleteItem } = useInventoryStore()
    const [editingItem, setEditingItem] = useState<number | null>(null)
    const { toast } = useToast()

    const handleDelete = (id: number) => {
        deleteItem(id)
        toast({
            title: "Item deleted",
            description: "The item has been successfully removed from the inventory.",
        })
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inventory.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                                <Button onClick={() => setEditingItem(item.id)} className="mr-2">Edit</Button>
                                <Button onClick={() => handleDelete(item.id)} variant="destructive">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {editingItem !== null && (
                <EditItemForm
                    item={inventory.find(item => item.id === editingItem)!}
                    onClose={() => setEditingItem(null)}
                />
            )}
        </div>
    )
}

