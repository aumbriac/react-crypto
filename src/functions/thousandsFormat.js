const thousandsFormat = num => {
    if (parseInt(num) > 999)
        return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    return num
}
export default thousandsFormat