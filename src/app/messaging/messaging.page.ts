import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {
  selectedUserEmail: string | undefined;
  newMessage: string = '';
  messages$: Observable<any[]> | undefined;

  constructor(
    private storage: Storage,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.storage.create();
  }

  ngOnInit() {
    // Récupérez l'e-mail de l'utilisateur sélectionné
    this.storage.get('selectedUserEmail').then((email) => {
      this.selectedUserEmail = email;
      // Utilisez l'e-mail pour charger la liste des messages avec cet utilisateur
      this.messages$ = this.afDB.list(`/messages/${this.selectedUserEmail}`).valueChanges();
    });
  }

  sendMessage() {
    // Vérifiez que le message n'est pas vide
    if (this.newMessage.trim() !== '') {
      // Accédez à la propriété 'email' une fois la Promise résolue
      this.afAuth.currentUser.then(user => {
        if (user) {
          // Envoyez le message à l'utilisateur sélectionné
          this.afDB.list(`/messages/${this.selectedUserEmail}`).push({
            sender: user.email,
            content: this.newMessage,
          });
  
          // Effacez le champ de saisie après l'envoi du message
          this.newMessage = '';
        }
      });
    
  
  
      // Effacez le champ de saisie après l'envoi du message
      this.newMessage = '';
    }
  }
}
