import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
employees = [];
public employee: any = { 
  name :'',
  email : '',
  cell : ''
};
constructor(public navCtrl: NavController, private datbaseservice: DatabaseService){
  this.datbaseservice.getDataState().subscribe(rdy=>{
    if (rdy){
      this.loadEmpData();
    }
  })
}
loadEmpData(){
  this.datbaseservice.getEmps().then(data=>{
    this.employees = data;
  })
}
addEmp(){
  console.log(this.employee['name']);
  this.datbaseservice.addEmp(this.employee['name'],this.employee['email'],this.employee['cell'])
  .then(data=>{
    this.loadEmpData();
  });
  this.employee = {};
}
}
