<template>
    <div>점심 메뉴 보기 {{ $route.params.seq }}</div>
    {{ lunchMenuItem.menu_name }}
    <div class="buttons">
        <div class="left">
            <button class="button" @click="editClick">수정</button>
        </div>
        <div class="right">
            <button class="button" @click="listClick">목록</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();

        const lunchMenuItem = ref({});
        
        function editClick() {
            var result = confirm('수정하시겠습니까?');
            if(result) {
                router.push({name : 'lunchmenuedit', params : {seq : route.params.seq}});
            }
        }

        function listClick() {
            router.back();
        }

        function getLunchMenuItem() {
            axios.get("http://127.0.0.1:9000/api/v1/lunchmenus/" + route.params.seq).then((res) => {
                console.log(res);
                lunchMenuItem.value = res.data.data;
            }).catch((err) => {
                console.log(err);
            });
        }

        return {
            lunchMenuItem, getLunchMenuItem, listClick, editClick
        }
    },
    mounted() {
        this.getLunchMenuItem();
    }
}
</script>

<style>
.buttons > div.left {
    position:absolute;
    height:32px;
    left:0;
}
</style>