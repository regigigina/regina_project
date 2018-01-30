import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  entry = {};
  entryID = "";
  friend = {};
  
  file : File;
  review = "";

  store_with = "";
  store_with_id = "";
  store_expense = "";
  store_date = "";
  store_total = 0;
  store_paidby = "";
  store_notes = "";
  store_user_share = "";
  store_friend_share = "";

  constructor(private http : Http, private actRoute : ActivatedRoute, private route : Router ){}

  ngOnInit() {
    this.actRoute.params.subscribe(params=>{
      this.LoadDetail(params['id']);
    })
  }

  LoadDetail(id){
    this.http.get("http://localhost:3000/api/bill/"+id)
    .subscribe(
      result => {
        this.entry = result.json();
        this.entryID = result.json()._id;
        this.store_with = result.json().with;
        this.store_with_id = result.json().with_id;
        this.store_expense = result.json().expense;
        this.store_date = result.json().date;
        this.store_total = result.json().total;
        this.store_paidby = result.json().paidby;
        this.store_notes = result.json().notes;
        this.store_user_share = result.json().user_share;
        this.store_friend_share = result.json().friend_share;

        // console.log(this.entryID);
        // console.log(this.store_with);
        // console.log(this.store_with_id);
        // console.log(this.store_expense);
        // console.log(this.store_date);
        // console.log(this.store_total);
        // console.log(this.store_paidby);
        // console.log(this.store_notes);
        // console.log(this.store_user_share);
        // console.log(this.store_friend_share);
        

        this.LoadFriend(this.store_with_id);
      },
      error => {
        
      }
    );
  }

  LoadFriend(id){
    this.http.get("http://localhost:3000/api/user/"+id)
    .subscribe(
      result => {
        this.friend = result.json()
      },
      error => {

      }
    );
  }

  deleteData(id){
    this.http.delete("http://localhost:3000/api/bill/"+id)
    .subscribe(
      result => {
        this.route.navigate(['/expenses'])
      },
      error => {
        console.log(error);
      }
    );
  }

  // fileChange($event){
  //   this.file = $event.target.files[0];
  //   console.log(this.file);
  // }

  saveData(d : NgForm){

    let t, u, v, w, x, y, z;

    if(d.value.date != null){
      t = d.value.date;
    }
    else{
      t = this.store_date;
    }
    
    if(d.value.expense != null && d.value.expense != ""){
      u = d.value.expense;
    }
    else{
      u = this.store_expense;
    }

    if(d.value.total != null){
      v = d.value.total;
    }
    else{
      v = this.store_total;
    }

    if(d.value.paidby != null){
      w = d.value.paidby;
    }
    else{
      w = this.store_paidby;
    }

    if(d.value.notes != null){
      x = d.value.notes;
    }
    else{
      x = this.store_notes;
    }

    if(d.value.user != null){
      y = d.value.user;
    }
    else{
      y = this.store_user_share;
    }

    if(d.value.friend != null){
      z = d.value.friend;
    }
    else{
      z = this.store_friend_share;
    }

    console.log(t);
    console.log(u);
    console.log(v);
    console.log(w);
    console.log(x);
    console.log(y);
    console.log(z);

    if(u != "" && u != null){
      let formData = new FormData();
      formData.append("_id", this.entryID);
      formData.append("with", this.store_with);
      formData.append("with_id", this.store_with_id);
      formData.append("date", t);
      formData.append("expense", u);
      formData.append("total", v);
      formData.append("paidby", w);
      formData.append("notes", x);
      // formData.append("photo", this.file);
      formData.append("user_share", y);
      formData.append("friend_share", z);

      let header = new Headers()
      let options = new RequestOptions({ headers : header });

      this.http.put("http://localhost:3000/api/bill/", formData, options)
      .subscribe(
        result => {
          // this.review = result.json()._id;
          // this.route.navigate(['detail/' + this.review]);
          this.route.navigate(['expenses']);
        },
        error => {
          console.log(error);
        },
      );
      
    }
    else{
      console.log("error")
    }
  }

}
