import { BODY_METRICS_RE, mailRE } from '../common/constants';

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
  const PASS_MIN_LEN = 6;

  if (form.email && mailRE.test(form.email.toLowerCase()) === false) {
    throw new Error('Invalid email!');
  }
  if (form.password && form.password.length < PASS_MIN_LEN) {
    throw new Error('Password must be at least 6 characters long!');
  }
  if (form.password && form.passwordCheck !== form.password) {
    throw new Error('Passwords don\'t match!');
  }
  if (BODY_METRICS_RE.test(+form.weight) === false) {
    throw new Error('Invalid weight!');
  }
  if (BODY_METRICS_RE.test(+form.height) === false) {
    throw new Error('Invalid height!');
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