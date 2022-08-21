import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteScrollDemo from "./components/InfiniteScrollDemo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        <div className="max-w-[680px] mx-auto">
          <InfiniteScrollDemo />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
