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
            tinyInteger: { default: "rand(10, 30)"},
            integer: { default: "rand(10, 30)"},
            smallInteger: { default: "rand(10, 30)"},
            mediumInteger: { default: "rand(10, 30)"},
            bigInteger: { default: "rand(10, 30)"},
            unsignedInteger: { default: "rand(10, 30)"},
            unsignedMediumInteger: { default: "rand(10, 30)"},
            unsignedSmallInteger: { default: "rand(10, 30)"},
            unsignedTinyInteger: { default: "rand(10, 30)"},
            unsignedBigInteger: { default: "rand(10, 30)"},

            text: { default: "$faker->realText()"},
            longText: { default: "$faker->realText()"},
            mediumText: { default: "$faker->realText()"},

            boolean: { default: "(bool)random_int(0, 1)" },
            
        }

        if (!(attribute.dataType in typeMap)) return "UNKNOWN_DATATYPE";

        if (attribute.name in typeMap[attribute.dataType]) {
            return typeMap[attribute.dataType][attribute.name]
        }

        return typeMap[attribute.dataType].default

    }

}