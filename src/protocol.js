export const protocolDefinition = {
    "protocol": "http://localhost:5173",
    "published": true,
    "types": {
      "Fitbit": {
        "schema": "http://localhost:5173/Fitbit",
        "dataFormats": ["application/json"]
      },
      "NutriFit": {
        "schema": "http://localhost:5173/NutriFit",
        "dataFormats": ["application/json"]
      },
    },
    "structure": {
      "FitBit": {
        "$actions": [
          { "who": "anyone", "can": "read" },
        ]
      },
      "NutriFit": {
        "$actions": [
          { "who": "anyone", "can": "read" },
        ]
      },
    }
  }