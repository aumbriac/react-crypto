const parseURL = string => {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
    return string.match(urlRegex)
}

export default parseURL