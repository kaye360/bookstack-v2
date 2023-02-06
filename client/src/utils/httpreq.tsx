/**
 * 
 * httpReq
 * Facade for fetch functions  
 * 
 */


type HttpReturn = (object | [])
type HttpFunc = (url:string, body?: object | []) => Promise<HttpReturn>


class httpReq {




    static get: HttpFunc = async function( url ) {

        const res = await fetch(url)
        let data: Promise<HttpReturn>
        if(res.ok) data = await res.json()
        return data
    }





    static post: HttpFunc = async function( url, body ) {

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode : 'cors'
        })

        let data: Promise<HttpReturn>
        if(res.ok) data = await res.json()
        return data
    }
    




    static put: HttpFunc = async function( url, body ) {

        const res = await fetch(url, {
            method : 'PUT',
            body : JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode : 'cors'
        })

        let data: Promise<HttpReturn>
        if(res.ok) data = await res.json()
        return data
    }





    static delete: HttpFunc = async function( url, body ) {

        const res = await fetch( url , {
            method : 'DELETE',
            body : JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode : 'cors'
        })

        let data: Promise<HttpReturn>
        if(res.ok) data = await res.json()
        return data
    }

}


export default httpReq