import { Injectable } from '@angular/core';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { ICategoryRequest } from '../../interfaces/ICategory';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private categoryCollection!: CollectionReference<DocumentData>;

    constructor(
        private afs: Firestore
    ) {
        this.categoryCollection = collection(this.afs, 'categories')
    }
    getAllFirebase() {
        return collectionData(this.categoryCollection, { idField: 'id' });
    }
    getOneFirebase(id: string) {
        const categoryDocReference = doc(this.afs, `categories/${id}`);
        return docData(categoryDocReference, { idField: 'id' })
    }

    createFirebase(category: ICategoryRequest): Promise<DocumentReference<DocumentData>> {
        return addDoc(this.categoryCollection, category);
    }

    updateFirebase(category: ICategoryRequest, id: string) {
        const categoryDocReference = doc(this.afs, `categories/${id}`);
        return updateDoc(categoryDocReference, { ...category });
    }

    deleteFirebase(id: string) {
        const categoryDocReference = doc(this.afs, `categories/${id}`);
        return deleteDoc(categoryDocReference);
    }
}
