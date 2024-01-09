const protocolDefinition = 
{
    "protocol": "https://user.com",
    "published": true,
    "types": {
        "fitbit": {
            "schema": "https://schema.org/user/fitbit",
            "dataFormats": ["application/json"]
        },
        "userworkout": {
            "schema": "https://schema.org/user/userworkout",
            "dataFormats": ["application/json"]
        },
        "workout": {
            "schema": "https://schema.org/user/workouts",
            "dataFormats": ["application/json"]
        },
        "exercise": {
            "schema": "https://schema.org/user/exercise",
            "dataFormats": ["application/json"]
        }
    },
    "structure": {
        "fitbit": {
            "$globalRole": true,
            "$actions": [
                {
                    "who": "anyone",
                    "can": "write"
                },
                {
                    "who": "anyone",
                    "can": "read"
                }
            ]
        },
        "userworkout": {
            "workout": {
                "exercise": {
                    "$actions": [
                        {
                            "who": "recipient",
                            "of": "workout",
                            "can": "write"
                        },
                        {
                            "who": "recipient",
                            "of": "workout",
                            "can": "read"
                        }
                    ]
                },
                "$actions": [
                    {
                        "who": "author",
                        "of": "workout",
                        "can": "write"
                    },
                    {
                        "who": "recipient",
                        "of": "workout",
                        "can": "read"
                    },
                    {
                        "role": "fitbit",
                        "can": "read"
                    }
                ]
            },
            "$actions": [
                {
                    "who": "author",
                    "of": "userworkout",
                    "can": "write"
                },
                {
                    "role": "fitbit",
                    "can": "read"
                }
            ]
        }
    }
}

// creating userworkout
bafyreib5xbinoxrcxcx76yadssmgmcktfhp6jyc77buobfvzhgwfv56ybu
{
    "data": {
        "name": "userworkout"
    },
    "message": {
        "published": true,
        "protocol": "https://user.com",
        "protocolPath": "user/userworkout",
        "schema": "https://schema.org/user1/userworkout",
        "dataFormat": "application/json"
    }
}

// creating workout
bafyreicnpxjtdlqx3ywmn6dl2h44zwyx6jika4bbf6ztkno2vu4i5mbshe
{
    "data": {
        "name": "workout"
    },
    "message": {
        "published": true,
        "parentId": "bafyreib5xbinoxrcxcx76yadssmgmcktfhp6jyc77buobfvzhgwfv56ybu",
        "contextId": "bafyreib5xbinoxrcxcx76yadssmgmcktfhp6jyc77buobfvzhgwfv56ybu",
        "protocol": "https://user.com",
        "protocolPath": "userworkout/workout",
        "schema": "https://schema.org/user/workouts",
        "dataFormat": "application/json"
    }
}

// creating exercise
bafyreifnks6kx6u22zonnyeejpiktfaplcwn6hr6smehurwl43tz4oaayu
{
    "data": {
        "name": "exercise"
    },
    "message": {
        "published": true,
        "parentId": "bafyreicnpxjtdlqx3ywmn6dl2h44zwyx6jika4bbf6ztkno2vu4i5mbshe",
        "contextId": "bafyreib5xbinoxrcxcx76yadssmgmcktfhp6jyc77buobfvzhgwfv56ybu",
        "protocol": "https://user.com",
        "protocolPath": "userworkout/workout/exercise",
        "schema": "https://schema.org/user/exercise",
        "dataFormat": "application/json"
    }
}

// sending role permission
bafyreiftcxzarytcm3s5oszapghadcgyajpusgxk65pgmndlzkyagcckme
{
    "data": {
        "name": "role admin"
    },
    "message": {
        "published": true,
        "recipient": "",
        "protocol": "https://user.com",
        "protocolPath": "fitbit",
        "schema": "https://schema.org/user/fitbit",
        "dataFormat": "application/json"
    }
}

// reading records
{
    "from": "",
    "message": {
        "filter": {
            "protocol": "https://user.com",
            "schema": "https://schema.org/user1/userworkout"
        }
    }
}



{
    message: {
      protocol: "https://user.com",
      filter: {
        protocolPath: "workout/exercise",
        schema: "https://schema.org/user/exercise",
        parentId: "bafyreihxvsccgizxpq5wfsb2wuzwrst4clt3zgebx6trpyf3dwwpq2mboq"
      }
    }
}


const eventProtocolDefinition =
{
    protocol: "https://example.com/protocols/event",
    published: true,
    types: {
        event: {
            schema: "https://example.com/schema/event",
            dataFormats: ["application/json"],
        },
        rsvp: {
            schema: "https://example.com/schema/rsvp",
            dataFormats: ["application/json"],
        },
        guest: {
            schema: "https://example.com/schema/guest",
            dataFormats: ["application/json"],
        },
        admin: {
            schema: "https://example.com/schema/admin",
            dataFormats: ["application/json"],
        },
    },
    structure: {
        admin: {
            $globalRole: true
        },
        event: {
            $actions: [
                { who: "anyone", can: "write" },
                { who: "anyone", can: "read" },
                { role: "admin", can: "write" },
            ],

            guest: {
                $contextRole: true,
                $actions: [
                    {
                        who: "author",
                        of: "event",
                        can: "write"
                    },
                    {
                        who: "anyone",
                        can: "read"
                    },
                    {
                        role: "admin",
                        can: "delete"
                    }
                ]
            },
            rsvp: {
                $actions: [
                    {
                        role: "event/guest",
                        can: "write",
                    },
                    {
                        role: "event/guest",
                        can: "query",
                    },
                    {
                        role: "event/guest",
                        can: "read",
                    },
                    {
                        role: "admin",
                        can: "delete"
                    },
                ],
            },

        },
    }
}

"structure": {
    "admin": {
        "$globalRole": true
    },
    "user": {
        {...},
        "$actions": [
            {   "who": "author",
                "of": "user",
                "can": "write"},
            {   "role": "fitbit",
                "can": "read"}
        ],
    }
}