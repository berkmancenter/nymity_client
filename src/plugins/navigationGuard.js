import { VueCookieNext } from "vue-cookie-next";
import store from "../composables/global/useStore";

const { loadNewPseudonym } = store;

export default async (to, from, next) => {
  const accessToken = VueCookieNext.getCookie("access_token");

  if (accessToken && ["home.login", "home.createAccount"].includes(to.name)) {
    next({
      name: "home.featured",
    });
  } else if (to.name === "home.featured") {
    const pseudonym = VueCookieNext.getCookie("pseudonym");
    const token = VueCookieNext.getCookie("token");
    if (pseudonym === null || token === null) {
      await loadNewPseudonym().then((x) => next());
    } else next();
  } else if (
    !["home.login", "home.createAccount"].includes(to.name) &&
    !accessToken
  ) {
    next({
      name: "home.featured",
    });
  } else next();
};
