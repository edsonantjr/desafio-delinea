import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Candidate } from '../interfaces/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient,
  ) { }

  register(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`${environment.api}/candidate/`, candidate, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map(res => res)
    );
  }

  getAll(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${environment.api}/candidate/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map(res => res)
    );
  }

  getById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${environment.api}/candidate/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map(res => res)
    );
  }

  update(candidate: Candidate, id: number) {
    return this.http.put<Candidate>(`${environment.api}/candidate/${id}`, candidate, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map(res => res)
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${environment.api}/candidate/${id}/delete`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`
      })
    }).pipe(
      map(res => res)
    )
  }


}
