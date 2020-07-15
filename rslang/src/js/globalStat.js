import apiService from './GetData';

export const getStatistics = async () => {
  const data = await apiService.getStatistics()
    .then((response) => {
      if (!response) return;
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return data.data;
};

export const createStatData = async (amount, appToSet, dateToSet) => {
  let newStat = null;
  let index = 1;
  await apiService.getStatistics()
    .then((response) => {
      console.log(response);
      const newLearnedWords = response.data.learnedWords + amount;
      index = Object.keys(response.data.optional).length + 1;
      newStat = {
        learnedWords: newLearnedWords,
        optional: {
          ...response.data.optional,
          [index]: {
            words: amount,
            app: appToSet,
            date: dateToSet,
          },
        },
      };
    })
    .catch((error) => {
      if (error.response.status === 404) {
        newStat = {
          learnedWords: amount,
          optional: {
            [index]: {
              words: amount,
              app: appToSet,
              date: dateToSet,
            },
          },
        };
      } else throw new Error(error.response.data);
    });
  await apiService.upsetStatistics(newStat)
    .then((response) => {
      if (!response) return;
      console.log(response);
    });

  return newStat;
};

export default {};
