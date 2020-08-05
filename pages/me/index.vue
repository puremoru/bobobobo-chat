<template>
  <div class="w-screen h-screen bg-white flex flex-row flex-wrap p-3">
    <div class="mx-auto w-2/3">
      <!-- Profile Card -->
      <div
        class="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased"
        style="
  background-image: url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
  background-repeat: no-repat;
  background-size: cover;
  background-blend-mode: multiply;
"
      >
        <div class="md:w-1/3 w-full">
          <img
            class="rounded-lg shadow-lg antialiased"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          />
        </div>
        <div class="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
          <div class="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
            <div class="text-2xl text-white leading-tight">{{user.name}}</div>
            <div class="text-normal text-gray-300">
              <span class="border-gray-500 pb-1">{{user.status}}</span>
            </div>
            <div
              class="text-sm text-gray-300 md:absolute pt-3 md:pt-0 bottom-0 right-0"
            >Tickets: x {{user.tickets}}</div>
          </div>
        </div>
      </div>
      <div class="py-1">
        <span class="px-1 text-sm text-gray-600">name</span>
        <input
          placeholder
          type="text"
          class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          v-model="name"
        />
      </div>
      <div class="py-1">
        <span class="px-1 text-sm text-gray-600">Status</span>
        <input
          placeholder
          type="text"
          class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          v-model="status"
        />
      </div>
      <label class="flex justify-start items-start py-3">
        <div
          class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
        >
          <input type="checkbox" class="opacity-0 absolute" />
          <svg
            class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
        <div class="select-none text-gray-600">Busy!!</div>
      </label>
      <button
        v-on:click="click"
        class="block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
      >更新</button>
      <!-- End Profile Card -->
    </div>
  </div>
</template>

<script>
import Cookies from "universal-cookie";

export default {
  data() {
    return {
      name: "",
      status: "",
      tickets: "",
    };
  },

  methods: {
    async click() {
      let update_user = {
        name: this.name,
        status: this.status,
      };
      const url = "/test2/users/1";
      const key = "シークレットキー";

      const cookies = new Cookies();
      cookies.set("key", key);

      const req = await this.$axios.$put(url, {
        name: this.name,
        status: this.status,
      });

      location.reload();
    },
  },

  async asyncData({ app }) {
    // 取得先のURL
    const url = "/test2/users/1";
    const key = "シークレットキー";

    const cookies = new Cookies();
    cookies.set("key", key);
    // リクエスト（Get）
    const response = await app.$axios.$get(url);

    // this.name = response.result.name;
    // this.status = response.result.status;

    //配列で返ってくるのでJSONにして返却;
    return {
      user: response.result,
    };
  },
};
</script>

<style>
input:checked + svg {
  display: block;
}
</style>
