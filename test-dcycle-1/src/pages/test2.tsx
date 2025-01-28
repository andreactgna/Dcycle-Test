import { useCovidData } from "hooks/useCovidData";
import Card from "components/card";
import Error from "components/error";
import LineChart from "components/lineChart";
import DatePicker from "components/datePicker";
import dayjs from "dayjs";

function Test2() {
  const { date, setDate, error, loading, charts, getDataByDate } = useCovidData();

  return (
    <>
      <h1 className="text-2xl md:text-3xl text-center font-roboto">COVID TRACKING</h1>

      {!error && !loading ? 
        <div className="w-4/3 md:w-3/4 m-auto">
          <div className="align justify-between">
            <p className="text-lg md:text-2xl font-roboto">
              Data for {dayjs(date).format("MMMM DD, YYYY")}
            </p>
            <DatePicker date={date} setDate={setDate} />
          </div>

          <div className="grid grid-cols-12 gap-4">
            {["total_cases", "total_tests", "hospitalized_currently", "in_icu_currently", "on_ventilator_currently", "total_deaths"].map((key) => (
              <Card
                key={key}
                title={key.replace(/_/g, " ")}
                colSpan="col-span-6 md:col-span-4"
                subtitle={getDataByDate(date)?.[key as keyof CovidData]?.toString() || "N/A"}
              />
            ))}
          </div>

          <h2 className="text-lg md:text-2xl font-roboto text-center my-6">
            Resume data from January, 2020 to March, 2021
          </h2>

          <div className="grid grid-cols-12 gap-4">
            {charts.cases && 
              <Card 
                title="Cases" 
                colSpan="col-span-12" 
                content={
                  <LineChart 
                    chartOptions={charts.cases.options} 
                    chartData={charts.cases.series} />} />
            }
            {charts.hospitalized && 
              <Card 
                title="Hospitalization" 
                colSpan="col-span-12" 
                content={
                  <LineChart 
                    chartOptions={charts.hospitalized.options} 
                    chartData={charts.hospitalized.series} />} />
            }
            {charts.deaths && 
              <Card 
                title="Deaths" 
                colSpan="col-span-12" 
                content={
                  <LineChart 
                    chartOptions={charts.deaths.options} 
                    chartData={charts.deaths.series} />} />
            }
          </div>
        </div>
       : error ? <Error />
       : <div className="centered h-56"><div className="loader" /></div>
      }
    </>
  );
}

export default Test2;
