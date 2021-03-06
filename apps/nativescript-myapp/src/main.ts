import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { enableProdMode } from '@angular/core';
import { environment } from '@myorg/core';
import { AppModule } from './app.module';

if (environment.production) {
  enableProdMode();
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
