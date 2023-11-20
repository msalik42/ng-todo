import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TodoService } from './services/todo.service';
import { SnackBarService } from './shared/services/snackbar.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { CreateTodoDialogComponent } from './dialogs/create-todo-dialog/create-todo-dialog.component';
import { EditTodoDialogComponent } from './dialogs/edit-todo-dialog/edit-todo-dialog.component';

enum Status {
  Complete = 1,
  InProgress,
  Cancelled,
}

enum Priority {
  Low = 1,
  Medium,
  High,
}

export interface PeriodicElement {
  title: string;
  description: string;
  due_date: Date;
  status: string;
  priority: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'title', 'description', 'due_date', 'status', 'priority', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  Status: any;
  Priority: any;

  constructor(
    private todoService: TodoService,
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.Status = Status;
    this.Priority = Priority;
    this.initData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initData() {
    this.todoService.get_todo_list().subscribe(res => {
        if (res.success) {
          this.dataSource.data = res.data;
        } else {
          this.snackBarService.showError(res.message);
        }
      },
      (error) => {
        this.snackBarService.showError('Error fetching data from the API');
      }
    );
  }
  openDeleteTodoConrimationDialog(todo: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { 
        todo,
        title: "Delete",
        body: "Are you sure you want to delete?",
        acceptButtonText: "Yes",
        denyButtonText: "No"
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.todoService.delete_todo(todo.id).subscribe(res => {
          if(res.success){
            this.snackBarService.showSuccess(res.message);
            this.initData();
          }else{
            this.snackBarService.showError(res.message);
          }
        })
      }
    })
  }
  openCreateTodoDialog(){
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      width: '400px',
      data: { 
        title: "Create Todo",
        acceptButtonText: "Create",
        denyButtonText: "Cancel"
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.initData();
      }
    })
  }

  openUpdateTodoDialog(todo: any){
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '400px',
      data: { 
        todo,
        title: "Edit Todo",
        acceptButtonText: "Save",
        denyButtonText: "Cancel"
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.initData();
      }
    })
  }
}