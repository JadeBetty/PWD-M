module.exports =  async function efetch(url, headers, method, body) {
    if(!headers) headers = {"Content-Type": "application/json"};
    const data = await (await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    })).json();

    return data
}