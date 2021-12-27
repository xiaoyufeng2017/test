const Koa = require('koa')
const app = new Koa()

const webSocket = require('ws')

const ws = new webSocket('ws://192.168.14.162:8000')

ws.onopen = () => {
  console.log('webSocket onopen');
  ws.send('hellojj')
}
ws.onmessage = e => {
  console.log('receives:', e);
}
ws.onclose = e => {
  console.log('onclose');
}