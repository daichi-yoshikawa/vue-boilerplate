import { extend } from 'vee-validate'
import { confirmed, email, image, min, required, size } from 'vee-validate/dist/rules'

extend('confirmed', {
  ...confirmed,
  message: 'The {_field_} does not match.',
});

extend('email', email);

extend('image', image);

extend('min', {
  ...min,
  message: '{_field_} must be at least {length} characters.',
});

extend('required', {
  ...required,
  message: '{_field_} is required.',
});

extend('size', size);

export default { confirmed, email, image, min, required, size };
