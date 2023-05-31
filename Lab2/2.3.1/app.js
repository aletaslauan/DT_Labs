var app = new Vue({
    el: '#app',
    data: {
        message: '',
        message2: ''
    },
    methods: {
       process: function(){
        if (this.message === "123")
        {
            console.log("The message is 123");
            this.message2 = "The message now is 123";
        }
         else
         {
           console.log(this.message);
            }
        }
    }
})