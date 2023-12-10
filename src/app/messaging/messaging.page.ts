import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Auth, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/auth';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {
  messages: Observable<any[]> | undefined;
  newMessage: string = '';
  auth: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.messages = this.firestore.collection('messages').valueChanges();
  }

  async sendMessage() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.firestore.collection('messages').add({
        text: this.newMessage,
        userId: user.uid,
        timestamp: new Date(),
      });
      this.newMessage = '';
    }
  }

  async signOut() {
    await this.afAuth.signOut();
  }

  async signIn() {
    try {
      const provider = new GoogleAuthProvider();
      await this.auth.signInWithPopup(provider);
    } catch (error) {
      console.error('Erreur de connexion avec Google', error);
    }
  }
}
