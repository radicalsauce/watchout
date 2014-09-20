var numCircles = 50;
var width = 40, height = 40;
var currentScore = 0;
var highScore = 0;
var collisions = 0;

var randomX = function(){
  return 10+Math.random()*680;
}
var randomY = function(){
  return 10+Math.random()*430;
}

var svg = d3.select('svg');

var drag = d3.behavior.drag()

  .on('drag', function(){
    d3.select(this)
      .attr('x', d3.event.x)
      .attr('y', d3.event.y)
      .transition()
        .tween('text',function(){
          return function(t){
            d3.selectAll('circle').data(Array(numCircles)).attr('fill',function(data){
                var color = d3.select(this).attr('fill');
                var xDist = Math.pow(d3.select('rect').attr('x')+10 - d3.select(this).attr('cx'), 2);
                var yDist = Math.pow(d3.select('rect').attr('y')+10 - d3.select(this).attr('cy'), 2);
                var distance = Math.sqrt(xDist + yDist);
                if(distance < 30) {
                  currentScore=0;
                  color = 'black';
                }
                if(color==='blue' && distance >= 20){
                  upCollisions();
                  collisions++;
                }

                return color;
              })
          }
        })

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
        .tween('fill',function(){
          var collided = false;
          return function(t){
            var xDist = Math.pow(d3.select(this).attr('cx') - d3.select('rect').attr('x')-10, 2)
            var yDist = Math.pow(d3.select(this).attr('cy') - d3.select('rect').attr('y')-10, 2)
            var distance = Math.sqrt(xDist + yDist);

            if(distance < 30) {
              currentScore=0;
              var colors = ['blue','red','yellow','green']
              d3.select(this).attr('fill', colors[Math.floor(Math.random()*4)])
              collided = true;
            }
            if(collided === true && distance >=20){
              upCollisions();
              collided = false;
            }
          }



        })
        .duration(1500)
}
var upScore = function(){
  d3.select('.current').text('Current score: '+ currentScore);
  if(currentScore>highScore){
    highScore = currentScore;
    d3.select('.high').text('High score: '+ highScore);
  }
  currentScore++
}
var upCollisions = function(){
  collisions++;
  d3.select('.collisions').text('Collisions: '+ collisions);
}
setInterval(upScore, 100);
setInterval(moveCircles, 1500);

