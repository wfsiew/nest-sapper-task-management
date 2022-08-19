import { writable } from 'svelte/store';

const isLogin = writable(false);
const token = writable('');

export const sessionStore = {
  subscribe: isLogin.subscribe,
  setIsLogin: (b) => {
    isLogin.set(b);
  }
};

export const tokenStore = {
  subscribe: token.subscribe,
  setToken: (s) => {
    token.set(s);
  }
}