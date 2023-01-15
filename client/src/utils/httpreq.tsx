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

}


export default httpReq