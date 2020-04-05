import localForage from "localforage";

const offlineStore = localForage.createInstance({
  driver: localForage.INDEXEDDB,
  name: "workaround",
  storeName: "workaround"
});

const get = async key => {
  return await offlineStore.getItem(key);
};

const add = async (key, value) => {
  await offlineStore.setItem(key, value);
};

const remove = async key => {
  await offlineStore.removeItem(key);
};

export { get, add, remove };
