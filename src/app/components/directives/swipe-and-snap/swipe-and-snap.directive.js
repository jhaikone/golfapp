export function SwipeAndSnapDirective(GameService) {
  'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/directives/swipe-and-snap/swipe-and-snap.html',
        replace: true,
        link: function (scope, element) {

          scope.index = 0;
          scope.holes = [{index:1},{index:2}, {index:3}];
          scope.hideScrollY = false;

          let snapLocations = [100, 0, -100],
          _direction,
          snapPosition = 0,
          positionX = 0,
          isMoveStarted = false;

          scope.previous = function() {
            _direction = 'previous';
          }

          scope.next = function() {
            _direction = 'next';
          }

          scope.end = function(event) {
            if ((GameService.holeIndex === 0  && _direction === 'previous') || (GameService.holeIndex === GameService.holes.length-1) && _direction === 'next') {
              snapPosition = 0;
            }
            else if(Math.abs(event.deltaX) > 100 || Math.abs(event.overallVelocityX) > 0.5) {
              snapPosition = calculateSnapLocation(_direction);
              GameService.updateHoleIndex(_direction);
            } else {
              snapPosition = 0;
            }

            element.addClass('animate');
            element.css('-webkit-transform', 'translate3d(' + snapPosition + '%, 0, 0)');

          }

          scope.start = function(event) {
            element.removeClass('animate');
            if(event.deltaX > 0) {
              _direction = 'previous';
            } else {
              _direction = 'next';
            }
          }

          scope.move = function(event) {
            if(Math.abs(event.deltaX) > 30) {

              if(!isMoveStarted) {
                scope.hideScrollY = true;
              }
              isMoveStarted = true;

              positionX = event.deltaX;
              element.css('-webkit-transform', 'translate3d(' + positionX + 'px,0px,0px)');
              element.css('transform', 'translate3d(' + positionX + 'px,0px,0px)');
            }

          }

          scope.$on('update-hole', (event, direction) => {
            if(direction === 'previous' && GameService.holeIndex === 0) {
              return;
            }
            if(direction === 'next' && GameService.holeIndex === GameService.holes.length-1) {
              return;
            }
            element.removeClass('animate');
            GameService.updateHoleIndex(direction);

            snapPosition = calculateSnapLocation(direction);

            element.addClass("animate");
            element.css('-webkit-transform', 'translate3d(' + snapPosition + '%,0,0)');

          });

          function calculateSnapLocation(direction) {
            if(direction === 'next') {
              return snapLocations[2];
            } else if(direction === 'previous') {
              return snapLocations[0];
            }
          }

          element[0].addEventListener('transitionend', (event) => {
            if (event.propertyName === 'transform') {
              event.preventDefault();
              element.css('-webkit-transform', 'translate3d(0,0,0)');
              element.removeClass('animate');

              positionX = 0;
              isMoveStarted = false;
              scope.hideScrollY = false;
              scope.index = GameService.holeIndex;
              scope.$apply();
            }
          });


        }
    };

  return directive;
}
