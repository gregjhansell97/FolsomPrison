import axios from 'axios';
import store from './flux/store.js';
import {
    setMap
} from './flux/actions.js';
import spoof_data from "./spoof_data.json";

export default {
    refreshMap: function() {
        /**
         * grabs the most up-to-date map
         */
        const hosts = ["127.0.0.1:8080"]
        const host = hosts[Math.floor(Math.random()*hosts.length)];
        axios.get("http://" + host + "/get_hive_map") //it /hivemap/rpi/get_map
        .then(response => {
            store.dispatch(setMap(response.data));
        })
        .catch(error => {
            //console.log("HERE :(")
            store.dispatch(setMap({}));
        })

    }
}
