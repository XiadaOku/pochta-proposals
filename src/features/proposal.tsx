export default async function createProposal(userToken: string, name: string, category: number, userHead: number, content: any) {
    const response = await fetch("https://postideas.store/api/proposals/create/", { 
        headers: { 
            "Authorization": userToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "category": category,
            "user_to": userHead,
            "content": content
        })
    })

    return await response.json()
}