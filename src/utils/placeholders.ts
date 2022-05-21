/**
 * https://github.com/5antos/JS-Randomness/blob/master/placeholders.js
 * @author 5antos#4876
 */

function applyPlaceholders (placeholders, string, delimiters = ['%{', '%}']) {
  return string.replace(new RegExp(Object.keys(placeholders).map(k => `${delimiters[0]}${k}${delimiters[1]}`).join('|'), 'g'), match => placeholders[match.replace(new RegExp(delimiters.join('|'), 'g'), '')])
}

export default applyPlaceholders
