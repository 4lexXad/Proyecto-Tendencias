const fs = require('fs');

function load(app, folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    if (file.endsWith('.js')) {
      console.log(`Autoload \x1b[1m${file}\x1b[0m`);
      const middleware = require(`${folderPath}/${file}`);
      app.use(middleware, () => { return middleware; });
    }
  });
}

module.exports = load;