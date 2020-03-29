# RKI-PLZ-Tool API

To simply use the API without deploying it yourself, use: `https://rki-plz-tool.sleiss.me/authority?plz=PLZ`.\
If you want to get the Gesundheitsamt for the zip-code 80331, you can use `https://rki-plz-tool.sleiss.me/authority?plz=80331`.\

The documentation can be found here: `https://rki-plz-tool.sleiss.me/docs/`. Play around with it!

### Running the server
To run the server, run:

```
npm start
```

Make sure that a `mongodb` daemon is running on localhost and is reachable without authentication.

To view the Swagger UI interface:

```
open http://localhost:8080/docs
```

To get the corresponding Gesundheitsamt for a given PLZ (e.g. 80331), just call http://localhost:8080/authority?plz=80331.

## Data
The data used by the API is provided from the RKI (https://www.rki.de/DE/Content/Infekt/IfSG/Software/Aktueller_Datenbestand.html).

On server startup, the data gets loaded into the MongoDB and is then served by the REST-endpoint.\
The first call to the API is quite slow as MongoDB has to do quite some work to filter the correct city, but the other calls following the first one are super fast.

## Deploy using docker-compose
To run the nodejs server + webapp, simply run `docker-compose up` and Docker will handle the rest (including data download!).
