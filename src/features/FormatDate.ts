export function formatTimeDifference(inputDate: Date) {
  const currentDate: any = new Date();
  const targetDate: any = new Date(inputDate);

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - targetDate;

  // Convert milliseconds to hours, minutes, and days
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Check the difference and return the appropriate string
  if (timeDifference < 60 * 60 * 1000) {
    if (minutesDifference < 1){
      return `less than minute`
    }
    return `${minutesDifference} Minutes ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    return `${hoursDifference} hours ago`;
  } else {
    return `${daysDifference} days ago`;
  }
}