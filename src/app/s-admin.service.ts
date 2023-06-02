import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DAnuncios } from './Adimin';

@Injectable({
  providedIn: 'root'
})
export class SAdminService {

 url = "http://localhost:3000//DAnuncios";
  constructor(private http: HttpClient) { }

  getAnuncio(): Observable<DAnuncios[]>{

return this.http.get<DAnuncios[]>(this.url);

}
save(danuncios: DAnuncios): Observable<DAnuncios>{
  return this.http.post<DAnuncios>(this.url, danuncios);

}
delete(danuncios: DAnuncios): Observable<void>{
  return this.http.delete<void>(`${this.url}/${danuncios.id}`);

}
update(danuncios: DAnuncios): Observable<DAnuncios>{
  return this.http.put<DAnuncios>(`${this.url}/${danuncios.id}`, danuncios);
}
}

