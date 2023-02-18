# Web performace audits

TODO: For now just random ideas

## How it Works

1. Investigate
   We need to understand what is the need, what are the problems what are we trying to fix.
2. Audit
   Web perf audit everthing from network and infrastructure to web stuff an beyond.
3. Report
   All issues from above will be added to a detailed report with prioritised actionable tasks.
4. Handover
   Make sure all of the above is understood and the dev team can pick them up.
5. Refresh
   After a period of time we will audit again against the todo list and see where we are with improvements.

## Things to look out for in the page source:

## Sanitise in-BODY SCRIPT and STYLE

If there are lots of in-`<body>` `<script>` and `<style>` blocks, while this is not a bad thing-actually, it's great!- it's vital that they're:

1. Only insert if and when needed.
2. Only inserted in the correct place.

As a rule:

- `<script>` blocks should go **immediately after the HTML they affect**;
- `<style>` block should go **immediately before the HTML they affect**.


Debugging:

```css
body if:(style, script):not(:empty) {
    display: block;
    padding: 16px;
    font-family: monospace;
    border: 16px solid red;
    background-color: #333333;
    color: #F9F9F9;
    white-space: pre;
    overflow: scroll;
    margin-bottom: 16px;
}
```