const options = {
  name: 'breadthfirst', // name of layout; e.g. cose, concentric, circle, grid, random, preset, null (null is used for compound nodes)
  directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
  padding: 90, // padding on fit
  circle: false, // put depths in concentric circles if true, put depths top down if false
  grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
  spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
  boundingBox: undefined as undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
  nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
  roots: undefined as undefined, // the roots of the trees
  depthSort: undefined as undefined, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
  animate: false, // whether to transition the node positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined as undefined, // easing of animation if enabled,
  animateFilter: function ( node: any, i: any ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: undefined as undefined, // callback on layoutready
  stop: undefined as undefined, // callback on layoutstop
  transform: function (node: any, position: any ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
};

export default options;
