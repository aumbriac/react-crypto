const formatCryptoForClient = s => {
    return s.toUpperCase().replaceAll(/[-.]/g, ' ')
}
export default formatCryptoForClient