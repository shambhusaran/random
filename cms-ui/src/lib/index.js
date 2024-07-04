export const storeData = (key, value, rememberUser = false)=>{
    rememberUser?localStorage.setItem(key, value): sessionStorage.setItem(key,value)
}

export const readFromStorage = (key)=>{
    return localStorage.getItem(key) || sessionStorage.getItem(key)
}
export const deleteFromStorage = (key)=>{
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
}
export const handleValidation=(formik, resp)=>{

 

    if (resp && "errors" in resp?.data) {

        
        // const {errors} = response.data
        // for(let k in errors){
        //   formik.setFieldError(k, errors[k])
        // }

        formik.setErrors(resp.data.errors);
      }

}

