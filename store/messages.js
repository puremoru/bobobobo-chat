export const state = () => ({
  me: {},
  users: [],
  toUser: {},
  messages: [],
});

export const mutations = {
  setChatContents(state, input) {
    state.me = input.me;
    state.users = input.users;
    state.toUser = input.toUser;
    state.messages = input.messages;
  },

  setMessages(state, input) {
    state.messages = input.messages;
    state.me = input.me;
  },
};

export const actions = {};

export const getters = {
  me: state => state.me,
  users: state => state.users,
  toUser: state => state.toUser,
  sentContents: state => state.sentContents,
  recievedContents: state => state.recievedContents,
};
