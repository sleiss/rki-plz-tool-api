# See https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:12

LABEL Description="API to serve the PLZ Tool of the RKI"
LABEL Maintainer="Simon Leiß <me@sleiss.me>"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN mkdir data && \
    cd data && \
    wget https://www.rki.de/DE/Content/Infekt/IfSG/Software/Aktueller_Datenbestand.zip?__blob=publicationFile -O data.zip && \
    unzip data.zip && \
    mv TransmittingSiteSearchText.xml TransmittingSiteSearchText.xml_tmp && \
    dd if=TransmittingSiteSearchText.xml_tmp of=TransmittingSiteSearchText.xml bs=1 skip=2 && \
    rm TransmittingSiteSearchText.xml_tmp

EXPOSE 8080

CMD [ "npm", "start" ]
