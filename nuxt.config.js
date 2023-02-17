const resolve = require('path').resolve
const isDev = process.env.NODE_ENV !== 'production'
const baseURL = 'https://api-agency-dev.primecrm.asia/'

const firebaseConfig = {
  apiKey: 'AIzaSyAF0vEmZXv5PH_ZWAtD0iZdqDCfETt32jQ',
  authDomain: 'crm-agency-vn-development.firebaseapp.com',
  databaseURL:
    'https://crm-agency-vn-development-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'crm-agency-vn-development',
  storageBucket: 'crm-agency-vn-development.appspot.com',
  messagingSenderId: '118521640982',
  appId: '1:118521640982:web:510924a9a536b972851d37',
  measurementId: 'G-X5JYMYJ0K8',
}

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-ssr
   */
  ssr: true,
  server: {
    host: '0.0.0.0',
    port: 4000,
  },

  env: {
    PRIME_CDN: 'https://cdn-image.primecommerce.asia',
    SITE_KEY: '6LdIM5IbAAAAAFprwS2LaQJsHuhb08j5I7iQIJXm',
    DOMAIN_SSO: 'https://auth.payment.primecommerce.asia/',
    DOMAIN_WEB: 'http://cms-dev.primeweb.asia/',
    DOMAIN_WEB_FE: 'http://cms-dev.primeweb.asia/',
    DOMAIN_POS: '.stg.primepos.online/',
    DOMAIN_DISTRIBUTION: 'http://dev-1.primedistribution.asia/',
    DOMAIN_KOL: 'https://dev.primeinfluencer.asia/',
    DOMAIN_CRM: 'https://agency-dev.primecrm.asia/',
  },

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Prime CRM',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://kol.sgp1.digitaloceanspaces.com/assets/font-awesome-pro/5.3.1/css/all.min.css',
      },
    ],
    script: [
      {
        src: isDev
          ? ''
          : 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
        defer: true,
        async: true,
      },
    ],
  },

  /**
   * Root dir
   */
  rootDir: resolve(__dirname),

  /**
   * Source directory
   */
  srcDir: resolve(__dirname, 'src'),

  /**
   * Alias
   * See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-alias
   */
  alias: {
    images: resolve(__dirname, './src/assets/images'),
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/style/global.less'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/antd-ui' },
    { src: '@/plugins/request.js' },
    { src: '@/plugins/date-picker.js', ssr: false },
    { src: '@/plugins/perfect-scrollbar', ssr: false },
    { src: '@/plugins/vue-flag' },
    '@/plugins/moment',
    { src: '@/plugins/firebase', ssr: false },
    { src: '@/plugins/fb-sdk.js', ssr: false },
    { src: '@/plugins/axios.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-compress',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-i18n',
    '@nuxtjs/auth',
    '@nuxtjs/firebase',
  ],

  /*
   ** Nuxt.js auth
   */
  auth: {
    plugins: ['~plugins/request'],
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'authorization',
            method: 'post',
            propertyName: 'access_token',
          },
          logout: {
            url: 'authorization',
            method: 'delete',
          },
          user: {
            url: 'users/me',
            propertyName: 'data',
          },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: false,
      callback: '/auth/login',
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        expires: 30,
      },
    },
  },

  /*
   ** Axios module configuration
   */
  router: {
    middleware: ['auth'],
  },

  /**
   * Nuxt language configuration
   */
  i18n: {
    vueI18n: {
      silentTranslationWarn: true,
      disableNoTranslationWarning: true,
      fallbackWarn: false,
      missingWarn: false,
      fallbackLocale: 'vi',
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          },
          percent: {
            style: 'percent',
            useGrouping: false,
          },
        },
        vi: {
          currency: {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          },
          percent: {
            style: 'percent',
            useGrouping: false,
          },
        },
      },
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en',
        flag: 'gb',
      },
      {
        code: 'vi',
        iso: 'vi-VN',
        name: 'Tiếng Việt',
        file: 'vi',
        flag: 'vn',
      },
      // {
      //   code: 'ms',
      //   iso: 'my-MY',
      //   name: 'Bahasa Malaysia',
      //   file: 'my',
      //   flag: 'my',
      // },
    ],
    defaultLocale: 'vi',
    lazy: true,
    langDir: 'languages/',
    seo: false,
    vueI18nLoader: true,
    detectBrowserLanguage: {
      alwaysRedirect: false,
      useCookie: true,
      cookieKey: 'PW_LANG',
      fallbackLocale: 'vi',
    },
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
    },
  },

  /***
   * Firebase config
   */
  firebase: {
    config: { ...firebaseConfig },
    services: {
      auth: false,
      database: true,
    },
  },

  googleFonts: {
    families: {
      Inter: [100, 300, 400, 500, 600, 700, 900],
    },
    display: 'swap',
    useStylesheet: true,
  },

  /**
   * Global less resource
   */
  styleResources: {
    less: [
      '@/assets/style/color.less',
      '@/assets/style/variables.less',
      '@/assets/style/mixins.less',
    ],
  },

  tailwindcss: {
    configPath: '~~/tailwind.config.js',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL,
    prefix: '/api',
    proxy: false,
    debug: isDev,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    // analyze: true,

    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
    optimization: {
      minimize: true,
    },
    extractCSS: true,
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
    },
    optimizeCSS: {},
  },
}
