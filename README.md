Attempt to create fixed-header-table
=======================

### How to run

1. Get `node.js~0.12`, `bower`, `gulp`
1. `npm install` `bower install`
1. `gulp serve`
1. Browse `localhost:3000/fixed-header-table`

### Strategy

1. Separate table header into a different table, re-adjust column width as content populate.

### Problem

1. Incredibly inefficient. Column width has to readjust every single time a new row is populated. There is no event to catch when all the rows finishes populating. This is a big problem when filtering and sorting are needed on user-click (e.g. sorting column when user clicks on a column header. No jank without column re-adjustment, incredible jank when it does).
1. Doesn't work properly when content overflow horizontally (checkout Get Failed Data! option).
