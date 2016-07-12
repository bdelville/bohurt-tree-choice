
var first = true;
var circleSize = 10;
var csInfo;
var nodeMinSize;

// ************** Generate the tree diagram	 *****************

var i = 0,
  duration = 750,
  root, margin, tree, svg;

var diagonal = d3.svg.diagonal().projection(function (d) { return [d.x, d.y]; });

registerSizeCallback(sizeChanged);

function sizeChanged() {
  d3.select('svg').remove();
  init();
}

function init() {
  margin = { top: 20, right: 120, bottom: 20, left: 20 },
    width = csInfo.width - margin.right - margin.left,
    height = 1000 - margin.top - margin.bottom;
    
    nodeMinSize = csInfo.width / 9;

  tree = d3.layout.tree().size([width, height]);

  svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;

  update(root);

  d3.select(self.frameElement).style("height", "500px");
}


function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function (d) {
    d.y = d.depth * 100;
    if (source == root) {
      //d._children = d.children;
      //d.children = null;
    }
  });

  // Update the node and set an id
  var node = svg.selectAll("g.node").data(nodes, function (d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
    .on("click", click);

  nodeEnter.append("circle")
    .attr("r", 1e-6)
    .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

  /*nodeEnter.append("text")
    .attr("x", 0)
    .attr("dy", circleSize * 3)
    .attr("text-anchor", function (d) { return "middle"; })
    .text(function (d) { return d.text; })
    .style("fill-opacity", 1e-6);*/
    
    nodeEnter.append("foreignObject")
    .attr("width", nodeMinSize)
    .attr("height", 45)
    .attr("x", -nodeMinSize/2)
    .attr("y", circleSize + 5)
    .style("fill-opacity", 1e-6)
    .append("xhtml:body")
    .style("font", "15px 'Helvetica Neue'")
    .html(function (d) { return "<p>" + d.text + "</p>"; });

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

  nodeUpdate.select("circle")
    .attr("r", circleSize)
    .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

  /*nodeUpdate.select("text")
    .style("fill-opacity", 1);*/
    
    nodeUpdate.select("foreignObject")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
    .remove();

  nodeExit.select("circle")
    .attr("r", 1e-6);

  /*nodeExit.select("text")
    .style("fill-opacity", 1e-6);*/
    nodeExit.select("foreignObject")
    .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link").data(links, function (d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function (d) {
      var o = { x: source.x0, y: source.y0 };
      return diagonal({ source: o, target: o });
    });

  // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr("d", function (d) {
      var o = { x: source.x, y: source.y };
      return diagonal({ source: o, target: o });
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });

  //Pre-close all the Nodes
  if (first) {
    first = false;
    nodes.forEach(function (d) {
      if (d != root) {
        d._children = d.children;
        d.children = null;
      }
    });
    update(root);
  }
}

function closeNode(node) {
  node._children = node.children;
  node.children = null;
}

function closeBrothers(node, active = root) {
  //Find parent
  if (node == root) {
    return;
  }
  var list = active.children ? active.children : active._children;
  if (!list) {
    return;
  }
  if (list.indexOf(node) >= 0) {
    list.forEach(function (n) {
      if (node != n && n.children) {
        closeNode(n);
      }
    });
  } else {
    list.forEach(function (n) {
      closeBrothers(node, n);
    });
  }

}

// Toggle children on click.
function click(d) {
  if (d.action) {
    if (typeof d.action === 'string' || d.action instanceof String) d.action = [d.action];

    $.each(d.action, function (i, o) {
      if (o.startsWith("http")) {
        windowpop(o);
      }
    });
  }

  if (d.bg) {
    document.body.style.backgroundImage = d.bg;
  }

  if (!d.children && !d._children) {
    return;
  }

  if (d.children) {
    closeNode(d);
    //close all the sons ?
  }
  else {
    d.children = d._children;
    d._children = null;
    //close all the brothers
    closeBrothers(d);
  }

  update(d);
}

function windowpop(url) {
    var leftPosition, topPosition;
    var width = window.screen.width / 1.1;
    var width = window.screen.height / 1.1;
    
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    //Open the window.
    window.open(url, "Window2", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
}
