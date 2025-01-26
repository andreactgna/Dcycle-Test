declare global{
  interface Results{
    name: string
    country: Nationalize[]
    agify: Gender
    age: number
  }

  interface Nationalize{
    country_id: string,
    probability: number
  }

  interface Gender{
    gender: string,
    probability: number
  }
  
  interface CovidData {
    date: string;
    states: number;
    total_cases: number;
    total_tests: number;
    total_deaths: number;
    hospitalized_currently: number;
    in_icu_currently: number;
    on_ventilator_currently: number;
  }

}

export {}