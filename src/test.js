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
        "userworkout": {
            "fitbit":{
                "$contextRole": true,
            },
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

  
{
    data: 'workout-1',
    message: {
        protocol: "https://user.com",
        protocolPath: "workout",
        schema: "https://schema.org/user/workouts",
        dataFormat: 'application/json',
    }
}
{
    data: {
        name: "curl"
    },
    message: {
        parentId: "bafyreihxvsccgizxpq5wfsb2wuzwrst4clt3zgebx6trpyf3dwwpq2mboq",
        contextId: "bafyreihxvsccgizxpq5wfsb2wuzwrst4clt3zgebx6trpyf3dwwpq2mboq",
        protocol: "https://user.com",
        protocolPath: "exercise",
        schema: "https://schema.org/user/exercise",
        dataFormat: 'application/json',
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