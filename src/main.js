import App from './App.svelte';
import './firebase';

import 'bootswatch/dist/cerulean/bootstrap.min.css';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.min.css';

const app = new App({
    target: document.body,
    props: {}
});

export default app;