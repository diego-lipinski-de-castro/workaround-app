const SET_PERMISSION = "SET_PERMISSION";
const SET_POSITION = "SET_POSITION";

const state = {
  hasPermission: null,
  currentPosition: null
};

const mutations = {
  [SET_PERMISSION](state, hasPermission) {
    state.hasPermission = hasPermission;
  },
  [SET_POSITION](state, coords) {
    state.currentPosition = coords;
  }
};

const actions = {
  async setPermission({ commit }) {
    const permission = await navigator.permissions.query({
      name: "geolocation"
    });

    const hasPermission = permission.state == "granted" ? true : false;

    commit(SET_PERMISSION, hasPermission);

    return hasPermission;
  },

  setPosition({ commit }) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position =>
          commit(SET_POSITION, {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }),
        () => commit(SET_POSITION, null),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000
        }
      );
    } else {
      commit(SET_POSITION, null);
    }
  }
};

const getters = {
  hasPermission: state => state.hasPermission,
  currentPosition: state => state.currentPosition
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
