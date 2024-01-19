import { Category } from "@/entities/backendEntities"
import { useEffect, useState } from 'react';

export default function getCategories(): Category[] {
    const [response, setResponse] = useState<Category[]>([]) 
    useEffect(() => {
        fetch("https://postideas.store/api/proposals/categories/")
        .then(data => data.json())
        .then(data => data as Category[])
        .then(data => {
            setResponse(data)
        })
    })

    return response
}