const  {authSecret} = require('../.env')
const passport = requi('passport')
const passportJwt = require('passport-jwt')
const {Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const params ={
        sercetOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const Strategy = new passportJwt.Strategy(params, (payload, done) => {
        app.db('users')
            .where({id: payload.id })
            .frist()
            .then(user => done(null, user ? {...payload} : false))
            .catch(err => done(err, false))
        })

        passport.user(Strategy)

        return {
            authenticate: () => passport.authenticate('jwt', {session: false})
        }
}