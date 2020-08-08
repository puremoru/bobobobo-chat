<template>
<div>
  <nav class="flex items-center justify-between flex-wrap p-6 bg-white">
    <div class="flex items-center flex-no-shrink mr-6" style="color: #aee0e0;">
      <nuxt-link to="/messages/users/1"><span class="font-semibold text-xl tracking-tight">SmartChat</span></nuxt-link>
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
        </div>
      </div>
      <!-- Chat content -->
      <div class="flex-1 flex flex-col overflow-hidden" style="background-color: #f4fcfc;">
          <!-- Chat messages -->
          <div class="px-6 py-4 flex-1 overflow-y-scroll">
              <!-- A message -->
              <div class="flex items-start mb-4 text-sm">
                <img src="https://randomuser.me/api/portraits/men/24.jpg" class="w-10 h-10 rounded-full mr-3" />
                <div class="flex-1 overflow-hidden">
                    <div>
                        <span class="font-bold">{{ toUser.name }}</span>
                        <span class="text-grey text-xs">12:45</span>
                    </div>
                    <p class="text-black leading-normal">Hey</p>
                </div>
              </div>
              <div class="flex mb-4 text-sm float-right">
                <img src="https://randomuser.me/api/portraits/men/24.jpg" class="w-10 h-10 rounded-full mr-3" />
                <div class="flex-1 overflow-hidden">
                    <div>
                        <span class="font-bold">{{ me.name }}</span>
                        <span class="text-grey text-xs">12:45</span>
                    </div>
                    <p class="text-black leading-normal">Hey</p>
                </div>
              </div>
          </div>
          <div class="pb-6 px-4 flex-none">
              <div class="flex rounded-lg border-2 border-grey overflow-hidden">
                  <span class="text-3xl text-grey border-r-2 border-grey p-2">
                      <svg class="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                    </span>
                  <input type="text" class="w-full px-4" placeholder="メッセージを入力してください" />
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
    async asyncData({ $axios, params }) {
        const [me, users, toUser] = await Promise.all([
          $axios.$get("/test2/users/1"),
          $axios.$get("/test2/users"),
          $axios.$get(`/test2/users/${params.id}`)
        ]);
        return {
          me: me.result,
          users: users.result.slice(1, 5),
          toUser: toUser.result,
        }
    },
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
