export function SwipeAndSnapDirective(GameService) {
  'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/directives/swipe-and-snap/swipe-and-snap.html',
        replace: true,
        link: function (scope, element) {

          let direction;

          scope.previous = function() {
            direction = 'previous';
          }

          scope.next = function() {
            direction = 'next';
          }

          let innerWidth = window.innerWidth;
          let snapLocations;

          let snapMultiple = innerWidth < 450 ? innerWidth : 450;

          snapLocations = GameService.holes.map((hole, index) => {
            return -(snapMultiple*index);
          });

          let restPosition = 0, // Define the location to end.
          positionX = 0; // The current position.


          scope.contents = new Array(3);

          scope.getId = function(index) {
            return 'item'+index.toString();
          }

          scope.getLabel = function(index) {
            return 'label' + ' ' + index;
          }

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
              console.log('difference', direction)


              // Works out if this difference is the closest yet.
              if(minimumDiff === undefined || currentDiff < minimumDiff) {

                minimumDiff = currentDiff;
                bestSnap = snapLocations[i];
              }
            }

            return bestSnap;
          };

          scope.end = function(event) {
            //event.preventDefault();
            console.log(GameService)
            element.addClass('animate');
            // Work out where we should "snap" to.
            restPosition = calculate_snap_location(positionX);

            console.log('rest', restPosition);
            console.log('snap', snapLocations[GameService.getHoleIndex()]);
            if(restPosition !== snapLocations[GameService.getHoleIndex()]) {
              GameService.updateHoleIndex(direction);
            }
            element.css('-webkit-transform', 'translate3d(' + restPosition + 'px, 0px, 0px)');
          }

          scope.start = function(event) {
            //event.preventDefault();
            element.removeClass('animate');
          }

          scope.move = function(event) {
            //event.preventDefault();
          if(event.offsetDirection < 5) {
              // Set the current position.
              positionX = restPosition + parseInt(event.deltaX);
              element.css('-webkit-transform', 'translate3d(' + positionX + 'px,0px,0px)');
              element.css('transform', 'translate3d(' + positionX + 'px,0px,0px)');
            }

          }

          scope.$on('update-hole', (event, direction) => {
            element.removeClass('animate');
            GameService.updateHoleIndex(direction);
            restPosition = snapLocations[GameService.getHoleIndex()];
            element.addClass("animate");
            element.css('-webkit-transform', 'translate3d(' + restPosition + 'px,0px,0px)');
          });

        }

    };

  return directive;
}
