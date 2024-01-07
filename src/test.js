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
            "$globalRole": true
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

// creating user
bafyreibpc6hngckqvdh4adpe7yprwredvozurabsyf7q3raic5kka7xfdm
{
    "data": "user-1",
    "message": {
        "protocol": "https://user.com",
        "protocolPath": "user",
        "schema": "https://schema.org/user1/user",
        "dataFormat": "application/json"
    }
}

// creating userworkout
bafyreifhoqzsiclbofae7at6tqo7kclebbgtmbjhfxrjyx6sa4yzgffzgy
{
    "data": {
        "name": "userworkout"
    },
    "message": {
        "parentId": "bafyreibpc6hngckqvdh4adpe7yprwredvozurabsyf7q3raic5kka7xfdm",
        "contextId": "bafyreibpc6hngckqvdh4adpe7yprwredvozurabsyf7q3raic5kka7xfdm",
        "protocol": "https://user.com",
        "protocolPath": "user/userworkout",
        "schema": "https://schema.org/user1/userworkout",
        "dataFormat": "application/json"
    }
}

// creating workout
bafyreia2tfdbjbbzzft4kw76p2pjfyejz7opj6xepuvtadkperghd3tkiu
{
    "data": {
        "name": "workout"
    },
    "message": {
        "parentId": "bafyreifhoqzsiclbofae7at6tqo7kclebbgtmbjhfxrjyx6sa4yzgffzgy",
        "contextId": "bafyreibpc6hngckqvdh4adpe7yprwredvozurabsyf7q3raic5kka7xfdm",
        "protocol": "https://user.com",
        "protocolPath": "user/userworkout/workout",
        "schema": "https://schema.org/user1/workouts",
        "dataFormat": "application/json"
    }
}

// creating exercise

{
    "data": {
        "name": "exercise"
    },
    "message": {
        "parentId": "bafyreidph3dhxuzjvsczrek3dtrdob22zw5ex2ynma2dhuvyjxy6ppixki",
        "contextId": "bafyreie2wqqluvlny4be474u6i2lekkxzzeh4t4m3njkt3nxlvu5vxgyd4",
        "protocol": "https://user.com",
        "protocolPath": "user/userworkout/workout/exercise",
        "schema": "https://schema.org/user1/exercise",
        "dataFormat": "application/json"
    }
}

// sending role permission
{
    "data": {
        "name": "role admin"
    },
    "message": {
        "recipient": "",
        "protocol": "https://user.com",
        "protocolPath": "fitbit",
        "schema": "https://schema.org/user1/fitbit",
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