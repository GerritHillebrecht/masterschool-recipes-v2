export function createDateFromInputs(dateValue, timeValue) {
  const [year, month, day] = dateValue.split("-");
  const [hours, minutes] = timeValue.split(":");

  return new Date(year, month - 1, day, hours, minutes);
}
