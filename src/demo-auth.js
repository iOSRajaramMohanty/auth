// Anything exported from this file is importable by other in-browser modules.
import { BehaviorSubject } from "rxjs";

export const auth$ = new BehaviorSubject({
    sessionToken: localStorage.getItem("sessionToken"),
    error: false,
    pending: false,
  });

const getLogin = (username, password) =>
  new Promise((resolve, reject) => {
      console.log("getLogin ==",username, password);
      auth$.next({
        sessionToken: null,
        error: false,
        pending: true,
      });

    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        const sessionToken = "abc123def456";
        localStorage.setItem("sessionToken", sessionToken);
        resolve({
          sessionToken,
          error: false,
          pending: false,
        });
      } else {
        resolve({
          sessionToken: null,
          error: "Invalid user or password",
          pending: false,
        });
      }
    }, 2500);
  });

export const login = (username, password) => {
    if (!auth$.value.pending) {
        getLogin(username, password).then((user) => {
            auth$.next(user);
            console.log("user ======>",user);
            // return user;
        });
    }
}

export function logout() {
    localStorage.removeItem("sessionToken");
    auth$.next({
      sessionToken: null,
      error: false,
    });
  }