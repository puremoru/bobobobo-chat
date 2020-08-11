<template>
<div>
  <nav class="flex items-center justify-between flex-wrap p-6 bg-white">
    <div class="flex items-center flex-no-shrink mr-6" style="color: #aee0e0;">
      <nuxt-link to="/messages/users/1"><span class="font-bold text-xl tracking-tight">SmartChat</span></nuxt-link>
    </div>
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
        <svg class="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
  </nav>
  <div class="font-sans antialiased flex" style="height: 45em;">
      <!-- Sidebar / channel list -->
      <div class="text-purple-lighter flex-none w-64 pb-6 hidden md:block base-bg-color">
        <nuxt-link to="/me">
          <div class="text-white mb-2 mt-3 px-4 flex justify-between">
              <div class="flex-auto mb-6">
                  <div class="inline-block">
                    <img class="w-12 rounded-full" src="https://randomuser.me/api/portraits/men/24.jpg"/>
                  </div>
                  <div class="text-xl leading-tight truncate inline-block text-black ml-3">{{ me.name }}
                    <div class="text-sm font-bold" :class="[ me.status == 'busy' ? 'text-red-400' : 'text-teal-600' ]">{{ me.status }}</div>
                  </div>
              </div>
          </div>
        </nuxt-link>

          <div class="mb-8">
            <div class="px-4 mb-2">
              <div class="text-black">Users</div>
            </div>

            <div class="px-4 mb-2 py-4 flex justify-between" v-for="user in users" :key=user.id :class="[ $route.params.id == user.id ? 'emphasize-bg-color' : 'base-bg-color' ]">
              <nuxt-link :to="{ name: 'messages-users-id', params: { id: user.id }}">
                <div class="flex-auto">
                  <div class="inline-block">
                    <img class="w-12 rounded-full" src="https://randomuser.me/api/portraits/men/24.jpg"/>
                  </div>

                  <div class="text-xl leading-tight truncate inline-block text-black ml-3">{{ user.name }}
                    <div class="text-sm font-bold" :class="[ user.status == 'busy' ? 'text-red-400' : 'text-teal-600' ]">{{ user.status }}</div>
                  </div>
                </div>
              </nuxt-link>
          </div>

          <div class="px-4 mb-2 py-4 flex justify-between" :class="[ $route.params.id == 35 ? 'emphasize-bg-color' : 'base-bg-color' ]">
              <nuxt-link to="/messages/users/35">
                <div class="flex-auto">
                  <div class="inline-block">
                    <img class="w-12 rounded-full" src="https://i.pinimg.com/originals/51/83/ef/5183ef65b82a66cf573f324e59cf028b.png"/>
                  </div>

                  <div class="text-xl leading-tight truncate inline-block text-black ml-3">
                    someone
                    <div class="text-sm font-bold" :class="[ me.tickets == '0' ? 'text-red-400' : 'text-teal-600' ]">{{ me.tickets }}</div>
                  </div>
                </div>
              </nuxt-link>
          </div>
        </div>
      </div>
      <!-- Chat content -->
      <div class="flex-1 flex flex-col overflow-hidden" style="background-color: #f4fcfc;">
          <!-- Chat messages -->
          <div class="px-6 py-4 flex-1 overflow-y-scroll">
              <!-- A message -->
              <div class="flex items-start py-3 mb-4 text-sm" v-for="message in messages" :key="message.id">
                <img src="https://i.pinimg.com/originals/51/83/ef/5183ef65b82a66cf573f324e59cf028b.png" class="w-10 h-10 rounded-full mr-3" v-if="message.from == 'someone'"/>
                <img src="https://randomuser.me/api/portraits/men/24.jpg" class="w-10 h-10 rounded-full mr-3" v-else/>
                <div class="flex-1 overflow-hidden">
                    <div>
                        <span class="font-bold">{{ message.from }}</span>
                        <span class="text-grey text-xs">{{ message.timestamp }}</span>
                    </div>
                    <p class="text-black leading-normal">{{ message.content }}</p>
                </div>
              </div>
          </div>
          <div class="pb-6 px-4 flex-none">
              <div class="flex rounded-lg border-2 border-grey overflow-hidden">
                  <span class="text-3xl text-grey border-r-2 border-grey p-2">
                      <svg class="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                    </span>
                  <input type="text" class="w-full px-4" placeholder="メッセージを入力してください" v-model="input" />
                  <span class="p-2 bg-teal-100" @click="send()">
              		  <svg class="h-6 w-6 text-teal-600 feather feather-send"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </span>
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import Cookies from "universal-cookie";
export default {
    async asyncData({ $axios, params, store }) {
      const [me, users, toUser] = await Promise.all([
        $axios.$get("/test2/users/1"),
        $axios.$get("/test2/users"),
        $axios.$get(`/test2/users/${params.id}`)
      ]);

      let messages = []
      if (params.id != me.result.id) {
        const res = await $axios.$get("/test2/messages")
        messages = res.result.filter(m => (m.from == me.result.name && m.to == toUser.result.name) || (m.from == toUser.result.name && m.to == me.result.name));
      }
      store.commit('messages/setChatContents', {
        me: me.result,
        users: users.result.slice(1, 5),
        toUser: toUser.result,
        messages: messages,
      })
    },
    data() {
      return {
        input: "",
        me: this.$store.state.messages.me,
        users: this.$store.state.messages.users,
        toUser: this.$store.state.messages.toUser,
        messages: this.$store.state.messages.messages,
      }
    },
    mounted() {
      if (this.toUser.status == 'busy') {
        alert(`${this.toUser.name}さんは忙しいみたいなので, 不急な連絡は控えましょう。`)
      }
      if (this.toUser.name == 'someone' && this.me.tickets == '0') {
        alert('チケットがないので送ることはできません')
      }
    },
    methods: {
      async send() {
        if (this.input) {
          // const key = process.env.KEY;
          const key = "gfg43827hnfdsfai";
          const cookies = new Cookies();
          cookies.set("key", key);

          if (this.toUser.name == 'someone') {
            if (this.me.tickets == "0") {
              alert('チケットがないので送ることはできません')
              this.$router.push("/messages/users/1")
            } else {
              const send = await this.$axios.$post("/test2/messages", {
              from: 'someone',
              to: this.toUser.name,
              content: this.input,
            })
            .then(async res => {
              const response = await this.$axios.$get("/test2/messages")
              const updatedMessages = response.result.filter(m => (m.from == this.me.name && m.to == this.toUser.name) || (m.from == this.toUser.name && m.to == this.me.name));
              await this.$store.commit('messages/setMessages', {
                messages: updatedMessages
              })
              await this.$axios.$put(`/test2/users/${this.me.id}`, {
                tickets: String(parse(this.me.tickets, 10) - 1)
              })
              const me = await this.$axios.$get("test2/users/1")
              await this.$store.commit('messages/setMe', me.result)
              this.messages = this.$store.state.messages.messages
              this.me = this.$store.state.messages.me
              }).catch(e => {
                console.error(e)
              }).finally(() => {
                this.input = ""
              })
            }
          } else {
            const send = await this.$axios.$post("/test2/messages", {
            from: this.me.name,
            to: this.toUser.name,
            content: this.input,
            })
            .then(async res => {
              const response = await this.$axios.$get("/test2/messages")
              const updatedMessages = response.result.filter(m => (m.from == this.me.name && m.to == this.toUser.name) || (m.from == this.toUser.name && m.to == this.me.name));
              await this.$store.commit('messages/setMessages', {
                messages: updatedMessages
              })
              this.messages = this.$store.state.messages.messages
            }).catch(e => {
              console.error(e)
            }).finally(() => {
              this.input = ""
            })
          }
        }
      }
    }
}
</script>

<style>
.base-bg-color {
  background-color: #d6efef;
}

.emphasize-bg-color {
  background-color: #aee0e0;
}
</style>
