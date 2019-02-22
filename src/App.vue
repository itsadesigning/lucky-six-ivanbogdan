<template>
  
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';

const configUrl = 'https://gcm-fra-staging-1.7platform.com:8008/get-lb';
const query = 'token="token"&clientType="user"';
const channel = '1d0d6713-b7c9-4f07-ab23-3451a06e8989';

axios.get(configUrl).then((res) => {
    const socketUrl = res.data.url;
    const socket = io(socketUrl, {query});
    socket.on('connect', () => {
        socket.emit('subscribe', {
            channel,
            subChannes: {
                language: 'en',
                deliveryPlatform: 'Web',
                playerUuid: null
            }
        })
    });
socket.on(channel, (res) => {
    if(res) {
        const eventType = res.type;
        const data = res.data;
        switch(eventType) {
        case 'state':
            console.log('state: ', data);
            break;
        case 'new':
            console.log('new: ', data);
           break;
        case 'ball':
            console.log('ball: ', data);
        case 'results':
            console.log('results: ', data);
            break;
        case 'countdown':
            console.log('countdown: ', data);
            break;
        }
    }
});
});

export default {
    created() {
        
    }
}
</script>

<style lang="scss">

</style>
