import Flag from 'react-world-flags';

const CountryFlag = ({ countryCode }: { countryCode: string }) => {
  return <Flag height="56" code={countryCode.toUpperCase()} />;
};

export default CountryFlag;