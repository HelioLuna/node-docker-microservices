FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false nupp && \
    apt-get clean

ENV HOME=/home/nupp

COPY package.json package-lock.json $HOME/app/

COPY src/ $HOME/app/src

RUN chown -R nupp:nupp $HOME/* /usr/local/

WORKDIR $HOME/app

RUN npm cache verify && \
    npm install --silent --production

RUN chown -R nupp:nupp $HOME/*
USER nupp

EXPOSE 3000

CMD ["npm", "start"]