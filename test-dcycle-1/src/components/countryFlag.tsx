import Flag from 'react-world-flags';

const CountryFlag = ({ countryCode }: { countryCode: string }) => {
  return <Flag code={countryCode.toUpperCase()} />;
};

export default CountryFlag;