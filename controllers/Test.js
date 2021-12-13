/**
 * Test controller
 * 
 * @author Grotius Cendikia Hasiholan <grotius.hasiholan@gmail.com>
 * for testing only :D
 */

module.exports = {
    loginResult: (req, res) => {
        try {
            res.status(200).send(
                { msg: 'Login Success!!' }
            )
        } catch (error) {
            res.status(500).send(
                { msg: 'Login failed!!' }
            )
        }
    },
    whoami: (req, res) => {
        res.status(200).json(req.user.dataValues)
        // try {
        //     res.status(200).json(req.user.dataValues)
        // } catch (error) {
        //     res.status(500).json(
        //         { msg: 'whoami method in authController is error' }
        //     )
        // }
    }
}