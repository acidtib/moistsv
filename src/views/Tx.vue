<template>
  <div class="tx">
    <h3>Transaction: {{ $route.params.txHash }}</h3>

    <div>
      <md-tabs v-if="txObject[0]">
        <md-tab id="tab-details" md-label="Details">
          <md-content v-if="decodedTx.title.clean">
            <h3>Title:</h3>
            <p>{{decodedTx.title.clean}}</p>
            <md-field>
              <label>hex:</label>
              <md-input readonly v-model="decodedTx.title.hex"></md-input>
            </md-field>
          </md-content>


          <md-content v-if="decodedTx.payload.clean">
            <h3>Payload:</h3>
            <md-field>
              <md-textarea readonly v-model="decodedTx.payload.clean"></md-textarea>
            </md-field>

            <md-divider style="margin-bottom: 15px;"></md-divider>

            <md-field>
              <label>hex:</label>
              <md-textarea readonly v-model="decodedTx.payload.hex"></md-textarea>
            </md-field>

            <md-divider style="margin-bottom: 15px;"></md-divider>

            <h3>Rendered OP_RETURN:</h3>
            <div>
              <div v-html="decodedTx.payload.clean"></div>
            </div>
          </md-content>
        </md-tab>

        <md-tab id="tab-raw-tx" md-label="Raw Tx">
          <md-field>
            <pre><code v-html="txObject[0]" class="plaintext"></code></pre>
          </md-field>
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
          },
          type: "default"
        }
      }
    },
    created: function () {
      this.fetchTx()
    },
    methods: {
      pretty: function() {
        return JSON.stringify(txObject[0], undefined, 2);
      },
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

              // if (decodedTx.payload.clean.includes('blockquote class="twitter-tweet"')) {
              // }
            } else {
              errorObject.push(parsedBody)
            }
          }
        })
      }
    }
  }
</script>
