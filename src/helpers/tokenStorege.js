const key = 'token';
export const getToken = () => {
    return localStorage.getItem(key);
}
export const setToken = (v) => {
    localStorage.setItem(key, v);
}
