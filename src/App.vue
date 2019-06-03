<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="overlap">
      <md-app-toolbar class="bg-white md-large">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <div class="header-logo">
              <router-link to="/"><img src="./assets/logo.png"></router-link>
            </div>
          </div>

          <div class="md-toolbar-section-end search-txs">
            <!-- <md-field md-inline>
              <label>Search Transaction Hash</label>
              <md-input v-model="txhash"></md-input>
            </md-field> -->
          </div>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .header-logo {
    margin: 31px 0px 0px 5px;
    
    img {
      width: 200px;
    }
  }

  .bg-white {
    background-color: #ffffff;
  }

  .search-txs {
    .md-field.md-theme-default.md-focused .md-input {
      color: #000000;
    }
    .md-field.md-theme-default.md-focused .md-input,
    .md-field.md-theme-default.md-has-value .md-input {
      -webkit-text-fill-color: #000000;
    }
    .md-field.md-theme-default label {
      color: #000000;
    }
    .md-field.md-theme-default:before {
      background-color: #000000;
    }
    .md-field:before {
      opacity: 1;
      transform: none;
    }
  }
</style>

<script>
export default {
  name: 'Overlap',
  data: () => ({
    menuVisible: false,
    txhash: null
  })
}
</script>