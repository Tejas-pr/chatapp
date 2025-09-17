import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "sdfsdlkfsdlkjfsdlkfjlsdkafj";
export const CORS_ORIGIN_FE = process.env.CORS_ORIGIN_FE || "http://localhost:3001";
export const PORT_BE = process.env.PORT_BE || 3001;


export const redisConnection = {
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT!),
};
