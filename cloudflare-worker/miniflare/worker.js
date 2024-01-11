// Thank you tkadlec for the inspiration (more of a complete rip off) from here: https://github.com/tkadlec/playground/blob/eec972af882935686677027a90b3bec3b1b0e331/netlify/edge-functions/proxy.js

/**
 * Parse a cookie header.
 */
function cookieVal(source, name) {
	const value = `; ${source}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop().split(';').shift();
	}
}

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	// console.log('REQUEST');
	// console.info(request);
	const url = new URL(request.url);

	// Disallow crawlers

	if (url.pathname === '/robots.txt') {
		return new Response('User-agent: *\nDisallow: /', { status: 200 });
	}

	// When overrideHost is used in a script, WPT sets x-host to original host i.e. site we want to proxy

	// const host = request.headers.get('x-host');
	const host = 'www.woodmac.com';
	console.log('HOST: ' + host);
	console.log('URL: ' + url);
	let recipes = request.headers.get('x-recipes');
	console.log(JSON.stringify(request.headers));
	if (!recipes || recipes.length === 0) {
		let cookieHeader = request.headers.get('Cookie');
		let cookie = cookieVal(cookieHeader || '', 'wpt-experiments');
		if (cookie) {
			recipes = decodeURIComponent(cookie);
		}
	}

	const recipeList = recipes ? recipes.split(';') : [];

	// Error if x-host header missing
	if (!host) {
		return new Response('x-host header missing', { status: 403 });
	}

	url.hostname = host;
	url.port = '';

	const acceptHeader = request.headers.get('accept');

	// Check if it's the original document.
	// TODO will also select sub-documents e.g. iframes, from the same site :-(

	if (acceptHeader && acceptHeader.indexOf('text/html') >= 0) {
		let response = await fetch(url.toString(), request);
		let responseText = await response.text();
		let newResponse = new Response(responseText, response);
		newResponse.headers.delete('content-security-policy');
		response = newResponse;

		// for each named recipe, run a transform
		for (var i = 0; i < recipeList.length; i++) {
			let recipe = recipeList[i];
			let recipeType = recipe.split(':=')[0];
			let recipeIngredients = recipe.split(':=')[1] ? recipe.split(':=')[1].split(',') : false;

			if (recipeType === 'raduCustom') {
				response = new HTMLRewriter()
					.on('head', new ReplaceHead(recipeIngredients))
					.on('div[id="announcement-banner"]', new RemoveElement())
					.on('body > script:nth-of-type(1)', new RemoveElement())
					.on('body > style:nth-of-type(1)', new RemoveElement())
					.transform(response);
			}

			// general swap recipe!
			if (recipeType === 'swap' && recipeIngredients.length) {
				response = swapRecipe(recipeIngredients, response, responseText);
			}

			// deferjs recipe!
			// this one finds script elements with a src that are not modules and adds a defer attribute to them
			// expects deferjs:=site.js,site2.js

			if (recipeType === 'deferjs') {
				response = new HTMLRewriter().on('script[src]', new DeferJS(recipeIngredients)).transform(response);
			}

			// asyncjs recipe!
			// this one finds script elements with a src that are not modules and adds a defer attribute to them
			// expects asyncjs:=site.js,site2.js

			if (recipeType === 'asyncjs') {
				response = new HTMLRewriter().on('script[src]', new AsyncJS(recipeIngredients)).transform(response);
			}

			// this one finds images that need width and height, and adds them by case by case
			// expects imageaspectratio:=foo.jpg|w500|h600,bar.jpg|w400|h900,baz.jpg|w300|h800
			if (recipeType === 'imageaspectratio') {
				response = new HTMLRewriter().on('img', new ImageAspectRatio(recipeIngredients)).transform(response);
			}

			// this recipe adds a quick font-display swap override after every element that might add to the fonts array
			if (recipeType === 'fontdisplayswap') {
				// in-page font-face declarations first
				response = swapRecipe(['@font-face {|@font-face {font-display:swap;'], response, responseText);
				// then append scripts to change the font-display of 3rd party fonts
				response = new HTMLRewriter().on('link[rel="stylesheet"],style,script', new FontSwap()).transform(response);
			}

			// this one inserts html at the start of the head
			// expects insertheadstart:={url encoded html here}
			if (recipeType === 'insertheadstart') {
				let htmltext = decodeURIComponent(recipeIngredients[0]);
				response = new HTMLRewriter().on('head', new Insert('start', htmltext)).transform(response);
			}

			// this one inserts html at the end of the head
			// expects insertheadend:={url encoded html here}
			if (recipeType === 'insertheadend') {
				let htmltext = decodeURIComponent(recipeIngredients[0]);
				response = new HTMLRewriter().on('head', new Insert('end', htmltext)).transform(response);
			}

			// this one inserts html at the end of the body
			// expects insertbodyend:={url encoded html here}
			if (recipeType === 'insertbodyend') {
				let htmltext = decodeURIComponent(recipeIngredients[0]);
				response = new HTMLRewriter().on('body', new Insert('end', htmltext)).transform(response);
			}

			// this one finds images by src and adds loading=lazy
			// expects addloadinglazy:=foo.jpg,baz.jpg
			if (recipeType === 'addloadinglazy') {
				response = new HTMLRewriter()
					.on('img:not([loading="lazy"])', new AddLoadingLazy(recipeIngredients[0]))
					.transform(response);
			}

			// this one makes a blocking stylesheet load asynchronously instead
			// expects asynccss:=foo.css,b')ar.css
			if (recipeType === 'asynccss') {
				response = new HTMLRewriter().on('link[rel="stylesheet"]', new AsyncCSS(recipeIngredients)).transform(response);
			}

			// this one adds importance=high or low to an image script or link by url
			// expects addimportance:=foo.jpg|i_high,baz.js|i_low
			if (recipeType === 'addimportance') {
				response = new HTMLRewriter().on('script,img,link', new Importance(recipeIngredients)).transform(response);
			}
			// this one removes the importance attribute on an image script or link by url
			// expects removeimportance:=foo.jpg,baz.js
			if (recipeType === 'removeimportance') {
				response = new HTMLRewriter().on('script,img,link', new Importance(recipeIngredients)).transform(response);
			}

			// this one finds images by src and removes loading=lazy
			// expects removeloadinglazy:=foo.jpg,baz.jpg
			if (recipeType === 'removeloadinglazy') {
				response = new HTMLRewriter().on('img[loading=lazy]', new RemoveLoadingLazy(recipeIngredients)).transform(response);
			}

			// add rel preloads by url and type
			// expects preload:=site.css|as_style,site.js|as_script
			if (recipeType === 'addpreload') {
				response = new HTMLRewriter().on('head', new AddPreload(recipeIngredients)).transform(response);
			}

			// remove rel preloads by url
			// expects removepreload:=site.css,site.js
			if (recipeType === 'removepreload') {
				response = new HTMLRewriter().on('link[rel=preload]', new RemovePreload(recipeIngredients)).transform(response);
			}

			// add rel preconnects by url
			// expects preconnect:=https://www.webpagetest.org
			if (recipeType === 'addpreconnect') {
				response = new HTMLRewriter().on('head', new AddPreconnect(recipeIngredients)).transform(response);
			}

			if (recipeType === 'prerender') {
				let ingredientID = recipeIngredients[0];
				let testResult = await fetch('https://next.webpagetest.org/jsonResult.php?test=' + ingredientID);
				let testResultJSON = await testResult.json();
				let renderedHTML = testResultJSON.data.runs[1].firstView['rendered-html'];
				if (renderedHTML) {
					response = new Response(renderedHTML, {
						status: response.status,
						statusText: response.statusText,
						headers: response.headers
					});
				}
			}

			if (recipeType === 'disablescripts') {
				response = new HTMLRewriter().on('script', new Scrapped(recipeIngredients)).transform(response);
			}

			// inline css, js, (svg?) files by href/src
			// expects inline:=site.css,site.js
			if (recipeType === 'inline' && recipeIngredients.length) {
				const fullPath = url.protocol + '//' + url.host + url.pathname;

				const responses = await Promise.all(
					recipeIngredients.map((u) => {
						let fileUrl = u.match('^https?://') ? u : fullPath + u;
						return fetch(fileUrl);
					})
				);

				const texts = await Promise.all(responses.map((res) => res.text()));
				const ingredients = texts.map((text, i) => {
					// Note! ideally we'd not do this minify here and instead fetch above through the proxy using accept text/css
					// but workers don't allow you to request through the proxy again, so this will have to do.
					if (recipes.indexOf('minifycss') > -1) {
						text = cssmin(text);
					}
					return {
						url: recipeIngredients[i],
						text: text
					};
				});

				response = new HTMLRewriter()
					.on('link[rel="stylesheet"],script:not([defer]):not([async]):not([type=module])', new InlineFileContents(ingredients))
					.transform(response);
			}
		}

		return response;
	}
	// CSS recipes!
	else if (acceptHeader && acceptHeader.indexOf('text/css') >= 0) {
		let response = await fetch(url.toString(), request);
		let responseText = await response.text();
		let newResponse = new Response(responseText, response);
		newResponse.headers.delete('content-security-policy');
		response = newResponse;

		// for each named recipe, run a transform
		for (var i = 0; i < recipeList.length; i++) {
			let recipe = recipeList[i];
			let recipeType = recipe.split(':=')[0];
			let recipeIngredients = recipe.split(':=')[1] ? recipe.split(':=')[1].split(',') : false;

			// general swap recipe!
			if (recipeType === 'swap' && recipeIngredients.length) {
				response = swapRecipe(recipeIngredients, response, responseText);
			}

			// this recipe covers exteral css with font-family declarations, when css is first-party
			if (recipeType === 'fontdisplayswap') {
				response = swapRecipe(['@font-face {|@font-face {font-display:swap;'], response, responseText);
			}

			// this one minifies css.
			// expects minifycss
			if (recipeType === 'minifycss') {
				// const fullPath = url.protocol + '//' + url.host + url.pathname;
				let mincss = await response.text();
				response = new Response(cssmin(mincss), response);
			}
		}

		return response;
	}

	// Otherwise just proxy the request
	return fetch(url.toString(), request);
}

// general swap recipe
// expected syntax is:
// expects swap:=pattern|replacement|useRegexp|flags
// pattern and replacement are required for it to run.
// useRegexp is false and optional.
// If pattern is a regexp, set useRegexp to true.
// flags optional, default is "gi"
// all pattern, replacement will be passed through decodeURIComponent before use, allowing complex strings. Optionally, use encodeURIComponent for most input.
// For example: Opti[^e]+ should be sent as Opti%5B%5Ee%5D%2B
function swapRecipe(recipeIngredients, response, responseText) {
	recipeIngredients.forEach((ingredient) => {
		let parts = ingredient.split('|');
		let pattern, replacement, useRegexp;
		let flags = 'gi';

		if (parts[0]) {
			pattern = decodeURIComponent(parts[0]);
		}
		if (parts[1]) {
			replacement = decodeURIComponent(parts[1]);
		}
		// if 3rd arg is true, the pattern should be a regexp
		if (parts[2]) {
			// first check if 4th arg is present to override regexp flags
			if (parts[3]) {
				flags = decodeURIComponent(parts[3]);
			}
			pattern = new RegExp(pattern, flags);
		}

		if (pattern && replacement) {
			responseText = responseText.replaceAll(pattern, replacement);
			response = new Response(responseText, {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers
			});
		}
	});
	return response;
}

// quick/dirty css minify.
// TODO test this hard.
function cssmin(text) {
	return text
		.replace(/\s+/g, ' ')
		.replace(/{\s/g, '{')
		.replace(/\s{/g, '{')
		.replace(/}\s/g, '}')
		.replace(/\s{/g, '}')
		.replace(/;\s/g, ';')
		.replace(/:\s/g, ':')
		.replace(/;}/g, '}')
		.replace(/@media\(/g, '@media (')
		.replace(/and\(/g, 'and (')
		.replace(/\/\*.*?\*\//g, '');
}

class DeferJS {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		if (!element.hasAttribute('defer') && !element.hasAttribute('async') && element.getAttribute('type') !== 'module') {
			if (this.ingredients) {
				let elAttr = element.getAttribute('src');
				this.ingredients.forEach((ingredient) => {
					if (elAttr.indexOf(ingredient) > -1) {
						element.setAttribute('defer', 'true');
					}
				});
			} else {
				element.setAttribute('defer', 'true');
			}
		}
	}
}

class AsyncJS {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		if (!element.hasAttribute('defer') && !element.hasAttribute('async') && element.getAttribute('type') !== 'module') {
			if (this.ingredients) {
				let elAttr = element.getAttribute('src');
				this.ingredients.forEach((ingredient) => {
					if (elAttr.indexOf(ingredient) > -1) {
						element.setAttribute('async', 'true');
					}
				});
			} else {
				element.setAttribute('async', 'true');
			}
		}
	}
}

class AsyncCSS {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	makeAsync(element) {
		element.setAttribute('media', 'print');
		element.setAttribute('onload', "this.media='all'; this.onload=null");
	}
	element(element) {
		if (this.ingredients) {
			let elAttr = element.getAttribute('href');
			this.ingredients.forEach((ingredient) => {
				if (elAttr.indexOf(ingredient) > -1) {
					this.makeAsync(element);
				}
			});
		} else {
			this.makeAsync(element);
		}
	}
}

class AddPreload {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		this.ingredients.forEach((ingredient) => {
			let parts = ingredient.split('|as_');
			element.append('<link rel="preload" href="' + parts[0] + '" as="' + parts[1] + '">', { html: true });
		});
	}
}

class RemovePreload {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		this.ingredients.forEach((ingredient) => {
			if (element.getAttribute('href') === ingredient) {
				element.remove();
			}
		});
	}
}

class Scrapped {
	constructor() {}
	element(element) {
		element.tagName = 'scrapped';
		element.setAttribute('style', 'display: none');
	}
}

class Insert {
	constructor(location, htmltext) {
		this.location = location;
		this.htmltext = htmltext;
	}
	element(element) {
		if (this.location === 'start') {
			element.prepend(this.htmltext, { html: true });
		} else if (this.location === 'end') {
			element.append(this.htmltext, { html: true });
		}
	}
}

class FontSwap {
	constructor(location, htmltext) {
		this.fontfixscript = '<script>document.fonts.forEach(font => { font.display = "swap"; });</script>';
	}
	element(element) {
		element.after(this.fontfixscript, { html: true });
	}
}

class AddPreconnect {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		this.ingredients.forEach((ingredient) => {
			element.append('<link rel="preconnect" href="' + ingredient + '">', { html: true });
		});
	}
}

class ImageAspectRatio {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		if (!element.hasAttribute('width') && !element.hasAttribute('height')) {
			if (this.ingredients) {
				//expects something like foo.jpg|w500|h600,bar.jpg|w400|h900,baz.jpg|w300|h800
				let matchingIngredient = this.ingredients.filter((m) => m.includes(element.getAttribute('src')));
				if (matchingIngredient.length) {
					matchingIngredient = matchingIngredient[0];
					let w = matchingIngredient.match(/\|w(\d+)/);
					let h = matchingIngredient.match(/\|h(\d+)/);
					let currStyle = element.getAttribute('style') || '';
					if (w && h) {
						element.setAttribute('width', w[1]);
						element.setAttribute('height', h[1]);
						element.setAttribute('style', 'height:auto;' + currStyle);
					}
				}
			}
		}
	}
}

class AddLoadingLazy {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		if (this.ingredients) {
			if (this.ingredients.includes(element.getAttribute('src'))) {
				element.setAttribute('loading', 'lazy');
			}
		}
	}
}

class Importance {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		if (this.ingredients) {
			let matchingIngredient = this.ingredients.filter((m) => {
				return m.includes(element.getAttribute('src')) || m.includes(element.getAttribute('href'));
			});
			if (matchingIngredient.length) {
				matchingIngredient = matchingIngredient[0];
				let importance = matchingIngredient.match(/\|i_(high|low)/);
				if (importance && importance[1]) {
					element.setAttribute('importance', importance[1]);
				} else {
					element.removeAttribute('importance');
				}
			}
		}
	}
}

class RemoveLoadingLazy {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		if (this.ingredients) {
			if (this.ingredients.includes(element.getAttribute('src'))) {
				element.removeAttribute('loading');
			}
		}
	}
}

class InlineFileContents {
	constructor(ingredients) {
		this.ingredients = ingredients;
	}
	element(element) {
		if (this.ingredients) {
			let attrType = element.tagName === 'link' ? 'href' : 'src';
			let matchingIngredient = this.ingredients.find((m) => m.url.includes(element.getAttribute(attrType)));
			if (matchingIngredient) {
				if (element.tagName === 'link') {
					element.replace('<style>' + matchingIngredient.text + '</style>', { html: true });
				} else {
					element.replace('<script>' + matchingIngredient.text + '</script>', { html: true });
				}
			}
		}
	}
}

class AttributeAdder {
	constructor(attributeName) {
		this.attributeName = attributeName;
	}
	element(element) {
		element.setAttribute(this.attributeName, true);
	}
}

class RemoveElement {
	element(element) {
		element.remove();
	}
}
