import {Component, OnInit, ViewChild} from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {Table} from "primeng/table";

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  workout: Workout = new Workout();
  workouts: Workout[] = [];
  activeWorkout: Workout | null = null;
  initialName: string = '';
  initialDescription: string = '';

  constructor(
    private workoutService: WorkoutService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getWorkouts();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onSubmit() {
    this.saveWorkout();
  }

  private getWorkouts() {
    this.workoutService.getWorkoutsList().subscribe((data) => {
      this.workouts = data.map((workout) => ({...workout, editable: false}));
    });
  }

  private saveWorkout() {
    this.workoutService.createWorkout(this.workout).subscribe((data) => {
      this.getWorkouts();
      this.workout = new Workout();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Workout created successfully', life: 3000 });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create workout', life: 3000 });
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
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Workout updated successfully', life: 3000 });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update workout', life: 3000 });
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

  showConfirmationDialog(event: MouseEvent, workout: Workout) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this workout?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteWorkout(workout);
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Workout deleted', life: 3000});
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'Deletion cancelled', life: 3000});
      }
    });
  }
}
