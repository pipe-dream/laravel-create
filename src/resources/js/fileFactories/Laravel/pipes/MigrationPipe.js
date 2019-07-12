import Template from '@utilities/Template'
import BasePipe from '@pipes/BasePipe'
import F from '@utilities/Formatter'
import ModelEntity from '@objectModel/entities/ModelEntity';

export default class MigrationPipe extends BasePipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.inOptimalMigrationOrder().map((entity, index) => {
            return {
                path: this.migrationFilePath(entity, index),
                content: Template.for('Migration').replace({
                    ___CLASS_NAME___: this.migrationFileClassName(entity),
                    ___TABLE___: this.tableName(entity),
                    ___COLUMNS_BLOCK___: this.columns(entity),
                    ___SOFT_DELETES_BLOCK___: entity.softdeletes ? "$table->softDeletes();" : ""
                })
            }
        })
    }

    migrationFilePath(entity, index) {
        return "database/migrations/" + this.migrationTimeStamp(index) +"_create_" + this.tableName(entity) + "_table.php"
    }

    migrationFileClassName(entity) {
        return "Create" + F.pascalCase(this.tableName(entity)) + "Table"
    }

    tableName(entity) {
        if(!(entity instanceof ModelEntity)) {
            return entity.name
        }

        return F.snakeCase(F.pluralize(entity.name))
    }

    columns(entity) {
        return entity.attributes.map(attribute => {
            return this.statementsFor(attribute)
        }).reduce((allStatements, statements) => allStatements.concat(statements), []).join(___SINGLE_LINE_BREAK___)
    }

    statementsFor(attribute) {
        return [
            `$table->${attribute.dataType}('${attribute.name}')${this.chainings(attribute)};`,
            ... this.addForeignKeyConstraintFor(attribute)
        ].join(___SINGLE_LINE_BREAK___)
    }

    addForeignKeyConstraintFor(attribute) {
        return attribute.foreign ? [
            `$table->foreign('${attribute.name}')->references('id')->on('${attribute.foreign}');`
        ] : [];
    }

    chainings(attribute) {
        let chainings = ""
        if(attribute.index) chainings += "->index()";
        if(attribute.nullable || attribute.dataType === "timestamp") chainings += "->nullable()";
        if(attribute.unique) chainings += "->unique()";
        return chainings
    }

    migrationTimeStamp(index) {
        // prepare timestamp parts
        let current_datetime = new Date(),
            year = current_datetime.getFullYear(),
            month = String(current_datetime.getMonth() + 1).padStart(2,'0'),
            day = String(current_datetime.getDate()).padStart(2,'0'),
            hour = String(current_datetime.getHours()).padStart(2,'0'),
            minute = String(current_datetime.getMinutes()).padStart(2,'0')

        // Assume at most 99 migrations
        index = String(index).padStart(2,'0')

        // Example: 2014_10_12_000000
        return `${year}_${month}_${day}_${hour}${minute}${index}`
    }
}



