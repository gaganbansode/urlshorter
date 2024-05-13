import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (req: express.Request,
    res: express.Response) => {
    try {
        const { fullUrl } = req.body;
        const urlFound = await urlModel.find({
            fullUrl
        });
        if (urlFound.length > 0) {
            res.status(409).send(urlFound)
            
        } else {
            const shortUrl = await urlModel.create({
                fullUrl
            })
            res.status(201).send(shortUrl);
        }

    } catch (error) {
        res.status(500).send({ message: "something went wrong" });
    }
};

export const getAllUrl = async (req: express.Request,
    res: express.Response) => {
    
    try {
        const urlFound = await urlModel.find();
        if (urlFound.length > 0) {
            res.status(201).send(urlFound);
        } else {
            res.status(404).send({
                message:"Short Urls not found"
            });
        }
        
    } catch (error) {
        res.status(500).send({ "message": "something went wrong" })
    }
    
};

export const getUrl = async (req: express.Request,
    res: express.Response) => {
    try {
        const { id } = req.params;
         const urlFound = await urlModel.findOne({shortUrl:id});
        if (urlFound) {
            urlFound.clicks++;
            urlFound.save();
            res.redirect(`${urlFound.fullUrl}`);

            // res.status(201).send(urlFound);
        } else {
            res.status(404).send({
                message:"Short Urls not found"
            });
        }
    } catch (error) {
        console.log(error)
    }
    
};

export const deleteUrl = async (req: express.Request,
    res: express.Response) => {
    try {
        const { id } = req.params;
        const urlFound = await urlModel.findOne({ shortUrl: id });
         if (urlFound) {
             const deleted = await urlModel.findByIdAndDelete(urlFound._id);
             if (deleted) {
                 res.status(201).send({message:"URL deleted successfully"});
             } else {
                 res.status(404).send({
                message:"Short Urls not found"
            });
             }
        } else {
            res.status(404).send({
                message:"Short Urls not found"
            });
        }
    } catch (error) {
        console.log(error)
    }
};