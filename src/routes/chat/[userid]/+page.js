export async function load({ params }) {
    const { userid } = params;

    const apiUrl = "http://localhost:4000/api";
    let token;

    async function getUser(id) {
        const response = await fetch(`${apiUrl}/user/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            return {
                status: response.status,
                error: new Error("User not found"),
            };
        }
        return data.userGet;
        // console.log(data)
        // let smt = data.userGet;
    }
    
    return { userid };
}