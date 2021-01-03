import { Product } from "../models/Product";
import express from "express";
import AWS from "aws-sdk";
import fs from 'fs';
import _ from 'lodash';
export const uploadImages = async (req: express.Request) => {
    const proFiles: any = req.files;
    let s3bucket = new AWS.S3({
        accessKeyId: process.env.awsKey,
        secretAccessKey: process.env.awsSecret
    });
    const fileDate: any = {
        'main_images': [], 'other_images': []
    };
    let i = 0
    for (const key in proFiles) {
        if (key === "main_images") {
            fileDate.main_images = await uploadFile(proFiles, key, s3bucket)
        } else {
            fileDate.other_images[i] = await uploadFile(proFiles, key, s3bucket)
            i++;
        }
    }
    return await fileDate;
}
const uploadFile = async (proFiles: any, key: any, s3bucket: any) => {
    let pImg = proFiles[key][0].originalname.split(".")
    const fileContent = fs.createReadStream(proFiles[key][0].path);
    let params: any = {
        Bucket: process.env.awsBucket,
        Key: `product/${proFiles[key][0].filename}.${pImg[pImg.length - 1]}`,
        Body: fileContent,
        ACL: 'public-read'
    };
    const promise = await new Promise(async (resolve, reject) => {
        s3bucket.upload(params, async function (err: any, data: any) {
            if (err) {
                reject('unable to upload Image');
            } else {
                resolve(data.Location);
            };
        });
    });
    return await promise;
}
export const addProduct = async (req: any, dataFiles: { main_images: string, other_images: [] }) => {
    const model = new Product(req.body);
    model.main_images = dataFiles.main_images;
    model.other_images = dataFiles.other_images.toString();
    model.offer.unit = req.body.offer_unit;
    model.offer.upto = req.body.offer_upto;
    model.reference = req.user._id;
    await model.save();
    return model;
}
export const getProducts = async (req: any) => {
    const page = _.isUndefined(req.params.page) ? 1 : req.params.page;
    const options = {
        sort: { createdAt: -1 },
        lean: true,
        page: page,               
        limit: 10,
        populate: [{ path: "category", select: 'name' }, { path: "subcategory", select: 'name' }]
    };
    return await Product.paginate({ status: 1 }, options);
};