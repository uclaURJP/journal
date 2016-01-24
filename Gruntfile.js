module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      all: ['build/*'],
      // remove unneeded, intermediate build files:
      combined_css: ['build/css/combined.css'],
      pages: ['build/pages/']
    },

    copy: {
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**',
        dest: 'build/img/',
        filter: 'isFile'
      },
      docs: {
        expand: true,
        cwd: 'src/docs/',
        src: '**',
        dest: 'build/docs/',
        filter: 'isFile'
      },
      html: {
        expand: true,
        cwd: 'build/pages/',
        src: '**',
        dest: 'build/',
        flatten: true,
        filter: 'isFile',
        rename: function prettify_url(dest, src) {
          // Convert HTML files to folders of the same name with just an 'index.html' inside.
          // For example: 'contact.html' -> 'build/contact/index.html'
          // Exception: 'home.html' -> 'build/index.html'
          // This is for pretty URLs.

          var final_dest = dest + '/' + src.substr(0, src.indexOf('.html')) + '/index.html';
          if (src === 'home.html') {
            final_dest = 'build/index.html'
          }

          return final_dest;
        }
      }
    },

    concat: {
      css: {
        src: [
          'src/css/normalize.min.css',
          'src/css/main.css',
          'src/css/responsive.css'
        ],
        dest: 'build/css/combined.css'
      }
    },

    cssmin: {
      all: {
        src: 'build/css/combined.css',
        dest: 'build/css/style.min.css'
      },
    },

    uglify: {
      release: {
        files: {
          'build/js/main.min.js': ['src/js/main.js']
        }
      },
      debug: {
        options: {
          beautify: {
            beautify: true
          }
        },
        files: {
          'build/js/main.min.js': ['src/js/main.js']
        }
      },
    },

    assemble: {
      options: {
        layout: ['src/views/layouts/main.hbs'],
        flatten: true
      },
      pages: {
        files: {
          'build/pages/': ['src/views/pages/*.hbs']
        }
      }
    },

    watch: {
      html: {
        files: ['src/views/**/*.hbs'],
        tasks: ['html']
      },
      css: {
        files: ['src/css/**/*.css'],
        tasks: ['css']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['js']
      },
      img: {
        files: ['src/img/**/*.jpg', 'src/img/**/*.png', 'src/img/**/*.gif','src/img/**/*.ico'],
        tasks: ['img']
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Run these like "$ grunt html"
  grunt.registerTask('html', ['assemble', 'copy:html', 'clean:pages']);
  grunt.registerTask('css', ['concat:css', 'cssmin', 'clean:combined_css']);
  grunt.registerTask('js', ['uglify:release']);
  grunt.registerTask('img', ['copy:img']);
  grunt.registerTask('docs', ['copy:docs']);

  // Run this with just "$ grunt":
  grunt.registerTask('default', ['html', 'css', 'js', 'img', 'docs']);
};

