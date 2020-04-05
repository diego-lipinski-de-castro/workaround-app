import cookies from "js-cookie";

const cookieStore = cookies.withAttributes({
  secure: process.env.NODE_ENV === "production",
  expires: 30,
  path: "/",
  sameSite: true,
  domain: "workaround.local" // api.workaround.local
});

const get = key => {
  return cookieStore.get(key);
};

const getJson = key => {
  try {
    return JSON.parse(cookieStore.get(key));
  } catch (error) {
    return undefined;
  }
};

const add = (key, value) => {
  cookieStore.set(key, value);
};

const addJson = (key, value) => {
  try {
    cookieStore.set(key, JSON.stringify(value));

    return true;
  } catch (error) {
    return false;
  }
};

const remove = key => {
  cookieStore.remove(key);
};

export { get, getJson, add, addJson, remove };
