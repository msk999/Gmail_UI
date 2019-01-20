<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <hr>
    <table>
      <tr v-for="item in messages" :key="item.id">
        <td>{{item.from | truncate }}</td>
        <!-- <td>{{item.from}}</td> -->
        <td>{{ item.subject }}</td>
        <td>{{item.date | date_format}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    ...mapGetters("messages", [
      "messages",
      "messageRetrievingError",
      "messageRetrievingErrorCode"
    ])
  },
  filters: {
    truncate: function(value) {
      if (!value) return "";
      // strip out any quotes
      value = value.toString().replace(/["']/g, "");
      // check for embedded email address.  We just want the nice name
      var indexChar = value.indexOf("<");
      if (indexChar < 0) return value;
      return value.substring(0, indexChar).trim();
    },
    date_format: function(value) {
      var dateElem = new Date(value);
      var date_string = dateElem.toLocaleDateString();
      if (date_string == new Date().toLocaleDateString()) {
        // eslint-disable-next-line
        date_string = dateElem.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      return date_string;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  text-align: left;
  /* margin: 0 10px; */
}
a {
  color: #42b983;
}

table {
  border-collapse: collapse;
  font-family: "Roboto,RobotoDraft,sans-serif,Helvetica,Arial";
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
  font-size: 0.875rem;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
