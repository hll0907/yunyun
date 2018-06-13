export default {
    a: function(key) {
        alert(key)
    },
    getCookie: function(name) {
        name = name + "=";
        var start = document.cookie.indexOf(name),
            value = null;
        if (start > -1) {
            var end = document.cookie.indexOf(";", start);
            if (end == -1) {
                end = document.cookie.length;
            }
            value = document.cookie.substring(start + name.length, end);
        }
        return value;
    }
}