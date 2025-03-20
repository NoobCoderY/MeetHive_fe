
/**
 * Formats a date string into a readable format (e.g., "26 September 2024").
 *
 * @param {any} createdAt - The date string or timestamp to format.
 * @returns {React.ReactNode} The formatted date string or undefined if `createdAt` is not provided.
 *
 * @example
 * ChangeFormattedDate('2024-09-26T12:00:00Z'); // "26 September 2024"
 */
export function ChangeFormattedDate(createdAt: any): React.ReactNode {
  if (createdAt) {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  }
}
