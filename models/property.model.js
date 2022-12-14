const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    apartmentType: String,
    bhkType: String,
    floor: String,
    totalFloor: String,
    propertyAge: String,
    facing: String,
    billUpArea: String,
    state: String,
    city: String,
    locality: String,
    landmark: String,
    rent: Number,
    deposit: Number,
    rentNegotiable: Boolean,
    monthlyMaintenance: String,
    maintenanceAmount: Number,
    availableFrom: Date,
    preferredTenant: String,
    furnishing: String,
    parking: String,
    description: String,
    bathroom: Number,
    balcony: Number,
    waterSupply: String,
    gym: Boolean,
    nonVegAllowed: Boolean,
    gatedSecurity: Boolean,
    phone: String,
    availableAmenities: {
      lift: Boolean,
      internetServices: Boolean,
      airConditioner: Boolean,
      clubHouse: Boolean,
      interCom: Boolean,
      swimmingPool: Boolean,
      childrenPlayArea: Boolean,
      fireSafety: Boolean,
      servantRoom: Boolean,
      shoppingCenter: Boolean,
      gasPipeline: Boolean,
      park: Boolean,
      rainWaterHarvesting: Boolean,
      sewageTreatmentPlant: Boolean,
      houseKeeping: Boolean,
      powerBackup: Boolean,
      visitorParking: Boolean,
    },
    photos: Array,
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    approved: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
