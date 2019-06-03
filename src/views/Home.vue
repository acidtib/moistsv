<template>
  <div class="home">
    <div class="hello-notice">
      <h2>Notice:</h2>
      <p>Moistsv.com is a simple proof-of-concept for storing data on the BitcoinSV chain, <br> don't moist it up with some illegal shit, use this tool for science and trolling.</p>
      <p>For feedback or just to call me a wanker, hit me up on twitter <a href="https://twitter.com/acidtib_" target="_blank">@acidtib_</a></p>
    </div>

    <md-divider></md-divider>
    
    <md-field class="pk">
      <label>Private Key:</label>
      <md-input v-model="pk" type="password"></md-input>
      <span class="md-helper-text">All the bitcoin magic takes place on the client side, so your private key is safe.</span>
    </md-field>

    <md-field class="title">
      <label>Title:</label>
      <md-input v-model="title"></md-input>
      <span class="md-helper-text">Optional title.</span>
    </md-field>

    <md-field class="payload">
      <label>Data:</label>
      <md-textarea v-model="payload"></md-textarea>
      <span class="md-helper-text">Data that will be stored on the BitcoinSV blockchain.</span>
    </md-field>

    <div>
      <md-button class="md-raised md-primary moist-button" v-on:click="moistit">Moist It Up!</md-button>
    </div>

    <div class="error-sending" v-if="viewObject.error">
      Error: {{viewObject.errormessage}}
    </div>

    <div class="success-sending" v-if="viewObject.success">
      Success: Transaction on chain {{viewObject.txHash}}
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .home {
    .payload {
      margin: 36px 0px 57px 0px;
    }
    .pk,
    .title {
      margin-bottom: 49px;
    }
    .moist-button {
      margin: 0px;
      width: 100%;
    }
    .error-sending,
    .success-sending {
      margin-top: 28px;
    }
  }
</style>

<script>
  export default {
    name: 'home',
    data: function() {
      return {
        pk: null,
        title: null,
        payload: null,
        viewObject: {
          txHash: null,
          success: false,
          error: false,
          errormessage: null
        }
      }
    },
    methods: {
      moistit: function() {
        let toMoist = []
        if (this.title) {
          let title = "0x" + new Buffer(this.title).toString('hex')
          toMoist.push(title)
        }
        
        let payload = "0x" + new Buffer(this.payload).toString('hex')
        toMoist.push(payload)

        let viewObject = this.viewObject
        let innerRouter = this.$router

        let transaction = {
          data: toMoist,
          pay: {
            key: this.pk
          }
        }

        console.log(transaction)

        datapay.send(transaction, function(error, hash) {
          if (error) {
            viewObject.errormessage = error
            viewObject.error = true
            console.log(error)
          } else {
            console.log(hash)
            viewObject.txHash = hash
            viewObject.success = true
            
            setTimeout(function() { innerRouter.replace('/tx/'+hash) }, 1000)
          }
        })
      }
    }
  }
</script>