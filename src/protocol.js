export const protocolDefinition = {
  protocol: import.meta.env.VITE_PROTOCOL_URL,
  published: true,
  types: {
    sharedWorkouts: {
      schema: `https://schema.org/Fitbit/sharedWorkouts`,
      dataFormats: ["application/json"],
    },
  },
  structure: {
    sharedWorkouts: {
      $actions: [
        { who: "author", of: "sharedWorkouts", can: "write" },
        { who: "author", of: "sharedWorkouts", can: "write" },
        { who: "recipient", of: "sharedWorkouts", can: "read" },
      ],
    },
  },
};
