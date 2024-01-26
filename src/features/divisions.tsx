import { Division } from "@/entities/backendEntities"
import { useEffect, useState } from 'react';

export default function getDivisions(userToken: string): Division[] {
    const [response, setResponse] = useState<Division[]>([]) 
    useEffect(() => {
        fetch("https://postideas.store/api/companies/offices/departments/divisions/", {
            headers: { 
                "Authorization": userToken 
            } 
        })
        .then(data => data.json())
        .then(data => data as Division[])
        .then(data => {
            setResponse(data)
        })
    })

    return response
}