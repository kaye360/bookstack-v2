/**
 * 
 * httpReq
 * Facade for fetch functions  
 * 
 */

import axios from "axios"


class httpReq {

    get(url: string) {
        return axios.get(url)
    }

}


export default httpReq