<template>
    <nav>
        <v-app-bar app flat>
            <v-app-bar-nav-icon v-on:click="toggleDrawer" class="grey--text"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">P</span>
                <span>Recog</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="grey">
                <span>Sign Out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app dark v-model="drawer" class="blue">
            <v-list nav>
                <v-list-item v-ripple v-for="item in drawerItems" v-bind:key="item.title" router v-bind:to="item.route" active-class="white--text">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon" ></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            drawerItems: [
                {icon: 'mdi-dashboard', title: 'Dashboard', route: '/'},
                {icon: 'mdi-dashboard', title: 'Deferred', route: '/deferred'},
                {icon: 'mdi-dashboard', title: 'Realtime', route: '/realtime'},
                {icon: 'mdi-dashboard', title: 'Settings', route: '/settings'},
            ]
        }
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer
        }
    }
}
</script>