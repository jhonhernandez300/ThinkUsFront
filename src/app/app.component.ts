import { Component } from '@angular/core';
import { LanguageChangeService } from '../app/services/language-change.service'; 
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../app/services/language.service';
import { MatSelectChange } from '@angular/material/select'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  constructor(
    private languageService: LanguageService,
    private languageChangeService: LanguageChangeService,
    private translate: TranslateService
    ){    
  }

  setLanguage(event: MatSelectChange) {
    const language = event.value; // Obtén el valor seleccionado
    this.languageService.setLanguage(language);
    this.languageChangeService.changeLanguage(language); // Notifica el cambio de idioma
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('es-CO'); // Establece español como idioma predeterminado
    this.translate.use('es-CO'); // Asegúrarse de usar el idioma español al iniciar    
  }

}
