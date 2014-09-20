var numCircles = 20;
var width = 20, height = 20;
var randomX = function(){
  return 10+Math.random()*680;
}
var randomY = function(){
  return 10+Math.random()*430;
}

var svg = d3.select('svg');

var drag = d3.behavior.drag()

  .on('drag', function(){
    d3.select(this).attr('x', d3.event.x).attr('y', d3.event.y)
  })


for(var i=0; i<numCircles; i++){
svg.append('circle')
  .attr('r', 10 )
  .attr('cx', randomX())
  .attr('cy', randomY())
}

svg.append('rect')
  .attr("x", 350)
  .attr("y", 225)
  .attr("width", width)
  .attr('height', height )
  .attr('fill', 'orange')
  .call(drag)

var moveCircles = function(){
    d3.selectAll('circle')
      .transition()
        .attr('cx', function(){return randomX()})
        .attr('cy', function(){return randomY()})
        .tween('text',function(){
          var _this = this
          setInterval(function(){

            var xDist = Math.pow(d3.select(_this).attr('cx') - d3.select('rect').attr('x'), 2)
            var yDist = Math.pow(d3.select(_this).attr('cy') - d3.select('rect').attr('y'), 2)
            var distance = Math.sqrt(xDist + yDist);

            if(distance < 10) {
              console.log('crash');
            }

          }, 1);
        })
        .duration(1500)
}

setInterval(moveCircles, 2500);
