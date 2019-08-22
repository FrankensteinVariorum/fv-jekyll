## Installation

Building this project requires:

- ruby >=2.5.3 (Strongly suggest installing via [rbenv](https://github.com/rbenv/rbenv))
- bundler (ruby gem)
- nodejs >= 10.16.3
- gulp >= 2.0.2

Once these are installed, run the following to install Ruby and Node dependencies:

```
bundle install
npm install
```

## Building

Once dependencies are downloaded, the build is managed via gulp.

+ `gulp build` – Full deployment. Runs SASS files, js minimizer, copies images, processes the React component, builds Jekyll (via bundle exec) and outputs the static to the `docs/` folder, which will be served by GitHub pages. **Afer running `gulp build`, you must commit all changed files from the `docs/` folder and then push those commits to GitHub.**

+ `gulp buildLocal` – As above, but outputs to the `_site/` folder instead. Good for testing everything but output destination.

+ `gulp watch` – Looks for any changes to the Sass or JS files and builds automatically.

+ `gulp watchLocal` – As above, but builds to local `_site/` folder.

+ All supporting assets should be placed in the `_source/` folder. They will be output to `assets/` on build.

+ The FV-React App has its own repo, located at <https://github.com/PghFrankenstein/fv-website>

+ The React component lives in `_source/viewer/build`. To update the app you need to drop a fully compiled React build here and run `gulp build`.

+ **IMPORTANT**: If the app changes you will have to run the React build elsewhere before deployment. The FV production site is currently not configured to build React components.

## URL configuration

The _config.yml file currently sets the base url of the site as `/fv-jekyll`, which corresponds to the path offered by GitHub pages.

To redeploy this site with a different base url, you must edit that attribute in configuration and do a full rebuild, as it affects not only the HTML components but also paths referenced by SCSS and JS files.

## Changing site content & static (non-React) assets

+ Please refer to Jekyll documentation for basic usage and structure.

+ Run gulp build to build the site after changes (see Basic Commands below)

+ Images and other assets should be placed in the `_source/img/` folder. They will be transferred to the `assets/` when the site is built.

+ IMPORTANT: Do NOT place images in the `assets/` folder. They will be deleted during the build process. Add them to the `_source/img/` folder as per above.

+ The main menu can be changed in `_includes/header.html`.

+ Footer content can be changed in `_includes/footer.html`.

+ The bio data that appears on the homepage can be modified in `_data/biographies.yml`. The bios themselves should be proper HTML.

+ Page content can be modified in the respective markdown files

+ The site has a limited set of basic styles, including a full range of text styles and headings (H1 - H6).

### SASS

+ The FV site uses a custom SASS library, located at `_sass/`

+ IMPORTANT: Do NOT change CSS styles in the `assets/css/` folder. The build process overwrites everything in that folder.

+ To change the styling you can modify the SASS files and run gulp build.

+ The SASS library is built on a configuration-driven design system developed at Agile Humanities. There are some functions and mixins that may not be transparent in their usage. Ask Agile for guidance if necessary.

+ Only change the SASS partials in `_sass/c_local/**` . If you need to change styles that are sourced to files in `_sass/a_core/**` it's best to override them in a c_local subdirectory SASS file.

+ General typography can be tweaked in `_sass/c_local/30_elements/_typography.sass`
