# Website for the Undergraduate Psychology Research Journal at UCLA

[http://www.studentgroups.ucla.edu/psychjournal/](http://www.studentgroups.ucla.edu/psychjournal/)

## Setup Instructions

Hopefully you are on a Linux or OS/X platform. If so, you can use the terminal to use npm and Grunt (if you run into installation issues, use sudo):

* First, you download and install  Node.js / npm: [http://nodejs.org/download/](http://nodejs.org/download/ "node.js / npm")

* And get Grunt: [http://gruntjs.com/getting-started](http://gruntjs.com/getting-started "Grunt")

(If you are on Windows :(, then you'll have figure out how to install and use Node.js and Grunt)

Now run the following command in the terminal, in this project's root directory:

    $ npm install

In order to build the site from the src/ folder (i.e. compile Handlebars files to HTML, minify CSS, etc.), run the following command (again, from the root directory of this project):

    $ grunt

Even better, you can use the following command to make Grunt automatically build whenever a src file has changed:

    $ grunt watch

If you are unfamiliar with Grunt, you can find more information in the documentation on the Grunt website, or examine the provided Gruntfile.js in this project.

In order to view this website, you should run a small HTTP server from the build/ directory. I highly recommend using python's SimpleHTTPServer:

    $ python -m SimpleHTTPServer

http://127.0.0.1:8000/

## A Note to Future Maintainers:

If you have any questions, feel free to reach me at [rhansby@gmail.com](rhansby@gmail.com).

## A repo has been set up on GitHub for future users


