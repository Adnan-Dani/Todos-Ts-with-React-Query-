import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string
}

interface PostQuery {
    pageSize: number
}

const usePosts = (query: PostQuery) =>
    useInfiniteQuery<Post[], Error>({
        queryKey: ["posts", query],
        queryFn: ({ pageParam = 1 }) =>
            axios
                .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _start: (pageParam - 1) * query.pageSize,
                        _limit: query.pageSize
                    }
                })
                .then(res => res.data),
        keepPreviousData: true,
        staleTime: 1 * 60 * 1000, //1m
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        }
    })

export default usePosts;