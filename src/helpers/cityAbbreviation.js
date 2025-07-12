export const replaceAbbreviation = (city) => {
  const lowerCaseSity = city.toLowerCase();

  if (cityAbbreviations[lowerCaseSity]) {
    return cityAbbreviations[lowerCaseSity];
  }

  return city;
};

const cityAbbreviations = {
  мск: "Москва",
  спб: "Санкт-Петербург",
  нск: "Новосибирск",
};
