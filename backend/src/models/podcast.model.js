const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  url: { type: String, required: true },
}, { _id: false });

const podcastSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  name: {
    type: String,
    required: [true, 'Podcast name is required'],
    trim: true,
  },
  sourceType: {
    type: String,
    enum: {
      values: ['rss', 'youtube', 'upload'],
      message: 'Source type must be either rss, youtube, or upload',
    },
    required: [true, 'Source type is required'],
    default: 'youtube'
  },
  sourceUrl: {
    type: String,
    default: null, // For rss/youtube
    trim: true,
  },
  file: {
    type: fileSchema,
    required: function () {
      return this.sourceType === 'upload';
    },
    default: null,
  },
  transcript: {
    type: String,
    default: null,
  },

  // Alternatively, if we want a reference:
  // transcript: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Transcript',
  //   default: null,
  // },

  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active',
  }
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      ret.podcastId = ret._id;
      delete ret._id;
      delete ret.id;
      delete ret.__v;
      return ret;
    },
  },
});

module.exports = mongoose.model('Podcast', podcastSchema);
