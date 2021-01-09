// config.js
export default {
  bucket: {
    slug: process.env.COSMIC_BUCKET_SLUG || 'cosmicapp-react-chat',
    type_slug: 'messages',
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  },
  server: {
    host: process.env.APP_URL || 'http://localhost:3000'
  }
}
