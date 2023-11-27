export const catchAsyncErrors=(passedFunction)=>(req,res,next)=>{
    Promise.resolve(passedFunction(req,res,next))
    .catch(next);   // catching the error and pass it to the next()
}