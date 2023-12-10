// send-message.page.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importer AngularFireAuth
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {
  users: any[] | undefined;
  selectedUser: any;
  message: string = '';
  messages: any;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, // Injecter AngularFireAuth
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
    this.messages = this.firestore.collection('messages').valueChanges();

  }

  // ...

async sendMessage() {
  const user = await this.afAuth.currentUser;

  if (user && this.selectedUser && this.selectedUser.userEmail && this.message.trim() !== '') {
    const userId = user.uid;
    const recipientId = this.selectedUser.userEmail;

    // Envoi du message à la collection 'messages' dans Firestore
    this.firestore.collection('messages').add({
      text: this.message,
      userId: userId, // Utilise l'uid de l'utilisateur connecté
      recipientId: recipientId, // Utilise le userEmail comme identifiant du destinataire
      timestamp: new Date(),
    });

    this.message = ''; // Réinitialise la variable message à une chaîne vide
  }
}


}