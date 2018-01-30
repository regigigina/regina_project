import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expenseList = [];  
  userList = [];

  constructor(private http : Http, private route : Router ){}

  ngOnInit() {
    this.LoadExpense();
    this.LoadUser();
  }

  LoadExpense(){
    this.http.get("http://localhost:3000/api/bill/")
    .subscribe(
      result => {
        this.expenseList = result.json();
      },
      error => {
        
      }
    );
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

}
