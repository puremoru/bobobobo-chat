<template>
<div class="font-sans antialiased h-screen flex">
    <!-- Sidebar / channel list -->
    <div class="bg-teal-600 text-purple-lighter flex-none w-64 pb-6 hidden md:block">
        <div class="text-white mb-2 mt-3 px-4 flex justify-between">
            <div class="flex-auto mb-6">
                <div class="inline-block">
                  <img class="w-12 rounded-full" src="https://randomuser.me/api/portraits/men/24.jpg"/>
                </div>
                <div class="font-semibold text-xl leading-tight truncate inline-block">Me
                  <span class="text-white text-sm ml-20 font-bold">Busy!</span>
                </div>
            </div>
        </div>

        <div class="mb-8">
          <div class="px-4 mb-2 text-white flex justify-between items-center">
            <div class="opacity-75">Users</div>
          </div>

          <div class="text-white px-4 flex justify-between" v-for="user in users" :key=user>
            <div class="flex-auto mb-6">
              <div class="inline-block">
                <img class="w-12 rounded-full" src="https://randomuser.me/api/portraits/men/24.jpg"/>
              </div>
              <div class="font-semibold text-l leading-tight mb-1 truncate inline-block">{{ user.name }}
                <span class="text-white text-sm ml-20 font-bold float-right">{{ user.status }}</span>
              </div>
            </div>
        </div>
      </div>
    </div>
    <!-- Chat content -->
    <div class="flex-1 flex flex-col bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <img class="w-12 rounded-full" src="https://randomuser.me/api/portraits/men/24.jpg"/>
                <h3 class="text-grey-darkest mb-1 font-extrabold">川満 歩貴</h3>
            </div>
        </div>
        <!-- Chat messages -->
        <div class="px-6 py-4 flex-1 overflow-y-scroll">
            <!-- A message -->
            <div class="flex items-start mb-4 text-sm">
                <img src="https://randomuser.me/api/portraits/men/24.jpg" class="w-10 h-10 rounded-full mr-3" />
                <div class="flex-1 overflow-hidden">
                    <div>
                        <span class="font-bold">川満 歩貴</span>
                        <span class="text-grey text-xs">12:45</span>
                    </div>
                    <p class="text-black leading-normal">Hey</p>
                </div>
            </div>
            <div class="flex mb-4 text-sm float-right">
                <img src="https://randomuser.me/api/portraits/men/24.jpg" class="w-10 h-10 rounded-full mr-3" />
                <div class="flex-1 overflow-hidden">
                    <div>
                        <span class="font-bold">Me</span>
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
                <input type="text" class="w-full px-4" placeholder="Message #general" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    async asyncData({ $axios }) {
        const res = await $axios.$get("http://db.denchu.cloud:5111/uiuxchat3287bivsgfbivf/test2/users");
        return {
          users: res.result.slice(0, 3)
        }
    },
}
</script>
