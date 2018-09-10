import { FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import { generateIndent } from '../Utility';

export interface MappingProto {
    name: string;
    fields: MappingProtoField[];
}

export interface MappingProtoField {
    type: FieldDescriptorProto.Type;
    name: string;
    jsName: string;
    typeName?: string;
    repeated?: boolean;
}

export interface GenRequestMappingOptions {
    indent: number;
    packageName: string;
    messages: MappingProto[];
    message: MappingProto;
    mapFrom: string;
    mapTo: string;
}

export interface GenResponseMappingsOptions {
    indent: number;
    messages: MappingProto[];
    message: MappingProto;
    mapFrom: string;
    mapTo: string;
}

export function genRequestFields(opt: GenRequestMappingOptions): string[] {
    const res: string[] = [];
    const t = FieldDescriptorProto.Type;
    const gen = (indent: number, message: MappingProto, mapFrom: string, mapTo: string) => {
        if (!message) {
            return;
        }
        const g = (i, val) => res.push(generateIndent(i) + val);

        const genAssign = (f: MappingProtoField, cast: (val) => string) => {
            g(indent, `${mapTo}.${f.name} = ${cast(`${mapFrom}["${f.jsName}"]`)}`)
        };

        const genChildAssign = (i: number, f: MappingProtoField, repeated: boolean) => {
            const oldMapTo = mapTo;
            const oldMapFrom = mapFrom
            const newMapTo = `${f.name}_${f.typeName}`;
            const newMapFrom = `${f.name}_${f.typeName}$`;
            const mapFromItem = repeated ? 'item' : `${oldMapFrom}["${f.name}"]`;
            g(i, `if let ${newMapFrom} = ${mapFromItem} as? [String: Any] {`)
            g(i + 1, `var ${newMapTo} = ${opt.packageName}_${f.typeName}()`);
            const child = opt.messages.find(x => x.name === f.typeName);
            gen(i + 1, child, newMapFrom, newMapTo);
            if (repeated) {
                g(i + 1, `${oldMapTo}.${f.name}.append(${newMapTo})`)
            } else {
                g(i + 1, `${oldMapTo}.${f.name} = ${newMapTo}`);
            }
            g(i, `}`)
        };

        const genChildRepeatedAssign = (f: MappingProtoField) => {
            g(indent, `if let arr = ${mapFrom}["${f.name}"] as? [[String: Any]] {`)
            g(indent + 1, `for item in arr {`)
            genChildAssign(indent + 2, f, true)
            g(indent + 1, `}`)
            g(indent, `}`)
        };

        for (let f of message.fields) {
            switch (f.type) {
                case t.TYPE_STRING:
                    genAssign(f, (c) => `${c} as? String ?? ""`)
                    break;
                case t.TYPE_BOOL:
                    genAssign(f, (c) => `${c} as? Bool ?? false`)
                    break;
                case t.TYPE_INT32:
                case t.TYPE_ENUM:
                case t.TYPE_SFIXED32:
                case t.TYPE_SINT32:
                    genAssign(f, (c) => `Int32(${c} as? Int ?? 0)`)
                    break;
                case t.TYPE_INT64:
                case t.TYPE_SFIXED64:
                case t.TYPE_SINT64:
                    genAssign(f, (c) => `Int64(${c} as? Int ?? 0)`)
                    break;
                case t.TYPE_BYTES:
                    genAssign(f, (c) => `${c} as? Data ?? Data()`)
                    break;
                case t.TYPE_DOUBLE:
                    genAssign(f, (c) => `${c} as? Double ?? 0`)
                    break;
                case t.TYPE_FLOAT:
                    genAssign(f, (c) => `${c} as? Float ?? 0`)
                    break;
                case t.TYPE_UINT32:
                case t.TYPE_FIXED32:
                    genAssign(f, (c) => `UInt32(${c} as? Int ?? 0)`)
                    break;
                case t.TYPE_UINT64:
                case t.TYPE_FIXED64:
                    genAssign(f, (c) => `UInt64(${c} as? Int ?? 0)`)
                    break;
                case t.TYPE_MESSAGE:
                    if (f.repeated) {
                        genChildRepeatedAssign(f);
                    } else {
                        genChildAssign(indent, f, false)
                    }
                    break;
                default:
                    throw new Error(`Data type ${f.type} is not supported.`);
            };
        }
    };

    gen(opt.indent, opt.message, opt.mapFrom, opt.mapTo);

    return res;
}

export function genResponseMappings(opt: GenResponseMappingsOptions): string[] {
    const res: string[] = [];
    const t = FieldDescriptorProto.Type;
    const gen = (indent: number, message: MappingProto, mapFrom: string, mapTo: string) => {
        const g = (i, val) => res.push(generateIndent(i) + val);

        const genAssign = (f: MappingProtoField) => {
            g(indent, `${mapTo}["${f.jsName}"] = ${mapFrom}.${f.name}`)
        };

        const genChildAssign = (i: number, f: MappingProtoField, repeated: boolean) => {
            const oldMapTo = mapTo;
            const oldMapFrom = mapFrom
            const newMapTo = `_${f.name}_${f.typeName}$`;
            const newMapFrom = `_${f.name}_${f.typeName}`;
            const mapFromTmp = repeated ? 'item' : `${oldMapFrom}.${f.name}`;
            g(i, `let ${newMapFrom} = ${mapFromTmp}`);
            g(i, `var ${newMapTo}: [String: Any] = [:]`);
            const child = opt.messages.find(x => x.name === f.typeName);
            gen(i, child, newMapFrom, newMapTo);
            if (repeated) {
                g(i, `${f.name}$.append(${newMapTo})`)
            } else {
                g(i, `${oldMapTo}["${f.name}"] = ${newMapTo}`);
            }
        };

        const genChildRepeatedAssign = (f) => {
            g(indent, `var ${f.name}$: [[String: Any]] = []`)
            g(indent, `for item in ${mapFrom}.${f.name} {`)
            genChildAssign(indent + 1, f, true)
            g(indent, `}`)
            g(indent, `${mapTo}["${f.name}"] = ${f.name}$`)
        };

        for (let f of message.fields) {
            switch (f.type) {
                case (t.TYPE_MESSAGE):
                    if (f.repeated) {
                        genChildRepeatedAssign(f);
                    } else {
                        genChildAssign(indent, f, false)
                    }
                    break;
                default:
                    genAssign(f)
            }
        }
    };

    gen(opt.indent, opt.message, opt.mapFrom, opt.mapTo);

    return res;
}
