import { Injectable } from '@angular/core';
import { addDoc, CollectionReference, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { IOrderRequest } from '../../interfaces/IOrder';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public changeBasket = new Subject<boolean>;
  private orderCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore

  ) {
    this.orderCollection = collection(this.afs, 'orders')
   }

  createFirebase(order: IOrderRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.orderCollection, order);
}
}
