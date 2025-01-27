import { fetchDataCovid } from "api/fetchData"
import Card from "components/card"
import Error from "components/error"
import LineChart from "components/lineChart"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

function Test2() {
  const [date, setDate] = useState("2021-03-07")
  const [results, setResults] = useState<CovidData[]>()
  const [error, setError] = useState(false)
  const [dataCases, setDataCases] = useState<any>()
  const [dataHospitalized, setDataHospitalized] = useState<any>()
  const [dataDeaths, setDataDeaths] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getHistorial()
    .then((res) => {
      if (res) {
        const data = res.data as any[]
        
        const newData: CovidData[] = data.map((d) => { return formatData(d) })
        setResults(newData)
        setLoading(false)
      }
    })
  }, [])

  useEffect(() => {
    if (results) {
      setDataCases(generateChartData(results, "total_cases"))
      setDataHospitalized(generateChartData(results, "hospitalized_currently"))
      setDataDeaths(generateChartData(results, "total_deaths"))
    }
  }, [results])

  //based on API response
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
      return result

    } catch (error) {
      setError(true)
      setLoading(false)
      console.error("Error obteniendo datos:", error);
      return undefined
    }
  }

  // date: "YYYY-MM-DD"
  const getData = (date: string): CovidData | undefined => {
    if (!results || results.length === 0) return undefined;

    return results.find((data) => data.date === date);
  }

  const generateMonths = () => {
    const start = dayjs("2020-01-01")
    const end = dayjs("2021-03-07")
    const months: string[] = []

    let current = start

    while (current.isBefore(end) || current.isSame(end, "month")) {
      months.push(current.format("MMM, YY"))
      current = current.add(1, "month")
    }

    return months
  };

  const generateChartData = (dataArray: CovidData[], key: keyof CovidData) => {
    const months = generateMonths()
    const monthlyData: Record<string, number> = {}

    months.forEach((month) => {
      monthlyData[month] = 0
    })

    dataArray.forEach((data) => {
      const month = dayjs(data.date).format("MMM, YY")
      if (monthlyData[month] !== undefined) {
        monthlyData[month] += (data[key] as number) || 0
      }
    })

    return {
      series: [
        {
          name: key,
          data: Object.values(monthlyData), // Los valores agrupados por mes
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        stroke: {
          show: true,
          curve: "smooth",
        },
        xaxis: {
          categories: Object.keys(monthlyData), //"MMM, YY"
        },
      },
    }
  }

  return (
    <>
      <div className="text-2xl md:text-3xl text-center tracking-wide font-roboto">COVID TRACKING</div>
      {!error &&
        <div className="w-4/3 md:w-3/4 m-auto">
          <div className="align justify-between">
            <div className="text-lg md:text-2xl tracking-wide font-roboto">
              Data for {dayjs(date).format("MMMM DD, YYYY")}
            </div>

            <div className="align gap-2">
              <p className="hidden md:block">Select a date:</p>
              <input
                className="border-gray-300 border-solid border rounded-md p-2"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
                min="2020-01-13"
                max="2021-03-07"
                defaultValue={date}
                type="date" />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <Card
              title="Cases"
              colSpan={"col-span-6 md:col-span-4"}
              subtitle={getData(dayjs(date).format("YYYY-MM-DD"))?.total_cases.toString()} />
            <Card
              title="Test"
              colSpan={"col-span-6 md:col-span-4"}
              subtitle={getData(dayjs(date).format("YYYY-MM-DD"))?.total_tests.toString()} />
            <Card
              title="Hospitalization"
              colSpan={"col-span-6 md:col-span-4"}
              subtitle={getData(dayjs(date).format("YYYY-MM-DD"))?.hospitalized_currently.toString()} />
            <Card
              title="In ICU"
              colSpan={"col-span-6 md:col-span-4"}
              subtitle={getData(dayjs(date).format("YYYY-MM-DD"))?.in_icu_currently.toString()} />
            <Card
              title="On ventilator"
              colSpan={"col-span-6 md:col-span-4"}
              subtitle={getData(dayjs(date).format("YYYY-MM-DD"))?.on_ventilator_currently.toString()} />
            <Card
              title="Outcomes"
              colSpan={"col-span-6 md:col-span-4"}
              subtitle={getData(dayjs(date).format("YYYY-MM-DD"))?.total_deaths.toString()} />
          </div>
          <div className="align justify-between">
            <p className="text-lg md:text-2xl tracking-wide font-roboto">
              Resume data from January, 2020 to March, 2021
            </p>
          </div>
          <div className="grid grid-cols-12 gap-4">
            {dataCases &&
              <Card
                title="Cases"
                colSpan={"col-span-12"}
                content={
                  <div>
                    <LineChart
                      chartOptions={dataCases.options}
                      chartData={dataCases.series}
                    />
                  </div>
                } />
            }
            {dataHospitalized &&
              <Card
                title="Hospitalization"
                colSpan={"col-span-12"}
                content={
                  <div>
                    <LineChart
                      chartOptions={dataHospitalized.options}
                      chartData={dataHospitalized.series}
                    />
                  </div>
                } />
            }
            {dataDeaths &&
              <Card
                title="Deaths"
                colSpan={"col-span-12"}
                content={
                  <div>
                    <LineChart
                      chartOptions={dataDeaths.options}
                      chartData={dataDeaths.series}
                    />
                  </div>
                } />
            }
          </div>
        </div>}
      {error &&
        <div className="h-96 bg-white centered rounded-md shadow-sm mt-4 m-auto">
          <Error />
        </div>
      }
    </>
  )
}

export default Test2