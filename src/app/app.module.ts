import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastNotificationsModule } from 'ngx-toast-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { TodoComponent } from './todo/todo.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { AuthenticationService } from './services/authentication.service';
import { TodoService } from './services/todo.service';
import { AuthEffects } from './state/effects/authentication.effect';
import { taskReducer } from './state/reducers/task.reducer';
import { authenticationReducer } from './state/reducers/authentication.reducer';
import { metaReducers, reducers } from './state/reducers';
import { TodoEffects } from './state/effects/todo.effect';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    ToastNotificationsModule.forRoot({duration: 1000, type: 'primary'}),
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreModule.forFeature('task', taskReducer),
    StoreModule.forFeature('auth', authenticationReducer),
    BrowserAnimationsModule,
    MatCardModule,
    MatMenuModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects, AuthEffects, TodoEffects])
  ],
  providers: [
    AuthenticationService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
