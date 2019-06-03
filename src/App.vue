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

    <footer class="main-footer">
      <div class="main-footer-container">
        <div class="main-footer-section">
          <a href="https://github.com/arubinofaux/moistsv" target="_blank">Click here to review the code in Github</a>
        </div>
        <div class="main-footer-section">
          <a href="https://twitter.com/acidtib_" target="_blank">Made with <span class="red">❤</span> by acidtib_</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
  .page-container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    font-family: Roboto Mono,monospace;
  }
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

  .main-footer {
    height: 96px;
    padding: 0 16px;
    position: relative;
    z-index: 4;
    background-color: #ffffff;
    
    a {
      color: #000000;
    }

    .main-footer-container {
      max-width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: .3s cubic-bezier(.4,0,.2,1);
      transition-property: max-width;

      .main-footer-section {
        position: relative;
      }
    }
  }

  .red {
    color: red;
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