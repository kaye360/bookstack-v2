/**
 * 
 * Custom hook @function useNotifications()
 * 
 * This hook retreives a user's notifications, new and old.
 * 
 */

import httpReq from "./httpReq"
import { API_BASE_URL } from "../config"
import { useQueries } from "react-query"
import { useContext } from "react"
import { UserContext } from "../components/app/UserContextWrapper"

interface Iamount {
    recent : number,
    old : number
}

interface Inotifications {
    recent: [],
    old: []
}

export const useNotifications = (userID: number) => {
    /**
     * Make sure we have a number. Can't do an
     * early return here, otherwise there will 
     * be a conditional hook due to useQuery
     */
    if(typeof userID !== 'number') {
        userID = parseInt(userID)
    }

    const { isLoggedIn } = useContext(UserContext)

    /**
     * 
     * Define queries for get new, get old, and clear new 
     * notifications
     * 
     */
    const queries = useQueries([
        { queryKey: ['newNotifications', 1], queryFn: getNewNotifications , refetchInterval : 15000, enabled : !!isLoggedIn },
        { queryKey: ['oldNotifications', 2], queryFn: getOldNotifications },
        { queryKey: ['oldNotifications', 3], queryFn: clearNewNotifications, enabled : false },
    ])

    /**
     * 
     * Get data and refetch functions from each query
     * 
     */
    const { data: recent, refetch: refetchNew  } = queries[0]
    const { data: old, refetch: refetchOld } = queries[1]
    const { refetch : clearRecentNotifications } = queries[2]

    /**
     * 
     * Early exit if userID is not a number
     * 
     * Note: This must be after useQueries because
     * otherwise there is a conditional hook
     * 
     */
    if( typeof userID !== 'number') {
        return { 
            amount : { recent : 0, old : 0 }, 
            notifications : { recent : [], old: [] }
        }
    } 

    /**
     * 
     * get new, get old, and clear new Query functions
     * 
     */
    async function getNewNotifications() {
        const res = await httpReq.get(API_BASE_URL + '/new-notifications/' + userID)
        return res
    }

    async function getOldNotifications() {
        const res = await httpReq.get(API_BASE_URL + '/old-notifications/' + userID)
        return res
    }

    async function clearNewNotifications() {
        const body = { user_id : userID }
        const res = await httpReq.put(API_BASE_URL +  '/clear-new-notifications/', body)
        refetchNew()
        refetchOld()
        return res
    }

    /**
     * 
     * Return values
     * 
     */
    let notifications: Inotifications = {
        recent : [],
        old : []
    }

    let amount: Iamount = {
        recent : 0,
        old : 0,
    }

    console.log(recent, old)
    if( recent?.success && old?.success ) {
        const newNotifications = JSON.parse( recent.data.new_notifications )
        const oldNotifications = JSON.parse( old.data.old_notifications )


        notifications = { 
            recent : newNotifications ? newNotifications : [],  
            old : oldNotifications ? oldNotifications : []
        }

        console.log(notifications)
        
        amount = {
            recent : notifications.recent.length,
            old : notifications.old.length
        }
    }

    return {notifications, amount, clearRecentNotifications }
}