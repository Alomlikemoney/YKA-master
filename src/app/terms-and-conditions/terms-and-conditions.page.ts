import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: 'terms-and-conditions.page.html',
  styleUrls: ['terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage {
  constructor(private router: Router) {}

  acceptTerms() {
    // Gérez ici l'acceptation des conditions
    // Vous pouvez stocker cette préférence localement et poursuivre vers l'écran principal
    // Exemple : this.storage.set('termsAccepted', true);
    this.router.navigate(['/home']); // Redirigez vers votre écran principal
  }

  declineTerms() {
    // Gérez ici le refus des conditions
    // Vous pouvez quitter l'application ou afficher un message
    // Exemple : this.storage.set('termsAccepted', false);
  }
}
