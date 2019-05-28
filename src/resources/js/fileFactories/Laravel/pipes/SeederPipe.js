import Template from '../../../utilities/Template'
import ModelPipe from './ModelPipe'
import ModelEntity from '../../../objectModel/entities/ModelEntity'

import F from '../../../utilities/Formatter'

export default class SeederPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return [
            ... this.seederFiles(),
            ... this.databaseSeeder()
        ]
    }

    seederFiles() {
        return this.omc.modelsIncludingUser().map(model => {
            return {
                path: "database/seeds/" + model.className() + "Seeder.php",
                content: Template.for('Seeder').replace({
                    ___MODEL___: model.className(),
                })
            }
        }).concat([
            /* Put the many to many here??? */
        ])
    }

    databaseSeeder() {
        return this.omc.hasModels() ? [{
            path: "database/seeds/DatabaseSeeder.php",
            content: Template.for('DatabaseSeeder').replace({
                ___DATABASE_SEEDERS_BLOCK___: this.databaseSeedersBlock()
            })
        }] : []
    }

    databaseSeedersBlock() {
        return this.omc.inOptimalMigrationOrder().filter(entity => (entity instanceof ModelEntity)).map(model => {
            return "$this->call(" + model.className() + "Seeder::class);"
        }).join(___SINGLE_LINE_BREAK___)        
    }
}