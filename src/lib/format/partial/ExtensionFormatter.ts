import { FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import * as TplEngine  from '../../TplEngine';
import * as Utility from '../../Utility';
import { ExportMap } from '../../ExportMap';
import * as FieldTypesFormatter from './FieldTypesFormatter';

export function format(fileName: string,
    exportMap: ExportMap,
    extension: FieldDescriptorProto,
    indentLevel: number): string {

    let extensionName = Utility.snakeToCamel(extension.getName());
    let fieldType = FieldTypesFormatter.getFieldType(
        extension.getType(), extension.getTypeName().slice(1), fileName, exportMap
    );

    return TplEngine.render('partial/extension', {
        indent: Utility.generateIndent(indentLevel),
        extensionName: extensionName,
        fieldType: fieldType,
    });
}
