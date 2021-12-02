const timeConverter = timestamp => {
    const date = new Date(timestamp)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = parseInt(date.getHours()) > 12 ? parseInt(date.getHours()) - 12 : date.getHours()
    const min = date.getMinutes()
    const amPm = date.getHours < 13 ? 'am' : 'pm'
    const time = `${month}/${day} ${hour}:${min}${amPm}`
    return time
}
export default timeConverter