// set the site we are modifying
const site = 'www.example.com';

// do this on a fetch
addEventListener('fetch', (event) => {
	const request = event.request;
	event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
	// store the URL
	const url = new URL(request.url);

	// disallow crawlers (write a robots.txt file)
	if (url.pathname === '/robots.txt') {
		return new Response('User-agent: *\nDisallow: /', { status: 200 });
	}

	// when overrideHost is used in a WPT script, WPT sets x-host to original host i.e. site we want to proxy
	// store the value of x-host
	let xhost = request.headers.get('x-host');
	// xhost = site;

	// If the `x-host` header is missing, abort and tell us
	if (!xhost) {
		return new Response('x-host header missing', { status: 403 });
	}

	// set our hostname to that listed in the x-host header
	url.hostname = xhost;

	// look for header that allows us to bypass the transform entirely
	const bypassTransform = request.headers.get('x-bypass-transform');

	// get the accept header to allow us to examine the type of request it is
	const acceptHeader = request.headers.get('accept');

	// check that the x-host header matches what is contained in the site
	// make sure we aren't wanting to bypass the transformations
	if (xhost === site && (!bypassTransform || (bypassTransform && bypassTransform.indexOf('true') === -1))) {
		// check for an accept header and what it contains
		if (acceptHeader && acceptHeader.indexOf('text/html') >= 0) {
			// store this particular HTML response for modification
			let oldResponse = await fetch(url.toString(), request);
			// create a new response
			let newResponse = new HTMLRewriter()
				/**
				 * Our modifications to the HTML go in here using the HTMLRewriter API
				 * https://developers.cloudflare.com/workers/runtime-apis/html-rewriter
				 */
				.on('head', new addResourceHints())
				.on('iframe', new ytPlayerLite())
				.on('script[src="https://www.youtube.com/iframe_api"]', new removeElement())
				// .on("script:nth-child(1)", new removeElement())
				// .on("script:nth-child(2)", new removeElement())
				// .on("head > script:nth-of-type(2)", new removeElement())
				// .on('script[src="/bundles/common-js?v=Fx9WZ_Ywb0o61YtUfL-zk9ONjFQNzOHKs7qdf_ICeCQ1"]', new addAsyncAttribute())
				// .on('section[class*="hero-mid-size"]', new addLCPAttr())
				// .on('img', new optimizeImg())
				.transform(oldResponse);

			// return the modified page
			return newResponse;
		} else if (acceptHeader && acceptHeader.indexOf('text/css') >= 0) {
			// Change CSS here
			// grab the CSS response
			const response = await fetch(url.toString(), request);
			// extract the body of the request
			let body = await response.text();
			// modify the CSS response body
			body = body.replace(/@font-face{/gi, '@font-face{font-display: swap;');
			// return the modified response
			return new Response(body, {
				headers: response.headers
			});
		}
	}

	// otherwise just proxy the request unmodified
	return fetch(url.toString(), request);
}

class removeElement {
	element(element) {
		element.remove();
	}
}

class addResourceHints {
	element(element) {
		// notice how we are prepending the hints, right after the opening head tag
		// can be changed to append if you want them right before the closing tag
		element.append(resourceHints, { html: true });
	}
}

class addDeferAttribute {
	element(element) {
		element.setAttribute('defer', 'defer');
	}
}

class addAsyncAttribute {
	element(element) {
		element.setAttribute('async', 'async');
	}
}

class optimizeImg {
	element(element) {
		element.setAttribute('loading', 'lazy');
		element.setAttribute('decoding', 'async');
		element.setAttribute('style', 'content-visibility: auto;');
	}
}

class deferInlineScript {
	element(element) {
		const wrapperStart = "window.addEventListener('load', function() {";
		const wrapperEnd = '});';

		element.prepend(wrapperStart, { html: true });
		element.append(wrapperEnd, { html: true });
	}
}

class addLCPAttr {
	element(element) {
		element.removeAttribute('data-media');
		// element.removeAttribute("data-media-sm");
		element.setAttribute(
			'data-media-sm',
			'https://images.weserv.nl/?output=webp&url=www.thejockeyclub.co.uk/globalassets/racecourses/all-sites/web-header-1960x670-summer-racedays.jpg'
		);
		element.removeAttribute('data-media-md');
		element.removeAttribute('data-media-lg');
		element.setAttribute('data-imagetype', 'false');
		// element.setAttribute('style', 'background-image: url("/globalassets/racecourses/all-sites/web-header-1960x670-summer-racedays.jpg?IMAGEMAX&settings=eyJJZCI6MCwiUXVhbGl0eSI6ODAsIkZpbHRlciI6bnVsbCwiQW5jaG9yUG9pbnQiOjEsIkNyb3BXaWR0aCI6MTQ0MCwiQ3JvcEhlaWdodCI6NDUwLCJDb250cmFzdCI6MCwiQnJpZ2h0bmVzcyI6MCwiQWxwaGEiOjEwMCwiVGludENvbG91ciI6bnVsbCwiRmxpcCI6bnVsbCwiVmlnbmV0dGUiOm51bGx9"); background-repeat: no-repeat;');
		// element.setAttribute('style', "background-image: url('/globalassets/racecourses/all-sites/web-header-1960x670-summer-racedays.jpg?IMAGEMAX'); background-repeat: no-repeat;");
		element.setAttribute(
			'style',
			"background-image: url('https://images.weserv.nl/?output=webp&url=www.thejockeyclub.co.uk/globalassets/racecourses/all-sites/web-header-1960x670-summer-racedays.jpg'); background-repeat: no-repeat;"
		);
	}
}

class ytPlayerLite {
	element(element) {
		element.append(
			`
  <lite-youtube videoid="ogfYd705cRs" playlabel="Play"></lite-youtube>
      `,
			{ html: true }
		);
		element.remove();
	}
}
