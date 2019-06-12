import Attribute from './Attribute'
import Preference from '@utilities/Preference'
import F from '@utilities/Formatter'
import getDataType from './attributePropertyResolvers/getDataType'

export default class AttributeFactory {
    constructor(name, parent, allSegments = []) {
        this.name = name
        this.parent = parent
        this.allSegments = allSegments
    }

    static make(name, parent, allSegments = []) {
        let factory = new this(name, parent, allSegments)

        return new Attribute(
            {
                name: factory.name,
                parent: factory.parent,
                ... factory.property("cast"),
                ... factory.property("dataType"),
                ... factory.property("fillable"),
                ... factory.property("hidden"),
                ... factory.property("index"),
                ... factory.property("nullable"),
                ... factory.property("unique"),
                ... factory.property("foreign"),
            }
        )
    }

    /* If there is a preference available use that, else refer to dedicated get method */
    property(key) {
        return {
            [key]: this.hasPreference(key) ? this.getPreference(key) : this.bestGuessFor(key)
        }
    }

    bestGuessFor(key) {
        return this[F.camelCase(`get_${key}`)]()
    }

    /* GETTERS ***************************************************************/

    getForeign() {
        let matches = (new RegExp("^(.*)_id$")).exec(this.name)
        let allOtherModelNames = this.allSegments.map(segment => segment.name)
            .filter(name => {
                return name != F.pascalCase(this.parent.name)
            })

        return matches && allOtherModelNames.includes(F.pascalCase(matches[1])) ? F.snakeCase(F.pluralize(matches[1])) : null
    }

    getCast() {
        return null
    }

    getDataType() {
        return getDataType(this.name)
    }

    getIndex() {
        return false
    }

    getUnique() {
        return false
    }    

    getHidden() {
        return ['password', 'remember_token'].includes(this.name)
    }

    getFillable() {
        return ![
            'id',
            'updated_at',
            'created_at',
            'remember_token',
            'email_verified_at'
        ].includes(this.name)
    }

    getNullable() {
        if (this.getForeign() || ['created_at', 'updated_at'].includes(this.name)){
            return true;
        }else{
            return false;
        }
    }

    /* ATTRIBUTE PREFERENCES ***************************************************************/

    hasPreference(setting) {
        return Preference.has(
            this.preferencePathFor(setting)
        )
    }

    /* Exception from the get<Key> pattern! */
    getPreference(setting) {
        return Preference.get(
            this.preferencePathFor(setting)
        )
    }

    preferencePathFor(setting) {
        return [
            this.parent.name,
            "attributes",
            this.name,
            setting
        ]
    }
}