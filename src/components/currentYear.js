export function getCurrentYear() {
  const currentYear = new Date().getUTCFullYear();
  const yearElement = document.getElementById("currentYear");
  yearElement.textContent = currentYear;
}
