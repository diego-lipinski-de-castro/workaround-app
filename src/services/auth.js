import http from "@/http";

const register = async data => {
  try {
    const { name, email, password } = data;

    const response = await http.post("auth/register", {
      name,
      email,
      password
    });

    return response.data;
  } catch (error) {
    if (error.response.status == 422) {
      throw error.response.data;
    }

    // console.log("error", error);

    return null;
  }
};

const login = async data => {
  try {
    const { email, password } = data;

    const response = await http.post("auth/login", {
      email,
      password
    });

    return response.data;
  } catch (error) {
    if (error.response.status == 422) {
      throw error.response.data;
    } else {
      // console.log("error", error);
    }

    return null;
  }
};

const logout = async () => {
  try {
    await http.post("auth/logout");
  } catch (error) {
    console.log(error);
  }
};

const user = async () => {
  try {
    const response = await http.post("auth/user");

    return response.data;
  } catch (error) {
    // console.log("error", error);

    return null;
  }
};

const refresh = async () => {
  try {
    const response = await http.post("auth/refresh");

    return response.data;
  } catch (error) {
    // console.log("error", error);

    return null;
  }
};

const update = async data => {
  try {
    const response = await http.put("auth/update", data);

    return response.data;
  } catch (error) {
    if (error.response.status == 422) {
      throw error.response.data;
    }

    // console.log("error", error);

    return null;
  }
};

export { register, login, logout, user, refresh, update };
