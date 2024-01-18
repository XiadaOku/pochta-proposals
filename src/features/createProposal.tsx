async function createProposal(userToken: string, name: string, category: number, content: any) {
    let response = await fetch("https://postideas.store/api/proposals/heads/", { 
        headers: { 
            "Authorization": userToken 
        } 
    })

    const userHeads = await response.json()

    // TODO https://ant.design/components/modal
    const userHead = userHeads[0].id

    response = await fetch("https://postideas.store/api/proposals/create/", { 
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

    console.log(await response.json())
}