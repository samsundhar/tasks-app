import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import * as $ from "jquery";
declare var $: any;

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToDoListComponent implements OnInit {
  cols = [
    { value: 'todo', viewValue: 'To Do' },
    { value: 'doing', viewValue: 'Doing' },
    { value: 'done', viewValue: 'Done' },
  ]
  todo = new Array;
  doing = new Array;
  done = new Array;
  // todo = [
  //   { title: 'Get to work', description: 'This is a sample description' },
  //   { title: 'Pick up groceries', description: 'This is a sample description' },
  //   { title: 'Go home', description: 'This is a sample description' },
  //   { title: 'Fall asleep', description: 'This is a sample description' }
  // ];
  // doing = [
  //   { title: 'Working', description: 'This is a sample description' }
  // ];
  // done = [
  //   { title: 'Get up', description: 'This is a sample description' },
  //   { title: 'Brush teeth', description: 'This is a sample description' },
  //   { title: 'Take a shower', description: 'This is a sample description' },
  //   { title: 'Check e-mail', description: 'This is a sample description' },
  //   { title: 'Walk dog', description: 'This is a sample description' }
  // ];
  userForm: any;
  all_data: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  edit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [100000 + Math.floor(Math.random() * 900000)],
      title: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      description: ['', [Validators.required, Validators.minLength(25)]],
      column: ['todo', Validators.required]
    });
    this.getAllTasks();
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    // console.log(event.previousContainer.data)
    // console.log(event.currentIndex)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(event.container.data)
    console.log(event.container.data[event.currentIndex])
  }
  addTask() {
    this.edit = false;
    this.userForm.reset();
    this.userForm.patchValue({
      id: 100000 + Math.floor(Math.random() * 900000),
      column: 'todo'
    });
    this.openModal();
  }
  openModal() {
    $('#exampleModal').modal('show');
  }
  closeModal() {
    $('#exampleModal').modal('hide');
  }
  getAllTasks() {
    this.taskService.getTasks().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.all_data = res.data;
      this.processData(res.data);
    })
  }
  onFormSubmit() {
    // console.log("title:" + this.form.title.value)
    // console.log("description:" + this.form.description.value)
    // console.log("column:" + this.form.column.value)
    console.log("form:" + JSON.stringify(this.userForm.value))
    // this.taskService.test().pipe(takeUntil(this.destroy$)).subscribe((res: any[]) => {
    //   console.log(res)
    // });
    if (this.edit == true) {
      this.taskService.editTask(this.userForm.get('id').value, this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
        console.log(res.message)
        console.log(res.data)
        this.processData(res.data)
      });

    } else {
      this.taskService.addTask(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
        console.log(res.message)
        console.log(res.data)
        this.processData(res.data)
      });
    }

    this.closeModal()
    this.userForm.reset();
    this.userForm.patchValue({
      id: 100000 + Math.floor(Math.random() * 900000),
      column: 'todo'
    });
    // console.log(this.taskService.test());
    // this.taskService.addTask(this.userForm.value);
  }
  deleteClick(item) {
    // console.log("delete clicked");
    if (confirm("Are you sure to delete " + item.title)) {
      // this.all_data = this.all_data.filter(x => x.id != item.id);
      // console.log(this.all_data.filter(x => x.id != item.id));
      this.taskService.deleteTask(item.id).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
        console.log(res.message)
        console.log(res.data)
        this.processData(res.data)
      });
      // this.processData(this.all_data);
    }
  }
  editTask(item) {
    console.log(item);
    this.openModal();
    this.edit = true;
    this.userForm.reset();
    this.userForm.patchValue({
      id: item.id,
      title: item.title,
      description: item.description,
      column: item.column
    });
  }
  processData(data: any) {
    this.todo = data.filter(x => x.column == 'todo');
    this.doing = data.filter(x => x.column == 'doing');
    this.done = data.filter(x => x.column == 'done');
  }
  get form() {
    return this.userForm.controls;
  }
  // get title() { return this.userForm.get('title'); }

  // get description() { return this.userForm.get('description'); }

}
