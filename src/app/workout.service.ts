import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from './model/workout';
import {CreateWorkoutResponse} from "./model/create-workout-response";
import {UpdateWorkoutResponse} from "./model/update-workout-response";
import {DeleteWorkoutResponse} from "./model/delete-workout-response";

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

  createWorkout(workout: Workout): Observable<CreateWorkoutResponse> {
    return this.httpClient.post<CreateWorkoutResponse>(`${this.baseUrl}/create`, workout);
  }

  updateWorkout(id: number, workout: Workout): Observable<UpdateWorkoutResponse> {
    return this.httpClient.put<UpdateWorkoutResponse>(`${this.baseUrl}/update/${id}`, workout);
  }

  deleteWorkout(id: number): Observable<DeleteWorkoutResponse> {
    return this.httpClient.delete<DeleteWorkoutResponse>(`${this.baseUrl}/delete/${id}`);
  }
}
