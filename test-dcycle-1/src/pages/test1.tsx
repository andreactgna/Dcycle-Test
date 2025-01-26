import { fetchData } from "api/fetchData";
import Results from "components/results";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Test1(){
  const navigate = useNavigate()
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
    <div>
      <a onClick={() => navigate("/test2")}>Ir a test 2</a>
      <input 
        value={name} 
        onKeyUp={(e) => {
          if (e.key == "Enter") {
            getResults()
            .then((res) => { res && setResults(res)})
          }
        }}
      onChange={(e) => setName(e.target.value.trim())} />

    <button
      onClick={() => {
        getResults()
        .then((res) => { res && setResults(res)})
      }}> Send 
    </button>

    {results && <Results results={results} />}
    {error && <>Error</>}
    </div>
  );
}

export default Test1