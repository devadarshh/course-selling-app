import 'dotenv/config'

export const JWT_USER_SECRET = process.env.JWT_SECRET || 'user_jwt_secret'
export const JWT_ADMIN_SECRET = process.env.JWT_SECRET || 'admin_jwt_secret'