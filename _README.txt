FRANKENSTEIN VARIORUM BASIC USAGE

(A work in progress)

+ Please refer to Jekyll documentation for basic usage and structure.

+ Run gulp build to build the site after changes (see Basic Commands below)

+ Images and other assets should be placed in the ./_source/img folder. They will be transferred to the /assets when the site is built.

+ IMPORTANT: Do NOT place images in the /assets folder. They will be deleted during the build process. Add them to the ./_source/img folder as per above.

+ The main menu can be changed in ./_includes/header.html.

+ Footer content can be changed in ./_includes/footer.html.

+ The bio data that appears on the homepage can be modified in ./_data/biographies.yml . The bios themselves should be proper HTML.

+ Page content can be modified in respective markdown files (*.md)

+ The site has a limited set of basic styles, including a full range of text styles and headings (H1 - H6). 


FRANKENSTEIN VARIORUM PRODUCTION ORIENTATION

Basic Commands:

+ gulp build – Full deployment. Runs SASS files, js minimizer, copies images, processes the React component, builds Jekyll (via bundle exec) and outputs the static to the /var/ww/html folder.

+ gulp buildLocal – As above, but outputs to the ./_site_local folder instead. Good for testing everything but output destination.

+ gulp watch – Looks for any changes to the Sass or JS files and builds automatically.

+ gulp watchLocal – As above, but builds to local site folder.

+ bundle exec jekyll build – Should also work IF you have only changed content (not images or styling). Outputs to ./html (as per your original config file). Use bundle exec jekyll build -d ./_site_local for testing (as per gulp buildLocal above).


Build notes:

+ All supporting assets should be placed in the ./_source folder. They will be output to ./assets on build.

+ The FV-React App has its own repo, located here: https://github.com/PghFrankenstein/fv-website

+ The React component lives in ./_source/viewer/build . To update the app you need to drop a fully compiled React build here and run gulp build. 

+ IMPORTANT: If the app changes you will have to run the React build elsewhere before deployment. The FV production site is currently not configured to build React components.


SASS

+ The FV site uses a custom SASS library, located at ./_source/sass

+ IMPORTANT: Do NOT change CSS styles in the ./assets/css folder. The build process overwrites everything in that folder.

+ To change the styling you can modify the SASS files and run gulp build.

+ The SASS library is built on a configuration-driven design system developed at Agile Humanities. There are some functions and mixins that may not be transparent in their usage. Ask Agile for guidance if necessary.

+ Only change the SASS partials in ./source/sass/c_local/** . If you need to change styles that are sourced to files in ./source/sass/a_core/** it's best to override them in a c_local subdirectory SASS file.

+ General typography can be tweaked in ./source/sass/c_local/30_elements/_typography.sass