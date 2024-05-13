"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../model/shortUrl");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        const urlFound = yield shortUrl_1.urlModel.find({
            fullUrl
        });
        if (urlFound.length > 0) {
            res.status(409).send(urlFound);
        }
        else {
            const shortUrl = yield shortUrl_1.urlModel.create({
                fullUrl
            });
            res.status(201).send(shortUrl);
        }
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong" });
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlFound = yield shortUrl_1.urlModel.find();
        if (urlFound.length > 0) {
            res.status(201).send(urlFound);
        }
        else {
            res.status(404).send({
                message: "Short Urls not found"
            });
        }
    }
    catch (error) {
        res.status(500).send({ "message": "something went wrong" });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const urlFound = yield shortUrl_1.urlModel.findOne({ shortUrl: id });
        if (urlFound) {
            urlFound.clicks++;
            urlFound.save();
            res.redirect(`${urlFound.fullUrl}`);
            // res.status(201).send(urlFound);
        }
        else {
            res.status(404).send({
                message: "Short Urls not found"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const urlFound = yield shortUrl_1.urlModel.findOne({ shortUrl: id });
        if (urlFound) {
            const deleted = yield shortUrl_1.urlModel.findByIdAndDelete(urlFound._id);
            if (deleted) {
                res.status(201).send({ message: "URL deleted successfully" });
            }
            else {
                res.status(404).send({
                    message: "Short Urls not found"
                });
            }
        }
        else {
            res.status(404).send({
                message: "Short Urls not found"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUrl = deleteUrl;
