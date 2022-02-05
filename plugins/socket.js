import Vue from 'vue'
import io from 'socket.io-client'
const socket = io('https://thepsa.herokuapp.com')

Vue.prototype.socket = socket
