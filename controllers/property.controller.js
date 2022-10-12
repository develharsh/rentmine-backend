const propertyModel = require("../models/property.model");
const validator = require("../utils/validator");
const { saveImages } = require("../services/s3");

module.exports.add = async (req, res) => {
  try {
    req.body.photos = await saveImages(
      req.body.photos,
      req.user._id.toString(),
      "properties"
    );
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
    if (!req.body.phone)
      throw { message: "Phone Number, is missing", code: 400 };
    if (typeof req.body.availableAmenities.lift != "boolean")
      throw { message: "Lift has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.internetServices != "boolean")
      throw { message: "Internet Services has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.airConditioner != "boolean")
      throw { message: "Air Conditioner has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.clubHouse != "boolean")
      throw { message: "Club House has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.interCom != "boolean")
      throw { message: "interCom has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.swimmingPool != "boolean")
      throw { message: "swimmingPool has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.childrenPlayArea != "boolean")
      throw { message: "childrenPlayArea has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.fireSafety != "boolean")
      throw { message: "fireSafety has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.servantRoom != "boolean")
      throw { message: "servantRoom has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.shoppingCenter != "boolean")
      throw { message: "shoppingCenter has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.gasPipeline != "boolean")
      throw { message: "gasPipeline has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.park != "boolean")
      throw { message: "park has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.rainWaterHarvesting != "boolean")
      throw { message: "rainWaterHarvesting has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.sewageTreatmentPlant != "boolean")
      throw { message: "sewageTreatmentPlant has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.houseKeeping != "boolean")
      throw { message: "houseKeeping has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.powerBackup != "boolean")
      throw { message: "powerBackup has invalid value", code: 400 };
    if (typeof req.body.availableAmenities.visitorParking != "boolean")
      throw { message: "visitorParking has invalid value", code: 400 };
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
