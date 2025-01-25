import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  const { data, isError, error, isLoading, isFetching } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 10000,
      keepPreviousData: true, // позволяет отображать данные предыдущей страницы пока грузим для текущей, но данные не актуальны
    }
  );

  // isLoading используется когда нет вообще никаких данных и данных из кэша, используем для начальной загрузки
  // isFetching используется когда есть какой либо кэш по этому queryKey, поэтому в этом случае мы отображаем данные из кэша но при этом делаем новый запрос на обновление данных

  if (isLoading) return <h3>Loading...</h3>;
  // if (isFetching) return <h3>Fetching in progress...</h3>;
  if (isError) return <h3>Something went wrong: {error.toString()}</h3>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
