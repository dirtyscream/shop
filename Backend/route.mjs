import express from 'express'
import * as handler from './handlers.mjs'
import * as middleware from "./middleware.mjs"

export const router = express.Router()
router.use(middleware.logging)

router.post('/api/user_register', handler.user_register)
router.post('/api/user_login', handler.user_login)
router.post('/api/company_register', handler.company_register)
router.post('/api/company_login', handler.company_login)
router.post('/api/add_product', middleware.verify_company, handler.add_product)
router.post('/api/add_to_basket', middleware.verify_user, handler.add_to_basket)
router.post('/api/add_comment', middleware.verify_user, handler.add_comment)
router.post('/api/product_info', middleware.verify_user, handler.product_info) // info?id=id
router.get('/api/get_basket', middleware.verify_user, handler.get_basket)

