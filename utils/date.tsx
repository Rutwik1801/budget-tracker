export const  getFormattedDate = (date: Date) => {
  return date.toISOString().slice(0,10);
}

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
};