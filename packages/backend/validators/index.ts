function validator(data:any) {
    const error:any = {}
    const keys = Object.keys(data)

    keys.forEach(item => {
        if (!data[item]) {
            error[item] = `The ${item} field is required!`
        }
    })

    if ((keys.includes('password') && keys.includes('confirmPassword')) && (data.password !== data.confirmPassword)) {
        error.confirmPassword = `The confirm password doesn't math!`
    }

    return {
        isValid: Object.keys(error).length === 0,
        error
    }
}

export default validator