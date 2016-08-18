# Angular2 quickstart with dependencies loaded from a CDN

Angular2 is nearly in final version available. So it is time to write awesome angular2 apps with typescript. The <a href="https://angular.io/docs/ts/latest/quickstart.html">quickstart</a> gives a good entry point to get started.

### Do you really want to make your node_modules folder public?

I don't think that serving all the dependencies locally from node_modules folder is a good idea when putting your app to a productive server. It is definitely preferred to use a common CDN to load these files. On that way your customers browser may have the files already in cache and doesn't need to load them again and you save traffic from your productive server.

### What solutions are there in world wide web?

I thought that this should be a problem that has been solved a lot of times and there should be an easy solution. WRONG! The solutions in the web are using tons of tools and more than tons of configurations. There is no easy to use solution for this. Most solutions using webpack, gulp, browerify and systemJS and included a complete buildchain to build your own custom files that include all your libraries and you end up in delivering all the dependencies from your own server again. Is this really what you want? Maybe you can do that in large SPA or when building a mobile app. But when you just want to do small to medium angular2 based apps on your website then this is in my eyes a NO-GO!

### So, what do you want?

* serve all 3rd party libs from a CDN
* having a simple build step serverside that creates one bundled .js file that contains all my code and only my code
* write my code in TypeScript
* include the app to a backend server based for example on Spring Boot without doing extra building magic

### In the end it can be really easy

After trying out a lot of tools and toolchains with a lot of amazing features and possibilities I ended up in an easy setup that is nearly the code from angulars quickstart with only a few changes:

```
index.html
replace the src path to shim, zone, Reflect and SystemJS from /node_modules/... to https://npmcdn.com/...

<script src="https://npmcdn.com/core-js@^2.4.1/client/shim.min.js"></script>
<script src="https://npmcdn.com/zone.js@0.6.12/dist/zone.js"></script>
<script src="https://npmcdn.com/reflect-metadata@0.1.2/Reflect.js"></script>
<script src="https://npmcdn.com/systemjs@0.19.35/dist/system.src.js"></script>
```

```
systemjs.config.js
make the dependencies load as bundle from https://npmcdn.com/ too.
Instead of '@angular': 'node_modules/@angular' you have to name all modules from angular and give the https://npmcdn.com/... path

'@angular/common': 'https://npmcdn.com/@angular/common@2.0.0-rc.5',
'@angular/compiler': 'https://npmcdn.com/@angular/compiler@2.0.0-rc.5',
'@angular/core': 'https://npmcdn.com/@angular/core@2.0.0-rc.5',
'@angular/forms': 'https://npmcdn.com/@angular/forms@0.3.0',
'@angular/http': 'https://npmcdn.com/@angular/http@2.0.0-rc.5',
'@angular/platform-browser': 'https://npmcdn.com/@angular/platform-browser@2.0.0-rc.5',
'@angular/platform-browser-dynamic': 'https://npmcdn.com/@angular/platform-browser-dynamic@2.0.0-rc.5',
'@angular/router': 'https://npmcdn.com/@angular/router@3.0.0-rc.1',
'@angular/router-deprecated': 'https://npmcdn.com/@angular/router-deprecated@2.0.0-rc.2',
'@angular/upgrade': 'https://npmcdn.com/@angular/upgrade@2.0.0-rc.5',
'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6'
```

```
tsconfig.json
To avoid your own .ts/.js files loaded one by one you should bundle them. Typescript can do that without the need of any other bundchain/build tool.
"outFile": "./dist/bundle.js"
But the output needs to be amd or system. As the quickstart guide makes already use of SystemJS, system may be the preferred way.
"module": "system"
```

Doing this means you have to load you app in the index.html a little bit different.
```
System.import('dist/bundle.js').then(function() {
    System.import('main').catch(function(err){ console.error(err); });
});
```
is doing the magic.

### Is this the perfect solution?

No, not perfect but it a solution that doesn't introduce tons of new tools and extra configurations. It is close to what we know from existing javascript projects.

Things that are not so good:
* you have to name the version for the angular modules twice. In package.json for making your IDE resolving your dependencies and in system.config.js to load the dependencies from the CDN.
* loading the bundled angular modules is in most cases more than you need but otherwise you have to build your own custom vendor.js file and serve it on your own.
* there is no difference between development and production build. If you wish that than you can make use of one of the tools that support that feature. Minimize and Uglify should not be a big deal to include in your prod build step.
