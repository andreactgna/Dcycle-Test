import { fetchData } from "api/fetchData";
import Error from "components/error";
import Results from "components/results";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

function Test1(){
  const [name, setName] = useState("");
  const [results, setResults] = useState<Results>()
  const [error, setError] = useState(false)

  const getResults = async () => {
    try {
      setError(false)

      const [gender, nationality, agify] = await Promise.all([
        fetchData("genderize", name),
        fetchData("nationalize", name),
        fetchData("agify", name)
      ]);

      if (!gender.gender && !agify.age) {
        setError(true)
        return undefined
      }

      return {
        name: name,
        agify: gender,
        country: nationality.country,
        age: agify.age
      }
    } catch (error) {
      setError(true)
      console.error("Error obteniendo datos:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col m-auto w-4/3 md:w-3/4 h-72 centered gap-2 bg-white rounded-md shadow-sm">
        <p className="text-3xl tracking-wide font-roboto text-center px-2">Let's check your name</p>
        <div className="centered gap-2">
          <input 
            className="border-gray-300 border-solid border rounded-md p-2"
            value={name} 
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                getResults()
                .then((res) => { res && setResults(res)})
              }
            }}
            onChange={(e) => setName(e.target.value.trim())} />

          <button
            className="btn btn-primary"
            onClick={() => {
              getResults()
              .then((res) => { res && setResults(res)})
            }}> <IoMdSearch className="size-6" /> 
          </button>
        </div>
      </div>
      <div className="w-4/3 md:w-3/4 m-auto mt-4">
      {results && <Results results={results} />}
      {error && 
        <div className="h-96 bg-white centered rounded-md shadow-sm mt-4 m-auto">
          <Error />
        </div>
      }
      </div>

    </div>
  );
}

export default Test1