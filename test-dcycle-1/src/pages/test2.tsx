import { fetchDataCovid } from "api/fetchData"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Test2() {
  const navigate = useNavigate()
  const [date, setDate] = useState("2021-03-07")
  const [results, setResults] = useState<CovidData[]>()
  const [error, setError] = useState(false)

  useEffect(() => {
    getHistorial()
      .then((res) => {
        const data = res.data as any[]

        const newData: CovidData[] = data.map((d) => { return formatData(d) })
        setResults(newData)
      })

  }, [])

  const formatData = (data: any): CovidData => {
    return {
      date: data.date,
      states: data.states,
      total_cases: data.cases.total.value,
      total_tests: data.testing.total.value,
      total_deaths: data.outcomes.death.total.value,
      hospitalized_currently: data.outcomes.hospitalized.currently.value,
      in_icu_currently: data.outcomes.hospitalized.in_icu.currently.value,
      on_ventilator_currently: data.outcomes.hospitalized.on_ventilator.currently.value,
    };
  };


  const getHistorial = async () => {
    try {
      const result = await fetchDataCovid("covid/historical")
      console.log(result)
      return result

    } catch (error) {
      setError(true)
      console.error("Error obteniendo datos:", error);
    }
  }

  const getTotal = (key:string) =>{
    if (!results || results.length === 0) return 0;

    return results.reduce((total, data) =>{
      switch (key) {
        case "total_cases":
          return total + data.total_cases
        case "total_tests":
          return total + data.total_tests
        case "total_deaths":
          return total + data.total_deaths
        case "hospitalized_currently":
          return total + data.hospitalized_currently
        case "in_icu_currently":
          return total + data.in_icu_currently
        case "on_ventilator_currently":
          return total + data.on_ventilator_currently
        default:
          return 0;
      }
    }, 0)
  }
  // date: "YYYY-MM-DD"
  const getData = (date:string): CovidData | undefined =>{
    if (!results || results.length === 0) return undefined;

    return results.find((data) => data.date === date);
  }

  return (
    <>
      <a onClick={() => navigate("/test1")}>Ir a test 1</a>

      <div>Test 2</div>

      <div>
        <input 
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
          }}
          min="2020-01-13"
          max="2021-03-07"
          defaultValue={date}
          type="date" />
      </div>

      <div>
        <div>
          Data for {dayjs(date).format("MMMM DD, YYYY")}
        </div>
        <div>
          <p>Cases</p>
          <span>{getData(dayjs(date).format("YYYY-MM-DD"))?.total_cases}</span>
        </div>
        <div>
          <p>Test</p>
          <span>{getData(dayjs(date).format("YYYY-MM-DD"))?.total_tests}</span>
        </div>
        <div>
          <div>
            <p>Hospitalization</p>
            <span>{getData(dayjs(date).format("YYYY-MM-DD"))?.hospitalized_currently}</span>
          </div>
          <div>
            <p>in ICU</p>
            <span>{getData(dayjs(date).format("YYYY-MM-DD"))?.in_icu_currently}</span>
          </div>
          <div>
            <p>on ventilator</p>
            <span>{getData(dayjs(date).format("YYYY-MM-DD"))?.on_ventilator_currently}</span>
          </div>
        </div>
        <div>
          <p>Outcomes</p>
          <span>{getData(dayjs(date).format("YYYY-MM-DD"))?.total_deaths}</span>
        </div>
      </div>
    </>
  )
}

export default Test2