var NedConfig = {
  projectName: 'Ned Project Name',
  version: '1.0.0',
  author: 'Hossein Marzban',
  router: {
    home: '',
    about: '',
    posts:'',
    product:''
  },
  module: {},
  component: {
    header: '',
    footer:'',
    sidebar:''
  },
  static: {
    script: {
      head: [
        './assets/js/ned_bundle.js',
      ],
      body: [
        './assets/js/jquery-3.3.1.min.js',
        './assets/js/main.script.js',
      ],
    },
    style: {
      head: [
        './assets/style/main.style.css',
      ],
      body: [],
    },
  },
};
