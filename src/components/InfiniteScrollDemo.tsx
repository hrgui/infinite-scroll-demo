import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { InView } from "react-intersection-observer";
import Card from "./ui/Card";
import Spinner from "./ui/Spinner";
import { faker } from "@faker-js/faker";
import Skeleton from "./ui/Skeleton";

type Props = {};

const LIMIT = 1000;
export function getSampleData(pageParam: number) {
  const cursor = +pageParam || 0;
  const pageSize = 5;

  const data = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      const id = i + cursor;
      return {
        name: faker.name.firstName(),
        description: faker.lorem.paragraph(),
        thumbnail: `https://placedog.net/100/100?id=${id}`,
        postImage: `https://placedog.net/600/600?id=${id}`,
        id,
      };
    });

  const nextId = cursor < LIMIT ? data[data.length - 1].id + 1 : null;
  const previousId = cursor < -LIMIT ? data[0].id - pageSize : null;

  return { data, nextId, previousId };
}

function sleep(timeMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
}

async function fetchPage(pageParam = 1) {
  await sleep(500);
  return getSampleData(pageParam);
}

const InfiniteScrollDemo = (props: Props) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["items"],
    ({ pageParam = 1 }) => fetchPage(pageParam),
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center mt-4">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    <div className="mt-6 p-4">
      {data?.pages.map((page) => {
        return (
          <React.Fragment key={page.nextId}>
            {page.data.map(({ id, name, postImage, thumbnail, description }) => {
              return (
                <Card key={id} className="min-h-[300px] mb-8">
                  <div className="sr-only">Dog {id}</div>
                  <div className="p-5 flex items-center gap-3">
                    <img
                      loading="lazy"
                      className="w-10 h-10 rounded-full"
                      src={thumbnail}
                      alt={thumbnail}
                    />
                    <span className="font-semibold">{name}</span>
                  </div>
                  <div className="min-h-[300px] relative bg-black">
                    <Skeleton className="animate-pulse w-full h-full absolute z-0" />
                    <img
                      loading="lazy"
                      className="w-full min-h-[300px] relative z-10"
                      src={postImage}
                      alt=""
                    />
                  </div>
                  <div className="p-5">{description}</div>
                </Card>
              );
            })}
          </React.Fragment>
        );
      })}

      <InView
        as="div"
        className="flex justify-center items-center"
        onChange={(inView, entry) => inView && fetchNextPage()}
      >
        {hasNextPage ? <Spinner /> : null}
      </InView>
    </div>
  );
};

export default InfiniteScrollDemo;
