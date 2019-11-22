import { Validators } from '@angular/forms';

export const validationMessages = {
  email: {
    required: 'Email is required.',
    email: 'Email must be a valid email'
  },
  password: {
    required: 'Password is required.',
    minlength: 'Password must be at least 6 characters long.',
    maxlength: 'Password cannot be more than 25 characters long.',
  },
  name: {
    required: 'Name is required.',
    minlength: 'Password must be at least 3 characters long.',
    maxlength: 'Password cannot be more than 40 characters long.',
  },
};

export const formErrors = {
  email: '',
  name: '',
  password: ''
};

export const validationConfig = {
  email: ['', [
    Validators.required,
    Validators.email
  ]
  ],
  password: ['', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(25)]
  ],
  name: ['', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
  ]]
};
