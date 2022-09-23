import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

formValue!: FormGroup;
employeeModelobj: EmployeeModel=new EmployeeModel();
  employeeData!: any;
row: any;

constructor(private formbuilder:FormBuilder,private api: ApiService){

}
  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getAllEmployee();
    
    }
    postEmployeeDetails(){
      this.employeeModelobj.firstName=this.formValue.value.firstName;
      this.employeeModelobj.lastName=this.formValue.value.lastName;
      this.employeeModelobj.email=this.formValue.value.email;
      this.employeeModelobj.mobile=this.formValue.value.mobile;
      this.employeeModelobj.salary=this.formValue.value.salary;
      
     this.api.postEmploye(this.employeeModelobj)
     .subscribe((res: any): void=>{
      console.log(res);
      alert("Employee added succesfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
     },(err: any)=>{
      alert("something went wrong")
     })


     }

     getAllEmployee(){
      this.api.getEmployee().subscribe(res=>{
        this.employeeData=res;
      })
     }
  }
  
  

