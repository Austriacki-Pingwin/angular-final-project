import { forkJoin, type Observable, of, take } from 'rxjs';

export function mapBlocksToStream<T>(
  ids: string[],
  getFn: (id: string) => Observable<T>,
  emptyValue: T[],
): Observable<T[]> {
  if (!ids.length) {
    return of(emptyValue);
  }

  const streams = ids.map((id) => getFn(id).pipe(take(1)));

  return forkJoin(streams);
}
