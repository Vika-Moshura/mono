import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/IDiscount';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService implements Resolve<IDiscountResponse>{
  private url = environment.BACKEND_URL;
  public api = { discounts: `${this.url}/discounts` }
  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<IDiscountResponse[]> {
    return this.http.get<IDiscountResponse[]>(this.api.discounts);
  }
  getOne(id: number): Observable<IDiscountResponse> {
    return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`);
  }

  create(discount: IDiscountRequest): Observable<IDiscountResponse> {
    return this.http.post<IDiscountResponse>(this.api.discounts, discount);
  }

  update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
    return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`, discount);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discounts}/${id}`);
  }
  resolve(route: ActivatedRouteSnapshot): Promise<IDiscountResponse> {
    return firstValueFrom(this.http.get<IDiscountResponse>(`${this.api.discounts}/${route.paramMap.get('id')}`));
  }
}
