# Browser rendering steps

*MISSING*

- [ ] Browser events complete list
- [ ] More info on the preload scanner
- [ ] Example on how the parser works on an html file
- [ ] In-browser priotitization
- [ ] Most of it documented here https://www.youtube.com/watch?v=ct5MvtmL1NM&list=WL

## The Browser

The browser are complicated engines.

They have 3 trees that they maintain internaly.

- DOM Tree (document object model (all html tags))
- CSSOM (style tree)
- Render Tree (the above are merged and then we render on screen)

In the DOM the only thing that is rendered on the screen is in the BODY. Unless we have a body there is nothing to render on the screen.

### Basic Parser Rules

- Process 1 token at a time (a token is a tag like <html> <div>)
- Stylesheets Block Render (because it can't render unless DOM and CSSOM can be merged)
- Stylesheets DO NOT Block the parse, just the rendering
- Non-Async Script tags block Parser/DOM until
  - Pending Stylesheets have loaded
  - Script has loaded

It parses the string as a stream over the network, it doesn't have to wait for the whole thing to become available.

So as a byte comes down the wire or more likely a 1500 byte packet, it will process that 1 byte at a time. It reacheas an end tag and it has a token, I can process this token.

For example the doctype at the top is a token, the HTML tage is a token.

When a browser reaches a script tag if it's not an async script or a defer script it stops until it has loaded and is ready to be executed and it needs to executed before it can go on.

That is the case the script needs to modify something in the DOM before it or it needs to create stuff that is needed later in the document.

> NOTE: The script might need to reference or try to do things that are referenced in the stylesheet.

So when you get to a script tag not only you need to wait for that script tag to finish but it has to wait for any style sheets that were referenced before it to finish loading before it can execute that script.

The script tags are the biggest blocker.

#### Preload Scanner

Browsers also have a Preload Scanner, that peeks ahead the HTML and looks for stuff that it will probably need to load and it starts loading.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello</title>
    <link rel="stylesheet href="style.css" type="text/css">
    <script src="async.js" async></script>
    <script src="script.js"></script>
    <script src="script2.js"></script>
</head>
<body>
    ...
</body>
</html>
```

In the example above, the browser reaches script.js loads and executes, before it continues to parse the HTML again, but it doesn't stop loading the other resources.

The next script script2.js will be seen by the preload scanner and it will start fetching before script.js will finish executing.

### Browser Events

#### DOM Content Loaded

When the parser reaches the end of the document.

It hasn't neceseraly finished loading all resources but the parser made it through all of those script tags basically and reached the end of HTML.

#### Load

When all of the document resources have finished loading.

All of the images, stylesheets scripts etc. have finished loading.

### Rendering Magic

Once the html is almost finished to be parsed and CSSOM is loaded if there are still scripts at the end that are blocking then the browsers have their own logic on what happens.

For example Chrome yields a paint if a certain number of dom elements have already been parsed and CSSOM is done, and so on and so forth. Each browser has it own rules.

### Late-Discovered Resources

- Fonts
- Background Images
- Script-injected content
- @import

These are not staticlay defined and are not seen by the preload scanner.

*Fonts & Background Images;* the browser doesn't know about them until it actually applies the stylesheet to a DOM tree does layout and styles and then it sees that it needs them.

There is no predictive way to scan and preload them.

This is where css font display property comes in to help.

Most browsers will wait for 3s to wait for the custom font, if it doesn't come in it will start rendering with a fallback font.

*Script-injected content*

Think of TAG managers or AB testing scripts, that will need to loads stuff, and then end up with a document.write to add or modify content.

The browser needs to wait for all this to happen before it can do anything.

## Network

### In-browser priotitization

#### HTTP/1.x Prioritization

- 6 Connections per origin (protocol + hostname)
- Pick next-highest for each origin as a connection becomes available
