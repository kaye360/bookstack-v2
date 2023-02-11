/**
 * 
 * Facade @class httpReq
 * 
 * This is a fetch wrapper class to simplify GET POST
 * PUT and DELETE fetch requests
 * 
 */



type HttpMethod = (url:string, body?: object | []) => Promise<any>


class httpReq {




    static get: HttpMethod = async function( url ) {

        const res = await fetch(url)
        let data: Promise<any>
        if(res.ok) data = await res.json()
        return data
    }





    static post: HttpMethod = async function( url, body ) {

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode : 'cors'
        })

        let data: Promise<any>
        if(res.ok) data = await res.json()
        return data
    }
    




    static put: HttpMethod = async function( url, body ) {

        const res = await fetch(url, {
            method : 'PUT',
            body : JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode : 'cors'
        })

        let data: Promise<any>
        if(res.ok) data = await res.json()
        return data
    }





    static delete: HttpMethod = async function( url, body ) {

        const res = await fetch( url , {
            method : 'DELETE',
            body : JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode : 'cors'
        })

        let data: Promise<any>
        if(res.ok) data = await res.json()
        return data
    }

}

export default httpReq