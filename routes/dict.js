function dictRoutes(app, client) {
  let englishWord = '';
  let polishWord = '';

  app.post('/submit-form', (req, res) => {
    console.log(req.body);
    englishWord = req.body.englishInput;
    polishWord = req.body.polishInput;

    client.connect(err => {
      //sprawdzenie czy połączenie zostało nawiązane
      if (err) {
        console.log('blad');
      } else {
        console.log('polaczono!');
        const db = client.db('zofiajanas');
        const englishLearn = db.collection('englishLearn');
        console.log('polaczono!');

        englishLearn.insertOne({
          polishWord,
          englishWord
        });

        client.close();
      }
    });
    res.redirect('/');
  });

  app.get('/words', (req, res) => {
    client.connect(err => {
      //sprawdzenie czy połączenie zostało nawiązane
      if (err) {
        console.log('blad', err);
      } else {
        const db = client.db('zofiajanas');
        const englishLearn = db.collection('englishLearn');

        englishLearn.find().toArray(function(err, docs) {
          return res.json(docs);
        });
      }
    });
  });
}

module.exports = dictRoutes;
