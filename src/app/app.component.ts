import { Component, effect, inject, ResourceStatus } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todoService = inject(TodoService);

  todos = this.todoService.todos;
  todo = this.todoService.todo;

  selectTodo(event: Event) {
    const id = (event.target as HTMLInputElement).value;
    
    this.todoService.selectedTodoId.set(Number(id));
  }

  eff = effect(() => {
    console.log(ResourceStatus[this.todo.status()]);
    console.log(this.todo.value()?.todo);
  });
}

export interface Todo {
  id: number
  todo: string
  completed: boolean
}

export interface TodoResponse {
  todos: Todo[]
  total: number
  skip: number
  limit: number
}
