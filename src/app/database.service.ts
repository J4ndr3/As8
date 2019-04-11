import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { from, BehaviorSubject } from 'rxjs';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import {Storage} from '@ionic/storage'
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
 database: SQLiteObject;
 private databaseReady: BehaviorSubject<boolean>;
  constructor(public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage,private sqlite:SQLite, private platform: Platform) { 
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'emp.db',
        location:'default'
      })
      .then((db: SQLiteObject)=>{
        console.log("Hello");
        this.database = db;
        this.storage.get('database_filled').then(val=>
          {
            if (val)
            {
              console.log("filled");
              this.databaseReady.next(true);
            }
          else{
            console.log("fill me now");
            this.fillDatabase();
          }
          });
      });
    });
  }
 
fillDatabase(){
  this.http.get('assets/myData.sql').map(res =>res.text())
  .subscribe(sql =>{
    this.sqlitePorter.importSqlToDb(this.database, sql)
    .then(data=>{
      console.log("sqlImported")
      this.databaseReady.next(true);
      this.storage.set('database_filled', true);
    })
    .catch(e=> console.log(e));
  });
}

addEmp(name, email, cell){
let data =[name,email,cell];
return this.database.executeSql("INSERT INTO employee (name, email, cell) VALUES (?,?,?)", data).then(res=>{
  return res;
})
}

getEmps(){
 return this.database.executeSql("SELECT * FROM employee",[]).then(data=>{
   let employees = [];
   if (data.rows.length >0){
     for (var i = 0; i <data.rows.length;i++){
       employees.push({name: data.rows.item(i).name, email: data.rows.item(i).email, cell: data.rows.item(i).cell})
     }
   }
   return employees;
 }, err => {
   console.log('Error:', err);
   return [];
 })
}

  getDataState(){
    return this.databaseReady.asObservable();
  }
}
