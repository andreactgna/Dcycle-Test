import { render, screen, fireEvent } from "@testing-library/react";
import Results from "./results";

const results: Results = {
    name:"andrea",
    age: 52,
    country:[
        {
            "country_id": "HU",
            "probability": 0.19035772539621967
        },
    ],
    agify: {gender:"female", probability:.93}
}

describe("Test1 Component", () => {

  it("should render results of given input", () => {
    render(<Results results={results} />);

    expect(screen.getByText(/andrea/i)).toBeInTheDocument();
    expect(screen.getByText(/female/i)).toBeInTheDocument();
    expect(screen.getByText(/93/i)).toBeInTheDocument();
    expect(screen.getByText(/HU/i)).toBeInTheDocument();
    expect(screen.getByText(/19/i)).toBeInTheDocument();


  });
});