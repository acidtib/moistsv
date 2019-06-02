<template>
  <div class="home">
  
    <md-field class="pk">
      <label>Private Key:</label>
      <md-input v-model="pk" type="password"></md-input>
      <span class="md-helper-text">All the bitcoin magic takes place on the client side, so your private key is safe.</span>
    </md-field>

    <md-field class="payload">
      <label>Data:</label>
      <md-textarea v-model="payload"></md-textarea>
      <span class="md-helper-text">Data that will be stored on the BitcoinSV blockchain.</span>
    </md-field>

    <div>
      <md-button class="md-raised md-primary moist-button" v-on:click="moistit">Moist It Up!</md-button>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .home {
    .payload {
      margin-bottom: 42px;
    }
    .pk {
      margin-bottom: 47px;
    }
    .moist-button {
      margin: 0px;
      width: 100%;
    }
  }
</style>

<script>
  export default {
    name: 'home',
    data: () => ({
      pk: null,
      payload: null
    }),
    methods: {
      moistit: function(event) {
        console.log(this.pk)
        console.log(this.payload)
      }
    }
  }
</script>