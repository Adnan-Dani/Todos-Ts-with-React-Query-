import { useState } from "react"
import usePosts from "../hooks/usePosts"

const PostsList = () => {
    const [page, setPage] = useState<number>(1)
    const pageSize = 10;

    const { data, error, isLoading } = usePosts({ page, pageSize });

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    return (

        <div>
            {/* <select className="form-select" onChange={e => setUserId(parseInt(e.target.value))} >
                <option value="">Select</option>
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
            </select> */}
            <ul>
                {data?.map(post => <li key={post.id}>{post.title}</li>)}
            </ul>
            <button className="btn btn-primary" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            <button className="btn btn-primary ms-1" onClick={() => setPage(page + 1)}>Next</button>
        </div>
    )
}

export default PostsList