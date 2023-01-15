import httpReq from "./httpReq"
import { API_BASE_URL } from "../config"
import { useQuery } from "react-query"


export const useNotifications = () => {

    async function getNotifications() {
        const res = await httpReq.get(API_BASE_URL + '/notifications/new/21')
        const data = await res.json()
        return data
    }

    const { data, isError, isLoading } = useQuery(
		'notifications', getNotifications
	)

    type notifications = {
        message: string,
        url: string
    }

    let notifications: notifications[] = []

    if (data?.new_notifications) {
        notifications = JSON.parse( data?.new_notifications )
    }

    let amount: number = notifications.length

    return {notifications, amount, isError, isLoading}
}