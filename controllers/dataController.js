"use strict";

const Leech = require("../models/leeches/leech");

exports.all_leeches_get = async (req, res) => {
    return await Leech.find({})
        .select("_id voteCount shopName cityTown districtArea")
        .sort({voteCount: -1})
        .exec();
};
