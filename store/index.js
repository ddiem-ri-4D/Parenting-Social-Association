import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      users: [],
      group: {},
      events: [],
      userGroup: [],
    },

    mutations: {
      setUsers(state, users) {
        state.users = users
      },

      setGroup(state, group) {
        state.group = group
      },

      setEvents(state, events) {
        state.events = events
      },

      setUserGroup(state, users) {
        state.userGroup = users
      },
    },

    actions: {
      setUsers(vuexContext) {
        return this.$axios
          .$get('/admin/users')
          .then((res) => {
            if (res.success) {
              vuexContext.commit('setUsers', res.users)
            }
          })
          .catch((error) => console.error(error))
      },

      setEvents(vuexContext) {
        return this.$axios
          .$get('/admin/event')
          .then((res) => {
            if (res.success) {
              vuexContext.commit('setEvents', res.events.slice().reverse())
            }
          })
          .catch((error) => console.error(error))
      },

      setGroup(vuexContext, id) {
        return this.$axios
          .$get('/groups/decks/' + id)
          .then((res) => {
            if (res.success) {
              vuexContext.commit('setGroup', res.group)
              return res.success
            }
          })
          .catch((error) => console.error(error))
      },

      setUserGroup(vuexContext) {
        return this.$axios
          .$get('/groups/users/getAll')
          .then(async (res) => {
            let tempArr = []
            if (res.success) {
              await res.user.groups.forEach((item) => {
                tempArr = [...tempArr, ...item.users]
              })

              const newArr = []
              for (let i = 0; i < tempArr.length; i++) {
                let flag = 0
                for (const item of newArr) {
                  if (item._id === tempArr[i]._id) {
                    flag += 1
                  }
                }
                if (flag === 0 && tempArr[i]._id !== vuexContext.state.auth.user._id) {
                  newArr.push(tempArr[i])
                }
              }

              vuexContext.commit('setUserGroup', newArr)
            }
          })
          .catch((error) => {
            console.error(error)
          })
      },
    },

    getters: {
      getUsers(state) {
        return state.users
      },

      getGroup(state) {
        return state.group
      },

      getEvents(state) {
        return state.events
      },

      getUserGroup(state) {
        return state.userGroup
      },
    },
  })
}

export default createStore
