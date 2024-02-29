module.exports = {
  mutipleMongooseToObject: (mongooses) => {
    return mongooses.map((mongooses) => mongooses.toObject())
  },
  mongooseToObject: (mongooses) => {
    return mongooses ? mongooses.toObject() : mongooses
  },
}
