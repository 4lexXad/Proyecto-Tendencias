const fs = require('fs');

function load(app, folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    if (file.endsWith('.js')) {
      const middleware = require(`${folderPath}/${file}`);
      app.use(middleware, () => { return middleware; });
    }
  });
}

module.exports = load;