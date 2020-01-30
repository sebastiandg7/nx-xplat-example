import { NgModule, Optional, SkipSelf } from '@angular/core';

// nativescript
import {
  NativeScriptModule,
  NativeScriptHttpClientModule
} from '@nativescript/angular';
import { Device } from '@nativescript/core';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// libs
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  CoreModule,
  PlatformLanguageToken,
  PlatformWindowToken
} from '@myorg/core';
import { throwIfAlreadyLoaded } from '@myorg/utils';

// app
import { CORE_PROVIDERS } from './services';
import { TNSWindowService } from './services/tns-window.service';
import { TNSTranslateLoader } from './services/tns-translate.loader';

// factories
export function platformLangFactory() {
  return Device.language;
}

export function createTranslateLoader() {
  return new TNSTranslateLoader('/assets/i18n/');
}

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    TNSFontIconModule.forRoot({
      fa: './assets/fontawesome.min.css'
    }),
    CoreModule.forRoot([
      {
        provide: PlatformLanguageToken,
        useFactory: platformLangFactory
      },
      {
        provide: PlatformWindowToken,
        useClass: TNSWindowService
      }
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader
      }
    })
  ],
  providers: [...CORE_PROVIDERS]
})
export class MyOrgCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: MyOrgCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'MyOrgCoreModule');
  }
}
