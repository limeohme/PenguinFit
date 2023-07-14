export function keepUserInfo(user = {}, auth) {
  localStorage.setItem('userInfo', JSON.stringify(user));
  localStorage.setItem('userAuth', JSON.stringify(auth));
}

export function getLoggedUser() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
  return userInfo;
}

export function getLoggedUserAuth() {
  const userAuth = JSON.parse(localStorage.getItem('userAuth')) || null;
  return userAuth;
}

export function updateUserInfo(newInfo) {
  localStorage.setItem('userInfo', JSON.stringify(newInfo));
};

export function removeUserFromStorage() {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userAuth');
}
