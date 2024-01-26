import { User } from "@/entities/backendEntities"
import { useEffect, useState } from 'react';
// import useSWR, { Fetcher, SWRResponse } from "swr";


// const fetcher: Fetcher<User, { url: string, init: RequestInit }> = (arg: { url: string, init: RequestInit }) => fetch(arg.url, arg.init).then(res => res.json()).then(res => res as User)

export default function getUser(userToken: string): User | undefined {
    // const response = useSWR({
    //     url: "https://postideas.store/api/users/me/",
    //     init: {
    //         headers: {
    //             "Authorization": userToken
    //         }
    //     }
    // }, fetcher) 
    
    const [response, setResponse] = useState<User>()
    useEffect(() => {
        fetch("https://postideas.store/api/users/me/", {
            headers: { 
                "Authorization": userToken 
            } 
        })
        .then(data => data.json())
        .then(data => data as User)
        .then(data => {
            setResponse(data)
        })
    }, [])

    return response
}