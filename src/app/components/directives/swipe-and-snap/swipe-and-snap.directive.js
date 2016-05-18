export function SwipeAndSnapDirective(GameService) {
  'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/directives/swipe-and-snap/swipe-and-snap.html',
        replace: true,
        link: function (scope, element) {

          scope.index = 0;

          console.log('element', element);
          let _direction;



          let innerWidth = window.innerWidth < 450 ? window.innerWidth : 450;
          console.log(window);
          console.log('ind', innerWidth);
          scope.slideWidth = innerWidth.toString() + "px";
          scope.carouselWidth = (innerWidth*3).toString() +"px";

          scope.leftPositions = ["-"+innerWidth.toString()+"px", innerWidth.toString() +"px", (innerWidth*2).toString() +"px"];
          console.log('lefetfg', scope.leftPositions)
          let snapLocations;

          let snapMultiple = innerWidth;

        //snapLocations = GameService.holes.map((hole, index) => {
            //return -(snapMultiple*index);
          //});

          snapLocations = [snapMultiple, 0, -snapMultiple];
          scope.holes = [{index:1},{index:2}, {index:3}];

          let restPosition = 0, // Define the location to end.
          positionX = 0, // The current position.
          startPosX = 0; //starting point of the swipe


          /**
          * Calculate the snap location.
          *
          * Called on drag end to work out where to animate
          * the div to.
          *
          * @function
          *
          * @param {number} position
          * The current position.
          *
          * @returns {number}
          * The position to snap to.
          */
          let calculate_snap_location = function (position) {

            // Used to store each difference between current position and each snap point.
            let currentDiff;

            // Used to store the current best difference.
            let minimumDiff;

            // User to store the best snap position.
            let bestSnap;

            // We're going to cycle through each snap location
            // and work out which is closest to the current position.
            for (var i=0; i < snapLocations.length; i++) {

              // Calculate the difference.
              currentDiff = Math.abs(positionX - snapLocations[i]);
              console.log('difference', _direction)


              // Works out if this difference is the closest yet.
              if(minimumDiff === undefined || currentDiff < minimumDiff) {

                minimumDiff = currentDiff;
                bestSnap = snapLocations[i];
              }
            }

            return bestSnap;
          };


          scope.previous = function() {
            _direction = 'previous';
          }

          scope.next = function() {
            _direction = 'next';
          }

          scope.end = function(event) {
            //event.preventDefault();
            console.log('end pos', event);

            element.addClass('animate');
            // Work out where we should "snap" to.
            //restPosition = calculate_snap_location(positionX);


            if ((GameService.holeIndex === 0  && _direction === 'previous') || (GameService.holeIndex === GameService.holes.length-1) && _direction === 'next') {
              restPosition = 0;
            }
            else if(event.distance > snapMultiple/2.5 || Math.abs(event.overallVelocityX) > 0.5) {
              restPosition = calculateSnapLocation(_direction);
              GameService.updateHoleIndex(_direction);
            } else {
              restPosition = 0;
            }

            element.css('-webkit-transform', 'translate3d(' + restPosition + 'px, 0px, 0px)');
          }

          scope.start = function(event) {
            //event.preventDefault();
            element.removeClass('animate');
            if(event.deltaX > 0) {
              _direction = 'previous';
            } else {
              _direction = 'next';
            }
          }

          scope.move = function(event) {
            //event.preventDefault();
          if(event.offsetDirection < 5) {
              // Set the current position.
              positionX = parseInt(event.deltaX);
              element.css('-webkit-transform', 'translate3d(' + positionX + 'px,0px,0px)');
              element.css('transform', 'translate3d(' + positionX + 'px,0px,0px)');
            }

          }

          scope.$on('update-hole', (event, direction) => {
            console.log('UPDATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
            element.removeClass('animate');
            GameService.updateHoleIndex(direction);
            console.log(direction);
            restPosition = calculateSnapLocation(direction);

            element.addClass("animate");
            element.css('-webkit-transform', 'translate3d(' + restPosition + 'px,0px,0px)');

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
              positionX = 0;
              console.log('prooooooooooo', event);
              element.css('-webkit-transform', 'translate3d(0,0,0)');
              element.removeClass('animate');
              scope.index = GameService.holeIndex;

              scope.$apply();
            }
          })

        }



    };

  return directive;
}
