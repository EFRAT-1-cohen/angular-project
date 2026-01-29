import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProject } from './task-project';

describe('TaskProject', () => {
  let component: TaskProject;
  let fixture: ComponentFixture<TaskProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
