import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from './workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private baseUrl = 'http://localhost:8080/api/workout';

  constructor(private httpClient: HttpClient) {}

  getWorkoutsList(): Observable<Workout[]> {
    return this.httpClient.get<Workout[]>(`${this.baseUrl}/search`);
  }

  getWorkoutById(id: number): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.baseUrl}/search/${id}`);
  }

  createWorkout(workout: Workout): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/create`, workout);
  }

  updateWorkout(id: number, workout: Workout): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/update/${id}`, workout);
  }

  deleteWorkout(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }
}
