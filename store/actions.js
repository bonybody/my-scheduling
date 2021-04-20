export default {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

  async onAuthStateChanged({ commit, dispatch, $fire }, {authUser, claims }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }

    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
      } catch (e) {
      }
    }
    const user = await this.$fire.firestore.collection('users').doc(authUser.uid).get()

    commit('SET_AUTH_USER', { authUser: user })
  },

  checkVuexStore(ctx) {
    if (this.$fire.auth === null) {
      throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.'
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    )
  },
}