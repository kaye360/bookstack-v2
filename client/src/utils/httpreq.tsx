/**
 * 
 * httpReq
 * Facade for fetch functions  
 * 
 */

import axios from "axios"


class httpReq {

    static async get(url:string) {
        return await fetch(url)
    }

    // static post(url:string, postData:string) {
    //     return axios.post(url, postData, {
    //         headers : {
    //             'Content-Type': 'application/json;charset=UTF-8',
    //         }
    //     })
    // }

    static async post( url:string, body: object | [] ) {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    }

}


export default httpReq