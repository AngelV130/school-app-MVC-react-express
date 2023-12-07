
let user = JSON.parse(localStorage.getItem('user'));

export const getUser = () => user;
export const setUser = (newUser) => (user = newUser);
