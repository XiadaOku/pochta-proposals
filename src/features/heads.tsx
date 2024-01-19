import { User } from "@/entities/backendEntities"

export default async function getHeads(userToken: string): Promise<User[]> {
    const response = await fetch("https://postideas.store/api/proposals/heads/", { 
        headers: { 
            "Authorization": userToken 
        } 
    })

    return (await response.json()) as User[]
}