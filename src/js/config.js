export const routes = [
  { label: "Home", path: "./src/recipes.html" },
  { label: "Calendar", path: "./src/calendar.html" },
];

export const API_ENDPOINT = () => {
  const savedUrl = localStorage.getItem("apiUrl");
  if (savedUrl) {
    return savedUrl;
  }

  const newUrl = prompt("Please enter the API endpoint URL:");
  localStorage.setItem("apiUrl", newUrl);
  return newUrl;
};
