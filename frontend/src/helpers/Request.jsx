export const Request = async (url, reqMethod, dataToSave = "", file = false) => {

    let loading = true;

    let reqOptions = {
        method: "GET"
    }

    if (reqMethod == "GET" || reqMethod == "DELETE") {
        reqOptions = {
            method: reqMethod
        }
    }

    if (reqMethod == "POST" || reqMethod == "PUT") {

        if (file) {
            reqOptions = {
                method: reqMethod,
                body: dataToSave,
            }
        } else {
            reqOptions = {
                method: reqMethod,
                body: JSON.stringify(dataToSave),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
    }

    const response = await fetch(url, reqOptions);
    const data = await response.json();

    loading = false;


    return {
        data,
        loading
    }
}