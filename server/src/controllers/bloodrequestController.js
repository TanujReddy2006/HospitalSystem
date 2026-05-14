const Hospital = require("../models/Hospital");
const BloodInventory = require("../models/BloodInventory");
const BloodRequest = require("../models/BloodRequest");


// CREATE BLOOD REQUEST
exports.createBloodRequest = async (req, res) => {

  try {

    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing"
      });
    }

    const {
      hospitalId,
      bloodGroup,
      units
    } = req.body;

    // REMOVE hospital validation because
    // login ID may not match Hospital collection ID

    // Find all hospitals with required blood stock
    const inventories = await BloodInventory.find({
      bloodGroup,
      units: { $gte: Number(units) }
    }).populate("hospitalId");
    

    // Remove requesting hospital itself
    const matchedHospitals = inventories.filter(
  item =>
    item.hospitalId &&
    item.hospitalId._id.toString() !== hospitalId
);

    if (matchedHospitals.length === 0) {

      return res.status(404).json({
        message: "No hospitals have required blood"
      });
    }
    console.log("Requesting Hospital:", hospitalId);

console.log(
  "Matched Hospitals:",
  matchedHospitals.map(
    item => item.hospitalId._id.toString()
  )
);

    // Create blood request
    const bloodRequest = await BloodRequest.create({

      requestedBy: hospitalId,

      bloodGroup,

      units: Number(units),

      targetHospitals: matchedHospitals.map(
        item => item.hospitalId._id
      ),

      status: "pending",

      expiresAt: new Date(
        Date.now() + 5 * 60 * 1000
      )
    });

    res.status(201).json({

      message: "Blood request sent successfully",

      bloodRequest
    });

  } catch (error) {

    console.error(
      "CREATE BLOOD REQUEST ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};



// GET INCOMING REQUEST
exports.getIncomingRequest = async (req, res) => {

  try {

    const hospitalId = req.query.hospitalId;

    console.log("Checking hospital:", hospitalId);

    const request = await BloodRequest.findOne({

  targetHospitals: {
    $in: [hospitalId]
  },

  status: "pending",

  expiresAt: {
    $gt: new Date()
  }

}).populate("requestedBy", "name");

    console.log("Incoming Request:", request);

    res.status(200).json({
      request
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch incoming request"
    });
  }
};


// ACCEPT BLOOD REQUEST
exports.acceptBloodRequest = async (req, res) => {

  try {

    const {
      requestId,
      hospitalId
    } = req.body;

    const request = await BloodRequest.findById(
      requestId
    );

    if (!request) {

      return res.status(404).json({
        message: "Request not found"
      });
    }

    if (request.status !== "pending") {

      return res.status(400).json({
        message: "Request already handled"
      });
    }

    if (new Date() > request.expiresAt) {

      request.status = "expired";

      await request.save();

      return res.status(400).json({
        message: "Request expired"
      });
    }

    // Accept request
    request.status = "accepted";

    request.acceptedBy = hospitalId;

    await request.save();

    // Automatically reduce inventory
    await BloodInventory.findOneAndUpdate(
      {
        hospitalId,
        bloodGroup: request.bloodGroup
      },
      {
        $inc: {
          units: -request.units
        }
      }
    );

    res.status(200).json({

      message: "Blood request accepted",

      request
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to accept request"
    });
  }
};
// GET MY REQUESTS
exports.getMyRequests = async (req, res) => {

  try {

    const { hospitalId } = req.params;

    const requests =
      await BloodRequest.find({

        requestedBy: hospitalId

      })

      .populate(
        "acceptedBy",
        "name address phone"
      )

      .sort({ createdAt: -1 });

    res.status(200).json({
      requests
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch requests"
    });
  }
};


// CANCEL REQUEST
exports.cancelRequest = async (req, res) => {

  try {

    const { requestId } = req.body;

    const request =
      await BloodRequest.findById(requestId);

    if (!request) {

      return res.status(404).json({
        message: "Request not found"
      });
    }

    request.status = "cancelled";

    await request.save();

    res.status(200).json({
      message: "Request cancelled"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to cancel request"
    });
  }
};
// GET REAL ROUTE
exports.getRoute = async (req, res) => {

  try {

    const requestId = req.query.requestId;

    const request = await BloodRequest.findById(
      requestId
    )

    .populate("requestedBy")
    .populate("acceptedBy");

    if (
      !request ||
      !request.requestedBy ||
      !request.acceptedBy
    ) {

      return res.status(404).json({
        message: "Route data not found"
      });
    }

    const source =
      request.acceptedBy.location.coordinates;

    const destination =
      request.requestedBy.location.coordinates;

    // MongoDB stores [lng, lat]
    const routeCoordinates = [

      [source[1], source[0]],

      [destination[1], destination[0]]

    ];

    res.status(200).json({
      routeCoordinates
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch route"
    });
  }
};