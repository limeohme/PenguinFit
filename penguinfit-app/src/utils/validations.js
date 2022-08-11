import { mailRE } from '../common/constants';

export function validateSignIn(form = { email: '', password: '' }) {
  const PASS_MIN_LEN = 6;
  
  if ((!form.email) || mailRE.test(form.email.toLowerCase()) === false) {
    throw new Error('Invalid email!');
  }
  if ((!form.password) || form.password.length < PASS_MIN_LEN) {
    throw new Error('Invalid password!');
  }

}

export function validateRegistration(form = {}, errorSetter) {
  const PASS_MIN_LEN = 6;


  if ((!form.email) || mailRE.test(form.email.toLowerCase()) === false) {
    errorSetter('email', 'Invalid email !');
    throw new Error('Invalid email !');
  }
  if ((!form.password) || form.password.length < PASS_MIN_LEN) {
    errorSetter('password', 'Password must be at least 6 characters long!');
    throw new Error('Password must be at least 6 characters long!');
  }
  if ((!form.passwordCheck) || form.passwordCheck !== form.password) {
    errorSetter('password', 'Passwords don\'t match!');
    throw new Error('Passwords don\'t match!');
  }
  if (!form.username) {
    errorSetter('username', 'You must enter a username!');
    throw new Error('You must enter a username!');
  }


}

export function validateProfileUpdates(form = {}) {
  const NAMES_MIN_LEN = 2;
  const NAMES_MAX_LEN = 20;
  const PASS_MIN_LEN = 6;

  if (form.email && mailRE.test(form.email.toLowerCase()) === false) {
    throw new Error('Invalid email!');
  }
  if (form.firstName && (form.firstName.length < NAMES_MIN_LEN || form.firstName.length > NAMES_MAX_LEN)) {
    console.log(typeof form.firstName, form.firstName.length);
    throw new Error('Invalid first name! Name must be between 4 and 32 characters long.');
  }
  if (form.lastName && (form.lastName.length < NAMES_MIN_LEN || form.lastName.length > NAMES_MAX_LEN)) {
    throw new Error('Invalid first name! Name must be between 4 and 32 characters long.');
  }
  if (form.password && form.password.length < PASS_MIN_LEN) {
    throw new Error('Password must be at least 6 characters long!');
  }
  if (form.password && form.passwordCheck !== form.password) {
    throw new Error('Passwords don\'t match!');
  }
}

export function validatePost(title, content) {
  if (!title || !content) {
    throw new Error('You must provide post title and content!');
  }
  if (title.length < 16) {
    throw new Error('Post title is too short!');
  }
  if (title.length > 64) {
    throw new Error('Post title is too long!');
  }
  if (content.length < 32) {
    throw new Error('Post content is too short!');
  }
  if (content.length > 8192) {
    throw new Error('Post content is too long!');
  }
}