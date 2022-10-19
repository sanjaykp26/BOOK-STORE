import { Component,OnInit } from '@angular/core';
import { CrudService } from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookshop';
constructor(private crudApi:CrudService){}

  search(event:any){
    var searchTerm=event.target.value
  this.crudApi.search.next(searchTerm)
    
  }
}
