import mongoose from 'mongoose';

// 1. กำหนดโครงสร้างของ cached connection สำหรับ TypeScript
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. ขยาย Interface ของ global object เพื่อให้รู้จัก mongoose property
declare global {
  // ใช้ var เท่านั้นสำหรับ global augmentation
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.DBURL;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DBURL environment variable inside .env.local'
  );
}

/**
 * ในการทำงานแบบ Serverless หรือ Development mode ที่มีการ Hot Reload
 * เราจะเก็บ Connection ไว้ใน global variable เพื่อนำกลับมาใช้ใหม่ (Caching)
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default dbConnect;