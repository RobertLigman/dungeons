import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
      // Załaduj plik JSON lokalnie, np. używając require/import
      const translations = require(`../assets/messages/${lang}.json`);
      return of(translations);
    }
  }