export class GetTasksResponse {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'normal' | 'high';
  assignee_id: number | null;
  due_date: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}
export class CreateTaskRequest {
  project_id: number;          
  title: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'done';
  priority?: 'low' | 'normal' | 'high';
  assignee_id?: number | null; 
  due_date?: string | null;    
  order_index?: number;         
}
export class UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'done';
  priority?: 'low' | 'normal' | 'high';
  assignee_id?: number| null;
  due_date?: string| null;
  order_index?: number;
}