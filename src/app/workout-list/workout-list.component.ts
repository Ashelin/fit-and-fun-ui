import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  workout: Workout = new Workout();
  workouts: Workout[] = [];
  activeWorkout: Workout | null = null;
  initialName: string = '';
  initialDescription: string = '';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  onSubmit() {
    this.saveWorkout();
  }

  private getWorkouts() {
    this.workoutService.getWorkoutsList().subscribe((data) => {
      this.workouts = data.map((workout) => ({ ...workout, editable: false }));
    });
  }

  private saveWorkout() {
    this.workoutService.createWorkout(this.workout).subscribe((data) => {
      this.getWorkouts();
      this.workout = new Workout();
    });
  }

  editWorkout(workout: Workout) {
    if (this.activeWorkout !== null && this.activeWorkout !== workout) {
      this.activeWorkout.editable = false;
    }
    this.activeWorkout = workout;
    workout.editable = true;
    this.initialName = workout.name;
    this.initialDescription = workout.description;
  }

  updateWorkout(workout: Workout) {
    this.workoutService.updateWorkout(workout.id, workout).subscribe(() => {
      workout.editable = false;
      this.activeWorkout = null;
      this.getWorkouts();
    });
  }

  deleteWorkout(workout: Workout) {
    this.workoutService.deleteWorkout(workout.id).subscribe(() => {
      this.workouts = this.workouts.filter((w) => w !== workout);
    });
  }

  cancelEdit(workout: Workout) {
    workout.name = this.initialName;
    workout.description = this.initialDescription;
    workout.editable = false;
    this.activeWorkout = null;
  }
}
