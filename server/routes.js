const path = require('path');
const request = require('request-promise');

const IMDbKey = '8353f37b04124bdd138f12db75c775dd';

export default (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
  });

  app.get('/js/*', (req, res) => {
    res.sendFile(path.resolve(`client/${req.url}`));
  });

  app.get('/css/*', (req, res) => {
    res.sendFile(path.resolve(`client/${req.url}`));
  });

  app.get('/search', (req, res) => {

    const options = {
      uri: `http://api.themoviedb.org/3/search/tv?api_key=${IMDbKey}&query=${req.query.query}`,
      json: true
    }

    request(options)
    .then( response => res.status(200).send(response))
    .catch( error => res.status(400).send(`Error in search! ${error}`));

  });

  app.get('/tvshow/:id', (req, res) => {
    const tvshowid = req.params['id'];
    const options = {
      uri: `http://api.themoviedb.org/3/tv/${tvshowid}?api_key=${IMDbKey}`,
      json: true
    }

    request(options)
    .then( response => res.status(200).send(response))
    .catch( error => res.status(400).send(`Error in retrieving tv show! ${error}`));

  });
};
