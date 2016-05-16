export function SwipeAndSnapDirective() {
  'ngInject';

    let directive = {
        restrict: 'E',
        template: `
          <div class="device">

            <div class="screen">

              <div class="content">

                <div class="carouselWrap"
                      hm-panmove="move($event)"
                      hm-panstart="start()"
                      hm-panend="end()"
                      hm-panleft="left()"
                      hm-panright="right()"
              >
                  <div ng-repeat="content in contents track by $index"
                      id="{{getId($index+1)}}"
                      class="float--left"
                  >
                    {{getLabel($index+1)}}
                  </div>

                </div>

              </div>

            </div>

          </div>

          `,
        replace: true,
        link: function (scope, element) {

          var snapLocations = [0, -450, -900],
          restPosition = 0, // Define the location to end.
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
          var calculate_snap_location = function (position) {

            // Used to store each difference between current position and each snap point.
            var currentDiff;

            // Used to store the current best difference.
            var minimumDiff;

            // User to store the best snap position.
            var bestSnap;

            // We're going to cycle through each snap location
            // and work out which is closest to the current position.
            for (var i=0; i < snapLocations.length; i++) {

              // Calculate the difference.
              currentDiff = Math.abs(positionX - snapLocations[i]);

              // Works out if this difference is the closest yet.
              if(minimumDiff === undefined || currentDiff < minimumDiff) {
                minimumDiff = currentDiff;
                bestSnap = snapLocations[i];
              }
            }

            return bestSnap;
          };



          scope.left = function() {
            console.log('left', element);
          }

          scope.right = function() {
            console.log('right', element);
          }

          scope.end = function() {
            console.log('end', element);
            element.addClass('animate');
            // Work out where we should "snap" to.
            restPosition = calculate_snap_location(positionX);

            element.css('-webkit-transform', 'translate3d(' + restPosition + 'px, 0px, 0px)');
          }

          scope.start = function() {
            console.log('start');
            element.removeClass('animate');
          }

          scope.move = function(ev) {
            // Set the current position.
            positionX = restPosition + parseInt(ev.deltaX);

            element.css('-webkit-transform', 'translate3d(' + positionX + 'px,0px,0px)');
            element.css('transform', 'translate3d(' + positionX + 'px,0px,0px)');
          }
        }

    };

  return directive;
}
