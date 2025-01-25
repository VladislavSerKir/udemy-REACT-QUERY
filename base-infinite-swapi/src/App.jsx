import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const querClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={querClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="App">
        <h1>Infinite SWAPI</h1>
        {/* <InfinitePeople /> */}
        <InfiniteSpecies />
      </div>
    </QueryClientProvider>
  );
}

export default App;
