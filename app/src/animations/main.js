import $ from 'jquery';

angular.module('app.animations', [])
       .animation('.view-animation', () => ({
            enter(element, done) {
                $(element).css('display', 'none');
                $(element).fadeIn(2000, done);

                return () => $(element).stop();
            },
            leave(element, done) {
                $(element).css('display', 'none');

                return () => $(element).stop();
            }
    }));