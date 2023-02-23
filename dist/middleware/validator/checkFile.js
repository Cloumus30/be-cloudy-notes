"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFile = void 0;
const checkFile = (fieldName) => {
    return (req, res, next) => {
        try {
            const check = fieldName in req.files;
            if (!check) {
                res.status(400).json({
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
            res.status(403).json({
                error: true,
                message: ` ⚠️ ${error.message}`,
            });
        }
    };
};
exports.checkFile = checkFile;
