"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const check_wordpress_password_1 = require("check-wordpress-password");
async function wpCheckPassword(password, hash) {
    // 1. MD5 check (very old passwords, hash <= 32 chars)
    if (hash.length <= 32) {
        return hash === crypto_1.default.createHash('md5').update(password).digest('hex');
    }
    // 2. Password too long
    if (password.length > 4096) {
        return false;
    }
    // 3. $wp$ prefix — WordPress 6.8+ bcrypt with HMAC-SHA384
    if (hash.startsWith('$wp$')) {
        const hmac = crypto_1.default.createHmac('sha384', 'wp-sha384')
            .update(password)
            .digest(); // raw binary (true in PHP)
        const passwordToVerify = Buffer.from(hmac).toString('base64');
        const realHash = hash.substring(3); // strip "$wp"
        return await bcryptjs_1.default.compare(passwordToVerify, realHash);
    }
    // 4. $P$ prefix — phpass (old WordPress passwords)
    if (hash.startsWith('$P$')) {
        return (0, check_wordpress_password_1.checkPassword)(password, hash);
    }
    // 5. Fallback — plain bcrypt
    return await bcryptjs_1.default.compare(password, hash);
}
exports.default = wpCheckPassword;
