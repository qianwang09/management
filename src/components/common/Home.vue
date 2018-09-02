<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                     <router-view></router-view>
                    <!-- <keep-alive :include="tagsList">
                       
                    </keep-alive> -->
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                UrlUser: 'api/Users',
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            console.log('home created')
            if(this.$root.user == null){
                const Name = localStorage.getItem("Name")
                const Password = localStorage.getItem("Password")
                if(Name && Password){
                var queryStr = '?Name=' + Name + '&Password=' + Password
                debugger
                var res = this.$axios.get(this.$root.HostURL + this.UrlUser + queryStr).then( res => {
                    if (res.status == 200 || res.statusText == "OK"){
                        this.$root.user = res.data;
                    }else{
                    localStorage.removeItem('Password')
                    this.$router.push('/login');
                    }
                }).catch(function (error) {
                    localStorage.removeItem('Password')
                    this.$router.push('/login');
                    })
                }
            }

            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
