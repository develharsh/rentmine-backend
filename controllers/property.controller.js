const propertyModel = require("../models/property.model");
const validator = require("../utils/validator");

module.exports.add = async (req, res) => {
  try {
    if (!req.body.apartmentType)
      throw { message: "Apartment Type is missing", code: 400 };
    if (!req.body.bhkType) throw { message: "BHK Type is missing", code: 400 };
    if (!req.body.floor) throw { message: "Floor is missing", code: 400 };
    if (!req.body.totalFloor)
      throw { message: "Total Floor is missing", code: 400 };
    if (!req.body.propertyAge)
      throw { message: "Property Age is missing", code: 400 };
    if (!req.body.billUpArea)
      throw { message: "Bill Up Area is missing", code: 400 };
    if (!req.body.state) throw { message: "State is missing", code: 400 };
    if (!req.body.city) throw { message: "City is missing", code: 400 };
    if (!req.body.locality) throw { message: "Locality is missing", code: 400 };
    if (!req.body.landmark) throw { message: "Landmark is missing", code: 400 };
    if (!req.body.rent) throw { message: "Rent is missing", code: 400 };
    if (!req.body.deposit) throw { message: "Deposit is missing", code: 400 };
    if (typeof req.body.rentNegotiable != "boolean")
      throw { message: "Rent Negotiable is missing", code: 400 };
    if (!validator.monthlyMaintenanceEnum.includes(req.body.monthlyMaintenance))
      throw { message: "Monthly Maintenance is missing", code: 400 };
    if (
      req.body.monthlyMaintenance == "Maintenance Extra" &&
      !req.body.maintenanceAmount
    )
      throw { message: "Maintenance Amount is missing", code: 400 };
    if (!req.body.availableFrom)
      throw { message: "Available From is missing", code: 400 };
    if (!req.body.preferredTenant)
      throw { message: "Preferred Tenant is missing", code: 400 };
    if (!req.body.furnishing)
      throw { message: "Furnishing is missing", code: 400 };
    if (!req.body.parking) throw { message: "Parking is missing", code: 400 };
    if (typeof req.body.bathroom != "number")
      throw { message: "Bathroom is missing", code: 400 };
    if (typeof req.body.gym != "boolean")
      throw { message: "Gym is missing", code: 400 };
    if (typeof req.body.nonVegAllowed != "boolean")
      throw { message: "Non Veg Allowed, is missing", code: 400 };
    if (typeof req.body.gatedSecurity != "boolean")
      throw { message: "Gated Security, is missing", code: 400 };
    if (!req.body.whoWillShowProperty)
      throw { message: "Who will Show Propery, is missing", code: 400 };
    if (!req.body.yourAvailability?.days)
      throw { message: "Your Availability Days, is missing", code: 400 };
    if (typeof req.body.yourAvailability?.allday != "boolean")
      throw { message: "Your Availability Time is missing", code: 400 };
    if (req.body.yourAvailability?.allday == false) {
      if (!req.body.yourAvailability?.startTime)
        throw { message: "Your Availability Start Time is missing", code: 400 };
      if (!req.body.yourAvailability?.endTime)
        throw { message: "Your Availability End Time is missing", code: 400 };
    }
    req.body.postedBy = req.user._id;
    req.body.approved = false;
    await propertyModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Successfully Posted, It will be live in 12 Hrs.",
    });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ success: false, message: error.message });
  }
};
