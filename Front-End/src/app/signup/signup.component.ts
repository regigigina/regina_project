import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  file : File;

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
  }

  fileChange($event){
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  Signup(f : NgForm){

    let obj= new FormData ();
    obj.append("username", f.value.username);
    obj.append("password", f.value.password);
    obj.append("profile", this.file);

    let header = new Headers();
    let options = new RequestOptions({ headers : header });

    this.http.post("http://localhost:3000/api/user/signup", obj, options)
    .subscribe(
      result => {
        this.route.navigate(['/']);
      },
      error => {
        console.log("Error.")
      }
    );
  }
}
