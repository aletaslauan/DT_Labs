var app = new Vue({
    el: '#app',
    data: {
        users: [],
        usersService: null,
        name: "",
        city: "",
        newName: "",
        newCity: "",
    },
    created: function () {
        this.usersService = users();
        this.usersService.get().then(response => (this.users = response.data));
    },
    methods: {
        remove:  function(index){
            usersService.remove(index).then(response =>{
            tosstr.success(response.data)
            usersService.get().then(response => (this.user = reponse.data));
            })
        },
        add: function(name, city){
            console.log(name, city);
            this.usersService.add({name, city}).then(response =>(this.users = response.data));
        },
        modify: function(index, name, city){
            this.usersService.modify(index,{name, city}).then(response =>(this.users = response.data));
        },
        open: function(){
            this.openNewUserPanel = true;
        },
        close: function(){
            this.openNewUserPanel = false;
        },
        save: function(){
            usersService.save(this.newUser).then(response =>{
            tosstr.success(response.data)
            usersService.get().then(response => (this.user = reponse.data)); 
            })
        this.openNewUserPanel
    }
}})