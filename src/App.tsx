import './App.css';
import { AuthProvider } from './provider/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query'

import Routes from './routes'

const queryClient = new QueryClient()

function App() {
  return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		 </QueryClientProvider>
  );
}

export default App;
