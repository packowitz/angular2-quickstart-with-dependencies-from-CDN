/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app',
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
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { main: 'bundles/Rx.umd.js', defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' }
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade'
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);