//from https://github.com/mdn/webextensions-examples/blob/main/emoji-substitution/substitute.js

function replaceText(node) {
  function convertNum() {}
  // Setting textContent on a node removes all of its children and replaces
  // them with a single text node. Since we don't want to alter the DOM aside
  // from substituting text, we only substitute on single text nodes.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
  if (node.nodeType === Node.TEXT_NODE) {
    // This node only contains text.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType.

    // Skip textarea nodes due to the potential for accidental submission
    // of substituted emoji where none was intended.
    if (node.parentNode && node.parentNode.nodeName === "TEXTAREA") {
      return;
    }

    // Because DOM manipulation is slow, we don't want to keep setting
    // textContent after every replacement. Instead, manipulate a copy of
    // this string outside of the DOM and then perform the manipulation
    // once, at the end.
    let content = node.textContent;

    // Actually do the replacement / substitution.
    regex = new RegExp(/(\d{1,}\s?g)(?=[\s|.])/gi);

    content = content.replace(regex, function (x) {
      const num = x.replace(/[^0-9]/g, "");

      //gets the unit (tsp, tbsp, or cups) and the newNum (decided by the unit) in an object called result
      var result = (function () {
        if (num <= 8) return { convert: 4.2, unit: "tsp" };
        if (num <= 30) return { convert: 15, unit: "tbsp" };
        return { convert: 250, unit: "cups" };
      })();

      //find the fraction of whatever it is
      var newNum = (function () {
        let numInt = Math.floor(num / result.convert); //number integer

        let remainder = (num / result.convert) % 1;
        let fr = "";
        switch (true) {
          case remainder < 0.25:
            fr = "";
            break;
          case remainder < 0.75:
            fr = "1/2";
            break;
          default:
            numInt = numInt + 1;
        }
        return (numInt == 0 ? "" : numInt) + " " + fr;
      })();

      return x +" - "+newNum + " " + result.unit;
    });

    // Now that all the replacements are done, perform the DOM manipulation.
    node.textContent = content;
  } else {
    // This node contains more than just text, call replaceText() on each
    // of its children.
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }
  }
}

// Start the recursion from the body tag.
replaceText(document.body);

// Now monitor the DOM for additions and substitute emoji into new nodes.
// @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // This DOM change was new nodes being added. Run our substitution
      // algorithm on each newly added node.
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        replaceText(newNode);
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
