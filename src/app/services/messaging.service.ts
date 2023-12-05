// messaging.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private firestore: AngularFirestore) { }

  getMessages() {
    return this.firestore.collection('messages').valueChanges();
  }

  sendMessage(message: string) {
    return this.firestore.collection('messages').add({
      text: message,
      timestamp: new Date(),
    });
  }
}
