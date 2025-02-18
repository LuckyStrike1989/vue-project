<template>
    <div>점심 메뉴 {{ $route.name == 'lunchmenuedit' ? '수정' : '등록' }}</div>
    <form class="lunchMenuForm">
        <div>
            <label for="lunchMenuName">점심 메뉴 명 :</label>
            <input type="text" id="lunchMenuName" 
                placeholder="점심 메뉴 명을 입력하세요."
                v-model="lunchMenuName"
                ref="lunchMenuNameInput"/>
        </div>
    </form>
    <div class="buttons">
        <div class="right">
            <button v-if="$route.name == 'lunchmenuedit'" class="button blue" @click="editClick">수정</button>
            <button v-else class="button blue" @click="addClick">등록</button>
            <button class="button" @click="cancelClick">취소</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, toRefs, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    
    setup() {
        const router = useRouter();
        const route = useRoute();

        const lunchMenuNameInput = ref(null);

        const state = reactive({
            lunchMenuName: ""
        });

        function editClick() {
            if (state.lunchMenuName == "") {
                alert("점심 메뉴 명을 입력하세요.");
                state.lunchMenuName.value.focus();
                return;
            }
            var result = confirm("수정하시겠습니까?");
            if (result) {
                const lunchMenuItem = { menuName : state.lunchMenuName };
                axios.put("http://127.0.0.1:9000/api/v1/lunchmenus/"+ route.query.seq, lunchMenuItem).then(() => {
                    router.replace({name : 'lunchmenulist'});
                }).catch((err) => {
                    console.log(err);
                });
            }
        }

        const addClick = () => {
            const lunchMenuItem = { menuName : state.lunchMenuName };
            axios.post("http://127.0.0.1:9000/api/v1/lunchmenus/", lunchMenuItem).then((res) => {
                console.log(res);
                router.replace({name : 'lunchmenulist'});
            }).catch((err) => {
                console.log(err);
            });
        }

        const cancelClick = () => {
            router.back();
        }

        // state.lunchMenuName = "Hello World!!";

        function getLunchMenuItem() {
            axios.get("http://127.0.0.1:9000/api/v1/lunchmenus/" + route.query.seq).then((res) => {
                state.lunchMenuName = res.data.data.menu_name;
            }).catch((err) => {
                console.log(err);
            });
        }

        onMounted(()=>{
            lunchMenuNameInput.value.focus();
            if (route.name == "lunchmenuedit") {
                getLunchMenuItem();
            }
        });

        return {
            ...toRefs(state),
            addClick,
            cancelClick,
            editClick,
            lunchMenuNameInput
        }
    }
}

</script>

<style scoped>
.lunchMenuForm {
    margin: 10px 10px; padding: 10px 10px 0px 10px; background-color: white;
}
.lunchMenuForm > div {
    padding-bottom: 10px; display: flex;
}
.lunchMenuForm label {
    flex: 0 0 120px; line-height: 38px;
}
.lunchMenuForm input[type="text"] {
    width: 100%; font-size: 14px;
}
button {
    display: inline-block; padding: 0.375rem 0.75rem; min-width: 95px;
    border: 1px solid #6c757d; border-radius: 0.375rem; margin-left: 10px;
    cursor: pointer;
}
button:first-child {
    margin-left: 0;
}
</style>
