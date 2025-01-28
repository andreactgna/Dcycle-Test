import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { fetchDataCovid } from "api/fetchData";

export const useCovidData = () => {
  const [date, setDate] = useState("2021-03-07");
  const [results, setResults] = useState<CovidData[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charts, setCharts] = useState<{ cases?: any; hospitalized?: any; deaths?: any }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const result = await fetchDataCovid("covid/historical");
      if (result?.data) {
        const formattedData = result.data.map(formatData);
        setResults(formattedData);
        setCharts({
          cases: generateChartData(formattedData, "total_cases"),
          hospitalized: generateChartData(formattedData, "hospitalized_currently"),
          deaths: generateChartData(formattedData, "total_deaths"),
        });
      }
    } catch (err) {
      setError(true);
      console.error("Error obteniendo datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatData = (data: any): CovidData => ({
    date: data.date,
    states: data.states,
    total_cases: data.cases.total.value,
    total_tests: data.testing.total.value,
    total_deaths: data.outcomes.death.total.value,
    hospitalized_currently: data.outcomes.hospitalized.currently.value,
    in_icu_currently: data.outcomes.hospitalized.in_icu.currently.value,
    on_ventilator_currently: data.outcomes.hospitalized.on_ventilator.currently.value,
  });

  const getDataByDate = (selectedDate: string): CovidData | undefined => {
    return results?.find((data) => data.date === selectedDate);
  };

  const generateChartData = (dataArray: CovidData[], key: keyof CovidData) => {
    const months = generateMonths();
    const monthlyData: Record<string, number> = months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {});

    dataArray.forEach((data) => {
      const month = dayjs(data.date).format("MMM, YY");
      if (monthlyData[month] !== undefined) {
        monthlyData[month] += (data[key] as number) || 0;
      }
    });

    return {
      series: [{ name: key, data: Object.values(monthlyData) }],
      options: {
        chart: { toolbar: { show: false } },
        stroke: { show: true, curve: "smooth" },
        xaxis: { categories: Object.keys(monthlyData) },
      },
    };
  };

  const generateMonths = () => {
    const start = dayjs("2020-01-01");
    const end = dayjs("2021-03-07");
    const months: string[] = [];

    let current = start;
    while (current.isBefore(end) || current.isSame(end, "month")) {
      months.push(current.format("MMM, YY"));
      current = current.add(1, "month");
    }
    return months;
  };

  return { date, setDate, error, loading, charts, getDataByDate };
};
