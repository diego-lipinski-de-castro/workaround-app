import store from "@/store";

const updateStatus = () => {
  store.commit("app/SET_OFFLINE", !navigator.onLine);
};

const initConnectivityHandler = () => {
  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
};

const destroyConnectivityHandler = () => {
  window.removeEventListener("online", updateStatus);
  window.removeEventListener("offline", updateStatus);
};

export { initConnectivityHandler, destroyConnectivityHandler };
