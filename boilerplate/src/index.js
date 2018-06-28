import { createBrowserHistory } from '@dx-groups/arthur/history';
import arthur from '@dx-groups/arthur';
import storage from '@dx-groups/utils/storage';

import Router from './router';
import './index.less';

import demoModule from './modules/demo/module';
import pageModule from './modules/demo/page/module';

// 1. Initialize
const app = arthur({
  history: createBrowserHistory(),
  // extraReducers, // to compatiple with normal redux project
});

app.init(() => dispatch => {
  const count = storage.get('count');
  if (count) {
    dispatch(pageModule.actions.set(count));
  }
});

// 2. Plugins
// app.use();

// 3. Register global model
app.modules([demoModule]);

// 4. Router
app.router(Router);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line

/*  eslint-disable no-console */
// Rewrite console.log
if (process.env.NODE_ENV === 'production') {
  (function() {
    if (window.console && console.log) {
      const _log = console.log;
      const showLog = storage.get('log');

      window.console.log = function(...args) {
        // Array.prototype.unshift.call(args, 'Log start: ')
        showLog && _log.apply(this, args);
      };
    }
  })();
}
