const { MongoClient } = require('mongodb');
const student = require('./config/student');
// DNS tùy chọn cho mạng không phân giải được SRV Atlas.
if (process.env.MONGODB_DNS_SERVERS) {
  require('node:dns').setServers(process.env.MONGODB_DNS_SERVERS.split(',').map(value => value.trim()).filter(Boolean));
}
function createClient(kind) {
  const host = process.env.MONGODB_HOST;
  const username = process.env['MONGODB_' + kind + '_USERNAME'];
  const password = process.env['MONGODB_' + kind + '_PASSWORD'];
  if (!host || !username || !password) throw new Error('Thiếu cấu hình kết nối ' + kind + ' trong .env');
  return new MongoClient('mongodb+srv://' + host + '/?appName=Books23IT033', {
    auth: { username, password }, authSource: 'admin', serverSelectionTimeoutMS: 10000,
  });
}
async function connectDatabase() {
  const readClient = createClient('READ');
  const writeClient = createClient('WRITE');
  try {
    await Promise.all([readClient.connect(), writeClient.connect()]);
    const readers = readClient.db(student.databaseName).collection('books');
    const writers = writeClient.db(student.databaseName).collection('books');
    return {
      list: () => readers.find({}).sort({ _id: -1 }).limit(100).toArray(),
      add: (book) => writers.insertOne(book),
      close: () => Promise.all([readClient.close(), writeClient.close()]),
    };
  } catch (error) {
    await Promise.allSettled([readClient.close(), writeClient.close()]);
    throw error;
  }
}
module.exports = { connectDatabase, createClient };
