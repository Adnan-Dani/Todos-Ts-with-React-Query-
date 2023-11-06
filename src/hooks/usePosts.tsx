import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface Post {
    id: number;
    userId: number;
    title: string;
    body: string
}

interface PostQuery {
    page: number
    pageSize: number
}

const usePosts = (query: PostQuery) => {

    return useQuery<Post[], Error>({
        queryKey: ["posts", query],
        queryFn: () =>
            axios
                .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _start: (query.page - 1) * query.pageSize,
                        _limit: query.pageSize
                    }
                })
                .then(res => res.data),
        keepPreviousData: true,
        staleTime: 1 * 60 * 1000, //1m
    })
}
export default usePosts;