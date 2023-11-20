import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoDialogComponent } from './create-todo-dialog.component';

describe('CreateTodoDialogComponent', () => {
  let component: CreateTodoDialogComponent;
  let fixture: ComponentFixture<CreateTodoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTodoDialogComponent]
    });
    fixture = TestBed.createComponent(CreateTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
