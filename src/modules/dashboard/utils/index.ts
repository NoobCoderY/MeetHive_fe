/**
 * Converts an ISO 8601 date string to a YYYY-MM-DD format.
 * @param isoDate - The ISO 8601 date string to convert.
 * @returns The formatted date as a string in YYYY-MM-DD format.
 */
export function convertIsoToDate(isoDate: string | undefined ): string {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

