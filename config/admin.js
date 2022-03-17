module.exports = milewaare => {
    return (req, res, next) => {
        if(req.user.admin) {
            milewaare(req, res, next)
        } else {
            res.status(401).sen('Usuário não é um administrador.')
        }
    }
}