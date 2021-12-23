const stripTags = string => {
    return string.replace(/(<([^>]+)>)/gi, "")
}

export default stripTags