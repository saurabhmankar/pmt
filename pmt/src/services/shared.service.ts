import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }
  taskDataSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  // function get task data list
  getData(){
   return  this.taskDataSource.asObservable();
  }
 

  updatetaskData(data) {
    this.taskDataSource.next(data);
}
// function to add task data
addData(dataObj) {
  const currentValue = this.taskDataSource.value;
  const updatedValue = [...currentValue, dataObj];
  this.taskDataSource.next(updatedValue);
}
  
}
