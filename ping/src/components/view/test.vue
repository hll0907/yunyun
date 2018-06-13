<template>
    <div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value:''
    };
  },
  mounted() {
    // this.cookies.a(1);
      var keyword = window.location.href;
      var i = keyword.indexOf("Urls=");
      this.value = decodeURIComponent(keyword.substring(i + 5, keyword.length));
      alert(this.value)
  },
  methods: {}
};
</script>
<style lang="less">
body {
  background: #f1f1f1;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>