import httpReq from "./httpReq"
import { API_BASE_URL } from "../config"
import { useQuery } from "react-query"


export const useNotifications = () => {
    const { data, isError, isLoading } = useQuery(
		'notifications',
		() => httpReq.get(API_BASE_URL + '/notifications/new/21')
	)


    type notifications = {
        message: string,
        url: string
    }

    let notifications: notifications[] = []

    if (data?.data.new_notifications) {
        notifications = JSON.parse( data?.data.new_notifications )
    }

    let amount: number = notifications.length

    return {notifications, amount, isError, isLoading}
}