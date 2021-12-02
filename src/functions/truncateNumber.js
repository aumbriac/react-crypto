import thousandsFormat from "./thousandsFormat"

const truncateNumber = num => {
    if (num >= 1000000000000) {
        num = thousandsFormat((num / 1000000000000).toFixed(1).replace(/\.0$/, '')) + 'Q'
    } else if (num >= 1000000000) {
        num = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'T'
    } else if (num >= 1000000) {
        num = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1000) {
        num = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num
}

export default truncateNumber