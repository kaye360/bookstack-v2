/**
 * 
 * httpReq
 * Facade for fetch functions  
 * 
 */

type Data = []

class httpReq {

    static async get(url:string) {

        const res = await fetch(url)
        let data: Data

        if(res.ok) {
            data = await res.json()
        }
        return data
    }

    static async post( url:string, body: object | [] ) {

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })

        let data: Data

        if(res.ok) {
            data = await res.json()
        }

        return data
    }
    
    static async put( url:string, body: object | []) {

        const res = await fetch(url, {
            method : 'PUT',
            body : JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })

        let data: Data

        if(res.ok) {
            data = await res.json()
        }

        return data
    }

    /**
     * @todo update docs
     */
    static async delete( url:string, body: object ) {

        const res = await fetch( url , {
            method : 'DELETE',
            body : JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })

        let data: Data

        if(res.ok) {
            data = await res.json()
        }

        return data
    }

}


export default httpReq