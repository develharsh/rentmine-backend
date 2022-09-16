const { ConnectionStates } = require("mongoose");
const { listeners } = require("../models/blog.model");
const blogModel = require("../models/blog.model");
// const mongoose = require("mongoose");

module.exports.add = async (req, res) => {
  try {
    req.body.slug = req.body.topic;
    const blog = await blogModel.create(req.body);
    // const subscriberModel = require("../models/subscriber.model");
    // const sendEmail = require("../utils/sendEmail");
    // const subscribers = await subscriberModel.find();
    // subscribers.forEach((sub) =>
    //   sendEmail("addBlog", {
    //     topic: blog.topic,
    //     slug: blog.slug,
    //     email: sub.email,
    //   })
    // );
    res.status(201).json({
      success: true,
      message: "Posted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.get = async (req, res) => {
  try {
    let pipeline = [],
      blogs = [],
      noOfPages = 0,
      itemsPerPage = 20,
      page = 1;
    if (req.query.page) page = req.query.page;
    if (req.query.tag)
      pipeline.push({ $match: { tags: { $in: [req.query.tag] } } });
    pipeline.push(
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          beforePaginate: [
            {
              $count: "count",
            },
          ],
          afterPaginate: [
            {
              $skip: itemsPerPage * (Number(page) - 1),
            },
            {
              $limit: itemsPerPage,
            },
          ],
        },
      }
    );
    const data = await blogModel.aggregate(pipeline);
    if (data.length) {
      blogs = data[0].afterPaginate;
      noOfPages = Math.ceil(
        parseFloat(data[0].beforePaginate[0].count) / itemsPerPage
      );
    }
    // console.log(noOfPages);
    res.status(200).json({
      success: true,
      message: "Fetched Blogs",
      blogs,
      noOfPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports.getBySlug = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ slug: req.params.slug });
    if (!blog) throw { message: "No Such Blog Found" };
    res.status(200).json({
      success: true,
      message: "Fetched Blog",
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
