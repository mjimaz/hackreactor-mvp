const path = require('path');
export default (app) => {
  app.get('/', (req, res) => {
    console.log('main directory');
    res.sendFile(path.resolve('client/index.html'));
  });

  app.get('/js/*', (req, res) => {
    console.log('main js directory', req.url);
    res.sendFile(path.resolve(`client/${req.url}`));
  });

  app.get('/css/*', (req, res) => {
    console.log('main css directory', req.url);
    res.sendFile(path.resolve(`client/${req.url}`));
  });
};
