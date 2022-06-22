import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApisharedService {

  constructor(private http: HttpClient) {}
  users(){
    return this.http.get<any>('http://localhost:3000/Users')
  }

  getContacts(form:any) {  
    return this.http.post('http://localhost:3000/Users',form);
  }
  
  deleteContacts(id:number){
    return this.http.delete('http://localhost:3000/Users/'+id)
  }
  
}



