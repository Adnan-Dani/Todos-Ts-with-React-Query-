import { useQuery } from "@tanstack/react-query"
import axios from "axios"


interface Todo {
    id: number;
    title: string

}
const TodoList = () => {
    const fetchTodos = () =>
        axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos").then(res => res.data);

    const { data, error } = useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })
    if (error) return <p>{error.message}</p>
    return (
        <div>TodoList
            <ul>
                {data?.map(todo => <li key={todo.id}>{todo.title}</li>)}
            </ul>
        </div>
    )
}

export default TodoList