<template>
    <div class="lunch-menu">점심 메뉴</div>
    <div class="lunch-view">
        <router-view/>
    </div>
</template>

<style>
.lunch-menu {
    width: 540px;
    margin: 10px auto;
}
.lunch-view {
    background-color: #dddddd;
    width: 540px;
    padding: 12px 0px;
    margin: auto auto;
}
</style>