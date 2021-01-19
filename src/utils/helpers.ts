type ValueArray<T> = (T | null)[];
type ReturnValue<T> = ValueArray<T>[];

export function chunkArray<T>(
  array: ValueArray<T>,
  size: number,
  fillNull: boolean = false,
): ReturnValue<T> {
  const result: ReturnValue<T> = [];

  // chunk
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }

  if (fillNull) {
    // fill remaining with nulls
    const lastChunk = result[result.length - 1];
    const left = size - lastChunk.length;
    for (let i = 0; i < left; i++) {
      lastChunk.push(null);
    }
  }

  return result;
}
