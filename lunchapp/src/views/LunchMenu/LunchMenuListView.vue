<template>
    <div>점심 메뉴 리스트</div>
    <div v-if="lunchMenuList.length == 0">
        점심 메뉴가 없습니다.
    </div>
    <div v-else>
        점심 메뉴가 {{ lunchMenuList.length }} 개 있습니다.
        <ul class="menu-list">
            <li class="menu-item" v-for="(lunchMenuItem, index) in lunchMenuList" :key="index">
                {{ lunchMenuItem.menu_name }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name : 'LunchMenuListView',
    data() {
        return {
            lunchMenuList : []
        }
    },
    methods : {
        async getLunchMenuList() {
            try {
                const result = await axios.get("http://127.0.0.1:9000/api/v1/lunchmenus/");
                console.log(result);
                this.lunchMenuList = result.data.data;
            } catch(err) {
                console.log(err);
            }
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
    margin: 10px auto;
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