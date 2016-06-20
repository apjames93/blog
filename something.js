function newPromise() {
  return new Promise(function(resolve, reject){
    $.get('www.myapi.com/route')
    .then(function(whatIgotBack){
      resolve(whatIgotBack)
    })
  })
}

function myPromiseChain() {
  newPromise()
  .then(function(returnedItem){
    return nextPromise()
  })
  .then(function(stuffFromLastPromise){

  })
}
