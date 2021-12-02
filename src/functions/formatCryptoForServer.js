const formatCryptoForServer = s => {
    return s.toLowerCase().replaceAll(/[ ]/g, '-')
}
export default formatCryptoForServer