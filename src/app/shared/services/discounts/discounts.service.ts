import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/IDiscount';
import { collection, DocumentData, DocumentReference } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService implements Resolve<IDiscountResponse>{
  private url = environment.BACKEND_URL;
  public api = { discounts: `${this.url}/discounts` };
  private discountCollection!: CollectionReference<DocumentData>;
  constructor(
    public http: HttpClient,
    private afs: Firestore,
  ) {
    this.discountCollection = collection(this.afs, 'discounts');
  }

  // getAll(): Observable<IDiscountResponse[]> {
  //   return this.http.get<IDiscountResponse[]>(this.api.discounts);
  // }
  // getOne(id: number): Observable<IDiscountResponse> {
  //   return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`);
  // }

  // create(discount: IDiscountRequest): Observable<IDiscountResponse> {
  //   return this.http.post<IDiscountResponse>(this.api.discounts, discount);
  // }

  // update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
  //   return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`, discount);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.discounts}/${id}`);
  // }

  // resolve(route: ActivatedRouteSnapshot): Promise<IDiscountResponse> {
  //   return firstValueFrom(this.http.get<IDiscountResponse>(`${this.api.discounts}/${route.paramMap.get('id')}`));
  // }

  getAllFirebase() {
    return collectionData(this.discountCollection, { idField: 'id'});
  };

  getOneFirebase(id: string) {
    const discountDocReference = doc(this.afs, `discounts/${id}`);
    return docData(discountDocReference, { idField: 'id' })
  }

  createFirebase(discount: IDiscountRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.discountCollection, discount);
  }

  updateFirebase(discount: IDiscountResponse, id: string) {
    const discountDocReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountDocReference, { ...discount });
  }

  deleteFirebase(id: string) {
    const discountDocReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountDocReference);
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IDiscountResponse | Observable<IDiscountResponse> | Promise<IDiscountResponse> {
    const DISCOUNT_ID = route.paramMap.get('id');
    return this.getOneFirebase(DISCOUNT_ID as string).pipe(
      map((data) => {
        return data as IDiscountResponse;
      })
    )
  }
}
