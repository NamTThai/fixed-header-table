Attempt to create fixed-header-table
=======================

Out of many pathetic failures, I had two more successful attempts. Though both of them still kinda fails. Please see corresponding problems in each branch's README file.

### How to run

1. Get `node.js~0.12`, `bower`, `gulp`
1. `npm install` `bower install`
1. `gulp serve`
1. Browse `localhost:3000/fixed-header-table`

### Goals

1. Table header is frozen when table body scroll
1. Header can be scrolled horizontally when body scroll horizontally
1. Ok performance, not too much janks

### More successful strategies

1. [Clone header:](tree/try-2) As table scroll to the top of the screen, clone itself, remove the body leaving only the header and set header's position to fixed.
1. [Separate header into a different table from the start:](tree/try-1) Separate table header into a different table, re-adjust column width as content populate.

### Biggest problems

1. Don't know the number of columns ahead of time, even the name of column header/title. Column headers are dynamically populated.
1. Don't know the content/rows ahead of time, it is dynamically populated and needs different column width.
1. Content easily overflow horizontally
