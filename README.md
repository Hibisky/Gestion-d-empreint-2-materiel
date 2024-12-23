# test_securite

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Architecture 

src/
  ├── assets/
  │     ├── images/
  │     ├── styles/
  ├── components/
  │     ├── layout/
  │     ├── pages/
  │     ├── devices/
  ├── router/
  │     ├── index.js
  │     ├── auth.js
  ├── mixins/
  ├── store/ (si vous utilisez Vuex)
  ├── views/ (si vous séparez les composants des vues)
  ├── App.vue
  ├── main.js
  ├── firebase.js
test/
.env
