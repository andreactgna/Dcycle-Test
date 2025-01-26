import { useEffect, useState } from "react";
import CountryFlag from "./countryFlag"
import { IoMdFemale, IoMdMale, IoMdHappy  } from "react-icons/io";

interface Props {
  results: Results
}

const Results = ({ results }: Props) => {
  return (<div>
    <div>
      {results.name}
    </div>
    <div>
      {results.age}
    </div>
    <div>
      {results.agify.gender}
      {results.agify.gender === "male"
        ? <IoMdMale />
        : results.agify.gender === "female" 
        ? <IoMdFemale />
        : <IoMdHappy />}
      {results.agify.probability}
    </div>
    <div>
      {results.country.map((c) => 
        <div>
          <CountryFlag 
            key={c.country_id}
            countryCode={c.country_id} />
          <span>{c.probability}</span>
        </div>
      )}
    </div>
  </div>)
}

export default Results