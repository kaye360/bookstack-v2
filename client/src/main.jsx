import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import App from './App'
import './index.css'
import UserContextWrapper from './components/app/UserContextWrapper'


const queryClient = new QueryClient()




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


