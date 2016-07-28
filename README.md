# Angular2 quickstart with dependencies loaded from a CDN
Angular2 is nearly in final version available. So it is time to write awesome angular2 apps with typescript. The quickstart gives a good entry point to get started.
After a while of programming you'll come to a point where you want to show your app to the world and let it run on a server and then you realize that all the dependencies are loaded from your local server what is definitely something to avoid.
For loading 3rd party libraries it is recommended to load them from a common CDN.
So I tried to find an easy solution to do so but I got screwed up very fast and nearly all found solution suggested the usage of tons of build tools like webpack, gulp, browserify and a lot more and combinations of them.
When I start to write an angular2 application I don't want to spent hours or days in setting up a toolchain for building my frontend.
After trying out a lof of tools I finally ended up in using exactly what is told in angulars quickstart guide with only a few changes what made me happy.

This are the changes I made:
* index.html
replace the src path to shim, zone, Reflect and SystemJS from /node_modules/... to https://npmcdn.com/...

* systemjs.config.js
make the dependencies load as bundle from https://npmcdn.com/ too.
Instead of '@angular': 'node_modules/@angular' you have to name all modules from angular and give the https://npmcdn.com/... path

* tsconfig.json
In case to avoid your own .ts/.js files loaded one by one you should bundle them. Typescript can do that without the need of any other bundline/build tool.
"outFile": "./dist/bundle.js"
But the output needs to be amd or system. As the quickstart guide makes already use of SystemJS, system may be the preferred way.
"module": "system"
Doing this means you have to load you app in the index.html a little bit different.

System.import('dist/bundle.js').then(function() {
    System.import('main').catch(function(err){ console.error(err); });
});

is doing the magic.
