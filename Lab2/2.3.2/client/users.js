function users() {

    get = function() {
        return axios.get("http://localhost:3000/users");
    }
    
    remove = function(){
        return axios.delete("http://localhost:3000/users" + index);
    }

    save = function(){
        return axios.save("http://localhost:3000/users", user);
    }

    update = function(){
        return axios.put("http://localhost:3000/users" + index, user);
    }

    return {
        get: get,
        remove: remove,
        save : save,
        add: add,
        update : update,
    }
}