# LIRI-NODE-APP
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and returns relevant data.

## HOW-T0:
* `CLONE` this repository to your local machine
* `RUN` 'npm install' in your `CLI` to install packages
* `WRITE` an .env file replacing the following with your unique spotify + twitter keys:

    ```
    # Spotify API keys

    SPOTIFY_ID=paste-here
    SPOTIFY_SECRET=paste-here

    # Twitter API keys

    TWITTER_CONSUMER_KEY=paste-here
    TWITTER_CONSUMER_SECRET=paste-here
    TWITTER_ACCESS_TOKEN_KEY=paste-here
    TWITTER_ACCESS_TOKEN_SECRET=paste-here

    ```
* `RUN` any of the following commands:

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "Inspector Norse" by Todd Terje.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
4. `node liri.js do-what-it-says`

* Using the `fs` Node package, LIRI will take the text inside of local file `random.txt` using it's contents to call one of LIRI's commands.