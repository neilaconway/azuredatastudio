/**
 * Dusky API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1PodSecurityContext } from './v1PodSecurityContext';

export class DuskyObjectModelsSecuritySpec {
    'context'?: V1PodSecurityContext;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "context",
            "baseName": "context",
            "type": "V1PodSecurityContext"
        }    ];

    static getAttributeTypeMap() {
        return DuskyObjectModelsSecuritySpec.attributeTypeMap;
    }
}

