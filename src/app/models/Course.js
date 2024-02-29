const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        description: { type: String, maxlength: 20000 },
        image: { type: String },
        videoID: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name' },
        deletedAt: { type: Date },
    },
    {
        _id: false,
        timestamps: true,
    }
)

// Custom query helpers
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        })
    }
    return this
}

// Add plugins

Course.plugin(AutoIncrement)
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' })
mongoose.plugin(slug)

module.exports = mongoose.model('Course', Course)
