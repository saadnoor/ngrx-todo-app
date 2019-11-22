import { FormGroup } from '@angular/forms';

export default class Utils {

  // Updates validation state on form changes.
  static onFormValueChanged(form: FormGroup, validationMsg: any, errors: any) {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        // Clear previous error message (if any)
        errors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMsg[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              errors[field] += messages[key] + ' ';
            }
          }
          console.log('error is', errors[field]);
        }
      }
    }
  }
}
