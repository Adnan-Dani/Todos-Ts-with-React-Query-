import './App.css'
import PostsList from './Components/PostsList';
import TodoList from './Components/TodoList'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <TodoList />
          </div>
          <div className="col-md-6">
            <PostsList />
          </div>
        </div>
      </div>


      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
