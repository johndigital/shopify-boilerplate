# Shopify Boilerplate Theme

This codebase represents a minimal Shopify boilerplate theme, with dev and deployment flows powered by [Theme Kit](https://shopify.dev/tools/theme-kit).

---

### High-level Overview

Theme Kit is a command line tool that provides a simple interface to work with a given Shopify store. When you use a command, Theme Kit will look for a [config file](https://shopify.dev/tools/theme-kit/configuration-reference) in your local directory that tells it what store you're working on and provides credentials to make changes to it.

-   [Installing Theme Kit on any platform](https://shopify.dev/tools/theme-kit/getting-started)
-   [Command Reference](https://shopify.dev/tools/theme-kit/command-reference)

The way that this codebase leverages Theme Kit is primarily through the `watch` and `deploy` commands.

-   `watch`: The watch command simply watches for any changes in the local repo, and when it detects them it automatically pushes the corresponding files up to the theme your're working on. This is a fast enough process to eliminate the need to run a local server at all.
-   `deploy`: The deploy command pushes everything in the local repo all at once up to the theme you're working on, and then exists. As it does this, it also removes any files on the remote server that do not exist in your local repo.

### Getting started

In order to get this repo (and Theme Kit) properly connected to your target site/theme, start by [following the official guide](https://shopify.dev/tools/theme-kit/getting-started) up until Step 4 (setting up the config file).

For this development flow, the config file should look like this:

```yml
development:
    password: shppa_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    theme_id: 'xxxxxxxxxxxx'
    store: xxxxxxxxxxx.myshopify.com
    ignore_files:
        - config/settings_data.json
```

The "password" field comes from the private app you created, the "store" is the primary URL you use to access the site and admin. The theme ID can be found easily by running the command `theme get --list`, once the other config fields are filled in correcty. The ignore_files field is especially important, it prevents Theme Kit from overwriting the configuration file that holds the data for the theme. That content inside that file should be managed automatically by the Shopify dashboard, whenever a user uses the "customize" button on the theme to make changes or add content. For that reason, it should never be pushed from local to remote.

### Local Dev Setup:

Once you have evreything set up, connected, and configured with Theme Kit, the next thing to do is to install the NPM dependencies of this repo, and then start running the available development commands.

-   Make sure you have the correct version of node installed. If you use nvm, you can run `nvm install 12`
-   `npm install` - Install all dependencies

With that in place, you now have the following commands available:

-   `npm run reload` - Run only the livereload server. More on this below.
-   `npm run reload` - Run webpack in watch mode, constantly watching your scss and js files and compiling them into bundles in the `/assets` folder.
-   `npm run shopify` - Run the Shopify watch process, watching for all changes of any files within the repo and uploading them into the remote theme.
-   `npm run dev` - Run all three of the above commands together, with colored logging to easily differentiate. This is the command you will likely use the most often.
-   `npm run build` Once dev is complete, run this command to bundle and minify all assets in production mode with webpack.
-   `npm run deploy` Pushes ALL theme files at once from the local system up to the target theme. Deletes any theme files on the remote theme that no longer exist in the local file structre.

### Webpack & Livereload

The above breakdown mentions tools we have not yet talked about, Webpack and Livereload. Here is a quick definition for each to help you understand the whole picture:

**webpack:**

When writing css and js, we want to be able to easily split files and use shorthands for convenience to move quikly. But when deployed to the live server, we ideally want one single css file and one single js file, minified and ready to go. Webpack handles this process automatically, combining all scss files, converting them into vanilla css, minifying them, etc. It outputs assets/bundle.css and assets/bundle.js which are the only two asset files called in the head of the site.

More about [webpack here](https://webpack.js.org/).

**livereload:**

Livereload is a much less essential piece of the puzzle. It's simply a convenience tool that allows you to set up your browser to reload automatically each time you make a change to the code, rather than having to manually reload yourself each change.

If you're interested in using it, all you have to do is [install this browser extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en), and then push the button to turn it on while developing. This repo handles the rest.

If you prefer not to use it, it makes no difference.

### File Structure Overview

Most of the file naming and structure in this repo are standard conventions for Shopify, Webpack, npm, etc. Some of them however are custom conventions that you will not find documentation about. For that reason, they are listed and described here:

##### SCSS Folder structure:

All of the scss you write should be located in `src/scss`. Within that folder there is one primary file named `main.scss`. This file serves as the webpack entry point, and is simply in charge of importing all other scss files. In this way, it serves as a sort of "table of contents" for you scss styles.

The rest of the files are broken into 4 categories:

-   `components` - Files relating directly to a single encapsulated element on the site, like header or footer.
-   `includes` - Global files that either set baseline styles across the whole site, or provide variables for the other files to use.
-   `pages` - Styles that relate to specific pages. These generally should correspond directly with files in the `/templates` folder.
-   `sections` - Styles relating directly to specific theme sections. Two basic examples of this are provided in the `/sections` folder, each with a `/src/scss/sections/*` file to match. You can learn more about theme sections and how to use them [here](https://shopify.dev/docs/themes/sections).

##### \_base.scss:

Within the `scss/includes` folder, you'll find a file named \_base.scss that is used to declare global styles. Within this there are a few specific conventions, which you can optionally choose to follow:

-   **CSS Variables:** The scss in this boilerplate leverages the use of [css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). These can be extremely helpful. By default, the theme uses them for colors, typefaces, and basic spacing.
-   `.contained` This is a helper class used to restrict content to the width that the site was designed to. It automatically adds margin to the left and right, and centers the element maxing out at the defined size.
-   `.entry` This is another helper class to encapsulate all the standard formatting for rich content fields. Anything element that has the contents of a rich content field from the Shopify CMS directly in it should have this class.
-   `fontSize()`: There is a mixin available throughout all the scss of the site called fontSize. You feed it a pixel value like (i.e. `@include fontSize(18px)`) and it will run the necessary calculation to set that exact font size in rem, which is relative to the font-size value set on the html element. The purpose of this is that if this mixin is used to set all of your font-sizes, you can alter them globally all at the same time simply by changing the font-size value set on the html element.
-   `bp()`: There is a mixin available through all the scss of the site which allows you to quickly declare a breakpoint. It can be used like this: `@include bp(s){ // mobile styles } `. The value you can feed into the function can be either s, m, l, or xl depending on which breakpoint you're looking to target.

##### Importing Shorthand

Another convenience convention built into this theme is importing from the src folder using the character `~`. For example, you could import a js file that's directly in the js folder like this:

`import example from '~/js/example.js'`

##### Optional JS Libraries / Features

There are a few things baked into this codebase that are nice to have, but are not necessarily things you would use for every single site:

**Barba**:

By default, there is a library being used called [barba.js](https://barba.js.org/) that allows for smooth app-like transition between pages. It is enabled by default, but can be easily turned off. It is initialized in main.js within the init function, and its configuration can be seen and edited in `/src/images/features/barba.js`. If you simply remove the require statement that calls that file, it will no longer be active.

If you do choose to use it, there is a small convention you myst adhere to: The unique contents of each different page must be wrapped in an element that has the attribute `data-barba="container"`. For all the files that exist, this has already been added. Each of the files within the `/templates` folder correspond directly with a page or page template, and so they each have a single root element <main> which bears this attribute. If you are choosing to use barba, when creating new page templates just make sure you keep consistent with this convention.

One other consideration with barba is that each time the user changes page, the primary content of the page are replaced asynchronoously but the global elements (header, footer, etc) are not and the page is **not** reloaded. This means that any bootstrapping logic that must happen on individual pages will need to be re-initialized after barba has changed pages.

**Vue**:

Though there is neary no opinion of it within this codebase, Vue has been installed and there is a dedicated file for it to be easily initialized. The best way to leverage vue in this theme is to mount it directly to the DOM, using the html elements themselves as the template.

**jQuery**:

Similar to Vue, there is a file which imports jQuery easily from this template if you prefer it. Simply requiring that file once from within the init function will make it globally available on window.

**ES6 Features**:

Since all of the js assets are being processed by webpack + babel, you can use pretty much any js feature you'd like. However, not all features are supported by all browsers, and so some of them (such as Promises, async/await, destructuring syntax, etc.) can only be used when polyfilled. This process is handled automatically by webpack, only polyfilling the things you have actually used in the code. The consequence of this is that choosing to use these features can dramaically increase the size of the bundle.

For example, out of the box with no extras added the js file is around 32kb unminified. Simply adding one Promie declaration will increase the bundle size to 135kb since webpack did not need to include the polyfill until it was used. ES6 features are a great thing to have, but they should generally be used sparingly, especially on smaller sites.
