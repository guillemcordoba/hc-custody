import { Injectable } from '@angular/core';
import { Traceable } from '../state/trace.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraceableService {
  constructor() {}

  public loadTraceables(): Observable<Traceable[]> {
    return of([
      {
        id: 'miyd',
        name: 'My item',
        description: 'this is a very cool object',
        owner: 'ownerperson',
        holder: 'holderperson',

        transfers: []
      }
    ]);
  }
}
