import Template from '../../../utilities/Template'
import ModelPipe from './ModelPipe'

import F from '../../../utilities/Formatter'
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
                ... { /* add more common names here */},
                default: "$faker->sentence()"
            },
            timestamp: {
                default: "Carbon::now()->format('Y-m-d H:i:s')"
            },
            tinyInteger: { default: "rand(1, 10)"},
            integer: { default: "rand(1, 10)"},
            smallInteger: { default: "rand(1, 10)"},
            mediumInteger: { default: "rand(1, 10)"},
            bigInteger: { default: "rand(1, 10)"},
            unsignedInteger: { default: "rand(1, 10)"},
            unsignedMediumInteger: { default: "rand(1, 10)"},
            unsignedSmallInteger: { default: "rand(1, 10)"},
            unsignedTinyInteger: { default: "rand(1, 10)"},
            unsignedBigInteger: { default: "rand(1, 10)"},

            text: { default: "$faker->realText()"},
            longText: { default: "$faker->realText()"},
            mediumText: { default: "$faker->realText()"},

            boolean: { default: "(bool)random_int(0, 1)" },

            decimal: { default: "lcg_value()" },
            double: { default: "lcg_value()" },
            float: { default: "lcg_value()" },
            unsignedDecimal: { default: "lcg_value()" },

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

        if (!(attribute.dataType in typeMap)) return "BAD_DATATYPE";

        if (attribute.name in typeMap[attribute.dataType]) {
            return typeMap[attribute.dataType][attribute.name]
        }

        return typeMap[attribute.dataType].default

    }

}