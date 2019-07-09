Frankenstein Variorum Jekyll Build Orientation

[ work in progress ]

Basic Commands:

+ gulp build – Full deployment. Runs SASS files, js minimizer, copies images, processes the React component, builds Jekyll (via bundle exec) and outputs the static to the ../html folder.

+ node_modules/gulp/bin/gulp.js build – Local alternative if Gulp 4 is not global. 

+ gulp buildLocal – As above, but outputs to the ./_site_local folder instead. Good for testing everything but output destination.

+ gulp watch – Looks for any changes to the Sass or JS files and builds automatically.

+ gulp watchLocal – As above, but builds to local site folder.

+ jekyll build – Should also work. Outputs to ./html (as per your original config file). Use jekyll build -d ./_site_local for testing (as per gulp buildLocal above).


Build notes:

+ All supporting assets should be placed in the ./_source folder. They will be output to ./assets on build.

+ The React component lives in ./_source/viewer/build . To update the app you need to drop a fully compiled React build here and run gulp build. 
