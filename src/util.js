exports.findCommonRoot = function findCommonRoot(strs) {
  const shortest = strs.reduce((prev, current) => {
    return current.length < prev.length ? current : prev;
  }, strs[0]);

  let match = true;
  let matchIndex;
  for (matchIndex = 0; match && matchIndex < shortest.length; matchIndex++) {
    for (let j = 0; j < strs.length; j++) {
      if (strs[j][matchIndex] !== shortest[matchIndex]) {
        match = false;
        break;
      }
    }
  }

  return shortest.slice(0, matchIndex - 1);
};
