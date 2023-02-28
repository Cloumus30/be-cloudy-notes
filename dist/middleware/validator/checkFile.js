"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFile = void 0;
const checkFile = (fieldName) => {
    return (req, res, next) => {
        try {
            if (!req.files) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: " ⚠️ Required File",
                            param: fieldName,
                            location: "files"
                        }
                    ]
                });
            }
            const check = fieldName in req.files;
            if (!check) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: " ⚠️ Required File",
                            param: fieldName,
                            location: "files"
                        }
                    ]
                });
            }
            next();
        }
        catch (error) {
            console.log('⚠️ ' + error);
            return res.status(403).json({
                error: true,
                message: ` ⚠️ ${error.message}`,
            });
        }
    };
};
exports.checkFile = checkFile;
