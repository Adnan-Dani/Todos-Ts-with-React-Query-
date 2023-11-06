import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";


const TodoForm = () => {
    const ref = useRef<HTMLInputElement>(null);
    const addTodo = useAddTodo(() => { if (ref.current) ref.current.value = "" })

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
                    <button className="btn btn-primary" type="submit">{addTodo.isPending ? "Adding..." : "Add"}</button>
                </div>
            </form>
        </>
    )
}

export default TodoForm