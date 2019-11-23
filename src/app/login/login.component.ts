import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { validationConfig, formErrors, validationMessages } from './login.validator';
import Utils from '../utilities/helper-methods';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/reducers/authentication.reducer';
import { LogIn } from '../state/actions/authentication.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formErrors = formErrors;
  validationMessages = validationMessages;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private store: Store<AuthState>) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group(validationConfig);

    this.form.valueChanges.subscribe(() => Utils.onFormValueChanged(this.form, this.validationMessages, this.formErrors));
    Utils.onFormValueChanged(this.form, this.validationMessages, this.formErrors);
  }

  login() {
    const payload = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.store.dispatch(new LogIn(payload));
  }
}
