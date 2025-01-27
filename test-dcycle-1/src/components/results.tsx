import { useEffect, useState } from "react";
import CountryFlag from "./countryFlag"
import { IoMdFemale, IoMdMale, IoMdHappy  } from "react-icons/io";

interface Props {
  results: Results
}

const Results = ({ results }: Props) => {
  return (<div className="p-4 bg-white shadow-sm flex flex-col">
    <div className="capitalize text-2xl font-bold text-center">
      {results.name}, 
      &nbsp;
      {results.age}
    </div>
    <div className="centered gap-2">
      <div className="capitalize text-lg align gap-2">
        {results.agify.gender}
        {results.agify.gender === "male"
          ? <IoMdMale className="size-6 text-blue-600" />
          : results.agify.gender === "female" 
          ? <IoMdFemale className="size-6 text-pink-600" />
          : <IoMdHappy className="size-6 text-yellow-500" />
        }
      </div>
      <div className="centered gap-2">
        <progress 
          className="h-10"
          value={results.agify.probability} />
        {results.agify.probability * 100} %
      </div>
      
    </div>
    <div className="flex flex-col gap-2">
      {results.country.map((c) => 
        <div
          key={c.country_id}
          className="align justify-between">
          <CountryFlag 
            countryCode={c.country_id} />
            <p className="mr-auto ml-4">{c.country_id}</p>
          <div className="align gap-2">
            <progress 
              className="h-10"
              value={c.probability} />
            {Math.round(c.probability * 100)} %
          </div>
        </div>
      )}
    </div>
  </div>)
}

export default Results