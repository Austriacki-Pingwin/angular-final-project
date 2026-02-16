import { combineLatest, type Observable, of } from 'rxjs';

export function mapBlocksToStream<T>(
  ids: string[],
  getFn: (id: string) => Observable<T>,
  emptyValue: T[],
): Observable<T[]> {
  if (ids === null || ids === undefined || !ids.length) {
    return of(emptyValue);
  }

  const streams = ids.map((id) => getFn(id));

  return combineLatest(streams);
}
