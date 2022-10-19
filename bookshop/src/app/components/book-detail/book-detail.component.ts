import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
getId:any;
updateForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router,
    private ngZone:NgZone,
    private activatedRoute:ActivatedRoute,
    private crudApi:CrudService) { 
      this.getId=this.activatedRoute.snapshot.paramMap.get('id');
    this.crudApi.getBook(this.getId).subscribe(res=>{
this.updateForm.setValue({
  name:res["name"],
  price:res["price"],
  description:res["description"],
  image:res["image"]

})
    });
    this.updateForm=this.formBuilder.group({
      name:["",[Validators.required,Validators.pattern('[ a-z A-Z]*')]],
      price:["",[Validators.required,Validators.pattern('[0-9]*')]],
      description:["",[Validators.required]],
      image:["",[Validators.required]]
    })
    }

  ngOnInit(): void {}
  onUpdate(){
    this.crudApi.updateBook(this.getId,this.updateForm.value).subscribe(res=>{
      
      console.log(res);
      
      this.ngZone.run(()=>{
        this.router.navigateByUrl("/book-list")})
        console.log("updated successfully");
    },
    (err)=>{
      console.log(err);
      
    }
    )
  }

}
