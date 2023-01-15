/**
 * 
 * httpReq
 * Facade for fetch functions  
 * 
 */

import axios from "axios"


class httpReq {

    static get(url: string) {
        return axios.get(url)
    }

    static post(url:string, postData:string) {
        return axios.post(url, postData, {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        })
    }

}


export default httpReq