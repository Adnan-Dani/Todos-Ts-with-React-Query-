import useTodos from "../hooks/useTodos"

const TodoList = () => {

    const { data, error, isLoading } = useTodos()
    if (isLoading) return <p>Loading...</p>
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