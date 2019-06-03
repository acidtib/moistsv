<template>
  <div class="tx">
    <h3>Transaction: {{ $route.params.txHash }}</h3>

    <div>
      <md-tabs v-if="txObject[0]">
        <md-tab id="tab-details" md-label="Details">
          <md-content v-if="decodedTx.title.clean">
            <h3>Title:</h3>
            <p>{{decodedTx.title}}</p>
          </md-content>

          <md-content v-if="decodedTx.payload.clean">
            <h3>Payload:</h3>
            <p>{{decodedTx.payload}}</p>
          </md-content>
        </md-tab>

        <md-tab id="tab-raw-tx" md-label="Raw Tx">
          <code>{{txObject[0]}}</code>
        </md-tab>
      </md-tabs>

      <md-empty-state v-if="errorObject[0]"
        md-icon="transform"
        md-label="Failed to load transaction!">
        <!-- <md-button class="md-primary md-raised">Create first project</md-button> -->
      </md-empty-state>
    </div>
  </div>
</template>

<script>
import { decode } from 'punycode';
  export default {
    name: 'tx',
    data: function() {
      return {
        errorObject: [],
        txObject: [],
        decodedTx: {
          title: {
            hex: null,
            clean: null
          },
          payload: {
            hex: null,
            clean: null
          }
        }
      }
    },
    created: function () {
      this.fetchTx()
    },
    methods: {
      fetchTx: function() {
        let txId = this.$route.params.txHash
        let txObject = this.txObject
        let errorObject = this.errorObject
        let decodedTx = this.decodedTx

        datapay.connect().requestGet('/api/v3/main/tx/'+txId, function(error, res, body) { 
          if (error) {
            console.log('Error:' + error)
            errorObject.push(error)
          } else {
            let parsedBody = JSON.parse(body)

            if (res.statusCode == 200) {
              txObject.push(parsedBody)

              let load = parsedBody.vout[0].scriptPubKey.asm.split(" ")
              console.log(load)
              if (load.length == 3) {
                decodedTx.title.hex = load[1]
                decodedTx.title.clean = new Buffer(load[1], 'hex').toString()

                decodedTx.payload.hex = load[2]
                decodedTx.payload.clean = new Buffer(load[2], 'hex').toString()
              }

              if (load.length == 2) {
                decodedTx.payload.hex = load[1]
                decodedTx.payload.clean = new Buffer(load[1], 'hex').toString()
              }
            } else {
              errorObject.push(parsedBody)
            }
          }
        })
      }
    }
  }
</script>
