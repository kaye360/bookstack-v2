/**
 * 
 * httpReq
 * Facade for fetch functions  
 * 
 */

class httpReq {

    static async get(url:string) {

        const res = await fetch(url)
        let data

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

        let data

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

        let data

        if(res.ok) {
            data = await res.json()
        }

        return data
    }

    /**
     * @todo update docs
     */
    static async delete( url:string ) {

        const res = await fetch( url , {
            method : 'DELETE',
        })

        let data

        if(res.ok) {
            data = await res.json()
        }

        return data
    }

}


export default httpReq