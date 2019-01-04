import EventService from "@/services/EventService";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  eventsTotal: 0
};
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, event) {
    state.events = event;
  },
  SET_EVENTS_TOTAL(state, eventTotal) {
    state.eventsTotal = eventTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return new Promise((resolve, reject) => {
      EventService.postEvent(event).then(
        response => {
          commit("ADD_EVENT", response.data);
          const notification = {
            type: "success",
            message: "Your event has been created"
          };
          dispatch("notification/add", notification, { root: true });
          resolve(response); // send back the posted data with new id
        },
        error => {
          const notification = {
            type: "error",
            message: "There was a problem creating an event: " + error.message
          };
          dispatch("notification/add", notification, { root: true });
          // http failed, let the calling function know that action did not work out
          reject(error);
        }
      );
    });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    return new Promise((resolve, reject) => {
      EventService.getEvents(perPage, page).then(
        response => {
          commit("SET_EVENTS", response.data);
          console.log("Total events are " + response.headers["x-total-count"]);
          commit(
            "SET_EVENTS_TOTAL",
            parseInt(response.headers["x-total-count"])
          );
          resolve(response);
        },
        error => {
          const notification = {
            type: "error",
            message: "There was a problem fetching events: " + error.message
          };
          dispatch("notification/add", notification, { root: true });
          reject(error);
        }
      );
    });
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    var event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      return new Promise((resolve, reject) => {
        EventService.getEvent(id).then(
          response => {
            commit("SET_EVENT", response.data);
            resolve(response);
          },
          error => {
            const notification = {
              type: "error",
              message:
                "There was a problem fetching event " + id + error.message
            };
            dispatch("notification/add", notification, { root: true });
            reject(error);
          }
        );
      });
    }
  }
};
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
