import { createServer } from 'livereload';
import { resolve } from 'path';

function livereload$1 (options) {
  if ( options === void 0 ) options = { watch: '' };

  if (typeof options === 'string') {
    options = {
      watch: options
    };
  }

  var enabled = options.verbose === false;
  var port = options.port || 35729;
  var server = createServer(options);

  // Start watching
  if (Array.isArray(options.watch)) {
    server.watch(options.watch.map(function (w) { return resolve(process.cwd(), w); }));
  } else {
    server.watch(resolve(process.cwd(), options.watch));
  }

  closeServerOnTermination(server);

  return {
    name: 'livereload',
    banner: ("document.write('<script src=\"http" + (options.https?'s':'') + "://' + (location.host || 'localhost').split(':')[0] + ':" + port + "/livereload.js?snipver=1\"></' + 'script>');"),
    ongenerate: function ongenerate () {
      if (!enabled) {
        enabled = true;
        console.log(green('LiveReload enabled'));
      }
    }
  }
}

function green (text) {
  return '\u001b[1m\u001b[32m' + text + '\u001b[39m\u001b[22m'
}

function closeServerOnTermination (server) {
    var terminationSignals = ['SIGINT', 'SIGTERM'];
    terminationSignals.forEach(function (signal) {
        process.on(signal, function () {
            server.close();
            process.exit();
        });
    });
}

export default livereload$1;
