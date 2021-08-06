const mongoose = require("mongoose");
const timeDailyArchive = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    ts: {
      type: Date
    },
    avgTime: {
      type: Number
    },
    totalVisits: {
      type: Number
    },
    totalPosts: {
      type: Number
    },
    avgWordsPost: {
      type: Number
    },
    publishedPosts: {
      type: Number
    },
    posts: {
      type: String
    },
    visitsByHour: {
      type: String
    },
    countries: {
      type: String
    },
    langs: {
      type: String
    },
    browsers: {
      type: String
    },
    os: {
      type: String
    },
    mobile: {
      type: Number
    },
    tablet: {
      type: Number
    },
    desktop: {
      type: Number
    },
    referers: {
      type: String
    },
    byDirect: {
      type: Number
    },
    bySearch: {
      type: Number
    },
    bySocial: {
      type: Number
    },
    byEmail: {
      type: Number
    },
    byPaid: {
      type: Number
    },
    byInternal: {
      type: Number
    },
    byOther: {
      type: Number
    },
    utmSource: {
      type: String
    },
    utmMedium: {
      type: String
    },
    utmCampaign: {
      type: String
    },
    utmTerm: {
      type: String
    },
    utmContent: {
      type: String
    },
    queries: {
      type: String
    },
    search: {
      type: String
    },
    social: {
      type: String
    },
    paid: {
      type: String
    },
    email: {
      type: String
    },
    otherRefs: {
      type: String
    },
    archived: {
      type: Date
    }
  },
  {
    collection: "time_daily_archive"
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
timeDailyArchive.index({ blog: 1, ts: 1 });

if (!timeDailyArchive.options.toObject) {
  timeDailyArchive.options.toObject = {};
}
timeDailyArchive.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(" ").forEach(prop => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model("timeDailyArchive", timeDailyArchive);
