export const calcTitme = (time: number): string => {
  const hours: number = Math.floor(time / 60);
  const mins: number = time % 60;

  return `${hours}시간 ${mins}분`;
};

export const convertMoney = (money: number): string => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return formatter.format(money);
};

export const isPersistedState = (statename: string): any => {
  const sessionState = sessionStorage.getItem(statename);

  return sessionState && JSON.parse(sessionState);
};
