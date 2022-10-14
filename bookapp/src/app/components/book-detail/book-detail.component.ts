import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      name:[""],
      price:[""],
      description:[""],
      image:[""]
    })
    }

  ngOnInit(): void {}
  onUpdate(){
    this.crudApi.updateBook(this.getId,this.updateForm.value).subscribe(res=>{
      console.log("updated successfully");
      this.ngZone.run(()=>{
        this.router.navigateByUrl("/book-list")})
      
    },
    (err)=>{
      console.log(err);
      
    }
    )
  }

}
