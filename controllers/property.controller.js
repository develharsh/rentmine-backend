const propertyModel = require("../models/property.model");
const validator = require("../utils/validator");
const { saveImages, deleteImages } = require("../services/s3");

module.exports.add = async (req, res) => {
  try {
    req.body.availableAmenities = JSON.parse(req.body.availableAmenities);
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
    if (!req.body.rentNegotiable)
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
    if (!req.body.bathroom) throw { message: "Bathroom is missing", code: 400 };
    if (!req.body.gym) throw { message: "Gym is missing", code: 400 };
    if (!req.body.nonVegAllowed)
      throw { message: "Non Veg Allowed, is missing", code: 400 };
    if (!req.body.gatedSecurity)
      throw { message: "Gated Security, is missing", code: 400 };
    if (!req.body.phone)
      throw { message: "Phone Number, is missing", code: 400 };
    if (!req.body.availableAmenities.lift)
      throw { message: "Lift has invalid value", code: 400 };
    if (!req.body.availableAmenities.internetServices)
      throw { message: "Internet Services has invalid value", code: 400 };
    if (!req.body.availableAmenities.airConditioner)
      throw { message: "Air Conditioner has invalid value", code: 400 };
    if (!req.body.availableAmenities.clubHouse)
      throw { message: "Club House has invalid value", code: 400 };
    if (!req.body.availableAmenities.interCom)
      throw { message: "interCom has invalid value", code: 400 };
    if (!req.body.availableAmenities.swimmingPool)
      throw { message: "swimmingPool has invalid value", code: 400 };
    if (!req.body.availableAmenities.childrenPlayArea)
      throw { message: "childrenPlayArea has invalid value", code: 400 };
    if (!req.body.availableAmenities.fireSafety)
      throw { message: "fireSafety has invalid value", code: 400 };
    if (!req.body.availableAmenities.servantRoom)
      throw { message: "servantRoom has invalid value", code: 400 };
    if (!req.body.availableAmenities.shoppingCenter)
      throw { message: "shoppingCenter has invalid value", code: 400 };
    if (!req.body.availableAmenities.gasPipeline)
      throw { message: "gasPipeline has invalid value", code: 400 };
    if (!req.body.availableAmenities.park)
      throw { message: "park has invalid value", code: 400 };
    if (!req.body.availableAmenities.rainWaterHarvesting)
      throw { message: "rainWaterHarvesting has invalid value", code: 400 };
    if (!req.body.availableAmenities.sewageTreatmentPlant)
      throw { message: "sewageTreatmentPlant has invalid value", code: 400 };
    if (!req.body.availableAmenities.houseKeeping)
      throw { message: "houseKeeping has invalid value", code: 400 };
    if (!req.body.availableAmenities.powerBackup)
      throw { message: "powerBackup has invalid value", code: 400 };
    if (!req.body.availableAmenities.visitorParking)
      throw { message: "visitorParking has invalid value", code: 400 };
    req.body.postedBy = req.user._id;
    req.body.approved = false;
    await propertyModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Successfully Posted, It will be live in 12 Hrs.",
    });
  } catch (error) {
    error.code = error.code ? error.code : 500;
    console.log(error, req.body.photos);
    if (req.body.photos?.length) deleteImages(req.body.photos);
    res.status(error.code).json({ success: false, message: error.message });
  }
};

module.exports.list = async (req, res) => {
  try {
    let matchObj = {};
    let query = [{ $match: matchObj }];
    if (req.query.apartmentType)
      matchObj["apartmentType"] = req.query.apartmentType;
    if (req.query.bhkType) matchObj["bhkType"] = req.query.bhkType;
    if (req.query.state) matchObj["state"] = req.query.state;
    if (req.query.city) matchObj["city"] = req.query.city;
    if (req.query.rent) matchObj["rent"] = { $lte: Number(req.query.rent) };
    if (req.query.availableFrom)
      matchObj["availableFrom"] = { $gte: req.query.availableFrom };
    if (req.query.furnishing) matchObj["furnishing"] = req.query.furnishing;
    console.log(req.query, JSON.stringify(query));
    const properties = await propertyModel.aggregate(query);
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    error.code = error.code ? error.code : 500;
    console.log(error);
    res.status(error.code).json({ success: false, message: error.message });
  }
};
