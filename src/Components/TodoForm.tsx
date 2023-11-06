import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
    const queryClient = new QueryClient();
    const ref = useRef<HTMLInputElement>(null);
    const addTodo = useMutation<Todo, Error, Todo>({
        mutationFn: (todo: Todo) =>
            axios.
                post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
                .then(res => res.data),
        onSuccess: (saveTodo, newTodo) => {
            console.log(saveTodo)
            // Approach 1: invalidating the cache
            // queryClient.invalidateQueries({
            //     queryKey: ["todos"]
            // })

            // Approach 2: Updating the data in cache
            queryClient.setQueryData<Todo[]>(['todos'], todos => [saveTodo, ...(todos || [])])
        },

    })
    return (
        <>
            {addTodo.error && <div className="alert alert-danger">{addTodo.error.message}</div>}
            <form onSubmit={e => {
                e.preventDefault();
                if (ref.current && ref.current.value) {
                    addTodo.mutate({
                        id: 0,
                        userId: 1,
                        title: ref.current.value,
                        completed: false
                    })
                }


            }} className="row my-3">
                <div className="col">
                    <input ref={ref} className="form-control" />
                </div>
                <div className="col">
                    <button className="btn btn-primary" type="submit">Add</button>
                </div>
            </form>
        </>
    )
}

export default TodoForm