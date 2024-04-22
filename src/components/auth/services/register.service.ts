export const registerService = async (register: {}) => {
    const url = process.env.REACT_APP_API_URL ?? 'https://api.baulito.co/api/';
    console.log(url);
    const endPoint = url + 'usuarios/register';
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(register) 
    };
    const data = await fetch(endPoint, settings);
    return await data.json();
}
