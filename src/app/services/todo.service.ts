import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/services/http.service";
import { ENDPOINTS } from "./api.collection"; 

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(
    private httpService: HttpService,
  ) {}
  public get_todo_list(){
    return this.httpService.get(ENDPOINTS.TODO);
  }
  public create_todo(title: string, description: string, due_date: Date, statusId: number, priorityId: number){
    const params = {
      title,
      description,
      due_date,
      statusId,
      priorityId
    }
    return this.httpService.post(ENDPOINTS.TODO, params);
  }
  public edite_todo(id: number,title: string, description: string, due_date: Date, statusId: number, priorityId: number){
    const params = {
      title,
      description,
      due_date,
      statusId,
      priorityId
    }
    return this.httpService.put(ENDPOINTS.TODO+'/'+id, params);
  }
  public delete_todo(id: number){
    return this.httpService.delete(ENDPOINTS.TODO+'/'+id);
  }
  public get_status_list(){
    return this.httpService.get(ENDPOINTS.STATUS);
  }
  public get_priority_list(){
    return this.httpService.get(ENDPOINTS.PRIORITY);
  }
}