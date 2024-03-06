import * as middleware from './middleware.mjs'
import * as models from './models.mjs'
import bcrypt from 'bcrypt'
import fs from 'fs'

export const user_register = async (request, response) => {
  try {
    const { username, email, password } = request.body
    if (!username || !email || !password) {
      response.status(400).json({ error: 'Invalid data' })
      return
    }
    const instance_user = await models.User.findOne({ where: { email: email } })
    if (instance_user) {
      response.status(400).json({ error: "Email is used" })
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const saved_user = await models.User.create({
      username: username,
      email: email,
      password: hashedPassword,
    })
    response.status(200).json(saved_user)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(400).json({ error: error.message || 'Internal Server Error' })
  }
}

export const user_login = async (request, response) => {
  try {
    const { username, email, password } = request.body
    if (!username || !email || !password) {
      response.status(401).json({ error: 'Invalid data' })
      return
    }
    const user = await models.User.findOne({ where: { username: username, email: email }, raw: true })
    if (!user) {
      response.status(401).json({ error: 'Invalid data' })
      return
    }
    const password_match = await bcrypt.compare(password, user.password)
    if (!password_match) {
      response.status(401).json({ error: "Invalid data" })
      return
    }
    const token = middleware.generate_token_user(user.id)
    response.status(200).json({ token: token })
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const company_register = async (request, response) => {
  try {
    const { name, type, email, phone_number, login, password } = request.body
    if (!name || !email || !password || !phone_number || !login || !type) {
      response.status(400).json({ error: 'Invalid data' })
      return
    }
    const instance_company = await models.Company.findOne({ where: { email: email } })
    if (instance_company) {
      response.status(400).json({ error: "Data is used" })
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const saved_company = await models.Company.create({
      name: name,
      email: email,
      password: hashedPassword,
      login: login,
      phone_number: phone_number,
      type: type,
    })
    response.status(200).json(saved_company)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(400).json({ error: error.message || 'Internal Server Error' })
  }
}

export const company_login = async (request, response) => {
  try {
    const { login, password } = request.body
    if (!login || !password) {
      response.status(400).json({ error: 'Invalid data' })
      return
    }
    const company = await models.Company.findOne({ where: { login: login, }, raw: true })
    if (!company) {
      response.status(401).json({ error: 'Invalid data' })
      return
    }
    const password_match = await bcrypt.compare(password, company.password)
    if (!password_match) {
      response.status(404).json({ error: "Invalid data" })
      return
    }
    const token = middleware.generate_token_company(company.id)
    response.status(200).json({ token: token })
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const add_product = async (request, response) => {
  try {
    const { name, description, product_type, price } = request.body
    console.log(request.user.company_id)
    if (!name ||
      !description ||
      !product_type || !price ||
      typeof name !== 'string' ||
      typeof description !== 'string' ||
      typeof product_type !== 'number') {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const product = await models.Product.create({
      name: name,
      description: description,
      CompanyId: request.user.company_id,
      CategoryId: product_type,
      price: price
    })
    response.status(200).json(product)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const find_product = async (request, response) => {
  try {
    const { name } = request.body
    if (!name) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const data = await models.Product.findAll({
      where: { name: name },
      raw: true
    })
    response.status(200).json(data)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const filter_product = async (request, response) => {
  try {
    const { name, filter } = request.body
    if (!name || !category_id) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const add_to_basket = async (request, response) => {
  try {
    const { product_id } = request.body
    const user_id = request.user_id
    if (!product_id) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const product = await models.Product.findByPk(product_id)
    const cart = await models.Basket.findAll({ where: { product_id: product_id }, raw: true })
    if (!cart) {
      cart = await models.Basket.create({
        UsersId: user_id,
      })
    }
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const add_comment = async (request, response) => {
  try {
    const { text, product_id } = request.body
    const user_id = request.user_id
    if (!text) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const comment = await models.Comment.create({
      text: text,
      ProductsId: product_id,
      UsersId: user_id,
    })
    response.status(200).json(comment)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const product_info = async (request, response) => {
  try {
    const id = request.query.id
    if (!id) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const data = await models.Product.findAll({
      where: {
        id: id
      },
      include: models.Comment,
      order: [models.Comment, 'createdAt', 'ASC'],
      raw: true,
    })
    response.status(200).json(data)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const get_basket = async (request, response) => {
  try {
    const user_id = request.user_id
    const basket_data = await models.Basket.findAll({
      where: { UsersId: user_id },
      raw: true
    })
    response.status(200).json(basket_data)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

