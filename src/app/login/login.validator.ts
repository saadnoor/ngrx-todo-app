import { Validators } from '@angular/forms';

export const validationMessages = {
  email: {
    required: 'Email is required.',
    email: 'Email must be a valid email'
  },
  password: {
    required: 'Password is required.',
    minlength: 'Password must be at least 6 characters long.',
    maxlength: 'Password cannot be more than 25 characters long.'
  }
};

export const formErrors = {
  email: '',
  password: ''
};

export const validationConfig = {
  email: ['', [
    Validators.required,
    Validators.email
  ]
  ],
  password: ['', [
    Validators.minLength(6),
    Validators.maxLength(25)
  ]
  ]
};
