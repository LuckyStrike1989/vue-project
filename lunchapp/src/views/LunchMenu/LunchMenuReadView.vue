<template>
    <div>점심 메뉴 보기 {{ $route.query.seq }}</div>
    {{ lunchMenuItem.menu_name }}
    <div class="buttons">
        <div class="left">
            <button class="button" @click="editClick">수정</button>
            <button class="button" @click="deleteClick">삭제</button>
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
        
        async function deleteClick() {
            let result = confirm("삭제하시겠습니까?");
            
            if( result ) {
                try {
                    const res = await axios.delete("http://127.0.0.1:9000/api/v1/lunchmenus/" + route.query.seq);

                    if( res.data.code == 200 ) {
                        alert("삭제되었습니다.");
                        router.push({name : 'lunchmenulist'});
                    } else {
                        alert("삭제되지 않았습니다.");
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        }

        function editClick() {
            var result = confirm('수정하시겠습니까?');
            if(result) {
                router.push({name : 'lunchmenuedit', query : {seq : route.query.seq}});
            }
        }

        function listClick() {
            router.back();
        }

        function getLunchMenuItem() {
            axios.get("http://127.0.0.1:9000/api/v1/lunchmenus/" + route.query.seq).then((res) => {
                console.log(res);
                lunchMenuItem.value = res.data.data;
            }).catch((err) => {
                console.log(err);
            });
        }

        return {
            lunchMenuItem, getLunchMenuItem, listClick, editClick, deleteClick
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