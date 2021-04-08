const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'FunPic Api',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  api: 'test',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Гайд',
        link: '/guide/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Гайд',
          collapsable: false,
          children: ['', 'trampet', 'agree', 'flashbacks', 'error', 'rickroll']
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      'vuepress-plugin-global-variables',
      {
        variables: {
          api: 'https://funpic-api.herokuapp.com/api',
          avatarExample:
            'https://cdn.discordapp.com/avatars/283184439813734400/1ae04142b39a6d4f691edf74d17dad9f.png?size=256',
          avatarExample2:
            'https://cdn.discordapp.com/avatars/331103366774259713/3d332dc9327abac4760ca5218c1a571c.png?size=256'
        }
      }
    ]
  ]
}
