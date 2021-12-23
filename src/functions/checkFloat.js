const checkFloat = float => {
    if (parseInt(float) > 1)
        return float
    float = float.toString()
    for (let i = 0; i < float.length; i++) {
        if (float[i] !== '0' && float[i] !== '.') {
            return (parseFloat(float).toFixed(i))
        }
    }
}
export default checkFloat