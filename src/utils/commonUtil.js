'use strict';

function logErrorAndResolve(resolve, err) {
  console.error(err);
  resolve(err);
}

exports.logErrorAndResolve = logErrorAndResolve;