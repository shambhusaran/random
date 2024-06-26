const moduleConfig  = {
    autoCreate : true,
    autoIndex : true,
    timestamps: true

}
const errorHandler = (err, next)=>{
    console.log(err)
    if (err.code == 11000){
        let errors = {}
        for(let k in err.keyValue){
             errors[k] = `Given ${k} is already in use`
           
        }

        return next({
            message: "unique key error occured",
            errors,
            status: 422
        })
    }

    console.log("=============")
    if('errors' in err){
        let errors = {};
        for(let k in err.errors){
            errors[k] = err.errors[k].properties.message
        }
        return next({
            message: "Validation error occured",
            errors,
            status: 422
        })
    }
    return next({
        message: "an error has occured",
        status: 400
    })

}
const validationHandler = (errors, next)=>{
    return next({
        message: 'Validation error occured',
        errors,
        status:422
    })
}

const notFoundErrorHandler = (name, next) =>{
    return next({
        message: `${name} not found`,
        status: 404
    })
}
module.exports = {moduleConfig, errorHandler, validationHandler, notFoundErrorHandler};