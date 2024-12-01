export const formatDate = (inputString) => {
  // return input;
  if (!inputString) return "-";

  // Remove the 'Z' at the end if present
  const dateString = inputString.replace("Z", "");

  // Create a Date object
  const dateObject = new Date(dateString);

  // Format the date and time
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");
  const milliseconds = String(dateObject.getMilliseconds()).padStart(3, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
