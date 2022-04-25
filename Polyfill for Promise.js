// Create a new function 
const customPromise = function(executor) {
    let isCalled = false,
        result, onResolve, isFulfilled = false,
        error, onReject, isRejected = false;

    // we need a resolve method which will be executed when promise is resolved
    function resolve(successResponse) {
        // Once promise resolves, isFulfilled will be set to true indicating promise is resolved
        isFulfilled = true;

        // We will save the response in 'result'
        result = successResponse;

        // This condition is required to ensure onResolve handler is executed for 
        // promises which are resolved directly (no async operation, directly calling resolve())
        // Verify onResolve is a thenHandler (a function) and ensure is it not called before
        if(typeof onResolve === "function" && !isCalled)
        {
            // Execute then handler with response of promise
            onResolve(successResponse);

            // set isCalled to true indicating the promise has been resolved.
            isCalled = true;   
        }    
    }

    // then method is required in order to resolve a promise. this method takes a callback (thenHandler)
    // thenHandler will contain logic to execute on promise resolve
    this.then = function(thenHandler) {
        // Save thenHandler in 'onResolve'
        onResolve = thenHandler;   

        // Verify that promise has been fulfilled and it is not resolved yet
        if(isFulfilled && !isCalled)
        {
            // Execute then handler with response of promise
            onResolve(result);

            // set isCalled to true indicating the promise has been resolved.
            isCalled = true;  
        }

        // Need to return 'this' due to promise chaining
        return this;
    }

    // we need a reject method which will be executed when reject is resolved
    function reject(errorResponse) {
        // We will save the errorResponse in 'error'
        error = errorResponse;

        // Once promise rejects, isRejected will be set to true indicating promise is rejected
        isRejected = true;

        // This condition is required to ensure onReject handler is executed for 
        // promises which are rejected directly (no async operation, directly calling reject())
        // Verify onReject is a thenHandler (a function) and ensure is it not called before
        if(typeof onReject === "function" && !isCalled)
        {
            // Execute catch handler with error of promise
            onReject(errorResponse);

            // set isCalled to true indicating the promise has been rejected.
            isCalled = true;
        }
    }

    this.catch = function (catchHandler) {
        // Save catchHandler in 'onReject'
        onReject = catchHandler;

        // Verify that promise has been rejected and catch handler has not been executed yet
        if(!isCalled && isRejected)
        {
            // Execute catch handler with error of promise
            onReject(error);

            // set isCalled to true indicating the promise has been rejected.
            isCalled = true;
        }

        // Need to return 'this' due to promise chaining
        return this;
    }
    executor(resolve, reject);
}



const p1 = new customPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success")
    }, 500);
})

const p2 = new customPromise((resolve, reject) => {
    setTimeout(() => {
        reject("Error")
    }, 500);
})

const p3 = new customPromise((resolve, reject) => {
    resolve("Success")
})

const p4 = new customPromise((resolve, reject) => {
     reject("Error")
})

p1.then((data) => { 
  console.log("P1 resolved with " + data); 
})

p2.catch(err => {
  console.log("P2 rejected with " + err)
})

p3.then((data) => { 
  console.log("P3 resolved with " + data); 
})

p4.catch(err => {
  console.log("P4 rejected with " + err)
})
