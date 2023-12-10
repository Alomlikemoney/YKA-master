// user.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

// user.service.ts

getUsers(): Observable<any[]> {
  return this.firestore.collection('ANNONCES').valueChanges().pipe(
    tap(data => console.log('Users:', data))
  );
}

}
