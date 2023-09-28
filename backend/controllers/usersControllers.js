const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registerUser = asyncHandler(async (req, res) => {

    //desestructuramos los datos que pasamos del body
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    //verificamos si ese usuario existe
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('Ese usuario ya fué registrado en la aplicación')
    }

    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creamos el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //si se creó correctamente, muestra los datos, de lo contrario manda mensaje de error
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudo registrar al usuario')
    }

})

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Login Usuario' })
})

const getUserData = asyncHandler(async (req, res) => {
    res.json({ message: 'Datos del usuario' })
})

module.exports = {
    registerUser,
    loginUser,
    getUserData
}