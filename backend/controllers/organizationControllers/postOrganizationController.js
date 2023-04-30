const Organization = require("../../models/OrganizationModel");
const User = require("../../models/UserModel");

let postOrganizationController = async (req, res) => {
  try {
    console.log("GOT A post Organization REQUEST");

    const { creatorId, name, country } = req.body;

    let organizationDetails = { creatorId, name, country };
    console.log(organizationDetails);

    let organization = await Organization.create(organizationDetails);

    const updatedUser = await User.findByIdAndUpdate(
      { _id: creatorId },
      { $push: { organizationIds: organization._id.toString() } },
      { new: true }
    );
    console.log(organization);

    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      organizationIds: updatedUser.organizationIds,
    });
    // res.sendStatus(201);

    return;
    //
  } catch (err) {
    console.log(err);
    res.status(403).json({ success: false, message: err.message });
  }
};

module.exports = postOrganizationController;
