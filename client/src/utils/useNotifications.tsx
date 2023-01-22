import httpReq from "./httpReq"
import { API_BASE_URL } from "../config"
import { useQueries } from "react-query"
import { useContext } from "react"
import { UserContext } from "../App"

export const useNotifications = (userID: number) => {
    /**
     * Make sure we have a number. Can't do an
     * early return here, otherwise there will 
     * be a conditional render due to useQuery
     */
    if(typeof userID !== 'number') userID = 0


    const { isLoggedIn} = useContext(UserContext)
    
    const queries = useQueries([
        { queryKey: ['newNotifications', 1], queryFn: getNewNotifications , refetchInterval : 15000, enabled : !!isLoggedIn },
        { queryKey: ['oldNotifications', 2], queryFn: getOldNotifications },
        { queryKey: ['oldNotifications', 3], queryFn: clearNewNotifications, enabled : false },
    ])

    const { data: recent, refetch: refetchNew  } = queries[0]
    const { data: old, refetch: refetchOld } = queries[1]
    const { refetch : clearRecentNotifications } = queries[2]
    
    /**
     * Early exit if userID is not a number or set to 0 earlier
     * 
     * Note: This must be after useQueries because
     * otherwise there is a conditional hook
     */
    if( 
        (typeof userID !== 'number') ||
        (userID === 0)
    ) return { 
        amount : { recent : 0, old : 0 }, 
        notifications : { recent : [], old: [] }
    }

    /**
     * Query functions
     */
    async function getNewNotifications() {
        const res = await httpReq.get(API_BASE_URL + '/notifications/new/' + userID)
        return res
    }

    async function getOldNotifications() {
        const res = await httpReq.get(API_BASE_URL + '/notifications/old/' + userID)
        return res
    }

    async function clearNewNotifications() {
        const body = { user_id : userID }
        const res = await httpReq.put(API_BASE_URL +  '/notifications/clear_new', body)
        refetchNew()
        refetchOld()
        return res
    }

    /**
     * Return values
     */
    interface Iamount {
        recent : number,
        old : number
    }

    interface Inotifications {
        recent: [],
        old: []
    }

    let notifications: Inotifications = {
        recent : [],
        old : []
    }

    let amount: Iamount = {
        recent : 0,
        old : 0,
    }

    if( recent?.success && old?.success ) {
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