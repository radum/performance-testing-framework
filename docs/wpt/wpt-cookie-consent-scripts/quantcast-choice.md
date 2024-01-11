# Quantcast Choice IAB EU

**[Thanks Andy for the steps.](https://github.com/andydavies/webpagetest-cookie-consent-scripts/blob/main/scripts/quantcast-choice.md)**

Bypassing the Quantcast Choice cookie prompt seems to require the following to be set:

**localStorage**
- CMPList
- noniabvendorconsent
- _cmpRepromptHash

**cookies**
- euconsent_v2
- addtl_consent

These can be set near the start of a test in WebPageTest via the _Inject Script_ field at the bottom of the _Advanced_ tab.

The DevTools snippet below can be used extracts relevant data from an existing Chrome session and then generate an appropriate script.

I'd recommend generating the script using a fresh Guest profile in Chrome first to avoid capturing anything that may be personal.

1. Launch fresh Guest window in Chrome

2. Open a site that uses Quantcast Choice as it's CMP

3. Accept cookies (could reject, or experiment with different options too)

4. Launch DevTools

5. Either paste script below into the console or save it as a devtools snippet, and then execute it


```
// Local storage items
var CMPList = localStorage.getItem('CMPList');
var noniabvendorconsent = localStorage.getItem('noniabvendorconsent');
var _cmpRepromptHash =localStorage.getItem('_cmpRepromptHash');


// Cookies
var cookies = document.cookie.split('; ');
var euconsent_v2 = cookies.find(entry => entry.startsWith('euconsent-v2='));
var addtl_consent = cookies.find(entry => entry.startsWith('addtl_consent='));

// Generate WPT Script
var output = `localStorage.setItem('CMPList', '${CMPList}');\n` +
 `localStorage.setItem('noniabvendorconsent', '${noniabvendorconsent}');\n` +
 `localStorage.setItem('_cmpRepromptHash', '${_cmpRepromptHash}');\n` +
 `document.cookie = '${euconsent_v2};'\n` +
 `document.cookie = '${addtl_consent};'\n`;

console.log(output);

copy(output);
```

6. The script will generate another script that looks something like this (it will also copy it to the clipboard)

```
localStorage.setItem('CMPList', '{"lastUpdated":"2021-02-04T17:03:11Z","CMP":["2","3","5","6","7","9","10","14","18","21","23","25","27","28","30","31","38","44","45","46","47","50","54","58","59","61","63","65","68","69","72","76","77","79","84","90","92","96","104","105","113","123","125","129","134","141","162","167","168","170","171","181","185","193","198","212","217","218","221","222","224","225","227","229","231","235","236","237","242","246","247","252","258","259","264","273","277","279","280","282","284","287","291","292","294","297","299","300","302","303","304","305","306","307","308","309","310","312","316","318","319","321","322","323","327","329","330","332","335","338","339","343","345","348","351","352","353"],"expiry":1613831801672}');
localStorage.setItem('noniabvendorconsent', 'null');
localStorage.setItem('_cmpRepromptHash', 'CPBw6O8PBw6O8AKAaAENBNCsAP_AAH_AACiQHZtf_X_fb39j-_59_9t0eY1f9_7_v-0zjhfds-8Nyf_X_L8X42M7vF36pq4KuR4Eu3LBIQFlHOHUTUmw6okVrTPsak2Mr7NKJ7LEinMbe2dYGHtfn9VTuZKYr97s___z__-__v__79f_r-3_3_vp9X---_e_V399gdmASYal8BFmJY4Ek0aVQogQhXEh0AoAKKEYWiawgJXBTsrgI9QQMAEBqAjAiBBiCjFgEAAAAASURASAHggEQBEAgABACpAQgAIkAQWAFgYBAAKAaFgBFAEIEhBkcFRymBARItFBPJWAJRd7GGEIZRYAUCj-iowESAAA.YAAAAAAAAAAA.1.QjY0v9UMqYSBhGAhdjRltA==');
document.cookie = 'euconsent-v2=CPBw6O8PBw6O8AKAaAENBNCsAP_AAH_AACiQHZtf_X_fb39j-_59_9t0eY1f9_7_v-0zjhfds-8Nyf_X_L8X42M7vF36pq4KuR4Eu3LBIQFlHOHUTUmw6okVrTPsak2Mr7NKJ7LEinMbe2dYGHtfn9VTuZKYr97s___z__-__v__79f_r-3_3_vp9X---_e_V399gdmASYal8BFmJY4Ek0aVQogQhXEh0AoAKKEYWiawgJXBTsrgI9QQMAEBqAjAiBBiCjFgEAAAAASURASAHggEQBEAgABACpAQgAIkAQWAFgYBAAKAaFgBFAEIEhBkcFRymBARItFBPJWAJRd7GGEIZRYAUCj-iowESAAA.YAAAAAAAAAAA;'
document.cookie = 'addtl_consent=1~39.4.3.9.6.5.4.13.6.4.15.9.5.2.7.4.1.7.1.3.2.10.3.5.4.13.8.4.6.9.7.10.2.9.2.12.6.7.6.14.5.20.6.5.1.3.1.11.29.4.14.4.4.1.3.10.6.2.9.6.6.4.5.3.1.4.29.4.5.3.1.6.2.2.17.1.17.10.9.1.8.6.2.8.1.2.4.142.4.8.35.7.15.1.14.3.1.8.10.14.11.3.7.25.5.18.9.7.41.2.4.18.21.3.4.2.1.6.6.5.2.14.18.7.3.2.2.8.19.1.8.8.6.3.10.4.5.15.2.4.9.3.1.6.4.11.1.3.22.16.2.6.8.2.4.11.6.5.17.16.11.8.1.10.28.8.4.1.3.21.2.7.6.1.9.30.17.4.9.15.8.7.3.6.6.7.2.4.1.7.12.13.22.13.2.12.2.4.6.1.4.15.2.4.9.4.5.1.3.7.13.5.3.12.4.13.4.14.8.2.15.2.5.5.1.2.2.1.2.14.7.4.8.2.9.10.18.12.13.2.18.1.1.3.1.1.9.20.5.4.20.8.4.5.3.5.4.8.4.2.2.2.14.2.13.4.2.6.9.6.3.4.3.5.2.3.6.10.11.2.4.3.16.3.8.3.3.1.2.3.9.19.11.15.3.10.7.6.4.3.4.9.3.3.3.1.1.1.6.11.3.1.1.7.4.6.1.10.5.2.6.3.2.1.1.4.3.2.2.4.3.2.13.7.12.2.1.6.4.5.4.3.2.2.4.1.3.1.1.1.2.9.1.6.9.1.5.2.1.7.2.8.11.1.3.1.1.2.1.3.2.6.1.5.6.1.5.3.1.3.1.1.2.2.7.7.1.4.1.2.6.1.2.1.1.3.1.1.4.1.1.2.1.8.1.3.4.4.3.2.1.3.1.4.3.9.6.1.15.10.28.1.2.1.1.12.3.4.1.6.3.4.7.1.3.1.1.3.1.5.3.1.3.2.2.1.1.4.2.1.2.1.1.1.2.2.4.2.1.2.2.2.4.1.1.1.2.1.1.1.1.1.1.1.1.1.1.1.2.2.1.1.2.1.2.1.7.1.2.1.1.1.2.1.1.1.1.2.1.1.3.2.1.1.2.6.1.1.1.5.2.1.6.5.1.1.1.1.1.2.1.1.3.1.1.4.1.1.2.2.1.1.4.2.1.1.2.3.2.1.2.3.1.1.1.1.4.1.1.1.5.1.9.3.1.5.1.1.3.4.1.2.3.1.4.2.1.2.2.2.1.1.1.1.1.1.11.1.3.1.1.2.2.1.4.2.3.2.1.4.1.1.1.1.1.3.2.1.1.2.5.1.3.6.4.1.1.3.1.4.3.1.4.5.1.7.2.1.1.1.2.1.1.1.3.1.2.1.12.1.1.3.1.2.2.3.1.4.1.2;'
```

7. In WebPageTest…

8. Enter the page you want test

9. Paste the generated script into the _Inject Script_ text box

8. Hit start

If all's gone well when the test completes the filmstrip shouldn't contain a consent popup, and the waterfall should have all the third-parties and ads (although some third-parties and ad providers don't serve their content to AWS locations etc)

Here's two tests using https://www.ultimate-guitar.com/  

Without injected script: https://www.webpagetest.org/result/210217_Di80_9e9124921d95b62ddf7db6ff54e9432e/  
With script: https://www.webpagetest.org/result/210217_DiWJ_0bf7a6b75186403f4125c6ccf784981b/  

Comparison: https://www.webpagetest.org/video/compare.php?tests=210217_Di80_9e9124921d95b62ddf7db6ff54e9432e,210217_DiWJ_0bf7a6b75186403f4125c6ccf784981b
