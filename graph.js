var margin ={top:20, right:30, bottom:30, left:40},
    width=960-margin.left - margin.right, 
    height=500-margin.top-margin.bottom;

// scale to ordinal because x axis is not numerical
var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

//scale to numerical value by height
var y = d3.scale.linear().range([height, 0]);

var chart = d3.select("#theftchart")  
    .append("svg")  //append svg element inside #chart
    .attr("width", width+(2*margin.left)+margin.right)    //set width
    .attr("height", height+margin.top+margin.bottom);  //set height

var achart = d3.select("#assultchart")  
    .append("svg")  //append svg element inside #chart
    .attr("width", width+(2*margin.left)+margin.right)    //set width
    .attr("height", height+margin.top+margin.bottom);  //set height

var xAxis = d3.svg.axis().scale(x).orient("bottom");  //orient bottom because x-axis will appear below the bars

var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

d3.json('http://127.0.0.1:8081/theftData', function(error, result){
  var data = formmatResult(result);
  x.domain(data.map(function(d){ return d.year}));
  y.domain([0, d3.max(data, function(d){return d.over500})]);
  
  var bar = chart.selectAll("g")
                    .data(data)
                  .enter()
                    .append("g")
                    .attr("transform", function(d, i){
                      return "translate("+x(d.year)+", 0)";
                    });
  
  bar.append("rect")
      .attr("y", function(d) { 
        return y(d.over500); 
      })
      .attr("x", function(d,i){
        return x.rangeBand()+(margin.left/4);
      })
      .attr("height", function(d) { 
        return height - y(d.over500); 
      })
      .attr("width", x.rangeBand());  //set width base on range on ordinal data

  bar.append("text")
      .attr("x", x.rangeBand()+margin.left )
      .attr("y", function(d) { return y(d.over500) -10; })
      .attr("dy", ".75em")
      .text(function(d) { return d.over500; });
  
  chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate("+margin.left+","+ height+")")        
        .call(xAxis);
  
  chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate("+margin.left+",0)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("over500");
});

d3.json('http://127.0.0.1:8081/assaultData', function(error, result){
  var data = formmatResult(result);
  x.domain(data.map(function(d){ return d.year}));
  y.domain([0, d3.max(data, function(d){return d.arrestCount})], [1, d3.max(data, function(d){return d.nonArrestCount})]);
  
  var bar = achart.selectAll("g")
                    .data(data)
                  .enter()
                    .append("g")
                    .attr("transform", function(d, i){
                      return "translate("+x(d.year)+", 0)";
                    });
  
  bar.append("rect")
      .attr("y", function(d) { 
        return y(d.arrestCount); 
      })
      .attr("x", function(d,i){
        return x.rangeBand()+(margin.left/4);
      })
      .attr("height", function(d) { 
        return height - y(d.arrestCount); 
      })
      .attr("width", x.rangeBand());  //set width base on range on ordinal data

  bar.append("text")
      .attr("x", x.rangeBand()+margin.left )
      .attr("y", function(d) { return y(d.arrestCount) -10; })
      .attr("dy", ".75em")
      .text(function(d) { return d.arrestCount; });
  
  achart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate("+margin.left+","+ height+")")        
        .call(xAxis);
  
  achart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate("+margin.left+",0)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Arrest Count");
});

function type(d) {
    d.year = +d.year; // coerce to number
    return d;
}

function formmatResult(obj) {
var data = [];
Object.keys(obj).forEach(ele => {
    data.push(obj[ele]);
});
return data;
}
