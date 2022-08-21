import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { InView } from "react-intersection-observer";
import Card from "./ui/Card";
import Spinner from "./ui/Spinner";

type Props = {};

export function getSampleData(pageParam: number) {
  const cursor = +pageParam || 0;
  const pageSize = 5;

  const data = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      return {
        name: "Project " + (i + cursor) + ` (server time: ${Date.now()})`,
        id: i + cursor,
      };
    });

  const nextId = data[data.length - 1].id + 1;
  const previousId = data[0].id - pageSize;

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
            {page.data.map((project) => {
              return (
                <Card key={project.id} className="p-5 min-h-[300px] mb-8">
                  {project.name}
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
