export async function load({ params }) {
    const { userid } = params;

    const apiUrl = "http://localhost:4000/api";
    let token = "token";

        const response = await fetch(`${apiUrl}/user/get/${userid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
}

export const ssr = false;