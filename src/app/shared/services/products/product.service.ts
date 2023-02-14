import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<IProductResponse>{
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` }
  constructor(
    private http: HttpClient
  ) { }
  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products);
  }
  getAllByCategory(category: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${category}`);
  }

  create(product: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(this.api.products, product);
  }

  update(product: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProductResponse | Observable<IProductResponse> | Promise<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${route.paramMap.get('id')}`);
  }
}
