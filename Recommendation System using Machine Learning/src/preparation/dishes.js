import natural from 'natural';

natural.PorterStemmer.attach();

function prepareDishes(dishMetaData, dishKeywords) {
 
  let DISH_IN_LIST = zip(dishMetaData, dishKeywords);

  // Keep a map of dishs for later reference
  let DISHES_BY_ID = DISH_IN_LIST.reduce(byId, {});

  let DICTIONARIES = prepareDictionaries(DISH_IN_LIST);

  let X = DISH_IN_LIST.map(toFeaturizedDishes(DICTIONARIES));

  let { means, ranges } = getCoefficients(X);

  X = synthesizeFeatures(X, means, [0, 1, 2, 3, 4, 5, 6]);

  X = scaleFeatures(X, means, ranges);

  return {
    DISHES_BY_ID,
    DISH_IN_LIST,
    X,
  };
}

export function byId(dishsById, dish) {
  dishsById[dish.id] = dish;
  return dishsById;
}

export function prepareDictionaries(dishs) {
  let keywordsDictionary = toDictionary(dishs, 'keywords');
  keywordsDictionary = filterByThreshold(keywordsDictionary, 150);
  
  return {
    keywordsDictionary,
  };
}

export function scaleFeatures(X, means, ranges) {
  return X.map((row) => {
    return row.map((feature, key) => {
      return (feature - means[key]) / ranges[key];
    });
  });
};

export function synthesizeFeatures(X, means, featureIndexes) {
  return X.map((row) => {
    return row.map((feature, key) => {
      if (featureIndexes.includes(key) && feature === 'undefined') {
        return means[key];
      } else {
        return feature;
      }
    });
  });
}

export function getCoefficients(X) {
  const M = X.length;

  const initC = {
    sums: [],
    mins: [],
    maxs: [],
  };

  const helperC = X.reduce((result, row) => {
    if (row.includes('undefined')) {
      return result;
    }

    return {
      sums: row.map((feature, key) => {
        if (result.sums[key]) {
          return result.sums[key] + feature;
        } else {
          return feature;
        }
      }),
      mins: row.map((feature, key) => {
        if (result.mins[key] === 'undefined') {
          return result.mins[key];
        }

        if (result.mins[key] <= feature) {
          return result.mins[key];
        } else {
          return feature;
        }
      }),
      maxs: row.map((feature, key) => {
        if (result.maxs[key] === 'undefined') {
          return result.maxs[key];
        }

        if (result.maxs[key] >= feature) {
          return result.maxs[key];
        } else {
          return feature;
        }
      }),
    };
  }, initC);

  const means = helperC.sums.map(value => value / M);
  const ranges =  helperC.mins.map((value, key) => helperC.maxs[key] - value);

  return { ranges, means };
}

export function toFeaturizedDishes(dictionaries) {
  return function toFeatureVector(dish) {
    const featureVector = [];

    featureVector.push(toFeaturizedNumber(dish, 'price'));
    featureVector.push(toFeaturizedNumber(dish, 'popularity'));
    featureVector.push(toFeaturizedNumber(dish, 'cookingtime'));
    featureVector.push(toFeaturizedNumber(dish, 'voteAverage'));
    featureVector.push(toFeaturizedNumber(dish, 'voteCount'));

    featureVector.push(toFeaturizedAvailable(dish));
    featureVector.push(toFeaturizedSpicy(dish));
    featureVector.push(toFeaturizedHotness(dish));

    featureVector.push(...toFeaturizedFromDictionary(dish, dictionaries.keywordsDictionary, 'keywords'));

    return featureVector;
  }
}

export function toFeaturizedRelease(dish) {
  return dish.release ? Number((dish.release).slice(0, 4)) : 'undefined';
}

export function toFeaturizedAvailable(dish) {
  return dish.available === 'no' ? 0 : 1;
}

export function toFeaturizedSpicy(dish) {
  if (dish.spicy === 'mild') {
    return 2;
  }
  if (dish.spicy === 'medium'){
    return 4;
  }
  
  if (dish.spicy === 'more'){
    return 6
  }

  if (dish.spicy === 'extra'){
    return 10
  }

  if (dish.spicy === 'sweet') {
    return 8
  }
}

export function toFeaturizedHotness(dish) {
  return dish.hotness === 'hot' ? 1 : 0;
}

export function toFeaturizedFromDictionary(dish, dictionary, property) {
  // Fallback, because not all dishs have associated keywords
  const propertyIds = (dish[property] || []).map(value => value.id);
  const isIncluded = (value) => propertyIds.includes(value.id) ? 1 : 0;
  return dictionary.map(isIncluded);
}

export function toFeaturizedNumber(dish, property) {
  const number = Number(dish[property]);

  // Fallback for NaN
  if (number > 0 || number === 0) {
    return number;
  } else {
    return 'undefined';
  }
}

export function fromArrayToMap(array, property) {
  return array.map((value) => {
    const transformed = value[property].map((value) => ({
      id: value,
      name: value,
    }));

    return { ...value, [property]: transformed };
  });
}

export function withTokenizedAndStemmed(array, property) {
  return array.map((value) => ({
    ...value,
    [property]: value[property].tokenizeAndStem(),
  }));
}

export function filterByThreshold(dictionary, threshold) {
  return Object.keys(dictionary)
    .filter(key => dictionary[key].count > threshold)
    .map(key => dictionary[key]);
}

export function toDictionary(array, property) {
  const dictionary = {};

  array.forEach((value) => {
    // Fallback for null value after refactoring
    (value[property] || []).forEach((innerValue) => {
      if (!dictionary[innerValue.id]) {
        dictionary[innerValue.id] = {
          ...innerValue,
          count: 1,
        };
      } else {
        dictionary[innerValue.id] = {
          ...dictionary[innerValue.id],
          count: dictionary[innerValue.id].count + 1,
        }
      }
    });
  });

  return dictionary;
}


export function zip(dishs, keywords) {
  return Object.keys(dishs).map(mId => ({
    ...dishs[mId],
    ...keywords[mId],
  }));
}

export default prepareDishes;