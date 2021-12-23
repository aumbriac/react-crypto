const stripURL = string => {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
    return string.replace(urlRegex, '')
}

export default stripURL