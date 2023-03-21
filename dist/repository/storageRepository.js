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
const supabase_js_1 = require("@supabase/supabase-js");
const response_1 = require("../config/response");
class StorageRepository {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    }
    createBucket(nameBucket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield this.supabase.storage.createBucket(nameBucket);
                if (error) {
                    throw new Error(error.message);
                }
                return (0, response_1.successSaveRepo)(data);
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    listBucket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield this.supabase.storage.listBuckets();
                if (error) {
                    return (0, response_1.failedRepo)(error.message);
                }
                return (0, response_1.successGetRepo)(data);
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    detailBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield this.supabase.storage.getBucket(bucketName);
                if (error) {
                    return (0, response_1.failedRepo)(error.message);
                }
                return (0, response_1.successGetRepo)(data);
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    deleteBucket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const data = await this.supabase.storage.deleteBucket()
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
}
exports.default = StorageRepository;
