import * as angular from 'angular';
import * as $ from 'jquery';
import 'angular-animate';

angular.module('app.animations', [])
       .animation('.view-animation', () => ({
            enter: (element, done) => {
                $(element).css("display", "none");
                $(element).fadeIn(2000, done);

                return function() {
                    $(element).stop();
                }
            },
            leave: (element, done) => {
                $(element).css("display", "none");

                return function() {
                    $(element).stop();
                }
            }
    }));