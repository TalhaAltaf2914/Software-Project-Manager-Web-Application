const Organization = require("../../models/OrganizationModel");

let getOrganizationController = async (req, res) => {
  try {
    console.log("GOT A get Organization REQUEST");
    const { organizationIds } = req.query;
    // console.log(req);
    console.log(organizationIds);
    let organizations = await Organization.find({
      _id: {
        $in: organizationIds,
      },
    });

    console.log(organizations);

    res.json({ organizations });
  } catch (err) {
    console.log(err);
    res.status(403).json({ success: false, message: err.message });
  }
};

module.exports = getOrganizationController;
