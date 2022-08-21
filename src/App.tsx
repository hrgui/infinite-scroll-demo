import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteScrollDemo from "./components/InfiniteScrollDemo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        <InfiniteScrollDemo />
      </div>
    </QueryClientProvider>
  );
}

export default App;
