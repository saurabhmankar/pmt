import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { SharedService } from 'src/services/shared.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[MessageService]
})
export class AppComponent {
  title = 'pmt';
  displayAddTask:boolean=false;
  TaskForm:FormGroup;
  taskList:any
  taskStatus=['backlog','development','code_review','acceptance']
  backlogTask= [];
    
  devTask= [];
  coderevTask= [];
  acceptTask= [];


  
 

  dragedTask = null;

  constructor(
   private shared_service:SharedService,
   private toast:MessageService

  ){

  }
  addTaskOpen(){
    this.displayAddTask=true;
  }
  ngOnInit(){
    this.TaskForm=new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      due_date:new FormControl('',[Validators.required]),
      status:new FormControl('backlog',[])
    })

   
  
}


onSubmitTask(){
  
  if(this.backlogTask.length>=5){
    this.errorToast('Backlog task limit exceeds');
  }else{
    this.shared_service.addData(this.TaskForm.value);
    this.successToast('Task Added Successfully');
    this.displayAddTask=false;
  this.shared_service.getData().subscribe(res=>{
    if(res){
      this.backlogTask=res;
      this.TaskForm.reset();
    }else{
      this.errorToast('Unable to get Task Data');
    }
  
  })
  }
 
  
}





dragStart(e, c) {
  this.dragedTask = c;
}

dragEnd(e) {
}



// backlog to devlopment
droptodev(e) {
  if (this.dragedTask) {
    if(this.devTask.length>=4){
this.errorToast('Developement Task limit exceeds')
    }else{
      this.backlogTask= this.backlogTask.filter((task, index, arr)=>
      { return task.title != this.dragedTask.title;});
      this.dragedTask.status=this.taskStatus[1];
      this.devTask.push(this.dragedTask);
      this.dragedTask = null;
    }
    
  }
}

// developement to code review
droptocode(e) {
  
  if (this.dragedTask) {
    this.devTask= this.devTask.filter((task, index, arr)=>
    { return task.title != this.dragedTask.title;});
    this.dragedTask.status=this.taskStatus[2];
    this.coderevTask.push(this.dragedTask);
    this.dragedTask = null;
  }
}
// code review to accept task
droptoaccept(e) {
  if (this.dragedTask) {
    console.log("accept task event",e,this.acceptTask)
    this.dragedTask.status=this.taskStatus[3];
    this.acceptTask.push(this.dragedTask);
    this.coderevTask= this.coderevTask.filter((task, index, arr)=>
    { return task.title != this.dragedTask.title;});
    this.dragedTask = null;
  }
}
// Success Toaster function
successToast(msg){
  this.toast.add({severity:'success', summary:'Success', detail:msg});
  
}
// Error Toaster function
errorToast(msg){
  this.toast.add({severity:'error', summary:'Failed', detail:msg});
  
}




}
