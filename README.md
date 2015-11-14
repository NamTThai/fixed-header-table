Attempt to create fixed-header-table
=======================

### How to run

1. Get `node.js~0.12`, `bower`, `gulp`
1. `npm install` `bower install`
1. `gulp serve`
1. Browse `localhost:3000/fixed-header-table`

### Strategy:

1. As table scroll to the top of the screen, clone itself, remove the body leaving only the header and set header's position to fixed.

### Problems:

1. Low performance. Cloning header usually causes jank when there are two or more header rows, or each header box contains anything more than plain text. As the table gets more complicated, frame rate usually drops to around 30fps while scrolling.
1. When scrolling horizontally, header doesn't move along. I set a listener to horizontal scroll event, frame rate becomes pathetic.
1. Header pokes out of table body. It just looks odd. 
