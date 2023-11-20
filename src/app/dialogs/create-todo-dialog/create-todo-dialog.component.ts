import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.scss']
})
export class CreateTodoDialogComponent {
  title: string;
  body: string;
  acceptButtonText: string;
  denyButtonText: string;

  todoForm: FormGroup;

  status_list: any = [];
  priority_list: any = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<CreateTodoDialogComponent>
  ){

  }

  ngOnInit(): void{
    const data = this.data;
    this.title = data.title;
    this.body = data.body;
    this.acceptButtonText = data.acceptButtonText;
    this.denyButtonText = data.denyButtonText;

    this.initData();
    this.buildForm();

  }

  buildForm() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  initData(){
    this.todoService.get_status_list().subscribe(res => {
      if(res.success){
        this.status_list = res.data;
      }else{
        this.snackBarService.showError(res.message);
      }
    });

    this.todoService.get_priority_list().subscribe(res => {
      if(res.success){
        this.priority_list = res.data;
      }else{
        this.snackBarService.showError(res.message);
      }
    });
  }

  submitForm() {
    if (this.todoForm.valid) {
      const formData = this.todoForm.value;
      const title = formData.title;
      const description = formData.description;
      const due_date = formData.dueDate;
      const statusId = formData.status;
      const priorityId = formData.priority;
      
      this.todoService.create_todo(title, description, due_date, statusId, priorityId).subscribe(res => {
        if(res.success){
          this.snackBarService.showSuccess(res.message);
          this.dialogRef.close(true);
        }else{
          this.snackBarService.showError(res.message);
        }
      })  
    } else {
      Object.values(this.todoForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.snackBarService.showError('Please fill out all required fields.');
    }
  }
  

}
