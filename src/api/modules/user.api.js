import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      });

      const userData = JSON.stringify(response);
      localStorage.setItem("user", userData);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  signout: async () => {
    localStorage.removeItem("user");
    window.location.reload();
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });
      const userData = JSON.stringify(response);
      localStorage.setItem("user", userData);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      if (err.message === "Unathorized") {
        userApi.signout(); // call signout() function
      }
      return { err };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (err) {
      if (err.message === "Unathorized") {
        userApi.signout(); // call signout() function
      }
      return { err };
    }
  },
};

export default userApi;
