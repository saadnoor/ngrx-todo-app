import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { validationConfig, formErrors, validationMessages } from './registration.validator';
import Utils from '../utilities/helper-methods';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/reducers/authentication.reducer';
import { SignUp } from '../state/actions/authentication.action';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formErrors = formErrors;
  validationMessages = validationMessages;
  form: FormGroup;

  constructor(public formBuilder: FormBuilder,
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

  registration() {
    const payload = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.store.dispatch(new SignUp(payload));
  }
}

