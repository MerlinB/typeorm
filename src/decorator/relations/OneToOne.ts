import {RelationMetadata} from "../../metadata/RelationMetadata";
import {RelationOptions} from "../../metadata/options/RelationOptions";
import {RelationTypes} from "../../metadata/types/RelationTypes";
import {defaultMetadataStorage} from "../../typeorm";
import {ConstructorFunction} from "../../common/ConstructorFunction";

/**
 * One-to-one relation allows to create direct relation between two entities. Entity1 have only one Entity2.
 * Entity1 is an owner of the relationship, and storages Entity1 id on its own side.
 */
export function OneToOne<T>(typeFunction: (type?: any) => ConstructorFunction<T>, options?: RelationOptions): Function;

/**
 * One-to-one relation allows to create direct relation between two entities. Entity1 have only one Entity2.
 * Entity1 is an owner of the relationship, and storages Entity1 id on its own side.
 */
export function OneToOne<T>(typeFunction: (type?: any) => ConstructorFunction<T>,
                            inverseSide?: string|((object: T) => any),
                            options?: RelationOptions): Function;

/**
 * One-to-one relation allows to create direct relation between two entities. Entity1 have only one Entity2.
 * Entity1 is an owner of the relationship, and storages Entity1 id on its own side.
 */
export function OneToOne<T>(typeFunction: (type?: any) => ConstructorFunction<T>,
                            inverseSideOrOptions?: string|((object: T) => any)|RelationOptions,
                            options?: RelationOptions): Function {
    let inverseSideProperty: string|((object: T) => any);
    if (typeof inverseSideOrOptions === "object") {
        options = <RelationOptions> inverseSideOrOptions;
    } else {
        inverseSideProperty = <string|((object: T) => any)> inverseSideOrOptions;
    }

    return function (object: Object, propertyName: string) {
        if (!options) options = {} as RelationOptions;

        const reflectedType = Reflect.getMetadata("design:type", object, propertyName);

        defaultMetadataStorage().relationMetadatas.add(new RelationMetadata({
            target: object.constructor,
            propertyName: propertyName,
            propertyType: reflectedType,
            relationType: RelationTypes.ONE_TO_ONE,
            type: typeFunction,
            inverseSideProperty: inverseSideProperty,
            options: options
        }));
    };
}