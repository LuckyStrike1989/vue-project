<template>
    <div>점심 메뉴 리스트</div>
    <div class="buttons">
        <div class="right">
            <router-link :to="{ name: 'lunchmenuadd' }" class="button blue">
                <span>등록</span>
            </router-link>
        </div>
    </div>
    <div v-if="lunchMenuList.length == 0">
        점심 메뉴가 없습니다.
    </div>
    <div v-else>
        점심 메뉴가 {{ lunchMenuList.length }} 개 있습니다.
        <ul class="menu-list">
            <li class="menu-item" v-for="(lunchMenuItem, index) in lunchMenuList" :key="index" @click="gotoLunchMenuRead(lunchMenuItem)">
                {{ lunchMenuItem.menu_name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';


export default {
    name : 'LunchMenuListView',
    setup() {
        const router = useRouter();
        let lunchMenuList = ref([]);

        function gotoLunchMenuRead(lunchMenuItem) {
            console.log('gotoLunchMenuRead ::: ', lunchMenuItem);
            router.push({name : 'lunchmenuread', params : {seq : lunchMenuItem.seq}});
        }

        function getLunchMenuList() {
            axios.get("http://localhost:9000/api/v1/lunchmenus/").then((res) => {
                lunchMenuList.value = res.data.data;
            }).catch((err) => {
                console.log(err);
            });
        }

        return {
            lunchMenuList, getLunchMenuList, gotoLunchMenuRead
        }
    },
    mounted() {
        this.getLunchMenuList();
    }
}
</script>

<style>
.menu-list {
    width: 500px;
    margin: 10px 10px;
    padding: 0;
}
.menu-item {
    list-style: none;
    padding: 10px 10px;
    background-color: #0a4171;
    color: white;
    margin: 4px 0px;
}    
</style>