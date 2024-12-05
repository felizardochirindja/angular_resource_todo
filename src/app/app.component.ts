import { Component, effect, inject, OnDestroy, OnInit, ResourceStatus } from '@angular/core';
import { TodoService } from './todo.service';
import { map, Subject, takeUntil } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  imports: [ReactiveFormsModule]
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  todoService = inject(TodoService);

  // data logic
  todos = this.todoService.todos;
  todo = this.todoService.todo;

  // template logic
  todoControl = new FormControl();

  // react to changes in the select todo element using declarative approach
  selectTodo$ = this.todoControl.valueChanges.pipe(
    takeUntil(this.destroy$),
    map(id => Number(id)),
    map(id => this.todoService.selectedTodoId.set(id))
  );

  // react to changes in the select todo element using imperative approach
  selectTodo(event: Event) {
    const id = (event.target as HTMLInputElement).value;
    
    this.todoService.selectedTodoId.set(Number(id));
  }

  eff = effect(() => {
    console.log(ResourceStatus[this.todo.status()]);
    console.log(this.todo.value()?.todo);
  });

  ngOnInit() {
    this.selectTodo$.subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export interface Todo {
  id: number
  todo: string
  completed: boolean
}

export type ApiResponse<T> = {
  todos: T[]
  total: number
  skip: number
  limit: number
}
