import { Injectable } from '@angular/core';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IProductRequest, IProductResponse } from '../../interfaces/IProduct';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<IProductResponse>{
  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore

  ) {
    this.productCollection = collection(this.afs, 'products');
  }

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' })
  }

  async getAllByCategoryFirebase(name: string) {
    const arr: DocumentData[] = [];
    const q = query(collection(this.afs, "products"), where("category.path", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const productDocReference = doc(this.afs, `products/${id}`);
    return docData(productDocReference, { idField: 'id' })
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product)
  }

  updateFirebase(product: IProductRequest, id: string) {
    const categoryDocReference = doc(this.afs, `products/${id}`);
    return updateDoc(categoryDocReference, { ...product });
  }

  deleteFirebase(id: string) {
    const produtcDocReference = doc(this.afs, `products/${id}`);
    return deleteDoc(produtcDocReference);
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProductResponse | Observable<IProductResponse> | Promise<IProductResponse> {
    const PRODUCT_ID = route.paramMap.get('id');
    return this.getOneFirebase(PRODUCT_ID as string).pipe(
      map((data) => {
        return data as IProductResponse;
      })
    )
  }
}
