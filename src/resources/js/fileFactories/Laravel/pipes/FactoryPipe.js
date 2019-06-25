import Template from '@utilities/Template'
import ModelPipe from '@pipes/ModelPipe'

import F from '@utilities/Formatter'
import { random } from 'node-forge';

export default class FactoryPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return [
            ... this.factoryFiles(),
        ]
    }

    factoryFiles() {
        return this.omc.modelsIncludingUser().map(model => {
            return {
                path: "database/factories/" + model.className() + "Factory.php",
                content: Template.for('Factory').replace({
                    ___MODEL___: model.className(),
                    ___COLUMNS_BLOCK___: this.columnsBlock(model),
                })
            }
        })
    }

    columnsBlock(model) {
        return model.attributes.filter(attribute => {
            return !['id', 'created_at', 'updated_at'].includes(attribute.name)
        }).map(attribute => {
            return F.singleQuotePad(attribute.name) + " => " + this.seedStatement(attribute)
        }).join(",\n")
    }

    seedStatement(attribute) {
        let typeMap = {
            string: {
                name: "$faker->name()",
                first_name: "$faker->firstName",
                last_name: "$faker->lastName",
                slug: "$faker->slug",
                title: "$faker->words(3, true)",
                email: "$faker->unique()->safeEmail",
                password: "'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'", // password
                remember_token: "Str::random(10)",
                ... { /* add more common names here */},
                default: "$faker->sentence()"
            },
            timestamp: {
                email_verified_at: "now()",
                default: "$faker->dateTimeBetween('-30 years', 'now')"
            },
            tinyInteger: { default: "random_int(-128, 127)"},
            smallInteger: { default: "random_int(-32768, 32767)"},
            mediumInteger: { default: "random_int(-8388608, 8388607)"},
            integer: { default: "random_int(-2147483648, 2147483647)"},
            bigInteger: { default: "random_int(-9223372036854775808, 9223372036854775807)"},
            unsignedTinyInteger: { default: "random_int(0, 255)"},
            unsignedSmallInteger: { default: "random_int(0, 65535)"},
            unsignedMediumInteger: { default: "random_int(0, 16777215)"},
            unsignedInteger: { default: "random_int(0, 4294967295)"},
            unsignedBigInteger: { default: "random_int(0, 9223372036854775807)"},

            text: { default: "$faker->realText()"},
            longText: { default: "$faker->realText()"},
            mediumText: { default: "$faker->realText()"},

            boolean: { default: "$faker->boolean()" },

            decimal: { default: "$faker->randomFloat()" },
            double: { default: "$faker->randomFloat()" },
            float: { default: "$faker->randomFloat()" },
            unsignedDecimal: { default: "$faker->randomFloat()" },

            /*
            to be implemented **********************************************
            */
            ... [
                'increments',
                'tinyIncrements',
                'smallIncrements',
                'mediumIncrements',
                'bigIncrements',
                'point',
                'polygon',
                'geometry',
                'multiPoint',
                'multiPolygon',
                'geometryCollection',
                'time',
                'timeTz',
                'timestampTz',
                'timestamps',
                'timestampsTz',
                'ipAddress',
                'dateTime',
                'dateTimeTz',
                'nullableMorphs',
                'uuid',
                'year',
                'binary',
                'char',
                'date',
                'enum',
                'json',
                'jsonb',
                'lineString',
                'macAddress',
                'morphs',
                'multiLineString',
                'nullableTimestamps',
                'rememberToken',
                'set',
                'softDeletes',
                'softDeletesTz',
            ].reduce((carry, key) => {
                carry[key] = { default: "DATATYPE_NOT_IMPLEMENTED_YET"}
                return carry
            }, {})
        }

        /* The seeds assumes related models are available with ID in range [1,10] */
        if (attribute.foreign) {
             return "random_int(1, 10)";
        }

        if (!(attribute.dataType in typeMap)) return "BAD_DATATYPE";

        if (attribute.name in typeMap[attribute.dataType]) {
            return typeMap[attribute.dataType][attribute.name]
        }

        return typeMap[attribute.dataType].default

    }

}
