import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import {checkPassword} from 'check-wordpress-password';

async function wpCheckPassword(password: string, hash: string): Promise<boolean> {
  
  // 1. MD5 check (very old passwords, hash <= 32 chars)
  if (hash.length <= 32) {
    return hash === crypto.createHash('md5').update(password).digest('hex');
  }

  // 2. Password too long
  if (password.length > 4096) {
    return false;
  }

  // 3. $wp$ prefix — WordPress 6.8+ bcrypt with HMAC-SHA384
  if (hash.startsWith('$wp$')) {
    const hmac = crypto.createHmac('sha384', 'wp-sha384')
      .update(password)
      .digest(); // raw binary (true in PHP)
    const passwordToVerify = Buffer.from(hmac).toString('base64');
    const realHash = hash.substring(3); // strip "$wp"
    return await bcrypt.compare(passwordToVerify, realHash);
  }

  // 4. $P$ prefix — phpass (old WordPress passwords)
  if (hash.startsWith('$P$')) {
    return checkPassword(password, hash);
  }

  // 5. Fallback — plain bcrypt
  return await bcrypt.compare(password, hash);
}

export default wpCheckPassword;