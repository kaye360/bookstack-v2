import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
import { API_BASE_URL } from "../config";
import httpReq from "../utils/httpReq";


export default function Book() {

    const { id: bookID } = useParams()

    const { data, isLoading, isError, isSuccess } = useQuery('getBook', async () => {
        const res = await httpReq.get(API_BASE_URL + `/book/${bookID}`)
        const data = await res.json()
        return data
    })

    if(isLoading) {
        return <Loader />
    }

    if(isError) {
        return <div>Error getting book information.</div>
    }

    return <div>{data.title}</div>


}