import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage, // false если lastPage = undefined
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  //   "count": 37,
  //   "next": "https://swapi.dev/api/species/?page=3",
  //   "previous": "https://swapi.dev/api/species/?page=1",
  //   "results": []

  // isLoading когда вообще данных нет отображаем лоадер
  if (isLoading) {
    return <div className="loading">Loading</div>;
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  // isFetching - когда hasNextPage = true, и происходит загрузка сущностей для следующей страницы
  return (
    <>
      {isFetching && <div className="loading">Loading</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data?.pages.map((pageData) => {
          return pageData?.results.map((specie) => {
            return (
              <Species
                key={specie.name}
                name={specie.name}
                language={specie.language}
                eyeColor={specie.averageLifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
