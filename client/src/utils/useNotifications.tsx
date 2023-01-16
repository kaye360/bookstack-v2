import httpReq from "./httpReq"
import { API_BASE_URL } from "../config"
import { useQueries } from "react-query"


export const useNotifications = (userID?: number) => {

    async function getNewNotifications() {
        const res = await httpReq.get(API_BASE_URL + '/notifications/new/21')
        const data = await res.json()
        return data
    }

    async function getOldNotifications() {
        const res = await httpReq.get(API_BASE_URL + '/notifications/old/21')
        const data = await res.json()
        return data
    }

    async function clearNewNotifications() {
        const body = { user_id : userID }
        const res = await httpReq.put(API_BASE_URL +  '/notifications/clear_new', body)
        const data = await res.json()
        refetchNew()
        refetchOld()
        return data
    }

    const queries = useQueries([
        { queryKey: ['newNotifications', 1], queryFn: getNewNotifications , refetchInterval : 15000 },
        { queryKey: ['oldNotifications', 2], queryFn: getOldNotifications },
        { queryKey: ['oldNotifications', 3], queryFn: clearNewNotifications, enabled : false },
    ])

    const { data: recent, refetch: refetchNew  } = queries[0]
    const { data: old, refetch: refetchOld } = queries[1]
    const { refetch : clearRecentNotifications } = queries[2]

    interface Notifications {
        recent: [],
        old: []
    }

    let notifications: Notifications = {
        recent : [],
        old : []
    }

    interface Amount {
        recent : number,
        old : number
    }

    let amount: Amount = {
        recent : 0,
        old : 0,
    }

    if( recent && old) {
        notifications = { 
            recent : JSON.parse( recent.new_notifications ),  
            old : JSON.parse( old.old_notifications )
        }
    
        amount = {
            recent : notifications.recent.length,
            old : notifications.old.length
        }
    }


    return {notifications, amount, clearRecentNotifications }
}