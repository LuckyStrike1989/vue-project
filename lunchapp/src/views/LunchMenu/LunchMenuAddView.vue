<template>
    <div>점심 메뉴 등록</div>
    <form class="lunchMenuForm">
        <div>
            <label for="lunchMenuName">점심 메뉴 명 :</label>
            <input type="text" id="lunchMenuName" 
                placeholder="점심 메뉴 명을 입력하세요."
                v-model="lunchMenuName"/>
        </div>
    </form>
    <div class="buttons">
        <div class="right">
            <button class="button blue" @click="addClick">등록</button>
            <button class="button" @click="cancelClick">취소</button>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
    setup() {
        const state = reactive({
            lunchMenuName: ""
        });

        const addClick = () => {

        }

        const cancelClick = () => {

        }

        state.lunchMenuName = "Hello World!!";

        return {
            ...toRefs(state),
            addClick,
            cancelClick
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
