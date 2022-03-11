import getCountryTwoLetterCode from './countryCodes';

const MAP_BASE_URL = 'https://raw.githubusercontent.com/gtekle/mapsicon/master/all/';

const getCounryMapUrl = (countryName, mapSize) => {
  const countryCode = getCountryTwoLetterCode(countryName);
  if (countryCode === undefined) return 'https://raw.githubusercontent.com/gtekle/mapsicon/master/all/ad/128.png';
  return `${MAP_BASE_URL}${countryCode}/${mapSize}.png`;
};

export default getCounryMapUrl;
