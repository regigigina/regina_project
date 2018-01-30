import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm }  from '@angular/forms';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file: File;
  user = {};
  userList = [];
  newform = {};
  withUsername = "";
  myname = "";
  myphoto = "";

  constructor(private http : Http, private route : Router ){ }

  ngOnInit() {
    var token = sessionStorage.getItem("token");
    // var userid = localStorage.getItem("id");
    // console.log(userid);

    if(!token){
      this.route.navigate(['/']);
    }
    else{
      console.log(token);
      let header = new Headers ({ "Authorization" : "Bearer " + token });
      let options = new RequestOptions({ headers : header });
      this.http.post("http://localhost:3000/api/validatetoken", {}, options)
      .subscribe(
        result => {
          this.LoadUser();
        },
        error => {
          sessionStorage.removeItem("token");
          this.route.navigate(['/']);
        }
      )
    }
    this.LoadMe();
  }

  LoadUser(){
    this.http.get("http://localhost:3000/api/user/")
    .subscribe(
      result => {
        this.userList = result.json();
      },
      error => {
        
      }
    );
  }

  LoadMe(){
    let obj = {
      identity : sessionStorage.getItem("username"),
      password : sessionStorage.getItem("password")
    }

    let header = new Headers({ "Content-Type" : "application/json" });
    let options = new RequestOptions({ headers : header });

    this.http.post("http://localhost:3000/api/user/loadme", obj, options)
    .subscribe(
      result => {  
        this.myname = result.json();
        console.log(this.myname);
        localStorage.setItem("myname", this.myname);
      },
      error =>{
        console.log("User not found.")
      }
    );

  }

  Logout(){
    localStorage.removeItem("token");
    this.route.navigate(['/']);
  }

  fileChange($event){
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  addnew(w : NgForm){

    this.http.get("http://localhost:3000/api/user/"+ w.value.with)
    .subscribe(
      result => {
        this.withUsername = result.json().username;

        var formData = new FormData();
        formData.append("with", this.withUsername);
        formData.append("with_id", w.value.with);

        let header = new Headers()
        let options = new RequestOptions({ headers : header });

        this.http.post("http://localhost:3000/api/bill/create", formData, options)
        .subscribe(
          result => {
            this.newform = result.json()._id;
            this.route.navigate(['detail/' + this.newform]);
          },
          error => {
            console.log(error);
          },
        );
      },
      error => {
        console.log(error);
      },
    );
  }
  
}
