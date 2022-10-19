import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})  
export class AddBookComponent implements OnInit {
bookForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private router:Router,private ngZone:NgZone,private crudService:CrudService) {
    this.bookForm=this.formBuilder.group({
      name:["",[Validators.required,Validators.pattern('[ a-z A-Z]*')]],
      price:["",[Validators.required,Validators.pattern('[0-9]*')]],
      description:["",[Validators.required,Validators.pattern('[ a-z A-Z]*')]],
      image:["",[Validators.required]],

    })
   }

  ngOnInit(): void {
  }
  onSubmit():any{
    this.crudService.AddBook(this.bookForm.value).subscribe(()=>{
console.log("data addded successfull");
this.ngZone.run(()=>
this.router.navigateByUrl('/book-list'))
    },(err)=>{
  console.log(err);
  
});

    }

  }


