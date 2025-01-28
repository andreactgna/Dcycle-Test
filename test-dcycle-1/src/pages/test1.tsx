import Error from "components/error";
import Results from "components/results/results";
import SearchBar from "components/searchBar";
import { useFetchResults } from "hooks/useFetchResults";

function Test1(){
  const { results, error, loading, getResults } = useFetchResults();

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col m-auto w-4/3 md:w-3/4 h-72 centered gap-2 bg-white rounded-md shadow-sm">
        <p className="text-3xl tracking-wide font-roboto text-center px-2">
          Let's check your name
        </p>
        <SearchBar onSearch={getResults} />
      </div>

      <div className="w-4/3 md:w-3/4 m-auto mt-4">
        {loading && <div className="centered h-56"><div className="loader" /></div>}
        {results && <Results results={results} />}
        {error && (
          <div className="h-96 bg-white centered rounded-md shadow-sm mt-4 m-auto">
            <Error />
          </div>
        )}
      </div>
    </div>
  );
}

export default Test1