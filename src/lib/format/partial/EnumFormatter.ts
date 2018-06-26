import {EnumDescriptorProto} from 'google-protobuf/google/protobuf/descriptor_pb';
import * as TplEngine from '../../TplEngine';
import * as Utility from '../../Utility';

export function format(enumDescriptor: EnumDescriptorProto, indentLevel: number): string {
    let enumName = enumDescriptor.getName();
    let values: { [key: string]: number } = {};
    enumDescriptor.getValueList().forEach(value => {
        values[value.getName()] = value.getNumber();
    });

    return TplEngine.render('partial/enum', {
        indent: Utility.generateIndent(indentLevel),
        enumName: enumName,
        values: values,
    });
}
