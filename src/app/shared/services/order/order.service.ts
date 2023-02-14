import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.BACKEND_URL;
  private api = { orders: `${this.url}/orders` }
  public changeBasket = new Subject<boolean>;
  constructor(
    private http: HttpClient
  ) { }
  create(order: any): Observable<any> {
    return this.http.post<any>(this.api.orders, order);
  }
}
