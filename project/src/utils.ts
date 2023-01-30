export const scrollUp = (scrollToOptions: ScrollToOptions) => window.scrollTo(scrollToOptions);


export const getHumanizeDateDayMounth = (date: string) =>
  new Date(date).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
