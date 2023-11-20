/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
    if (!isObject(input) || !isObject(values)) {
      throw new Error("InvalidType");
    }
  
    function isObject(o) {
      return typeof o === "object" && o !== null && !Array.isArray(o);
    }
  
    function renderObject(obj) {
      return Object.entries(obj).map(([key, value]) => {
        if (isObject(value)) {
          return `<${key}>${renderObject(value)}</${key}>`;
        } else {
          const replacedValue = value.replace(
            /\${(.*?)}/g,
            (match, placeholder) => values[placeholder]
          );
          return `<${key}>${replacedValue}</${key}>`;
        }
      }).join('');
    }
  
    if (Object.keys(input).length === 0) {
      return "";
    }
  
    if (Object.keys(values).length === 0) {
      return renderObject(input);
    }
  
    return renderObject(input);
  }
  
  module.exports = {
    render
  };
  