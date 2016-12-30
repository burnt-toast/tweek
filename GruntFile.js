module.exports = function(grunt) {

  grunt.initConfig({
    shell: {
      compile: {
          command : 'npm run tsc'
      },
      deploy: {
        command: ' npm run deploy'
      },
      install: {
        command: 'npm run prodInstall'
      }
    },
    copy: {
      src: {
        expand: true,
        src: ['app/*.js', 
        'app/*.html', 
        'app/*.css', 
        'index.html', 
        'systemjs.config.js',
        'jspm_packages/system.js',
        'build.js'],
        dest: 'dist/'
      },
      package: {
        expand: true,
        src: ['package.json'],
        dest: 'dist/'
      }
    },
    packageModules: {
      dist: {
        src: 'package.json',
        dest: 'dist/'
      }
    },

    clean: {
      dist: {
        src :['dist']
      },
      package: {
        src: ['dist/*.json']
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-surge');
  grunt.loadNpmTasks('grunt-package-modules');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('deploy', ['clean:dist', 'shell:compile', 'copy:src', 'copy:package', 'shell:install', 'clean:package', 'shell:deploy' ]);

};
