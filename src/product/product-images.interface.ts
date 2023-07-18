import { Express } from 'express'


export interface IProductMedia {
  previewImage: Express.Multer.File[];
  images: Express.Multer.File[]
}