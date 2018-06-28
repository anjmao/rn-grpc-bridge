import { FieldDescriptorProto } from 'google-protobuf/google/protobuf/descriptor_pb';
import { generateIndent } from '../Utility';

export interface MappingProto {
    name: string;
    fields: MappingProtoField[];
}

export interface MappingProtoField {
    type: FieldDescriptorProto.Type;
    name: string;
    typeName?: string;
    repeated?: boolean;
}

export interface GenRequestMappingOptions {
    indent: number;
    packageName: string;
    messages: MappingProto[];
    message: MappingProto;
    root: string;
    root$: string;
}

export function genRequestFields(opt: GenRequestMappingOptions): string[] {
    const res: string[] = [];
    const gen = (indent: number, message: MappingProto, root: string, root$: string) => {
        if (!message) {
            return;
        }
        const g = (i, val) => res.push(generateIndent(i) + val);
        const genAssign = (f, cast) => {
            g(indent, `${root}.${f.name} = ${cast(`${root$}["${f.name}"]`)}`)
        };
        const genChildAssign = (i, f, repeated) => {
            const oldRoot = root;
            const oldRoot$ = root$
            const newRoot = `${f.name}_${f.typeName}`;
            const newRoot$ = `${f.name}_${f.typeName}$`;
            const mapFrom = repeated ? 'item' : `${oldRoot$}["${f.name}"]`;
            g(i, `if let ${newRoot$} = ${mapFrom} as? [String: Any] {`)
            g(i + 1, `var ${newRoot} = ${f.typeName}()`);
            const child = opt.messages.find(x => x.name === f.typeName);
            gen(i + 1, child, newRoot, newRoot$);
            if (repeated) {
                g(i + 1, `${oldRoot}.${f.name}.append(${newRoot})`)
            } else {
                g(i + 1, `${oldRoot}.${f.name} = ${newRoot}`);
            }
            g(i, `}`)
        };

        const genChildRepeatedAssign = (f) => {
            const oldRoot = root;
            const oldRoot$ = root$
            const newRoot = `${f.name}_${f.typeName}`;
            const newRoot$ = `${f.name}_${f.typeName}$`;
            g(indent, `if let arr = ${oldRoot$}["${f.name}"] as? [[String: Any]] {`)
            g(indent + 1, `for item in arr {`)
            genChildAssign(indent + 2, f, true)
            g(indent + 1, `}`)
            g(indent, `}`)
        };

        const t = FieldDescriptorProto.Type;
        for (let f of message.fields) {
            switch (f.type) {
                case t.TYPE_STRING:
                    genAssign(f, (c) => `String(describing: ${c})`)
                    break;
                case t.TYPE_BOOL:
                    // TODO
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
                    // TODO
                    break;
                case t.TYPE_BYTES:
                    // TODO
                    break;
                case t.TYPE_DOUBLE:
                    // TODO
                    break;
                case t.TYPE_FIXED32:
                    // TODO
                    break;
                case t.TYPE_FIXED64:
                    // TODO
                    break;
                case t.TYPE_FLOAT:
                    // TODO
                    break;
                case t.TYPE_UINT32:
                    // TODO
                    break;
                case t.TYPE_UINT64:
                    // TODO
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

    gen(opt.indent, opt.message, opt.root, opt.root$);

    return res;
}

// let res = []
// gen(0, input, res, 'root', 'root$');
// console.log(res.join('\n'))
