import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApiResponse, Todo } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://dummyjson.com/todos';

  selectedTodoId = signal<number | null>(null);

  todos = rxResource({
    loader: () => this.http.get<ApiResponse<Todo>>(this.baseUrl),
  });

  todo = rxResource({
    request: () => this.selectedTodoId(),
    loader: ({ request: id }) => this.http.get<Todo>(`${this.baseUrl}/${id}`),
  });
}
