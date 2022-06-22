
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisharedService } from './apishared/apishared.service';
// import {filter, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: any;
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  myForm: any = FormGroup;
  myArray: any = [];
  Array:any=[];

  constructor(private api: ApisharedService,
              private http:HttpClient) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      first_name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(5)]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      gender: new FormControl("", [Validators.required])

    })


  }

  get first_name() {
    return this.myForm.get('first_name')
  }

  get last_name() {
    return this.myForm.get('last_name')
  }

  get username() {
    return this.myForm.get('username')
  }

  get password() {
    return this.myForm.get('password')
  }
  get gender() {
    return this.myForm.get('gender')
  }
 
  add(){
    if (this.myForm.status == "VALID"){
    this.http.post('http://localhost:3000/Users',this.myForm.value).subscribe((Res:any)=>{
      console.log(Res)
      this.Array.push(Res)
  })
}
  else {
    window.alert("INVALID FORM")
  }
}

  submit() {
  //   if (this.myForm.status == "VALID") {
      
  //         this.http.post('http://localhost:3000/Users',this.myForm.value).subscribe((Res:any)=>{
  //           console.log(Res)
  //           this.Array.push(Res)
  //         })
         
  //   } else {
  //     window.alert("INVALID FORM")
  //   }
this.api.users().subscribe(res=>{
const user = res.find((a:any)=>{
  return a.username===this.myForm.value.username
});

if(user){
  alert("user already existed")
  this.myForm.reset();
}else{
  this.api.getContacts(this.myForm.value).subscribe((res:any)=>{
    alert("updated successfull !!")
    this.Array.push(res)
    this.myForm.reset();
  })
}


})
   }

  delete1(i:any){
    this.myArray.splice(i, 1)
  }
  delete2(i:any){
    this.Array.splice(i, 1)
  }

}















