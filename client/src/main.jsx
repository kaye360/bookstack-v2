import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import App from './App'
import './index.css'
import { createContext } from 'react'
import useAuth from './utils/useAuth'

const queryClient = new QueryClient()
export const UserContext = createContext( false )


function UserContextWrapper({children}) {

	const Auth = useAuth()

	return <UserContext.Provider value={Auth}>
		{children}
	</UserContext.Provider>
}



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={ queryClient }>
			<BrowserRouter>
				<UserContextWrapper>
					<App />
				</UserContextWrapper>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
)


