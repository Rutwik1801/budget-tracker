export const  getFormattedDate = (date: Date) => {
  return date.toISOString().slice(0,10);
}

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export const getRandomDarkColor = () => {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = Math.floor(Math.random() * 128); // Limiting to darker shades (0-127)
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};