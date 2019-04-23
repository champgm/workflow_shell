export function flattenArray(input: any[][]): any[] {
  const empty: any[] = [];
  return empty.concat.apply([], input);
}