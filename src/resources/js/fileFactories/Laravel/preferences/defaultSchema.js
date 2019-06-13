export default {
    "User": {
        "name": "User",
        "type": "UserEntity",
        "attributes": {
            "name": {
                "name": "name",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            "email": {
                "name": "email",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": true,
                "foreign": null
            },
            "email_verified_at": {
                "name": "email_verified_at",
                "cast": "datetime",
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": true,
                "unique": false,
                "foreign": null
            },
            "password": {
                "name": "password",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": true,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            "remember_token": {
                "name": "remember_token",
                "cast": null,
                "dataType": "string",
                "fillable": false,
                "hidden": true,
                "index": false,
                "nullable": true,
                "unique": false,
                "foreign": null
            }
        },
        "relationships": {
            "hasOne": [],
            "hasMany": [
                "Car"
            ],
            "belongsTo": [],
            "belongsToMany": []
        }
    },
    "password_resets": {
        "name": "password_resets",
        "type": "TableEntity",
        "attributes": {
            "email": {
                "name": "email",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            "token": {
                "name": "token",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        },
        "relationships": {
            "hasOne": [],
            "hasMany": [],
            "belongsTo": [],
            "belongsToMany": []
        }
    }
}