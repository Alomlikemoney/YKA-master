import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  confirmedFormDatas: any[] = [];

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

   // Ajoutez une annonce confirmée à Firestore
   addConfirmedFormData2(formData: any, documentId: string) {
    return this.firestore.collection('confirmedAnnouncements').doc(documentId).set(formData);
  }

  // Mettez à jour les données d'une annonce confirmée dans Firestore
  updateConfirmedFormData(documentId: string, data: any) {
    return this.firestore.collection('confirmedAnnouncements').doc(documentId).update(data);
  }

  // Obtenez toutes les annonces confirmées depuis Firestore
  getConfirmedAnnouncements() {
    return this.firestore.collection('confirmedAnnouncements').valueChanges();
  }
  addConfirmedFormData(data: any, id: string) {
    // Stockez les données avec leur identifiant unique
    this.confirmedFormDatas.push({ data, id });
  }

  getConfirmedFormDatas() {
    return this.confirmedFormDatas;
  }

  // Méthode pour supprimer une ion-card par son identifiant unique
  deleteConfirmedFormById(documentId: string) {
    // Utilisez le nom de la collection spécifiée
    this.firestore.collection('ANNONCES').doc(documentId).delete()
      .then(() => {
        // Suppression réussie
        const index = this.confirmedFormDatas.findIndex((data) => data.data.documentId === documentId);
        if (index !== -1) {
          // Supprimez l'élément du tableau
          this.confirmedFormDatas.splice(index, 1);
        }
      })
      .catch((error) => {
        console.error('Erreur Firebase :', error);
        // Gérez l'erreur ici
      });
  }
   // Méthode pour mettre à jour les likes d'une annonce
   async updateLikes(annonceId: string): Promise<void> {
    try {
      // Récupérer l'utilisateur actuellement connecté
      const user = await this.afAuth.currentUser;

      if (user) {
        // L'utilisateur est connecté, obtenir son adresse e-mail
        const userEmail = user.email;

        // Obtenir une référence au document ANNONCES
        const annonceRef = this.firestore.collection('ANNONCES').doc(annonceId);

        // Utiliser FieldValue.increment pour incrémenter le nombre de likes
        const increment = firebase.firestore.FieldValue.increment(1);

        // Mettre à jour le champ "like" dans le document
        await annonceRef.update({ likes: increment });

        // Stocker les informations dans la collection confirmedAnnouncements
        const confirmedData = {
          userId: user.uid,
          userEmail: userEmail,
          annonceId: annonceId,
          action: 'like',
          timestamp: new Date().toISOString(),
        };

        // Ajouter les informations à la collection
        await this.firestore.collection('confirmedAnnouncements').add(confirmedData);

        console.log(`Like mis à jour avec succès pour l'annonce ${annonceId}`);
      } else {
        console.error('Utilisateur non connecté.');
        // Gérer le cas où l'utilisateur n'est pas connecté
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des likes de l\'annonce :', error);
      throw error;
    }
  }
  
  
  // Méthode pour mettre à jour les commentaires d'une annonce
  async updateComments(annonceId: string, comments: any[]) {
    try {
      // Mettez à jour le document dans la collection 'ANNONCES'
      await this.firestore.collection('ANNONCES').doc(annonceId).update({ comments });

      console.log('Commentaires mis à jour avec succès dans Firestore');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des commentaires dans Firestore :', error);
      throw error; // Lancer l'erreur pour la gérer dans la fonction appelante si nécessaire
    }
  }
}
