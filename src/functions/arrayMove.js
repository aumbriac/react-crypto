const arrayMove = (arr, oldIdx, newIdx) => {
    if (newIdx < arr.length) {
        arr.splice(newIdx, 0, arr.splice(oldIdx, 1)[0])
        return arr
    }
}
export default arrayMove