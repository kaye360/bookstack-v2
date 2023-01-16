/**
 * 
 * httpReq
 * Facade for fetch functions  
 * 
 */

class httpReq {

    static async get(url:string) {
        return await fetch(url)
    }

    static async post( url:string, body: object | [] ) {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    }
    
    static async put( url:string, body: object | []) {
        return await fetch(url, {
            method : 'PUT',
            body : JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    }

}


export default httpReq